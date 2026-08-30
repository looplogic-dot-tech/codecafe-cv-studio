"""Pruebas estáticas de las garantías de compatibilidad de la interfaz v1.2."""

from pathlib import Path
import unittest


ROOT = Path(__file__).resolve().parent.parent


class FrontendContractTests(unittest.TestCase):
    def test_workspace_keeps_global_twenty_document_limit(self):
        workspace = (ROOT / "src" / "workspace.ts").read_text(encoding="utf-8")
        self.assertIn("MAX_ACTIVE_CVS = 20", workspace)
        self.assertIn("candidate.documents.length <= MAX_ACTIVE_CVS", workspace)

    def test_legacy_local_copy_is_still_migrated(self):
        app = (ROOT / "src" / "App.tsx").read_text(encoding="utf-8")
        self.assertIn('localStorage.getItem("codecafe-cv")', app)
        self.assertIn("createInitialWorkspace(migratedCV", app)

    def test_cloud_backup_uses_workspace_schema_two(self):
        app = (ROOT / "src" / "App.tsx").read_text(encoding="utf-8")
        self.assertIn("schema: 2", app)
        self.assertIn("isWorkspace(backup.workspace)", app)

    def test_native_writing_assistance_and_custom_sections_remain_enabled(self):
        app = (ROOT / "src" / "App.tsx").read_text(encoding="utf-8")
        self.assertIn("spellCheck={true}", app)
        self.assertIn("customSections", app)


if __name__ == "__main__":
    unittest.main()
