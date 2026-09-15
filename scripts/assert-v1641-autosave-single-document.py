from pathlib import Path
import re

app = Path('src/App.tsx').read_text(encoding='utf-8')
workspace = Path('src/workspace.ts').read_text(encoding='utf-8')
cloud = Path('src/cloud.ts').read_text(encoding='utf-8')

# Local autosave/save must update the active document in-place through
# replaceCurrentDocument, never append a newly-created CV document.
start = workspace.find('export function replaceCurrentDocument(')
end = workspace.find('\nexport function saveWorkspaceLocal', start)
if start < 0 or end < 0:
    raise SystemExit('ERROR: replaceCurrentDocument implementation not found')
replace_body = workspace[start:end]
assert 'documents: normalized.documents.map(' in replace_body
assert 'newId(' not in replace_body
assert 'documents: [...' not in replace_body

# Both background autosave and the explicit Save action use the same active
# document replacement path.
assert 'const updatedWorkspace = replaceCurrentDocument(workspace, cv, { lang, template, photoOn });' in app
assert 'const saveLocal = () => {' in app
save_start = app.find('  const saveLocal = () => {')
save_end = app.find('\n  const applyBackup', save_start)
if save_start < 0 or save_end < 0:
    raise SystemExit('ERROR: saveLocal implementation not found')
save_body = app[save_start:save_end]
assert 'workspaceWithCurrent()' in save_body
assert 'saveWorkspaceLocal(updatedWorkspace)' in save_body
assert 'createDocument(' not in save_body
assert 'newId(' not in save_body

# Google Drive must PATCH the already existing Google Doc/PDF when the same CV
# is saved again. This is overwrite/update behavior, not create-a-new-copy.
assert 'const existingDocument = await findDriveItem(' in cloud
assert 'existingDocument,' in cloud
assert 'const existingPdf = await findDriveItem(' in cloud
assert 'existingPdf,' in cloud
assert 'method: existingId ? "PATCH" : "POST"' in cloud

# EC2 must use the singleton workspace endpoint after the earlier migration
# step; no historical revision API is allowed in the deployable source.
assert '/api/workspace' in cloud
assert '/api/backups' not in cloud

print('PASS: autosave updates the active CV in place')
print('PASS: explicit Save updates the same CV document')
print('PASS: Google Drive overwrites the matching Doc/PDF instead of creating copies')
print('PASS: EC2 uses the singleton workspace save model')
