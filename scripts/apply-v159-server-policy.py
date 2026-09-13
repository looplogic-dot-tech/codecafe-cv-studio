#!/usr/bin/env python3
from pathlib import Path

path = Path('server/app.py')
text = path.read_text(encoding='utf-8')

if 'EC2_CV_LIMIT = 20' not in text:
    text = text.replace(
        'PASSWORD_ITERATIONS = 310_000\n',
        'PASSWORD_ITERATIONS = 310_000\nEC2_CV_LIMIT = 20\n',
        1,
    )

# EC2 is a current workspace store, not a version-per-edit archive. Existing old
# rows are left untouched for recovery, but future real edits update the newest
# row in place instead of inserting a new backup/revision each time.
old_save_tail = '''            cursor = database.execute(\n                "INSERT INTO backups(saved_at, digest, payload) VALUES (?, ?, ?)",\n                (now, digest, serialized),\n            )\n            revision = int(cursor.lastrowid)\n            database.execute(\n                "DELETE FROM backups WHERE revision NOT IN "\n                "(SELECT revision FROM backups ORDER BY revision DESC LIMIT ?)",\n                (self.retention,),\n            )\n            database.commit()\n        return {"revision": revision, "savedAt": now}, False\n'''
new_save_tail = '''            if current:\n                # If the user returns to content that exists in an older historical\n                # row, remove only that duplicate digest so the UNIQUE constraint\n                # cannot block updating the current snapshot.\n                database.execute(\n                    "DELETE FROM backups WHERE digest = ? AND revision <> ?",\n                    (digest, current_revision),\n                )\n                database.execute(\n                    "UPDATE backups SET saved_at = ?, digest = ?, payload = ? WHERE revision = ?",\n                    (now, digest, serialized, current_revision),\n                )\n                revision = current_revision\n            else:\n                cursor = database.execute(\n                    "INSERT INTO backups(saved_at, digest, payload) VALUES (?, ?, ?)",\n                    (now, digest, serialized),\n                )\n                revision = int(cursor.lastrowid)\n            database.commit()\n        return {"revision": revision, "savedAt": now}, False\n'''
if old_save_tail not in text:
    raise SystemExit('v1.5.9 server: original revision-insert/retention block not found')
text = text.replace(old_save_tail, new_save_tail, 1)

save_anchor = '''        if not is_plain_workspace and not is_legacy_encrypted:\n            raise RequestError("El respaldo no corresponde a CodeCafe CV Studio.")\n'''
capacity_check = save_anchor + '''        if payload.get("schema") == 2:\n            workspace = payload.get("workspace")\n            documents = workspace.get("documents") if isinstance(workspace, dict) else None\n            if not isinstance(documents, list):\n                raise RequestError("El workspace de CodeCafe no contiene una lista válida de CVs.")\n            if len(documents) > EC2_CV_LIMIT:\n                raise RequestError(\n                    f"EC2 admite un máximo de {EC2_CV_LIMIT} CVs. "\n                    "No se eliminó ningún CV; guarda el workspace completo en Google Drive.",\n                    HTTPStatus.CONFLICT,\n                    {\n                        "error": f"EC2 admite un máximo de {EC2_CV_LIMIT} CVs.",\n                        "cvLimit": EC2_CV_LIMIT,\n                        "cvCount": len(documents),\n                    },\n                )\n'''
if save_anchor not in text:
    raise SystemExit('v1.5.9 server: save validation anchor not found')
text = text.replace(save_anchor, capacity_check, 1)

old_main = '''    # Conserva hasta doscientas revisiones para que el autoguardado no desplace rápidamente copias útiles.\n    retention = max(2, min(int(os.environ.get("CODECAFE_CV_RETENTION", "200")), 200))\n    origin = os.environ.get("CODECAFE_CV_ORIGIN", "https://cv.codecafe.io")\n    server = AppServer((host, port), Store(data_dir, retention), password_hash, origin)\n'''
new_main = '''    # Kept only for backwards-compatible configuration. EC2 no longer creates\n    # one retained backup per edit; it stores one current workspace snapshot.\n    retention = int(os.environ.get("CODECAFE_CV_RETENTION", "200"))\n    origin = os.environ.get("CODECAFE_CV_ORIGIN", "https://cv.codecafe.io")\n    server = AppServer((host, port), Store(data_dir, retention), password_hash, origin)\n'''
if old_main not in text:
    raise SystemExit('v1.5.9 server: main retention block not found')
text = text.replace(old_main, new_main, 1)

path.write_text(text, encoding='utf-8')
print('v1.5.9 server policy applied: EC2 max 20 CVs; one current workspace snapshot; edits do not create backup rows.')
