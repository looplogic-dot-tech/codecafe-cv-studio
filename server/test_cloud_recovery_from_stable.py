import pathlib
import unittest

ROOT = pathlib.Path(__file__).resolve().parents[1]
APP = (ROOT / "src" / "App.tsx").read_text(encoding="utf-8")
WORKSPACE = (ROOT / "src" / "workspace.ts").read_text(encoding="utf-8")

class StableCloudRecoveryTests(unittest.TestCase):
    def test_demo_identity_removed(self):
        self.assertNotIn("Alex Rivera", APP)
        self.assertNotIn("alex.rivera@example.com", APP)

    def test_drive_connect_loads_existing_backup(self):
        self.assertIn("const backup = await loadGoogleBackup<BackupDocument>(token);", APP)
        self.assertIn("mergeWorkspaces(workspaceWithCurrent(), backup.workspace)", APP)

    def test_ec2_connect_loads_latest_backup(self):
        self.assertGreaterEqual(APP.count("const latest = await loadServerBackup();"), 2)

    def test_cloud_merge_is_non_destructive(self):
        self.assertIn("export function mergeWorkspaces", WORKSPACE)
        self.assertIn("documents = new Map(left.documents", WORKSPACE)

if __name__ == "__main__":
    unittest.main()
