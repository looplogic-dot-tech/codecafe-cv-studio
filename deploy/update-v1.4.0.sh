#!/usr/bin/env bash

# Actualizador aditivo de CodeCafe CV Studio.
# Antes de cualquier activación ejecuta el gate de seguridad de Phase 0 para
# localizar la base real mediante CODECAFE_CV_DATA_DIR, validar SQLite y crear
# un respaldo consistente. Después reutiliza el rollback probado de v1.2.0.
set -euo pipefail

script_dir="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"

# El preflight no migra ni modifica el workspace; sólo valida y respalda datos.
bash "${script_dir}/preflight-data-safety.sh"

# Sólo si el preflight terminó correctamente continúa el despliegue existente.
exec bash "${script_dir}/update-v1.2.0.sh"
