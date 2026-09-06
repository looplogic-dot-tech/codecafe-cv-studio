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

    def test_importer_requires_review_before_additive_insertion(self):
        app = (ROOT / "src" / "App.tsx").read_text(encoding="utf-8")
        importer = (ROOT / "src" / "CVImporter.tsx").read_text(encoding="utf-8")
        extraction = (ROOT / "src" / "cvImport.ts").read_text(encoding="utf-8")
        self.assertIn("Insertar seleccionados", importer)
        self.assertIn('["skip", "No insertar"', importer)
        self.assertIn("const append =", app)
        self.assertNotIn("setCV(import", app)
        for extension in ('"pdf"', '"docx"', '"odt"', '"ods"'):
            self.assertIn(extension, extraction)

    def test_pdf_import_reconstructs_lines_and_splits_cv_sections(self):
        extraction = (ROOT / "src" / "cvImport.ts").read_text(encoding="utf-8")
        self.assertIn("function rebuildPdfLines", extraction)
        self.assertIn("fragment.hasEOL", extraction)
        self.assertIn("fragment.transform[5]", extraction)
        self.assertIn("function isRecognizedHeading", extraction)
        self.assertIn("formatPdfLines(rebuildPdfLines(content.items))", extraction)
        self.assertIn("isRecognizedHeading(trimmed)", extraction)

    def test_application_about_and_company_bold(self):
        app = (ROOT / "src" / "App.tsx").read_text(encoding="utf-8")
        self.assertIn("Acerca de CodeCafe CV Studio", app)
        self.assertIn("Jaime Sánchez Sáenz", app)
        self.assertNotIn("about?: string", app)
        self.assertIn("function BoldInlineText", app)
        self.assertIn("printableBoldInline(job.company)", app)

    def test_profiles_are_visible_and_isolate_documents(self):
        app = (ROOT / "src" / "App.tsx").read_text(encoding="utf-8")
        library = (ROOT / "src" / "CVLibrary.tsx").read_text(encoding="utf-8")
        self.assertIn('className="profileSwitch"', app)
        self.assertIn("const switchProfile", app)
        self.assertIn("const createProfile", app)
        self.assertIn("profileId: preserved.activeProfileId", app)
        self.assertIn("document.profileId === activeProfileId", library)

    def test_every_edit_is_saved_locally_and_queued_for_ec2(self):
        app = (ROOT / "src" / "App.tsx").read_text(encoding="utf-8")
        cloud = (ROOT / "src" / "cloud.ts").read_text(encoding="utf-8")
        self.assertIn("saveWorkspaceLocal(updatedWorkspace)", app)
        self.assertIn("ec2SaveQueueRef.current", app)
        self.assertIn("serverRevisionRef.current", app)
        self.assertIn("restoreServerSession()", app)
        self.assertIn('api<ServerSession>("/api/session")', cloud)

    def test_drive_library_and_profile_scoped_inheritance(self):
        app = (ROOT / "src" / "App.tsx").read_text(encoding="utf-8")
        workspace = (ROOT / "src" / "workspace.ts").read_text(encoding="utf-8")
        library = (ROOT / "src" / "CVLibrary.tsx").read_text(encoding="utf-8")
        self.assertIn("mergeWorkspaces(preserved, backup.workspace)", app)
        self.assertIn("export function mergeWorkspaces", workspace)
        self.assertIn("deriveProfileBasicInfo(assignedDocuments, profile.id)", workspace)
        self.assertIn("fillMissingBasicInfo(document.cv, basicInfo)", workspace)
        self.assertIn("document.profileId === profileId", workspace)
        self.assertNotIn('className="inheritBasics"', library)
        self.assertIn("contacto@codecafe.io", app)
        self.assertIn("Sincronizar ahora", app)


if __name__ == "__main__":
    unittest.main()
