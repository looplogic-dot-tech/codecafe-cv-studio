#!/usr/bin/env python3
from pathlib import Path

path = Path('server/app.py')
text = path.read_text(encoding='utf-8')

# EC2 is the current workspace store. Historical recovery is handled outside
# the live database by one scheduled daily SQLite safety copy, so the live
# database must contain only the current workspace row.
if 'EC2_RECOVERY_SNAPSHOTS = 0' not in text:
    if 'EC2_RECOVERY_SNAPSHOTS = 3' in text:
        text = text.replace('EC2_RECOVERY_SNAPSHOTS = 3', 'EC2_RECOVERY_SNAPSHOTS = 0', 1)
    else:
        text = text.replace(
            'EC2_CV_LIMIT = 20\n',
            'EC2_CV_LIMIT = 20\nEC2_RECOVERY_SNAPSHOTS = 0\n',
            1,
        )

anchor = '''            database.execute(\n                """CREATE TABLE IF NOT EXISTS sessions (\n                    token_hash TEXT PRIMARY KEY,\n                    csrf TEXT NOT NULL,\n                    expires_at REAL NOT NULL\n                )"""\n            )\n'''
insert = anchor + '''            # The live EC2 database is not a revision archive. Keep only the\n            # newest/current workspace row. Daily recovery copies are separate\n            # SQLite files created by the EC2 maintenance timer.\n            database.execute(\n                "DELETE FROM backups WHERE revision NOT IN "\n                "(SELECT revision FROM backups ORDER BY revision DESC LIMIT 1)"\n            )\n'''
if anchor not in text:
    raise SystemExit('v1.6.1 recovery policy: initialize anchor not found')
text = text.replace(anchor, insert, 1)

path.write_text(text, encoding='utf-8')
print('v1.6.1 recovery policy applied: one live EC2 workspace row; daily recovery is external to the live database.')
