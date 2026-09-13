#!/usr/bin/env python3
from pathlib import Path

path = Path('src/App.tsx')
text = path.read_text(encoding='utf-8')
old = 'backupDigest(document)'
new = 'backupDigest(document.workspace)'
count = text.count(old)
if count != 2:
    raise SystemExit(f'Expected exactly 2 digest calls to patch, found {count}')
path.write_text(text.replace(old, new), encoding='utf-8')
print('v1.5.6 fix applied: EC2 revision digest now ignores savedAt timestamp and hashes workspace content only.')
