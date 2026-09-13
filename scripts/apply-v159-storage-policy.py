#!/usr/bin/env python3
from pathlib import Path

app_path = Path('src/App.tsx')
workspace_path = Path('src/workspace.ts')
library_path = Path('src/CVLibrary.tsx')

app = app_path.read_text(encoding='utf-8')
workspace = workspace_path.read_text(encoding='utf-8')
library = library_path.read_text(encoding='utf-8')

# ---------------------------------------------------------------------------
# workspace.ts: 20 is an EC2 storage limit, not a workspace/Drive limit.
# ---------------------------------------------------------------------------
workspace = workspace.replace('export const MAX_ACTIVE_CVS = 20;', 'export const EC2_MAX_CVS = 20;', 1)
workspace = workspace.replace(
    '    && candidate.documents.length <= MAX_ACTIVE_CVS\n',
    '',
    1,
)

# ---------------------------------------------------------------------------
# App.tsx: local/Google Drive may contain more than 20 CVs. EC2 refuses saves
# above 20 without deleting or truncating anything and Drive still syncs.
# ---------------------------------------------------------------------------
app = app.replace('  MAX_ACTIVE_CVS,\n', '  EC2_MAX_CVS,\n', 1)
app = app.replace('    if (workspace.documents.length >= MAX_ACTIVE_CVS) return;\n', '', 1)
app = app.replace(
    '    if (!draftName.trim() || workspace.documents.length >= MAX_ACTIVE_CVS) return;\n',
    '    if (!draftName.trim()) return;\n',
    1,
)
app = app.replace(
    '    if (!source || preserved.documents.length >= MAX_ACTIVE_CVS) return;\n',
    '    if (!source) return;\n',
    1,
)

# Autosave path after v1.5.8 patch.
old_auto_server = '''        if (serverSession) {\n          const digest = await backupDigest(protectedDocument.workspace);\n          const result = await saveServerBackup(protectedDocument, digest, serverRevisionRef.current, serverSession.csrfToken);\n          serverRevisionRef.current = result.revision;\n          setServerRevision(result.revision);\n          setSelectedRevision(result.revision);\n          setServerHistory(await listServerBackups());\n        }\n        if (googleToken) await saveGoogleBackup(googleToken, protectedDocument, googlePrintable());\n        setCloudStatus("synced");'''
new_auto_server = '''        const ec2OverLimit = protectedDocument.workspace.documents.length > EC2_MAX_CVS;\n        if (serverSession && !ec2OverLimit) {\n          const digest = await backupDigest(protectedDocument.workspace);\n          const result = await saveServerBackup(protectedDocument, digest, serverRevisionRef.current, serverSession.csrfToken);\n          serverRevisionRef.current = result.revision;\n          setServerRevision(result.revision);\n          setSelectedRevision(result.revision);\n          setServerHistory(await listServerBackups());\n        }\n        if (googleToken) await saveGoogleBackup(googleToken, protectedDocument, googlePrintable());\n        if (ec2OverLimit && serverSession) {\n          setCloudMessage(lang === "es"\n            ? `EC2 conserva un máximo de ${EC2_MAX_CVS} CVs. Google Drive sí recibió el workspace completo.`\n            : `EC2 stores at most ${EC2_MAX_CVS} CVs. Google Drive still received the complete workspace.`);\n          setCloudStatus(googleToken ? "synced" : "connected");\n        } else {\n          setCloudStatus("synced");\n        }'''
if old_auto_server not in app:
    raise SystemExit('v1.5.9: autosave EC2 block not found after v1.5.8 patch')
app = app.replace(old_auto_server, new_auto_server, 1)

# Explicit sync path after v1.5.8 patch.
old_sync = '''      const base = backupDocument();\n      const document = base.schema === 2 ? await preserveRemoteWorkspace(base) : base;\n      if (serverSession) {\n        const digest = await backupDigest(document.schema === 2 ? document.workspace : document);\n        await ec2SaveQueueRef.current;\n        const result = await saveServerBackup(document, digest, serverRevisionRef.current, serverSession.csrfToken);\n        serverRevisionRef.current = result.revision;\n        setServerRevision(result.revision);\n        setSelectedRevision(result.revision);\n        setServerHistory(await listServerBackups());\n      }\n      if (googleToken) await saveGoogleBackup(googleToken, document, googlePrintable());\n      setCloudStatus("synced");'''
new_sync = '''      const base = backupDocument();\n      const document = base.schema === 2 ? await preserveRemoteWorkspace(base) : base;\n      const ec2OverLimit = document.schema === 2 && document.workspace.documents.length > EC2_MAX_CVS;\n      if (serverSession && !ec2OverLimit) {\n        const digest = await backupDigest(document.schema === 2 ? document.workspace : document);\n        await ec2SaveQueueRef.current;\n        const result = await saveServerBackup(document, digest, serverRevisionRef.current, serverSession.csrfToken);\n        serverRevisionRef.current = result.revision;\n        setServerRevision(result.revision);\n        setSelectedRevision(result.revision);\n        setServerHistory(await listServerBackups());\n      }\n      if (googleToken) await saveGoogleBackup(googleToken, document, googlePrintable());\n      if (ec2OverLimit && serverSession) {\n        setCloudMessage(lang === "es"\n          ? `EC2 conserva un máximo de ${EC2_MAX_CVS} CVs. No se eliminó nada; Google Drive conserva el workspace completo.`\n          : `EC2 stores at most ${EC2_MAX_CVS} CVs. Nothing was deleted; Google Drive keeps the complete workspace.`);\n        setCloudStatus(googleToken ? "synced" : "connected");\n      } else {\n        setCloudStatus("synced");\n      }'''
if old_sync not in app:
    raise SystemExit('v1.5.9: syncCloud block not found after v1.5.8 patch')
app = app.replace(old_sync, new_sync, 1)

# ---------------------------------------------------------------------------
# CVLibrary.tsx: remove the global 20-CV creation lock. Explain that only EC2
# has the 20-CV cap; Drive follows the user's Google storage quota.
# ---------------------------------------------------------------------------
library = library.replace(
    'import { activeDocument, loadWorkspaceLocal, MAX_ACTIVE_CVS, newId, saveWorkspaceLocal } from "./workspace";',
    'import { activeDocument, EC2_MAX_CVS, loadWorkspaceLocal, newId, saveWorkspaceLocal } from "./workspace";',
    1,
)
library = library.replace(
    'limit: "Límite actual: 20 CVs en total, incluidos los archivados",',
    'limit: `EC2: máximo ${EC2_MAX_CVS} CVs. Google Drive: sin límite de CodeCafe; depende de tu espacio disponible.`,',
    1,
)
library = library.replace(
    'limit: "Current limit: 20 total CVs, including archived CVs",',
    'limit: `EC2: maximum ${EC2_MAX_CVS} CVs. Google Drive: no CodeCafe limit; your Drive quota applies.`,',
    1,
)
library = library.replace(
    '    if (!props.draftName.trim() || latest.documents.length >= MAX_ACTIVE_CVS) return;\n',
    '    if (!props.draftName.trim()) return;\n',
    1,
)
library = library.replace(' disabled={totalCount >= MAX_ACTIVE_CVS}', '', 3)

app_path.write_text(app, encoding='utf-8')
workspace_path.write_text(workspace, encoding='utf-8')
library_path.write_text(library, encoding='utf-8')

print('v1.5.9 storage policy applied: EC2 max 20 CVs; local/Google Drive unlimited by CodeCafe; no automatic deletion.')
