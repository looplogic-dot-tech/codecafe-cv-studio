#!/usr/bin/env bash

# La mejora es exclusivamente de interfaz y datos opcionales del CV.
# Reutiliza el actualizador aditivo y su rollback probado; no toca otras aplicaciones.
set -euo pipefail

script_dir="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
exec bash "${script_dir}/update-v1.2.0.sh"
