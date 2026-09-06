#!/usr/bin/env bash

# Phase 0 safety gate for CodeCafe CV Studio.
# This script never migrates or rewrites workspace data. It only discovers the
# real CV Sync data directory, validates the SQLite revision store, and creates
# a consistent pre-deploy backup that can be used for rollback.
set -euo pipefail

environment_file="/etc/codecafe-cv-sync.env"
minimum_free_kb="${CODECAFE_CV_MIN_FREE_KB:-524288}"

if [[ "${EUID}" -ne 0 ]]; then
    echo "DETENIDO: ejecuta la comprobación de seguridad con sudo." >&2
    exit 1
fi

if [[ ! -f "${environment_file}" ]]; then
    echo "DETENIDO: no existe ${environment_file}; no es seguro adivinar dónde viven los datos." >&2
    exit 1
fi

# Lee únicamente CODECAFE_CV_DATA_DIR del archivo de entorno. No ejecuta el
# contenido completo del archivo, evitando efectos laterales inesperados.
data_dir="$(python3 - "${environment_file}" <<'PY'
import pathlib
import sys

path = pathlib.Path(sys.argv[1])
for raw in path.read_text(encoding="utf-8").splitlines():
    line = raw.strip()
    if not line or line.startswith("#") or "=" not in line:
        continue
    key, value = line.split("=", 1)
    if key.strip() == "CODECAFE_CV_DATA_DIR":
        value = value.strip().strip('"').strip("'")
        if value:
            print(value)
            raise SystemExit(0)
raise SystemExit(2)
PY
)" || {
    echo "DETENIDO: CODECAFE_CV_DATA_DIR no está definido en ${environment_file}." >&2
    exit 1
}

database_path="${data_dir}/backups.sqlite3"
backup_dir="${data_dir}/deployment-backups"
timestamp="$(date -u +%Y%m%d-%H%M%S)"
backup_path="${backup_dir}/backups-predeploy-${timestamp}.sqlite3"

if [[ ! -f "${database_path}" ]]; then
    echo "DETENIDO: la base real de CV Sync no existe en ${database_path}." >&2
    exit 1
fi

# Con poco espacio libre una copia de seguridad o una compilación puede dejar
# el sistema de archivos lleno. Se detiene antes de escribir cualquier backup.
available_kb="$(df --output=avail -k "${data_dir}" | tail -n 1 | tr -d ' ')"
if [[ -z "${available_kb}" || "${available_kb}" -lt "${minimum_free_kb}" ]]; then
    echo "DETENIDO: sólo hay ${available_kb:-0} KB libres; se requieren al menos ${minimum_free_kb} KB." >&2
    echo "No se creó ni modificó ningún respaldo." >&2
    exit 1
fi

install -d -m 0700 "${backup_dir}"

# SQLite quick_check valida la base activa. La API backup() crea una copia
# consistente incluso si la base usa WAL y el servicio está funcionando.
DATABASE_SOURCE="${database_path}" DATABASE_DESTINATION="${backup_path}" python3 - <<'PY'
import os
import sqlite3

source_path = os.environ["DATABASE_SOURCE"]
destination_path = os.environ["DATABASE_DESTINATION"]

with sqlite3.connect(source_path) as source:
    result = source.execute("PRAGMA quick_check").fetchone()
    if not result or result[0] != "ok":
        raise SystemExit(f"SQLite quick_check falló en la base activa: {result}")
    latest = source.execute(
        "SELECT revision, saved_at FROM backups ORDER BY revision DESC LIMIT 1"
    ).fetchone()
    with sqlite3.connect(destination_path) as destination:
        source.backup(destination)

with sqlite3.connect(destination_path) as backup:
    result = backup.execute("PRAGMA quick_check").fetchone()
    if not result or result[0] != "ok":
        raise SystemExit(f"SQLite quick_check falló en la copia: {result}")
    copied_latest = backup.execute(
        "SELECT revision, saved_at FROM backups ORDER BY revision DESC LIMIT 1"
    ).fetchone()

if latest != copied_latest:
    raise SystemExit(
        f"La copia no conserva la revisión más reciente: activa={latest!r}, copia={copied_latest!r}"
    )

print(f"SQLite activo: OK; última revisión: {latest!r}")
print(f"SQLite respaldo: OK; última revisión: {copied_latest!r}")
PY

chmod 0600 "${backup_path}"

echo "CODECAFE_CV_DATA_DIR=${data_dir}"
echo "Base activa verificada: ${database_path}"
echo "Respaldo pre-deploy verificado: ${backup_path}"
echo "Espacio libre después del respaldo:"
df -h "${data_dir}"
