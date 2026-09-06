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

    def test_new_cloud_copies_are_plain_and_drive_receives_pdf(self):
        app = (ROOT / "src" / "App.tsx").read_text(encoding="utf-8")
        cloud = (ROOT / "src" / "cloud.ts").read_text(encoding="utf-8")
        self.assertIn("saveServerBackup(document, digest", app)
        self.assertNotIn("saveServerBackup(envelope, digest", app)
        self.assertIn('mimeType=${encodeURIComponent("application/pdf")}', cloud)
        self.assertIn("Drive recibe datos normales", cloud)

    def test_native_writing_assistance_and_custom_sections_remain_enabled(self):
        app = (ROOT / "src" / "App.tsx").read_text(encoding="utf-8")
        self.assertIn("spellCheck={true}", app)
        self.assertIn("customSections", app)

    def test_tools_support_categories_without_migrating_legacy_text(self):
        app = (ROOT / "src" / "App.tsx").read_text(encoding="utf-8")
        styles = (ROOT / "src" / "styles.css").read_text(encoding="utf-8")
        self.assertIn("export function parseToolLines", app)
        self.assertIn('const separator = line.indexOf(":")', app)
        self.assertIn('category: "", content: line', app)
        self.assertIn('className="toolCategory"', app)
        self.assertIn(".toolCategory b", styles)
        self.assertGreaterEqual(app.count(": AWS · Azure · Docker"), 1)

    def test_section_ids_are_stable_and_custom_titles_are_optional(self):
        app = (ROOT / "src" / "App.tsx").read_text(encoding="utf-8")
        for section_id in ("profile", "experience", "core_skills", "tools", "projects",
                           "certifications", "skills", "education", "languages"):
            self.assertIn(f'"{section_id}"', app)
        self.assertIn("sectionTitles?: SectionTitles", app)
        self.assertIn("delete sectionTitles[id]", app)
        self.assertIn('onTitleChange={(value) => setSectionTitle("core_skills", value)}', app)
        self.assertIn('onTitleChange={(value) => setSectionTitle("projects", value)}', app)

    def test_print_output_uses_categories_and_custom_titles(self):
        app = (ROOT / "src" / "App.tsx").read_text(encoding="utf-8")
        styles = (ROOT / "src" / "styles.css").read_text(encoding="utf-8")
        self.assertIn("printableTools(cv.tools)", app)
        self.assertIn('title("core_skills", labels.coreHeading)', app)
        self.assertIn('title("projects", labels.projectsHeading)', app)
        self.assertIn("@media print", styles)
        self.assertIn(".editableSectionTitle button{display:none!important}", styles)

    def test_projects_keep_optional_repository_and_structured_headings(self):
        app = (ROOT / "src" / "App.tsx").read_text(encoding="utf-8")
        self.assertIn("repository?: string", app)
        self.assertIn('type="url"', app)
        self.assertIn("printableRepository(project.repository, labels.repository)", app)
        self.assertIn("function StructuredLines", app)
        self.assertIn("markdownBold", app)
        self.assertIn('line.match(/^\\*\\*(.+?)\\*\\*(.*)$/)', app)
        self.assertIn('line.content ? ":" : ""', app)

    def test_safe_markdown_links_render_in_preview_and_print(self):
        app = (ROOT / "src" / "App.tsx").read_text(encoding="utf-8")
        self.assertIn("function printableInlineText", app)
        self.assertIn("function InlineText", app)
        self.assertIn("https?:\\/\\/", app)
        self.assertIn('rel="noreferrer"', app)
        self.assertIn("printableInlineText(content)", app)


if __name__ == "__main__":
    unittest.main()
