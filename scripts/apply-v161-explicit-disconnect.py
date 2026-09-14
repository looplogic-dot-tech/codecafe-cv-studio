#!/usr/bin/env python3
from pathlib import Path
import re

path = Path('src/App.tsx')
text = path.read_text(encoding='utf-8')

flag = 'codecafe-ec2-explicitly-disconnected'

# After the storage-UI cleanup, the restore block no longer contains the old
# revision/history state updates. Patch only the stable beginning of the effect
# so this remains compatible with both the old and cleaned-up App.tsx.
needle = '''  useEffect(() => {\n    loadRuntimeCloudConfig().then(setCloudConfig);\n    setGoogleToken(loadStoredGoogleToken());\n'''
replacement = f'''  useEffect(() => {{\n    loadRuntimeCloudConfig().then(setCloudConfig);\n    setGoogleToken(loadStoredGoogleToken());\n    // Explicit disconnect wins over any surviving HttpOnly cookie.\n    if (localStorage.getItem("{flag}") === "true") return;\n'''

if f'localStorage.getItem("{flag}") === "true"' not in text:
    if needle not in text:
        raise SystemExit('explicit disconnect patch: startup cloud effect not found')
    text = text.replace(needle, replacement, 1)

# A successful manual connection clears the explicit-disconnect preference.
connect_pattern = re.compile(
    r'(\s*const session = await connectServer\(syncPassword\);\n)(\s*setServerSession\(session\);)'
)
if f'localStorage.removeItem("{flag}")' not in text:
    match = connect_pattern.search(text)
    if not match:
        raise SystemExit('explicit disconnect patch: connectServer block not found')
    indent = re.match(r'\s*', match.group(2)).group(0)
    text = connect_pattern.sub(
        lambda m: m.group(1) + indent + f'localStorage.removeItem("{flag}");\n' + m.group(2),
        text,
        count=1,
    )

# Record user intent before attempting server-side logout. Even if cookie
# invalidation fails, reload must remain disconnected until a manual reconnect.
if f'localStorage.setItem("{flag}", "true")' not in text:
    marker = '  const disconnectEc2 = async () => {\n'
    if marker not in text:
        raise SystemExit('explicit disconnect patch: disconnectEc2 block not found')
    text = text.replace(
        marker,
        marker + f'    localStorage.setItem("{flag}", "true");\n',
        1,
    )

path.write_text(text, encoding='utf-8')
print('v1.6.1 explicit disconnect applied: EC2 stays disconnected across reload until user reconnects.')
