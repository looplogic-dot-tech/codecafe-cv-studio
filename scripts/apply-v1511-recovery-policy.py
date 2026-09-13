#!/usr/bin/env python3
from pathlib import Path

path = Path('server/app.py')
text = path.read_text(encoding='utf-8')

if 'EC2_RECOVERY_SNAPSHOTS = 3' not in text:
    text = text.replace(
        'EC2_CV_LIMIT = 20\n',
        'EC2_CV_LIMIT = 20\nEC2_RECOVERY_SNAPSHOTS = 3\n',
        1,
    )

# After the v1.5.9 patch, future edits update the current workspace row in place.
# Keep only a few older rows as hidden emergency recovery points. They are not
# user-visible storage items and they do not count toward the 20-CV EC2 limit.
anchor = '''            database.execute(\n                """CREATE TABLE IF NOT EXISTS sessions (\n                    token_hash TEXT PRIMARY KEY,\n                    csrf TEXT NOT NULL,\n                    expires_at REAL NOT NULL\n                )"""\n            )\n'''
insert = anchor + '''            database.execute(\n                "DELETE FROM backups WHERE revision NOT IN "\n                "(SELECT revision FROM backups ORDER BY revision DESC LIMIT ?)",\n                (EC2_RECOVERY_SNAPSHOTS + 1,),\n            )\n'''
if anchor not in text:
    raise SystemExit('v1.5.11 recovery policy: initialize anchor not found')
text = text.replace(anchor, insert, 1)

path.write_text(text, encoding='utf-8')
print('v1.5.11 recovery policy applied: current EC2 workspace + at most 3 hidden recovery snapshots.')
