"""Regression checks for the Letter print-preview workflow."""

from pathlib import Path
import unittest


ROOT = Path(__file__).resolve().parent.parent


class PrintPreviewTests(unittest.TestCase):
    def test_print_preview_is_fixed_to_letter_and_has_real_page_margins(self):
        preview = (ROOT / "src" / "printPreview.ts").read_text(encoding="utf-8")
        css = (ROOT / "src" / "print-preview.css").read_text(encoding="utf-8")
        self.assertIn("215.9 × 279.4 mm", preview)
        self.assertIn("@page{size:Letter portrait;margin:", preview)
        self.assertIn('page.style.width = `${LETTER_WIDTH_MM}mm`', preview)
        self.assertIn('page.style.minHeight = `${LETTER_HEIGHT_MM}mm`', preview)
        self.assertIn("@page{size:Letter portrait;margin:14mm 16mm}", css)

    def test_print_preview_remembers_per_cv_settings(self):
        preview = (ROOT / "src" / "printPreview.ts").read_text(encoding="utf-8")
        self.assertIn("codecafe-print-settings:${activeDocumentId()}", preview)
        self.assertIn("saveSettings(settings)", preview)

    def test_page_break_protection_is_available(self):
        preview = (ROOT / "src" / "printPreview.ts").read_text(encoding="utf-8")
        self.assertIn("break-inside:avoid-page", preview)
        self.assertIn("orphans:3;widows:3", preview)
        self.assertIn("protectBreaks", preview)

    def test_manual_page_breaks_are_selectable_and_reflow_preview(self):
        preview = (ROOT / "src" / "printPreview.ts").read_text(encoding="utf-8")
        css = (ROOT / "src" / "print-preview.css").read_text(encoding="utf-8")
        self.assertIn("manualBreaks: string[]", preview)
        self.assertIn("+ Break here", preview)
        self.assertIn("simulateManualBreaks", preview)
        self.assertIn("manualPrintBreak", preview)
        self.assertIn("break-before:page!important", preview)
        self.assertIn("printBreakSpacer", css)
        self.assertIn("printBreakMarker.selected", css)

    def test_main_initializes_print_preview(self):
        main = (ROOT / "src" / "main.tsx").read_text(encoding="utf-8")
        self.assertIn('import "./print-preview.css"', main)
        self.assertIn("installPrintPreview()", main)


if __name__ == "__main__":
    unittest.main()
