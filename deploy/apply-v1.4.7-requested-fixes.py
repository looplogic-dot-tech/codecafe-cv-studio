#!/usr/bin/env python3
from pathlib import Path
import re

APP = Path("src/App.tsx")
TEST = Path("server/test_frontend_contract.py")

app = APP.read_text(encoding="utf-8")
original = app


def sub_once(pattern: str, replacement: str, text: str, label: str) -> str:
    updated, count = re.subn(pattern, replacement, text, count=1, flags=re.S)
    if count != 1:
        raise SystemExit(f"PATCH STOPPED: expected exactly one match for {label}, found {count}")
    return updated

# 1. The editor must start blank. Keep the original v1.4.7 seed only as dormant
# compatibility data; it is no longer used to initialize or fill a real CV.
app = app.replace(
    'const [cv, setCV] = useState<CV>(seed);',
    'const [cv, setCV] = useState<CV>(blankCV);',
    1,
)
app = app.replace(
    'const [workspace, setWorkspace] = useState<CVWorkspace>(() => createInitialWorkspace(seed, { lang: "es", template: "ats", photoOn: false }));',
    'const [workspace, setWorkspace] = useState<CVWorkspace>(() => createInitialWorkspace(blankCV, { lang: "es", template: "ats", photoOn: false }));',
    1,
)

startup_pattern = r'''  useEffect\(\(\) => \{\n    const stored = localStorage\.getItem\("codecafe-cv"\);.*?    setWorkspaceReady\(true\);\n  \}, \[\]\);'''
startup_replacement = '''  useEffect(() => {
    // Always present a clean editor at application startup. The user's library
    // is restored from EC2 or Google Drive after connection instead of reviving
    // a stale/demo CV from browser storage.
    const freshWorkspace = createInitialWorkspace(blankCV, {
      lang: "es",
      template: "ats",
      photoOn: false,
    });
    const document = activeDocument(freshWorkspace);
    setWorkspace(freshWorkspace);
    setCV({ ...blankCV, ...document.cv, projects: document.cv.projects ?? [], customSections: document.cv.customSections ?? [] });
    setLang(document.settings.lang);
    setTemplate(document.settings.template);
    setPhotoOn(document.settings.photoOn);
    setWorkspaceReady(true);
  }, []);'''
app = sub_once(startup_pattern, startup_replacement, app, "blank startup effect")

# 2. Preserve automatic LOCAL editing persistence, but stop creating EC2
# revisions merely because React state changed. EC2 is written only by Save.
autosave_pattern = r'''  // Conserva cada edición localmente de inmediato y crea una revisión EC2 tras una pausa breve\.\n  useEffect\(\(\) => \{.*?  \}, \[cv, lang, photoOn, serverSession, template, workspace, workspaceReady\]\);'''
autosave_replacement = '''  // Keep browser-local editing persistence, but never create an EC2 revision
  // from startup, opening a CV, loading a library, or ordinary React state changes.
  // EC2/Drive are updated only through the explicit Save action.
  useEffect(() => {
    if (!workspaceReady) return;
    const updatedWorkspace = replaceCurrentDocument(workspace, cv, { lang, template, photoOn });
    saveWorkspaceLocal(updatedWorkspace);
    localStorage.setItem("codecafe-cv", JSON.stringify(cv));
    localStorage.setItem("codecafe-cv-settings", JSON.stringify({ lang, template, photoOn }));
  }, [cv, lang, photoOn, template, workspace, workspaceReady]);'''
app = sub_once(autosave_pattern, autosave_replacement, app, "remove automatic EC2 writer")

# 3. Never use the Alex seed as a fallback when loading a real document.
app = app.replace('{ ...seed, ...document.cv, projects:', '{ ...blankCV, ...document.cv, projects:')

# 4. EC2 connection must immediately restore the latest server library.
connect_ec2_pattern = r'''  const connectEc2 = async \(\) => \{\n    if \(!syncPassword\) return;.*?\n  \};\n  const disconnectEc2'''
connect_ec2_replacement = '''  const connectEc2 = async () => {
    if (!syncPassword) return;
    setCloudStatus("connecting");
    setCloudMessage("");
    try {
      const session = await connectServer(syncPassword);
      setServerSession(session);
      setServerRevision(session.currentRevision);
      serverRevisionRef.current = session.currentRevision;
      setSelectedRevision(session.currentRevision);
      setServerHistory(await listServerBackups());

      const backup = await loadServerBackup();
      if (backup) {
        const document = isEncryptedEnvelope(backup.payload)
          ? await decryptBackup<BackupDocument>(backup.payload, syncPassword)
          : backup.payload as BackupDocument;
        applyBackup(document);
        setServerRevision(backup.revision);
        serverRevisionRef.current = backup.revision;
        setSelectedRevision(backup.revision);
      }
      setCloudStatus("connected");
    } catch (error) {
      setCloudStatus("error");
      setCloudMessage((error as Error).message);
    }
  };
  const disconnectEc2'''
