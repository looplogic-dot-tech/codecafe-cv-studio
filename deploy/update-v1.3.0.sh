#!/usr/bin/env bash

# Detiene el bloque si no puede localizar o ejecutar el actualizador validado.
set -euo pipefail

# Calcula la carpeta deploy sin depender del directorio desde el que se invoque.
script_dir="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"

# Ejecuta el actualizador aditivo que conserva su nombre histórico por compatibilidad.
# No borra assets, no modifica Atlas y reinicia únicamente CodeCafe CV Sync.
exec bash "${script_dir}/update-v1.2.0.sh"
