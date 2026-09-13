"""Regression checks for profile isolation and Google Drive sign-in readiness."""

from pathlib import Path
import unittest


ROOT = Path(__file__).resolve().parent.parent


class ProfileCloudRegressionTests(unittest.TestCase):
    def test_editor_write_is_scoped_to_active_profile(self):
        workspace = (ROOT / "src" / "workspace.ts").read_text(encoding="utf-8")
        self.assertIn("const normalized = normalizeWorkspace(workspace)", workspace)
        self.assertIn(
            "document.id === normalized.activeDocumentId && document.profileId === normalized.activeProfileId",
            workspace,
        )

    def test_existing_cvs_are_backfilled_only_inside_their_profile(self):
        workspace = (ROOT / "src" / "workspace.ts").read_text(encoding="utf-8")
        self.assertIn("deriveProfileBasicInfo(assignedDocuments, profile.id)", workspace)
        self.assertIn("newlyMigratedProfileIds.has(document.profileId!)", workspace)
        self.assertIn("fillMissingBasicInfo(document.cv, basicInfo)", workspace)
        self.assertIn("document.profileId === profileId", workspace)

    def test_google_identity_services_is_preloaded(self):
        index = (ROOT / "index.html").read_text(encoding="utf-8")
        self.assertIn("https://accounts.google.com/gsi/client", index)
        self.assertIn('data-codecafe-google="true"', index)


if __name__ == "__main__":
    unittest.main()
