"""Regression checks for low-click CV workflows and safe local-first storage."""

from pathlib import Path
import unittest


ROOT = Path(__file__).resolve().parent.parent


class GoldenRuleUxTests(unittest.TestCase):
    def test_new_blank_cv_opens_library_composer_immediately(self):
        library = (ROOT / "src" / "CVLibrary.tsx").read_text(encoding="utf-8")
        self.assertIn("Create and show suggestions", library)
        self.assertIn("Crear y ver sugerencias", library)
        self.assertIn("autoFocus", library)
        self.assertIn('event.key === "Enter"', library)
        self.assertIn("createBlankAndCompose", library)
        self.assertIn("setComposeDocumentId(document.id)", library)
        self.assertIn("profile?.basicInfo", library)

    def test_active_cv_can_be_removed_directly_but_last_one_is_protected(self):
        library = (ROOT / "src" / "CVLibrary.tsx").read_text(encoding="utf-8")
        self.assertIn("Remove CV", library)
        self.assertIn("Eliminar CV", library)
        self.assertIn("activeInProfile.length <= 1", library)
        self.assertIn("window.confirm", library)
        self.assertIn('reason: "cv-removed"', library)

    def test_removing_cv_reopens_my_cvs_after_workspace_reload(self):
        main = (ROOT / "src" / "main.tsx").read_text(encoding="utf-8")
        self.assertIn("reopenMyCvsAfterRender", main)
        self.assertIn('detail?.reason === "cv-removed"', main)
        self.assertIn("requestAnimationFrame", main)
        self.assertIn('/My CVs|Mis CVs/i', main)

    def test_suggestions_can_be_applied_in_one_click(self):
        composer = (ROOT / "src" / "CVLibraryComposer.tsx").read_text(encoding="utf-8")
        self.assertIn("Apply suggested", composer)
        self.assertIn("Aplicar sugerencias", composer)
        self.assertIn("suggestedRecords", composer)
        self.assertIn("applySuggested", composer)
        self.assertIn("persistSelections", composer)

    def test_storage_experience_is_local_first_and_drive_optional(self):
        notice = (ROOT / "src" / "syncNotice.ts").read_text(encoding="utf-8")
        self.assertIn("Simple option — save locally", notice)
        self.assertIn("Opción simple — guardar localmente", notice)
        self.assertIn("Advanced option — Google Drive", notice)
        self.assertIn("Opción avanzada — Google Drive", notice)
        self.assertIn("downloadLocalBackup", notice)
        self.assertIn("driveAdvancedSetup", notice)


if __name__ == "__main__":
    unittest.main()
