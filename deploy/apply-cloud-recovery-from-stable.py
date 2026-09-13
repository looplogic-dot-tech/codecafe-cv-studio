from pathlib import Path
import re

app_path = Path('src/App.tsx')
app = app_path.read_text(encoding='utf-8')

# This patch is intentionally limited to startup/recovery/persistence behavior.
# It runs on the branch that descends directly from the known-good e4d09fe baseline.

# 1) The editor must always start blank. Do not reopen a previous local CV and do
# not overwrite browser storage merely because the application was opened.
app = app.replace('  loadWorkspaceLocal,\n', '')
app = app.replace('  mergeWorkspaces,\n', '')

startup_pattern = re.compile(
    r'''  useEffect\(\(\) => \{\n'''
    r'''    const stored = localStorage\.getItem\("codecafe-cv"\);.*?'''
    r'''    setWorkspaceReady\(true\);\n'''
    r'''  \}, \[\]\);''',
    re.S,
)
startup_replacement = '''  useEffect(() => {\n    // Startup is deliberately blank. Existing CV libraries are restored only\n    // from an authorized cloud source, never from stale demo/local editor state.\n    const startupWorkspace = createInitialWorkspace(blankCV, {\n      lang: "es",\n      template: "ats",\n      photoOn: false,\n    });\n    setWorkspace(startupWorkspace);\n    setCV(structuredClone(blankCV));\n    setLang("es");\n    setTemplate("ats");\n    setPhotoOn(false);\n    setWorkspaceReady(true);\n  }, []);'''
app, startup_count = startup_pattern.subn(startup_replacement, app, count=1)
if startup_count not in (0, 1):
    raise SystemExit('Unexpected startup block count')

# 2) Cloud recovery is authoritative. A recovered EC2/Drive workspace replaces
# the temporary blank startup workspace; it must not merge Alex/New CV pollution
# from old browser state into the recovered library.
app = re.sub(
    r'''        if \(backup\.schema === 2 && isWorkspace\(backup\.workspace\)\) \{\n'''
    r'''          const merged = mergeWorkspaces\(workspaceWithCurrent\(\), backup\.workspace\);\n'''
    r'''          applyBackup\(\{ \.\.\.backup, workspace: merged \}\);\n'''
    r'''        \} else \{\n'''
    r'''          applyBackup\(backup\);\n'''
    r'''        \}''',
    '        applyBackup(backup);',
    app,
)

app = re.sub(
    r'''      if \(document\.schema === 2 && isWorkspace\(document\.workspace\)\) \{\n'''
    r'''        const merged = mergeWorkspaces\(workspaceWithCurrent\(\), document\.workspace\);\n'''
    r'''        applyBackup\(\{ \.\.\.document, workspace: merged \}\);\n'''
    r'''      \} else \{\n'''
    r'''        applyBackup\(document\);\n'''
    r'''      \}''',
    '      applyBackup(document);',
    app,
)

# The same patterns can appear at a different indentation level in connect handlers.
app = re.sub(
    r'''        if \(document\.schema === 2 && isWorkspace\(document\.workspace\)\) \{\n'''
    r'''          const merged = mergeWorkspaces\(workspaceWithCurrent\(\), document\.workspace\);\n'''
    r'''          applyBackup\(\{ \.\.\.document, workspace: merged \}\);\n'''
    r'''        \} else \{\n'''
    r'''          applyBackup\(document\);\n'''
    r'''        \}''',
    '        applyBackup(document);',
    app,
)

# 3) Remove the dangerous automatic EC2 revision writer. Previously every state
# transition (startup, opening a CV, cloud restore, etc.) could create a revision
# after 1.2 seconds. From now on only the explicit Save -> syncCloud path writes.
autosave_pattern = re.compile(
    r'''  // Conserva cada edición localmente de inmediato y crea una revisión EC2 tras una pausa breve\.\n'''
    r'''  useEffect\(\(\) => \{.*?'''
    r'''  \}, \[cv, lang, photoOn, serverSession, template, workspace, workspaceReady\]\);\n''',
    re.S,
)
app, autosave_count = autosave_pattern.subn(
    '  // Persistence is explicit: opening, restoring, or switching CVs never creates an EC2 revision.\n',
    app,
    count=1,
)
if autosave_count not in (0, 1):
    raise SystemExit('Unexpected automatic-save block count')

# 4) Guardrails: the demo identity must not exist in production startup data.
if 'name: "Alex Rivera"' in app or 'alex.rivera@example.com' in app:
    raise SystemExit('Demo identity is still present in production source')

app_path.write_text(app, encoding='utf-8')

# Regression tests for the exact failure that damaged the cloud history.
test = Path('server/test_cloud_recovery_from_stable.py')
test.write_text('''import pathlib\nimport unittest\n\nROOT = pathlib.Path(__file__).resolve().parents[1]\nAPP = (ROOT / "src" / "App.tsx").read_text(encoding="utf-8")\n\nclass StableCloudRecoveryTests(unittest.TestCase):\n    def test_demo_identity_removed(self):\n        self.assertNotIn('name: "Alex Rivera"', APP)\n        self.assertNotIn("alex.rivera@example.com", APP)\n\n    def test_startup_is_blank_and_does_not_reopen_local_workspace(self):\n        self.assertIn("const startupWorkspace = createInitialWorkspace(blankCV", APP)\n        self.assertNotIn("loadWorkspaceLocal(", APP)\n\n    def test_cloud_restore_does_not_merge_stale_local_demo_state(self):\n        self.assertNotIn("mergeWorkspaces(workspaceWithCurrent()", APP)\n        self.assertIn("applyBackup(backup);", APP)\n        self.assertIn("applyBackup(document);", APP)\n\n    def test_only_explicit_save_path_can_write_ec2_revision(self):\n        # There must be exactly one server write call, inside syncCloud().\n        self.assertEqual(APP.count("saveServerBackup("), 1)\n        self.assertNotIn("}, 1200);", APP)\n        self.assertNotIn("crea una revisión EC2 tras una pausa", APP)\n\nif __name__ == "__main__":\n    unittest.main()\n''', encoding='utf-8')
