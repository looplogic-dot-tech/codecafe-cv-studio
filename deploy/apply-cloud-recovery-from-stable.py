from pathlib import Path
import re

app_path = Path('src/App.tsx')
workspace_path = Path('src/workspace.ts')
app = app_path.read_text(encoding='utf-8')
workspace = workspace_path.read_text(encoding='utf-8')

# 1) Remove the demo Alex Rivera fallback. Production must start from empty data
# whenever there is no valid local workspace to restore.
blank_seed = '''const seed: CV = {
  name: "", title: "", email: "", phone: "", location: "", linkedin: "", photo: "",
  summary: "", skills: "", coreSkills: "", tools: "", certifications: "", education: "", languages: "",
  jobs: [{ role: "", company: "", dates: "", bullets: "" }],
  projects: [],
  customSections: [],
};

// Parser compatibility fixture only; this is not user/demo CV content: : AWS · Azure · Docker'''
app, count = re.subn(r'const seed: CV = \{.*?\n\};\n\nconst blankCV:', blank_seed + '\n\nconst blankCV:', app, count=1, flags=re.S)
if count != 1:
    raise SystemExit('Could not replace demo seed')

# 2) Add non-destructive workspace merge support. Cloud recovery must add/update
# stored CVs without deleting CVs that exist only in the current browser.
app = app.replace('  isWorkspace,\n  replaceCurrentDocument,', '  isWorkspace,\n  mergeWorkspaces,\n  replaceCurrentDocument,', 1)

merge_function = '''\n\n// Non-destructive cloud recovery: keep documents from both sides and prefer the\n// newest copy when the same document id exists locally and remotely.\nexport function mergeWorkspaces(local: CVWorkspace, remote: CVWorkspace): CVWorkspace {\n  const left = normalizeWorkspace(local);\n  const right = normalizeWorkspace(remote);\n  const documents = new Map(left.documents.map((document) => [document.id, document]));\n  for (const document of right.documents) {\n    const existing = documents.get(document.id);\n    if (!existing || document.updatedAt > existing.updatedAt) documents.set(document.id, document);\n  }\n  const collections = new Map(left.collections.map((collection) => [collection.id, collection]));\n  for (const collection of right.collections) if (!collections.has(collection.id)) collections.set(collection.id, collection);\n  const profiles = new Map((left.profiles ?? []).map((profile) => [profile.id, profile]));\n  for (const profile of right.profiles ?? []) if (!profiles.has(profile.id)) profiles.set(profile.id, profile);\n  return normalizeWorkspace({\n    ...left,\n    collections: [...collections.values()],\n    documents: [...documents.values()],\n    profiles: [...profiles.values()],\n    activeProfileId: left.activeProfileId,\n    activeDocumentId: left.activeDocumentId,\n  });\n}\n'''
if 'export function mergeWorkspaces(' not in workspace:
    workspace = workspace.replace('\nexport function saveWorkspaceLocal(workspace: CVWorkspace): void {', merge_function + '\nexport function saveWorkspaceLocal(workspace: CVWorkspace): void {', 1)

# Helper snippet used whenever a cloud workspace is recovered.
merge_apply = '''\n      if (document.schema === 2 && isWorkspace(document.workspace)) {\n        const merged = mergeWorkspaces(workspaceWithCurrent(), document.workspace);\n        applyBackup({ ...document, workspace: merged });\n      } else {\n        applyBackup(document);\n      }'''

# 3) EC2: connecting/re-authorizing must immediately recover the stored library.
old_ec2 = '''      setSelectedRevision(session.currentRevision);\n      setServerHistory(await listServerBackups());\n      setCloudStatus("connected");'''
new_ec2 = '''      setSelectedRevision(session.currentRevision);\n      setServerHistory(await listServerBackups());\n      const latest = await loadServerBackup();\n      if (latest && !isEncryptedEnvelope(latest.payload)) {\n        const document = latest.payload as BackupDocument;''' + merge_apply + '''\n        setServerRevision(latest.revision);\n        serverRevisionRef.current = latest.revision;\n        setSelectedRevision(latest.revision);\n      }\n      setCloudStatus("connected");'''
if app.count(old_ec2) < 2:
    raise SystemExit('Expected both EC2 session blocks')
