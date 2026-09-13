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

old_delete = '''            database.execute(\n                "DELETE FROM backups WHERE revision NOT IN "\n                "(SELECT revision FROM backups ORDER BY revision DESC LIMIT ?)",\n                (self.retention,),\n            )\n'''
if old_delete not in text:
    raise SystemExit('v1.5.9 server: revision-retention DELETE block not found')
text = text.replace(
    old_delete,
    '''            # Revision history is NOT the EC2 CV quota. Do not evict old\n            # revisions merely because newer edits exist. EC2 capacity is enforced\n            # by the number of CV documents in the workspace instead.\n''',
    1,
)

save_anchor = '''        if not is_plain_workspace and not is_legacy_encrypted:\n            raise RequestError("El respaldo no corresponde a CodeCafe CV Studio.")\n'''
capacity_check = save_anchor + '''        if payload.get("schema") == 2:\n            workspace = payload.get("workspace")\n            documents = workspace.get("documents") if isinstance(workspace, dict) else None\n            if not isinstance(documents, list):\n                raise RequestError("El workspace de CodeCafe no contiene una lista válida de CVs.")\n            if len(documents) > EC2_CV_LIMIT:\n                raise RequestError(\n                    f"EC2 admite un máximo de {EC2_CV_LIMIT} CVs. "\n                    "No se eliminó ningún CV; guarda el workspace completo en Google Drive.",\n                    HTTPStatus.CONFLICT,\n                    {\n                        "error": f"EC2 admite un máximo de {EC2_CV_LIMIT} CVs.",\n                        "cvLimit": EC2_CV_LIMIT,\n                        "cvCount": len(documents),\n                    },\n                )\n'''
if save_anchor not in text:
    raise SystemExit('v1.5.9 server: save validation anchor not found')
text = text.replace(save_anchor, capacity_check, 1)

old_main = '''    # Conserva hasta doscientas revisiones para que el autoguardado no desplace rápidamente copias útiles.\n    retention = max(2, min(int(os.environ.get("CODECAFE_CV_RETENTION", "200")), 200))\n    origin = os.environ.get("CODECAFE_CV_ORIGIN", "https://cv.codecafe.io")\n    server = AppServer((host, port), Store(data_dir, retention), password_hash, origin)\n'''
new_main = '''    # CODECAFE_CV_RETENTION remains accepted only for backwards-compatible\n    # configuration. It no longer limits revision history; the EC2 quota is\n    # EC2_CV_LIMIT CV documents in the workspace.\n    retention = int(os.environ.get("CODECAFE_CV_RETENTION", "200"))\n    origin = os.environ.get("CODECAFE_CV_ORIGIN", "https://cv.codecafe.io")\n    server = AppServer((host, port), Store(data_dir, retention), password_hash, origin)\n'''
if old_main not in text:
    raise SystemExit('v1.5.9 server: main retention block not found')
text = text.replace(old_main, new_main, 1)

path.write_text(text, encoding='utf-8')
print('v1.5.9 server policy applied: 20 CV EC2 quota; revision history no longer evicted by retention count.')
