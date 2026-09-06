"""Regression checks for Phase 0 Letter/print synchronization consistency."""

from pathlib import Path
import unittest


ROOT = Path(__file__).resolve().parent.parent


class Phase0LetterSyncTests(unittest.TestCase):
    def test_print_settings_are_optional_inside_existing_schema_two_documents(self):
        workspace = (ROOT / "src" / "workspace.ts").read_text(encoding="utf-8")
        self.assertIn("schema: 2", workspace)
        self.assertIn("export type CVPrintSettings", workspace)
        self.assertIn("print?: CVPrintSettings", workspace)
        self.assertIn("...document.settings", workspace)
        self.assertIn("persistedPrintSettings", workspace)

    def test_legacy_preview_settings_are_bridged_into_workspace(self):
        bridge = (ROOT / "src" / "printSettingsSync.ts").read_text(encoding="utf-8")
        main = (ROOT / "src" / "main.tsx").read_text(encoding="utf-8")
        self.assertIn("codecafe-print-settings:${documentId}", bridge)
        self.assertIn("settings: { ...document.settings, print: normalized }", bridge)
        self.assertIn("localStorage.setItem(WORKSPACE_KEY", bridge)
        self.assertIn("installPrintSettingsSync()", main)

    def test_live_preview_label_is_letter_even_while_legacy_app_markup_remains_compatible(self):
        bridge = (ROOT / "src" / "printSettingsSync.ts").read_text(encoding="utf-8")
        self.assertIn('zoom.textContent = "Letter · 100%"', bridge)

    def test_google_portable_output_is_normalized_to_letter_and_synced_margins(self):
        cloud = (ROOT / "src" / "cloud.ts").read_text(encoding="utf-8")
        self.assertIn("applyLetterLayoutToPrintableHtml", cloud)
        self.assertIn("@page{size:Letter portrait;margin:", cloud)
        self.assertIn("settings.top", cloud)
        self.assertIn("settings.right", cloud)
        self.assertIn("settings.bottom", cloud)
        self.assertIn("settings.left", cloud)
        self.assertIn("applyLetterLayoutToPrintableHtml(printable.html, payload, printable.documentId)", cloud)

    def test_readme_documents_letter_instead_of_a4(self):
        readme = (ROOT / "README.md").read_text(encoding="utf-8")
        self.assertIn("Letter / Carta (8.5 × 11 in)", readme)
        self.assertNotIn("tamaño A4", readme)


if __name__ == "__main__":
    unittest.main()
