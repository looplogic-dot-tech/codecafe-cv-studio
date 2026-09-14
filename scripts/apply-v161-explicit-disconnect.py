#!/usr/bin/env python3
from pathlib import Path

path = Path('src/App.tsx')
text = path.read_text(encoding='utf-8')

flag = 'codecafe-ec2-explicitly-disconnected'

# If the user explicitly disconnected EC2, do not silently restore the HttpOnly-cookie session on reload.
old = '''  useEffect(() => {\n    loadRuntimeCloudConfig().then(setCloudConfig);\n    setGoogleToken(loadStoredGoogleToken());\n    // La cookie HttpOnly permite reconectar sin volver a pedir la contraseña.\n    restoreServerSession().then(async (session) => {\n      setServerSession(session);\n      setServerRevision(session.currentRevision);\n      serverRevisionRef.current = session.currentRevision;\n      setSelectedRevision(session.currentRevision);\n      setServerHistory(await listServerBackups());\n      setCloudStatus("connected");\n    }).catch(() => undefined);\n  }, []);\n'''
new = f'''  useEffect(() => {{\n    loadRuntimeCloudConfig().then(setCloudConfig);\n    setGoogleToken(loadStoredGoogleToken());\n    // Explicit disconnect wins over any surviving HttpOnly cookie.\n    if (localStorage.getItem("{flag}") === "true") return;\n    restoreServerSession().then(async (session) => {{\n      setServerSession(session);\n      setServerRevision(session.currentRevision);\n      serverRevisionRef.current = session.currentRevision;\n      setSelectedRevision(session.currentRevision);\n      setServerHistory(await listServerBackups());\n      setCloudStatus("connected");\n    }}).catch(() => undefined);\n  }}, []);\n'''
if old not in text:
    raise SystemExit('explicit disconnect patch: restoreServerSession block not found')
text = text.replace(old, new, 1)

# A successful manual connection clears the explicit-disconnect preference.
old = '''      const session = await connectServer(syncPassword);\n      setServerSession(session);\n'''
new = f'''      const session = await connectServer(syncPassword);\n      localStorage.removeItem("{flag}");\n      setServerSession(session);\n'''
if old not in text:
    raise SystemExit('explicit disconnect patch: connectServer block not found')
text = text.replace(old, new, 1)

# Record user intent before attempting the server DELETE. Even if cookie invalidation fails,
# a reload must remain disconnected until the user explicitly reconnects.
old = '''  const disconnectEc2 = async () => {\n    if (serverSession) await disconnectServer(serverSession.csrfToken).catch(() => undefined);\n    setServerSession(null);\n'''
new = f'''  const disconnectEc2 = async () => {{\n    localStorage.setItem("{flag}", "true");\n    if (serverSession) await disconnectServer(serverSession.csrfToken).catch(() => undefined);\n    setServerSession(null);\n'''
if old not in text:
    raise SystemExit('explicit disconnect patch: disconnectEc2 block not found')
text = text.replace(old, new, 1)

path.write_text(text, encoding='utf-8')
print('v1.6.1 explicit disconnect applied: EC2 stays disconnected across reload until user reconnects.')
