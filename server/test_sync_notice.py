"""Regression checks for the Google Drive access guidance in Sync."""

from pathlib import Path
import unittest


ROOT = Path(__file__).resolve().parent.parent


class SyncNoticeTests(unittest.TestCase):
    def test_sync_menu_explains_drive_authorization(self):
        notice = (ROOT / "src" / "syncNotice.ts").read_text(encoding="utf-8")
        self.assertIn("Google Drive requires additional authorization", notice)
        self.assertIn("Google Drive requiere autorización adicional", notice)
        self.assertIn("Testing mode", notice)
        self.assertIn("modo de pruebas", notice)

    def test_clickable_guide_has_client_steps_and_support_links(self):
        notice = (ROOT / "src" / "syncNotice.ts").read_text(encoding="utf-8")
        self.assertIn("How to enable Google Drive", notice)
        self.assertIn("Cómo habilitar Google Drive", notice)
        self.assertIn("mailto:contacto@codecafe.io", notice)
        self.assertIn("https://support.google.com/accounts/answer/14012355", notice)
        self.assertIn("https://support.google.com/accounts/answer/16668185", notice)


if __name__ == "__main__":
    unittest.main()
