from pathlib import Path
import re

app_path = Path('src/App.tsx')
app = app_path.read_text(encoding='utf-8')

# This patch runs only on the repair branch descended from the known-good
# e4d09fe baseline. It fixes startup, cloud recovery, library UX and persistence.

# 1) Production startup is always blank and never reopens stale local/demo data.
app = app.replace('  loadWorkspaceLocal,\n', '')
if '  mergeWorkspaces,\n' not in app:
    app = app.replace('  isWorkspace,\n', '  isWorkspace,\n  mergeWorkspaces,\n', 1)

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

# 2) EC2 recovery is authoritative over blank/stale browser state.
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

# 3) Remember Drive authorization but never auto-apply Drive during startup.
drive_startup_pattern = re.compile(
    r'''    const storedGoogleToken = loadStoredGoogleToken\(\);\n'''
    r'''    setGoogleToken\(storedGoogleToken\);\n'''
    r'''    if \(storedGoogleToken\) \{.*?'''
    r'''    \}\n'''
    r'''    // La cookie HttpOnly permite reconectar sin volver a pedir la contraseña\.''',
    re.S,
)
drive_startup_replacement = '''    const storedGoogleToken = loadStoredGoogleToken();\n    setGoogleToken(storedGoogleToken);\n    // Remember authorization only. Drive data loads when the user explicitly asks.\n    // La cookie HttpOnly permite reconectar sin volver a pedir la contraseña.'''
app, drive_startup_count = drive_startup_pattern.subn(drive_startup_replacement, app, count=1)
if drive_startup_count not in (0, 1):
    raise SystemExit('Unexpected Drive startup block count')

# 4) Explicit Drive connection/load merges its library with an already-connected
# EC2 library. If EC2 is not connected, Drive is authoritative over blank startup.
old_connect_drive = '''      const backup = await loadGoogleBackup<BackupDocument>(token);\n      if (backup) {\n        applyBackup(backup);\n      }'''
new_connect_drive = '''      const backup = await loadGoogleBackup<BackupDocument>(token);\n      if (backup) {\n        if (serverSession && backup.schema === 2 && isWorkspace(backup.workspace)) {\n          const merged = mergeWorkspaces(workspaceWithCurrent(), backup.workspace);\n          applyBackup({ ...backup, workspace: merged });\n        } else {\n          applyBackup(backup);\n        }\n      }'''
app = app.replace(old_connect_drive, new_connect_drive, 1)

old_restore_drive = '''    const backup = await loadGoogleBackup<BackupDocument>(googleToken);\n    if (!backup) throw new Error("Google Drive todavía no contiene respaldos.");\n    applyBackup(backup);'''
new_restore_drive = '''    const backup = await loadGoogleBackup<BackupDocument>(googleToken);\n    if (!backup) throw new Error("Google Drive todavía no contiene respaldos.");\n    if (serverSession && backup.schema === 2 && isWorkspace(backup.workspace)) {\n      const merged = mergeWorkspaces(workspaceWithCurrent(), backup.workspace);\n      applyBackup({ ...backup, workspace: merged });\n    } else {\n      applyBackup(backup);\n    }'''
app = app.replace(old_restore_drive, new_restore_drive, 1)

# 5) Remove the dangerous automatic EC2 revision writer. Only explicit Cloud Sync writes.
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

# 6) Rename the top save action to Cloud Sync so its purpose is unambiguous.
app = app.replace('tagline: "Tu experiencia, bien presentada.", save: "Guardar", saved: "✓ Guardado",',
                  'tagline: "Tu experiencia, bien presentada.", save: "Sincronizar nube", saved: "✓ Sincronizado",', 1)
app = app.replace('tagline: "Your experience, clearly presented.", save: "Save", saved: "✓ Saved",',
                  'tagline: "Your experience, clearly presented.", save: "Cloud Sync", saved: "✓ Synced",', 1)

# 7) Opening a CV from the full library also switches to that CV's profile.
old_open = '''    const updated = { ...preserved, activeDocumentId: id };\n    setWorkspace(updated);'''
new_open = '''    const updated = { ...preserved, activeProfileId: document.profileId || preserved.activeProfileId, activeDocumentId: id };\n    setWorkspace(updated);'''
app = app.replace(old_open, new_open, 1)

# 8) A new blank CV inherits only basic identity/contact fields from the current
# CV of the same active profile. Professional content remains blank.
old_create_anchor = '''    const current = activeDocument(preserved);\n    const now = new Date().toISOString();\n    const document: CVDocument = {'''
new_create_anchor = '''    const current = activeDocument(preserved);\n    const now = new Date().toISOString();\n    const inheritedBasics: CV = {\n      ...structuredClone(blankCV),\n      name: current.cv.name,\n      email: current.cv.email,\n      phone: current.cv.phone,\n      location: current.cv.location,\n      linkedin: current.cv.linkedin,\n      photo: current.cv.photo,\n    };\n    const document: CVDocument = {'''
app = app.replace(old_create_anchor, new_create_anchor, 1)
app = app.replace('cv: creationMode === "copy" ? structuredClone(current.cv) : structuredClone(blankCV),',
                  'cv: creationMode === "copy" ? structuredClone(current.cv) : inheritedBasics,', 1)

