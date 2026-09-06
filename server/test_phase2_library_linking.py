"""Regression checks for Phase 2 Professional Library linking."""

from pathlib import Path
import unittest


ROOT = Path(__file__).resolve().parent.parent


class Phase2LibraryLinkingTests(unittest.TestCase):
    def test_linking_never_maps_profile_basic_information(self):
        source = (ROOT / "src" / "libraryLinking.ts").read_text(encoding="utf-8")
        self.assertIn('BASIC_INFO_KEYS', source)
        self.assertIn('"name", "email", "phone", "location", "linkedin"', source)
        self.assertIn('name: document.cv.name', source)
        self.assertIn('email: document.cv.email', source)
        self.assertIn('phone: document.cv.phone', source)
        self.assertIn('location: document.cv.location', source)
        self.assertIn('linkedin: document.cv.linkedin', source)

    def test_existing_profile_inheritance_code_is_still_present(self):
        workspace = (ROOT / "src" / "workspace.ts").read_text(encoding="utf-8")
        self.assertIn('type ProfileBasicInfo', workspace)
        self.assertIn('deriveProfileBasicInfo', workspace)
        self.assertIn('fillMissingBasicInfo', workspace)
        self.assertIn('if (!next[field]?.trim() && basicInfo[field]?.trim())', workspace)
        self.assertIn('same profileId', workspace)

    def test_phase2_does_not_change_workspace_schema(self):
        workspace = (ROOT / "src" / "workspace.ts").read_text(encoding="utf-8")
        self.assertIn('schema: 2;', workspace)
        self.assertNotIn('schema: 3;', workspace)

    def test_linking_supports_manual_pull_and_safe_overrides(self):
        source = (ROOT / "src" / "libraryLinking.ts").read_text(encoding="utf-8")
        self.assertIn('applyLibrarySelection', source)
        self.assertIn('synchronizeLinkedDocument', source)
        self.assertIn('binding.override = true', source)
        self.assertIn('record.revision <= binding.appliedRevision', source)
        self.assertIn('placementsForKind', source)

    def test_library_builder_has_suggestions_and_section_choice(self):
        composer = (ROOT / "src" / "CVLibraryComposer.tsx").read_text(encoding="utf-8")
        self.assertIn('suggestionScore', composer)
        self.assertIn('Suggested', composer)
        self.assertIn('placementsForKind', composer)
        self.assertIn('Apply to CV', composer)
        self.assertIn('profile basic information', composer)

    def test_custom_record_fields_can_be_renamed_hidden_and_added(self):
        library = (ROOT / "src" / "ProfessionalLibrary.tsx").read_text(encoding="utf-8")
        self.assertIn('LABEL_PREFIX', library)
        self.assertIn('HIDDEN_PREFIX', library)
        self.assertIn('addCustomDetail', library)
        self.assertIn('renameDetail', library)
        self.assertIn('removeDetail', library)
        self.assertIn('restoreDetail', library)

    def test_existing_cvs_are_not_automatically_linked(self):
        source = (ROOT / "src" / "libraryLinking.ts").read_text(encoding="utf-8")
        self.assertNotIn('professionalLibraries.map((record)', source)
        self.assertIn('document.libraryBindings ?? []', source)


if __name__ == "__main__":
    unittest.main()