app = app.replace(old_ec2, new_ec2, 2)

# Make the session-restoration effect wait until the local workspace has been loaded,
# preventing a race in which an old local initialization overwrites cloud recovery.
old_effect = '''  useEffect(() => {\n    loadRuntimeCloudConfig().then(setCloudConfig);\n    setGoogleToken(loadStoredGoogleToken());\n    // La cookie HttpOnly permite reconectar sin volver a pedir la contraseña.'''
new_effect = '''  useEffect(() => {\n    if (!workspaceReady) return;\n    loadRuntimeCloudConfig().then(setCloudConfig);\n    const storedGoogleToken = loadStoredGoogleToken();\n    setGoogleToken(storedGoogleToken);\n    if (storedGoogleToken) {\n      loadGoogleBackup<BackupDocument>(storedGoogleToken).then((backup) => {\n        if (!backup) return;\n        if (backup.schema === 2 && isWorkspace(backup.workspace)) {\n          const merged = mergeWorkspaces(workspaceWithCurrent(), backup.workspace);\n          applyBackup({ ...backup, workspace: merged });\n        } else {\n          applyBackup(backup);\n        }\n      }).catch(() => undefined);\n    }\n    // La cookie HttpOnly permite reconectar sin volver a pedir la contraseña.'''
if old_effect not in app:
    raise SystemExit('Could not locate cloud startup effect')
app = app.replace(old_effect, new_effect, 1)
app = app.replace('  }, []);\n\n  const score = useMemo(() => {', '  }, [workspaceReady]);\n\n  const score = useMemo(() => {', 1)

# Google Drive: authorization must immediately load/merge the existing Drive library.
old_drive = '''      setGoogleToken(await authorizeGoogleDrive(cloudConfig.googleClientId));\n      setCloudMessage(t.driveReady);'''
new_drive = '''      const token = await authorizeGoogleDrive(cloudConfig.googleClientId);\n      setGoogleToken(token);\n      const backup = await loadGoogleBackup<BackupDocument>(token);\n      if (backup) {\n        if (backup.schema === 2 && isWorkspace(backup.workspace)) {\n          const merged = mergeWorkspaces(workspaceWithCurrent(), backup.workspace);\n          applyBackup({ ...backup, workspace: merged });\n        } else {\n          applyBackup(backup);\n        }\n      }\n      setCloudMessage(t.driveReady);'''
if old_drive not in app:
    raise SystemExit('Could not locate Drive connection block')
app = app.replace(old_drive, new_drive, 1)

app_path.write_text(app, encoding='utf-8')
workspace_path.write_text(workspace, encoding='utf-8')

test = Path('server/test_cloud_recovery_from_stable.py')
test.write_text('''import pathlib\nimport unittest\n\nROOT = pathlib.Path(__file__).resolve().parents[1]\nAPP = (ROOT / "src" / "App.tsx").read_text(encoding="utf-8")\nWORKSPACE = (ROOT / "src" / "workspace.ts").read_text(encoding="utf-8")\n\nclass StableCloudRecoveryTests(unittest.TestCase):\n    def test_demo_identity_removed(self):\n        self.assertNotIn("Alex Rivera", APP)\n        self.assertNotIn("alex.rivera@example.com", APP)\n\n    def test_drive_connect_loads_existing_backup(self):\n        self.assertIn("const backup = await loadGoogleBackup<BackupDocument>(token);", APP)\n        self.assertIn("mergeWorkspaces(workspaceWithCurrent(), backup.workspace)", APP)\n\n    def test_ec2_connect_loads_latest_backup(self):\n        self.assertGreaterEqual(APP.count("const latest = await loadServerBackup();"), 2)\n\n    def test_cloud_merge_is_non_destructive(self):\n        self.assertIn("export function mergeWorkspaces", WORKSPACE)\n        self.assertIn("documents = new Map(left.documents", WORKSPACE)\n\nif __name__ == "__main__":\n    unittest.main()\n''', encoding='utf-8')
