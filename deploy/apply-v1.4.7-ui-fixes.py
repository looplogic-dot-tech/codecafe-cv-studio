#!/usr/bin/env python3
from pathlib import Path

APP = Path("src/App.tsx")
LIB = Path("src/CVLibrary.tsx")

app = APP.read_text(encoding="utf-8")
lib = LIB.read_text(encoding="utf-8")

# 1) Make Delete available directly on every CV card, not only archived CVs.
old_delete_button = '{document.archived && <button className="danger" onClick={() => props.onDelete(document.id)}>{t.remove}</button>}'
new_delete_button = '<button className="danger" onClick={() => props.onDelete(document.id)}>{t.remove}</button>'
if old_delete_button not in lib:
    raise SystemExit("UI PATCH STOPPED: archived-only delete button pattern not found")
lib = lib.replace(old_delete_button, new_delete_button, 1)

# 2) Delete any CV directly after confirmation. Keep My CVs open and select a safe
# replacement if the deleted CV was the active document.
old_delete_fn = '''  const deleteDocument = (id: string) => {\n    const document = workspace.documents.find((candidate) => candidate.id === id);\n    if (!document?.archived) return;\n    const question = lang === "es" ? `¿Eliminar definitivamente “${document.name}”?` : `Permanently delete “${document.name}”?`;\n    if (!window.confirm(question)) return;\n    const updated = { ...workspace, documents: workspace.documents.filter((candidate) => candidate.id !== id) };\n    setWorkspace(updated);\n    saveWorkspaceLocal(updated);\n  };'''

new_delete_fn = '''  const deleteDocument = (id: string) => {\n    const preserved = workspaceWithCurrent();\n    const document = preserved.documents.find((candidate) => candidate.id === id);\n    if (!document) return;\n    const sameProfile = preserved.documents.filter((candidate) => candidate.profileId === document.profileId && candidate.id !== id);\n    if (sameProfile.length === 0) {\n      const message = lang === "es"\n        ? "No puedes eliminar el único CV de este perfil. Crea otro CV primero."\n        : "You cannot delete the only CV in this profile. Create another CV first.";\n      window.alert(message);\n      return;\n    }\n    const question = lang === "es" ? `¿Eliminar definitivamente “${document.name}”?` : `Permanently delete “${document.name}”?`;\n    if (!window.confirm(question)) return;\n    const documents = preserved.documents.filter((candidate) => candidate.id !== id);\n    let activeDocumentId = preserved.activeDocumentId;\n    if (id === preserved.activeDocumentId) {\n      const replacement = sameProfile.find((candidate) => !candidate.archived) ?? sameProfile[0];\n      activeDocumentId = replacement.id;\n      loadDocumentIntoEditor(replacement);\n    }\n    const updated = { ...preserved, documents, activeDocumentId };\n    setWorkspace(updated);\n    saveWorkspaceLocal(updated);\n    setLibraryOpen(true);\n    setCloudStatus("local");\n  };'''

if old_delete_fn not in app:
    raise SystemExit("UI PATCH STOPPED: original deleteDocument implementation not found")
app = app.replace(old_delete_fn, new_delete_fn, 1)

# 3) Rename the top cloud control so its purpose is explicit and not confused with
# the separate Save action. Preserve its existing click behavior and status class.
old_cloud_button = '<button className={`cloudButton ${cloudStatus}`} onClick={() => setCloudOpen(true)} title={t.cloud}>☁ <span>{cloudStatusText}</span></button>'
new_cloud_button = '<button className={`cloudButton ${cloudStatus}`} onClick={() => setCloudOpen(true)} title={t.cloud}>☁ <span>{lang === "es" ? "Cloud Sync" : "Cloud Sync"}</span></button>'
if old_cloud_button not in app:
    raise SystemExit("UI PATCH STOPPED: cloud button pattern not found")
app = app.replace(old_cloud_button, new_cloud_button, 1)

# 4) Rename the explicit Save action so it is clear this is the action that commits
# the current workspace to connected cloud destinations.
old_save_button = '<button className="ghost" onClick={save}>{saved ? t.saved : t.save}</button>'
new_save_button = '<button className="ghost" onClick={save}>{saved ? (lang === "es" ? "✓ Sincronizado" : "✓ Synced") : (lang === "es" ? "Sincronizar nube" : "Sync cloud")}</button>'
if old_save_button not in app:
    raise SystemExit("UI PATCH STOPPED: save button pattern not found")
app = app.replace(old_save_button, new_save_button, 1)

# Guardrails.
if '{document.archived && <button className="danger"' in lib:
    raise SystemExit("UI PATCH STOPPED: Delete is still archived-only")
if 'if (!document?.archived) return;' in app:
    raise SystemExit("UI PATCH STOPPED: archived-only delete guard still exists")
if 'setLibraryOpen(true);' not in app:
    raise SystemExit("UI PATCH STOPPED: library-open protection missing")
if 'Sincronizar nube' not in app or 'Cloud Sync' not in app:
    raise SystemExit("UI PATCH STOPPED: cloud button labels missing")

APP.write_text(app, encoding="utf-8")
LIB.write_text(lib, encoding="utf-8")
print("v1.4.7 UI fixes applied: direct Delete, persistent library, corrected cloud buttons")
