from pathlib import Path
import unittest


ROOT = Path(__file__).resolve().parents[1]


class StartupBlankContractTests(unittest.TestCase):
    def test_main_prepares_blank_before_linked_workspace(self):
        source = (ROOT / "src" / "main.tsx").read_text(encoding="utf-8")
        blank = source.index("prepareBlankStartupWorkspaceFromStorage();")
        linked = source.index("prepareLinkedWorkspaceFromStorage();", blank)
        self.assertLess(blank, linked)

    def test_startup_blank_preserves_library_and_uses_fixed_id(self):
        source = (ROOT / "src" / "startupBlank.ts").read_text(encoding="utf-8")
        self.assertIn('const STARTUP_BLANK_ID = "cv-startup-blank"', source)
        self.assertIn("documents.filter((document) => document.id !== STARTUP_BLANK_ID)", source)
        self.assertIn("documents: [...documents, startupDocument]", source)
        self.assertIn("activeDocumentId: STARTUP_BLANK_ID", source)
        self.assertNotIn("Alex Rivera", source)

    def test_startup_blank_never_discards_a_real_cv_at_limit(self):
        source = (ROOT / "src" / "startupBlank.ts").read_text(encoding="utf-8")
        self.assertIn("if (documents.length >= 20) return;", source)


if __name__ == "__main__":
    unittest.main()
