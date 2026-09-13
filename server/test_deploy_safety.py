"""Regression checks for the Phase 0 deployment safety baseline."""

from pathlib import Path
import unittest


ROOT = Path(__file__).resolve().parent.parent


class DeploySafetyTests(unittest.TestCase):
    def test_preflight_uses_live_data_directory_instead_of_guessing(self):
        preflight = (ROOT / "deploy" / "preflight-data-safety.sh").read_text(encoding="utf-8")
        self.assertIn('/etc/codecafe-cv-sync.env', preflight)
        self.assertIn('CODECAFE_CV_DATA_DIR', preflight)
        self.assertIn('database_path="${data_dir}/backups.sqlite3"', preflight)
        self.assertNotIn('database_path="/var/lib/codecafe-cv-sync/backups.sqlite3"', preflight)

    def test_preflight_validates_active_and_backup_sqlite(self):
        preflight = (ROOT / "deploy" / "preflight-data-safety.sh").read_text(encoding="utf-8")
        self.assertGreaterEqual(preflight.count("PRAGMA quick_check"), 2)
        self.assertIn("source.backup(destination)", preflight)
        self.assertIn("latest != copied_latest", preflight)

    def test_preflight_stops_when_disk_space_is_too_low(self):
        preflight = (ROOT / "deploy" / "preflight-data-safety.sh").read_text(encoding="utf-8")
        self.assertIn("CODECAFE_CV_MIN_FREE_KB", preflight)
        self.assertIn("524288", preflight)
        self.assertIn("No se creó ni modificó ningún respaldo", preflight)

    def test_current_deployer_requires_preflight_before_existing_rollback_flow(self):
        updater = (ROOT / "deploy" / "update-v1.4.0.sh").read_text(encoding="utf-8")
        preflight_index = updater.index("preflight-data-safety.sh")
        deploy_index = updater.index("update-v1.2.0.sh")
        self.assertLess(preflight_index, deploy_index)

    def test_underlying_deployer_also_uses_real_data_directory_and_validates_backup(self):
        updater = (ROOT / "deploy" / "update-v1.2.0.sh").read_text(encoding="utf-8")
        self.assertIn('/etc/codecafe-cv-sync.env', updater)
        self.assertIn('CODECAFE_CV_DATA_DIR', updater)
        self.assertIn('database_path="${data_dir}/backups.sqlite3"', updater)
        self.assertIn('database_backup_dir="${data_dir}/deployment-backups"', updater)
        self.assertNotIn('/var/lib/codecafe-cv-sync/backups.sqlite3', updater)
        self.assertGreaterEqual(updater.count("PRAGMA quick_check"), 2)
        self.assertIn("latest != copied_latest", updater)


if __name__ == "__main__":
    unittest.main()
