import pathlib
import unittest

ROOT = pathlib.Path(__file__).resolve().parents[1]
APP = (ROOT / "src" / "App.tsx").read_text(encoding="utf-8")

class StableCloudRecoveryTests(unittest.TestCase):
    def test_demo_identity_removed(self):
        self.assertNotIn('name: "Alex Rivera"', APP)
        self.assertNotIn("alex.rivera@example.com", APP)

    def test_startup_is_blank_and_does_not_reopen_local_workspace(self):
        self.assertIn("const startupWorkspace = createInitialWorkspace(blankCV", APP)
        self.assertNotIn("loadWorkspaceLocal(", APP)

    def test_cloud_restore_does_not_merge_stale_local_demo_state(self):
        self.assertNotIn("mergeWorkspaces(workspaceWithCurrent()", APP)
        self.assertIn("applyBackup(backup);", APP)
        self.assertIn("applyBackup(document);", APP)

    def test_drive_does_not_overwrite_ec2_during_startup(self):
        self.assertNotIn("loadGoogleBackup<BackupDocument>(storedGoogleToken)", APP)
        self.assertIn("const backup = await loadGoogleBackup<BackupDocument>(token);", APP)

    def test_only_explicit_save_path_can_write_ec2_revision(self):
        # There must be exactly one server write call, inside syncCloud().
        self.assertEqual(APP.count("saveServerBackup("), 1)
        self.assertNotIn("}, 1200);", APP)
        self.assertNotIn("crea una revisión EC2 tras una pausa", APP)

if __name__ == "__main__":
    unittest.main()
