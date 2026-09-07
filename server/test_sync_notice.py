"""Regression checks for local-first saving and optional client-owned Google Drive setup."""

from pathlib import Path
import unittest


ROOT = Path(__file__).resolve().parent.parent


class SyncNoticeTests(unittest.TestCase):
    def test_sync_menu_presents_local_saving_as_zero_setup(self):
        notice = (ROOT / "src" / "syncNotice.ts").read_text(encoding="utf-8")
        self.assertIn("CV Studio saves your changes locally automatically", notice)
        self.assertIn("CV Studio guarda tus cambios localmente de forma automática", notice)
        self.assertIn("Simple option — save locally", notice)
        self.assertIn("Opción simple — guardar localmente", notice)
        self.assertIn("Download backup to this computer", notice)
        self.assertIn("Descargar respaldo a esta computadora", notice)

    def test_drive_is_optional_and_configured_by_the_client(self):
        notice = (ROOT / "src" / "syncNotice.ts").read_text(encoding="utf-8")
        self.assertIn("Advanced option — Google Drive", notice)
        self.assertIn("Opción avanzada — Google Drive", notice)
        self.assertIn("your own Google Cloud Console", notice)
        self.assertIn("tu propio Google Cloud Console", notice)
        self.assertIn("Google Drive API", notice)
        self.assertIn("Authorized JavaScript origins", notice)
        self.assertIn("https://cv.codecafe.io", notice)
        self.assertIn(".apps.googleusercontent.com", notice)
        self.assertIn("Client Secret", notice)
        self.assertIn("Test users", notice)
        self.assertIn("codecafe-google-client-id", notice)

    def test_guide_no_longer_requires_codecafe_to_approve_client_email(self):
        notice = (ROOT / "src" / "syncNotice.ts").read_text(encoding="utf-8")
        self.assertNotIn("mailto:contacto@codecafe.io", notice)
        self.assertNotIn("Request access from CodeCafe", notice)
        self.assertNotIn("Solicitar autorización a CodeCafe", notice)
        self.assertIn("You do not need CodeCafe to approve your email address", notice)
        self.assertIn("No necesitas pedir a CodeCafe que autorice tu correo", notice)


if __name__ == "__main__":
    unittest.main()
