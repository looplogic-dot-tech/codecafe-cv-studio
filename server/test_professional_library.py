"""Regression checks for the Phase 1 Professional Library foundation."""

from pathlib import Path
import unittest


ROOT = Path(__file__).resolve().parent.parent


class ProfessionalLibraryTests(unittest.TestCase):
    def test_workspace_schema_stays_two_and_library_is_optional(self):
        workspace = (ROOT / "src" / "workspace.ts").read_text(encoding="utf-8")
        self.assertIn("schema: 2", workspace)
        self.assertIn("professionalLibraries?: ProfessionalLibrary[]", workspace)
        self.assertIn("version: 1", workspace)

    def test_library_is_strictly_scoped_by_profile_id(self):
        workspace = (ROOT / "src" / "workspace.ts").read_text(encoding="utf-8")
        self.assertIn("profileId: string", workspace)
        self.assertIn("library.profileId === targetProfileId", workspace)
        self.assertIn("if (!normalized.has(profile.id))", workspace)
        self.assertIn("profileId: profile.id, records: []", workspace)

    def test_library_records_have_stable_structured_metadata(self):
        workspace = (ROOT / "src" / "workspace.ts").read_text(encoding="utf-8")
        for token in (
            "ProfessionalRecordKind",
            "ProfessionalRecordStatus",
            "details: Record<string, string>",
            "tags: string[]",
            "revision: number",
            "createdAt: string",
            "updatedAt: string",
            "source?: ProfessionalRecordSource",
        ):
            self.assertIn(token, workspace)

    def test_existing_cv_renderer_is_not_replaced_by_library_bindings(self):
        workspace = (ROOT / "src" / "workspace.ts").read_text(encoding="utf-8")
        app = (ROOT / "src" / "App.tsx").read_text(encoding="utf-8")
        self.assertNotIn("libraryBindings", workspace)
        self.assertNotIn("resolveCV(", app)
        self.assertIn("cv: CV", workspace)

    def test_library_ui_supports_search_tags_review_and_archive_without_delete(self):
        library = (ROOT / "src" / "ProfessionalLibrary.tsx").read_text(encoding="utf-8")
        self.assertIn('type="search"', library)
        self.assertIn("tagList", library)
        self.assertIn('"pending"', library)
        self.assertIn('"reviewed"', library)
        self.assertIn('"archived"', library)
        self.assertIn("changeStatus", library)
        self.assertNotIn("deleteProfessional", library)

    def test_my_cvs_exposes_professional_library_as_second_mode(self):
        library = (ROOT / "src" / "CVLibrary.tsx").read_text(encoding="utf-8")
        main = (ROOT / "src" / "main.tsx").read_text(encoding="utf-8")
        self.assertIn('"professional"', library)
        self.assertIn("<ProfessionalLibrary", library)
        self.assertIn('import "./professional-library.css"', main)

    def test_library_survives_editor_save_and_cloud_merge(self):
        workspace = (ROOT / "src" / "workspace.ts").read_text(encoding="utf-8")
        self.assertIn("persistedProfessionalLibraries", workspace)
        self.assertIn("professionalLibraries: persistedLibraries ?? normalized.professionalLibraries", workspace)
        self.assertIn("mergeProfessionalLibrary", workspace)
        self.assertIn("professionalLibraries: [...libraries.values()]", workspace)

    def test_conflicting_record_versions_are_preserved_for_review(self):
        workspace = (ROOT / "src" / "workspace.ts").read_text(encoding="utf-8")
        self.assertIn("conflictCopy", workspace)
        self.assertIn('status: "pending"', workspace)
        self.assertIn("conflictOf: originalId", workspace)
        self.assertIn("nunca destruye silenciosamente una versión", workspace)


if __name__ == "__main__":
    unittest.main()
