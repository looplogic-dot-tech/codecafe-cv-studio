#!/usr/bin/env python3
from pathlib import Path

path = Path('src/App.tsx')
text = path.read_text(encoding='utf-8')

# 1) Revision digest must ignore savedAt timestamps.
old_digest = 'backupDigest(document)'
new_digest = 'backupDigest(document.schema === 2 ? document.workspace : document)'
count = text.count(old_digest)
if count != 2:
    raise SystemExit(f'Expected exactly 2 digest calls to patch, found {count}')
text = text.replace(old_digest, new_digest)

# 2) Never autosave merely because the app/session started or reconnected.
old_ref = '  const ec2SaveQueueRef = useRef<Promise<void>>(Promise.resolve());\n'
new_ref = old_ref + '  const lastAutosavedWorkspaceRef = useRef<string | null>(null);\n'
if old_ref not in text:
    raise SystemExit('Could not find EC2 save queue ref insertion point')
text = text.replace(old_ref, new_ref, 1)

old_block = '''    saveWorkspaceLocal(updatedWorkspace);\n    localStorage.setItem("codecafe-cv", JSON.stringify(cv));\n    localStorage.setItem("codecafe-cv-settings", JSON.stringify({ lang, template, photoOn }));\n    if (!serverSession && !googleToken) return;\n'''
new_block = '''    saveWorkspaceLocal(updatedWorkspace);\n    localStorage.setItem("codecafe-cv", JSON.stringify(cv));\n    localStorage.setItem("codecafe-cv-settings", JSON.stringify({ lang, template, photoOn }));\n\n    // Establish a baseline without creating a cloud revision. Session restore,\n    // page reload and reconnects must never be treated as user edits.\n    const workspaceSignature = JSON.stringify(updatedWorkspace);\n    if (lastAutosavedWorkspaceRef.current === null) {\n      lastAutosavedWorkspaceRef.current = workspaceSignature;\n      return;\n    }\n    if (lastAutosavedWorkspaceRef.current === workspaceSignature) return;\n    lastAutosavedWorkspaceRef.current = workspaceSignature;\n\n    if (!serverSession && !googleToken) return;\n'''
if old_block not in text:
    raise SystemExit('Could not find autosave block to protect')
text = text.replace(old_block, new_block, 1)

# 3) When an existing EC2 session is restored, load the current EC2 workspace
#    before the user starts editing. This prevents stale localStorage from hiding
#    the recovered CV/library workspace.
old_restore = '''    restoreServerSession().then(async (session) => {\n      setServerSession(session);\n      setServerRevision(session.currentRevision);\n      serverRevisionRef.current = session.currentRevision;\n      setSelectedRevision(session.currentRevision);\n      setServerHistory(await listServerBackups());\n      setCloudStatus("connected");\n    }).catch(() => undefined);\n'''
new_restore = '''    restoreServerSession().then(async (session) => {\n      setServerSession(session);\n      setServerRevision(session.currentRevision);\n      serverRevisionRef.current = session.currentRevision;\n      setSelectedRevision(session.currentRevision);\n      setServerHistory(await listServerBackups());\n\n      const backup = await loadServerBackup();\n      if (backup && !isEncryptedEnvelope(backup.payload)) {\n        const restored = backup.payload as BackupDocument;\n        if (restored.schema === 2 && isWorkspace(restored.workspace)) {\n          const document = activeDocument(restored.workspace);\n          setWorkspace(restored.workspace);\n          saveWorkspaceLocal(restored.workspace);\n          setCV({ ...seed, ...document.cv, projects: document.cv.projects ?? [], customSections: document.cv.customSections ?? [] });\n          setLang(document.settings.lang);\n          setTemplate(document.settings.template);\n          setPhotoOn(document.settings.photoOn);\n          lastAutosavedWorkspaceRef.current = JSON.stringify(restored.workspace);\n        }\n      }\n\n      setCloudStatus("connected");\n    }).catch(() => undefined);\n'''
if old_restore not in text:
    raise SystemExit('Could not find restored EC2 session block to hydrate')
text = text.replace(old_restore, new_restore, 1)

path.write_text(text, encoding='utf-8')
print('v1.5.7 fix applied: no phantom autosaves; restored EC2 session hydrates the recovered workspace first.')
