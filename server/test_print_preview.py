"""Regression checks for the A4 print-preview workflow."""

from pathlib import Path
import unittest


ROOT = Path(__file__).resolve().parent.parent


class PrintPreviewTests(unittest.TestCase):
    def test_print_preview_is_fixed_to_a4_and_has_real_page_margins(self):
        preview = (ROOT / "src" / "printPreview.ts").read_text(encoding="utf-8")
        self.assertIn("210 × 297 mm", preview)
        self.assertIn("@page{size:A4 portrait;margin:", preview)
        self.assertIn('page.style.width = "210mm"', preview)
        self.assertIn('page.style.minHeight = "297mm"', preview)

    def test_print_preview_remembers_per_cv_settings(self):
        preview = (ROOT / "src" / "printPreview.ts").read_text(encoding="utf-8")
        self.assertIn("codecafe-print-settings:${activeDocumentId()}", preview)
        self.assertIn("saveSettings(settings)", preview)

    def test_page_break_protection_is_available(self):
        preview = (ROOT / "src" / "printPreview.ts").read_text(encoding="utf-8")
        self.assertIn("break-inside:avoid-page", preview)
        self.assertIn("orphans:3;widows:3", preview)
        self.assertIn("protectBreaks", preview)

    def test_main_initializes_print_preview(self):
        main = (ROOT / "src" / "main.tsx").read_text(encoding="utf-8")
        self.assertIn('import "./print-preview.css"', main)
        self.assertIn("installPrintPreview()", main)


if __name__ == "__main__":
    unittest.main()
