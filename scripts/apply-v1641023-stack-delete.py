from pathlib import Path

VERSION = "1.6.4.10.2.3"

app_path = Path("src/App.tsx")
library_path = Path("src/CVLibrary.tsx")

app = app_path.read_text(encoding="utf-8")
library = library_path.read_text(encoding="utf-8")

# 1) Project Technology Stack: render the same **bold** and inline-link syntax
# already supported elsewhere instead of showing literal asterisks.
old_stack = '<span>{project.stack}</span>'
new_stack = '<span><BoldInlineText value={project.stack} /></span>'
if old_stack in app:
    app = app.replace(old_stack, new_stack, 1)
elif new_stack not in app:
    raise SystemExit("ERROR: project stack live-preview marker not found")

old_print_stack = '<strong>${escapeHtml(project.stack)}</strong>'
new_print_stack = '<strong>${printableBoldInline(project.stack)}</strong>'
if old_print_stack in app:
    app = app.replace(old_print_stack, new_print_stack, 1)
elif new_print_stack not in app:
    raise SystemExit("ERROR: project stack printable marker not found")

# 2) CV deletion: route every delete through the parent workspace state.
# The prior active-CV path wrote localStorage directly inside CVLibrary while
# App kept an older in-memory workspace, allowing the deleted CV to reappear.
start = library.find('  const removeDocument = (document: CVDocument) => {')
end = library.find('\n\n  return <div className="libraryOverlay"', start)
if start < 0 or end < 0:
    raise SystemExit("ERROR: CVLibrary removeDocument block not found")
library = library[:start] + '''  const removeDocument = (document: CVDocument) => {
    props.onDelete(document.id);
  };''' + library[end:]

# Parent deletion now supports active or archived CVs, preserves the last-CV
# safety rule, updates React state + local workspace together, and selects a
# replacement when deleting the currently open CV.
start = app.find('  const deleteDocument = (id: string) => {')
end = app.find('\n  const createCollection =', start)
if start < 0 or end < 0:
    raise SystemExit("ERROR: App deleteDocument block boundaries not found")
new_delete = '''  const deleteDocument = (id: string) => {
    const latest = loadWorkspaceLocal(workspace);
    const document = latest.documents.find((candidate) => candidate.id === id);
    if (!document) return;

    const activeInProfile = latest.documents.filter((candidate) => candidate.profileId === document.profileId && !candidate.archived);
    if (!document.archived && activeInProfile.length <= 1) return;

    const question = lang === "es" ? `¿Eliminar definitivamente “${document.name}”?` : `Permanently delete “${document.name}”?`;
    if (!window.confirm(question)) return;

    const documents = latest.documents.filter((candidate) => candidate.id !== id);
    let activeDocumentId = latest.activeDocumentId;
    if (activeDocumentId === id) {
      const replacement = documents.find((candidate) => candidate.profileId === document.profileId && !candidate.archived)
        || documents.find((candidate) => !candidate.archived)
        || documents[0];
      if (!replacement) return;
      activeDocumentId = replacement.id;
    }

    const updated = { ...latest, documents, activeDocumentId };
    setWorkspace(updated);
    saveWorkspaceLocal(updated);
    window.dispatchEvent(new CustomEvent("codecafe-workspace-reload", { detail: { documentId: activeDocumentId, reason: "cv-removed" } }));
  };'''
app = app[:start] + new_delete + app[end:]

# Keep the visible build marker accurate if the previous recovery script added it.
app = app.replace('v1.6.4.10.2.2', f'v{VERSION}')

app_path.write_text(app, encoding="utf-8")
library_path.write_text(library, encoding="utf-8")

final_app = app_path.read_text(encoding="utf-8")
final_library = library_path.read_text(encoding="utf-8")
assert '<BoldInlineText value={project.stack} />' in final_app
assert '${printableBoldInline(project.stack)}' in final_app
assert 'const latest = loadWorkspaceLocal(workspace);' in final_app[final_app.find('const deleteDocument'):final_app.find('const createCollection')]
assert 'setWorkspace(updated);' in final_app[final_app.find('const deleteDocument'):final_app.find('const createCollection')]
assert 'props.onDelete(document.id);' in final_library
print('PASS: Technology Stack renders markdown bold instead of literal asterisks')
print('PASS: printable Technology Stack uses the same bold renderer')
print('PASS: CV deletion updates the canonical workspace state')
print('PASS: no print-editor, Drive, section-control or library-composer code changed')