app = sub_once(connect_ec2_pattern, connect_ec2_replacement, app, "EC2 connect and restore")

# 5. Google Drive authorization must immediately restore the Drive library.
connect_drive_pattern = r'''  const connectDrive = async \(\) => \{\n    if \(!cloudConfig\.googleClientId\) return;.*?\n  \};\n  const restoreDrive'''
connect_drive_replacement = '''  const connectDrive = async () => {
    if (!cloudConfig.googleClientId) return;
    try {
      const token = await authorizeGoogleDrive(cloudConfig.googleClientId);
      setGoogleToken(token);
      const backup = await loadGoogleBackup<BackupDocument>(token);
      if (backup) applyBackup(backup);
      setCloudMessage(t.driveReady);
    } catch (error) {
      setCloudStatus("error");
      setCloudMessage((error as Error).message);
    }
  };
  const restoreDrive'''
app = sub_once(connect_drive_pattern, connect_drive_replacement, app, "Drive connect and restore")

if app == original:
    raise SystemExit("PATCH STOPPED: App.tsx was not changed")

# Guardrails: this patch must not touch the library component, workspace model,
# buttons, delete workflow, collections, profile isolation, or package version.
required = [
    'const [cv, setCV] = useState<CV>(blankCV);',
    'createInitialWorkspace(blankCV, { lang: "es", template: "ats", photoOn: false })',
    'const backup = await loadServerBackup();',
    'const backup = await loadGoogleBackup<BackupDocument>(token);',
    'const save = async () => {',
    'await syncCloud();',
]
for marker in required:
    if marker not in app:
        raise SystemExit(f"PATCH STOPPED: required marker missing: {marker}")

if '}, 1200);' in app:
    raise SystemExit("PATCH STOPPED: automatic 1200 ms EC2 writer still exists")

# Only the explicit cloud sync path may call saveServerBackup now.
if app.count('saveServerBackup(') != 1:
    raise SystemExit(f"PATCH STOPPED: expected one saveServerBackup call, found {app.count('saveServerBackup(')}")

APP.write_text(app, encoding="utf-8")

# Update only the two old static assertions whose expected behavior changed.
test = TEST.read_text(encoding="utf-8")
test = test.replace(
'''    def test_legacy_local_copy_is_still_migrated(self):
        app = (ROOT / "src" / "App.tsx").read_text(encoding="utf-8")
        self.assertIn('localStorage.getItem("codecafe-cv")', app)
        self.assertIn("createInitialWorkspace(migratedCV", app)
''',
'''    def test_startup_is_blank_instead_of_restoring_stale_local_cv(self):
        app = (ROOT / "src" / "App.tsx").read_text(encoding="utf-8")
        self.assertIn('const [cv, setCV] = useState<CV>(blankCV)', app)
        self.assertNotIn('localStorage.getItem("codecafe-cv")', app)
''')

test = test.replace(
'''    def test_every_edit_is_saved_locally_and_queued_for_ec2(self):
        app = (ROOT / "src" / "App.tsx").read_text(encoding="utf-8")
        cloud = (ROOT / "src" / "cloud.ts").read_text(encoding="utf-8")
        self.assertIn("saveWorkspaceLocal(updatedWorkspace)", app)
        self.assertIn("ec2SaveQueueRef.current", app)
        self.assertIn("serverRevisionRef.current", app)
        self.assertIn("restoreServerSession()", app)
        self.assertIn('api<ServerSession>("/api/session")', cloud)
''',
'''    def test_edits_stay_local_until_explicit_cloud_save(self):
        app = (ROOT / "src" / "App.tsx").read_text(encoding="utf-8")
        cloud = (ROOT / "src" / "cloud.ts").read_text(encoding="utf-8")
        self.assertIn("saveWorkspaceLocal(updatedWorkspace)", app)
        self.assertNotIn("}, 1200);", app)
        self.assertEqual(app.count("saveServerBackup("), 1)
        self.assertIn("serverRevisionRef.current", app)
        self.assertIn("restoreServerSession()", app)
        self.assertIn('api<ServerSession>("/api/session")', cloud)
''')

TEST.write_text(test, encoding="utf-8")
print("v1.4.7 requested fixes applied successfully")
