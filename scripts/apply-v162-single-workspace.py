#!/usr/bin/env python3
from pathlib import Path
import re

server = Path('server/app.py')
server_text = server.read_text(encoding='utf-8')
if re.search(r'revision|revisi[oó]n', server_text, flags=re.I):
    raise SystemExit('v1.6.2: old storage-history terminology remains in server/app.py')
if 'workspace.sqlite3' not in server_text or '/api/workspace' not in server_text:
    raise SystemExit('v1.6.2: singleton backend is not present')

cloud = Path('src/cloud.ts')
text = cloud.read_text(encoding='utf-8')

type_start = text.find('export type ServerSession = {')
type_end = text.find('export type RuntimeCloudConfig = {', type_start)
if type_start == -1 or type_end == -1:
    raise SystemExit('v1.6.2: cloud server type block not found')
text = text[:type_start] + '''export type ServerSession = {\n  csrfToken: string;\n  encryptionSalt: string;\n  currentDigest: string;\n};\n\nexport type ServerWorkspace = {\n  savedAt: string;\n  digest: string;\n  payload: unknown;\n} | null;\n\n''' + text[type_end:]

api_start = text.find('export async function connectServer(password: string)')
api_end = text.find('export async function loadRuntimeCloudConfig()', api_start)
if api_start == -1 or api_end == -1:
    raise SystemExit('v1.6.2: cloud server API block not found')
text = text[:api_start] + '''export async function connectServer(password: string): Promise<ServerSession> {\n  return api<ServerSession>("/api/session", {\n    method: "POST",\n    body: JSON.stringify({ password }),\n  });\n}\n\nexport async function restoreServerSession(): Promise<ServerSession> {\n  return api<ServerSession>("/api/session");\n}\n\nexport async function disconnectServer(csrfToken: string): Promise<void> {\n  await api("/api/session", { method: "DELETE", headers: { "X-CSRF-Token": csrfToken } });\n}\n\nexport async function loadServerBackup(): Promise<ServerWorkspace> {\n  const result = await api<{ workspace: ServerWorkspace }>("/api/workspace");\n  return result.workspace;\n}\n\nexport async function saveServerBackup(\n  payload: unknown,\n  digest: string,\n  baseDigest: string,\n  csrfToken: string,\n): Promise<{ digest: string; savedAt: string; unchanged: boolean }> {\n  return api("/api/workspace", {\n    method: "POST",\n    headers: { "X-CSRF-Token": csrfToken },\n    body: JSON.stringify({ payload, digest, baseDigest }),\n  });\n}\n\n''' + text[api_end:]

if re.search(r'revision|revisi[oó]n', text, flags=re.I):
    raise SystemExit('v1.6.2: old storage-history terminology remains in src/cloud.ts')
cloud.write_text(text, encoding='utf-8')

app = Path('src/App.tsx')
text = app.read_text(encoding='utf-8')

# Older compatibility transforms may already have removed these imports/state values.
for name in ('listServerBackups', 'loadServerBackupRevision', 'ServerBackupRevision'):
    text = re.sub(rf'^\s*{name},\n', '', text, flags=re.M)

for old, new in (
    ('serverRevisionRef', 'serverDigestRef'),
    ('serverRevision', 'serverDigest'),
    ('setServerRevision', 'setServerDigest'),
    ('currentRevision', 'currentDigest'),
    ('result.revision', 'result.digest'),
    ('backup.revision', 'backup.digest'),
    ('selectedRevision', 'selectedCopy'),
    ('setSelectedRevision', 'setSelectedCopy'),
    ('loadRevision', 'loadCopy'),
):
    text = text.replace(old, new)

text = text.replace('const [serverDigest, setServerDigest] = useState(0);', 'const [serverDigest, setServerDigest] = useState("");')
text = text.replace('const serverDigestRef = useRef(0);', 'const serverDigestRef = useRef("");')
text = text.replace('setServerDigest(0);', 'setServerDigest("");')
text = text.replace('serverDigestRef.current = 0;', 'serverDigestRef.current = "";')

# Any surviving copy/history UI from old source is removed by the prior compatibility patches.
# Here we only retire the old vocabulary from deployable source.
text = re.sub(r'revisi[oó]n(?:es)?', 'copia', text, flags=re.I)
text = re.sub(r'revisions?', 'copy', text, flags=re.I)

if re.search(r'revision|revisi[oó]n', text, flags=re.I):
    raise SystemExit('v1.6.2: old storage-history terminology remains in src/App.tsx')
app.write_text(text, encoding='utf-8')

print('v1.6.2 applied: singleton EC2 workspace protocol with digest conflict protection; existing CV Studio features retained.')