# 9) Delete is direct from the library (with confirmation), not archive-first.
# Keep the library open and select a safe replacement when deleting the active CV.
delete_pattern = re.compile(
    r'''  const deleteDocument = \(id: string\) => \{\n'''
    r'''    const document = workspace\.documents\.find\(\(candidate\) => candidate\.id === id\);.*?'''
    r'''  \};\n  const createCollection''',
    re.S,
)
delete_replacement = '''  const deleteDocument = (id: string) => {\n    const preserved = workspaceWithCurrent();\n    const document = preserved.documents.find((candidate) => candidate.id === id);\n    if (!document || preserved.documents.length <= 1) return;\n    const question = lang === "es" ? `¿Eliminar definitivamente “${document.name}”?` : `Permanently delete “${document.name}”?`;\n    if (!window.confirm(question)) return;\n    const remaining = preserved.documents.filter((candidate) => candidate.id !== id);\n    let activeDocumentId = preserved.activeDocumentId;\n    let activeProfileId = preserved.activeProfileId;\n    if (id === preserved.activeDocumentId) {\n      const replacement = remaining.find((candidate) => !candidate.archived && candidate.profileId === preserved.activeProfileId)\n        ?? remaining.find((candidate) => !candidate.archived)\n        ?? remaining[0];\n      activeDocumentId = replacement.id;\n      activeProfileId = replacement.profileId || activeProfileId;\n      loadDocumentIntoEditor(replacement);\n    }\n    const updated = { ...preserved, documents: remaining, activeDocumentId, activeProfileId };\n    setWorkspace(updated);\n    saveWorkspaceLocal(updated);\n    setCloudStatus("local");\n  };\n  const createCollection'''
app, delete_count = delete_pattern.subn(delete_replacement, app, count=1)
if delete_count != 1:
    raise SystemExit('Could not replace deleteDocument')

# 10) Guardrails.
if 'name: "Alex Rivera"' in app or 'alex.rivera@example.com' in app:
    raise SystemExit('Demo identity is still present in production source')

app_path.write_text(app, encoding='utf-8')

# Regression tests for the exact failures and requested UX.
test = Path('server/test_cloud_recovery_from_stable.py')
test.write_text('''import pathlib\nimport unittest\n\nROOT = pathlib.Path(__file__).resolve().parents[1]\nAPP = (ROOT / "src" / "App.tsx").read_text(encoding="utf-8")\nLIBRARY = (ROOT / "src" / "CVLibrary.tsx").read_text(encoding="utf-8")\n\nclass StableCloudRecoveryTests(unittest.TestCase):\n    def test_demo_identity_removed(self):\n        self.assertNotIn('name: "Alex Rivera"', APP)\n        self.assertNotIn("alex.rivera@example.com", APP)\n\n    def test_startup_is_blank_and_does_not_reopen_local_workspace(self):\n        self.assertIn("const startupWorkspace = createInitialWorkspace(blankCV", APP)\n        self.assertNotIn("loadWorkspaceLocal(", APP)\n\n    def test_drive_does_not_overwrite_ec2_during_startup(self):\n        self.assertNotIn("loadGoogleBackup<BackupDocument>(storedGoogleToken)", APP)\n\n    def test_explicit_drive_merges_with_connected_ec2_library(self):\n        self.assertIn("mergeWorkspaces(workspaceWithCurrent(), backup.workspace)", APP)\n        self.assertIn("if (serverSession && backup.schema === 2", APP)\n\n    def test_only_explicit_save_path_can_write_ec2_revision(self):\n        self.assertEqual(APP.count("saveServerBackup("), 1)\n        self.assertNotIn("}, 1200);", APP)\n\n    def test_cloud_sync_button_is_named_for_its_action(self):\n        self.assertIn('save: "Sincronizar nube"', APP)\n        self.assertIn('save: "Cloud Sync"', APP)\n\n    def test_library_shows_all_documents_and_direct_delete(self):\n        self.assertIn("const allDocuments = props.workspace.documents", LIBRARY)\n        self.assertNotIn("document.profileId === activeProfileId", LIBRARY)\n        self.assertIn('className="danger"', LIBRARY)\n        self.assertIn("props.onDelete(document.id)", LIBRARY)\n\n    def test_blank_cv_inherits_only_basic_profile_identity(self):\n        self.assertIn("const inheritedBasics: CV", APP)\n        self.assertIn("name: current.cv.name", APP)\n        self.assertIn("email: current.cv.email", APP)\n        self.assertIn("phone: current.cv.phone", APP)\n        self.assertIn("location: current.cv.location", APP)\n        self.assertIn("linkedin: current.cv.linkedin", APP)\n        self.assertIn("profileId: preserved.activeProfileId", APP)\n\n    def test_delete_no_longer_requires_archiving(self):\n        self.assertNotIn("if (!document?.archived) return", APP)\n        self.assertIn("preserved.documents.length <= 1", APP)\n\nif __name__ == "__main__":\n    unittest.main()\n''', encoding='utf-8')
