#!/usr/bin/env bash

# Detiene la configuración ante el primer error o variable ausente.
set -euo pipefail

# Limita el cambio al archivo público de configuración del sitio CV.
web_root="/opt/codecafe-studio/apps/codecafe-cv-studio"
config_file="${web_root}/cloud-config.json"

# Exige sudo porque el sitio publicado pertenece a root.
if [[ "${EUID}" -ne 0 ]]; then
    echo "DETENIDO: ejecuta este configurador con sudo." >&2
    exit 1
fi

# Confirma que se trata del directorio funcional de CodeCafe CV Studio.
if [[ ! -f "${web_root}/index.html" ]]; then
    echo "DETENIDO: no se encontró ${web_root}/index.html" >&2
    exit 1
fi

# Solicita únicamente el Client ID público; nunca solicita un Client Secret.
read -r -p "Google OAuth Client ID público: " google_client_id

# Valida el formato básico antes de escribir el archivo de configuración.
if [[ ! "${google_client_id}" =~ ^[0-9]+-[A-Za-z0-9_-]+\.apps\.googleusercontent\.com$ ]]; then
    echo "DETENIDO: el Client ID no tiene el formato esperado de Google." >&2
    exit 1
fi

# Conserva la configuración previa si ya existe para permitir rollback.
if [[ -f "${config_file}" ]]; then
    timestamp="$(date -u +%Y%m%d-%H%M%S)"
    cp --archive "${config_file}" "${config_file}.before-${timestamp}"
fi

# Escribe JSON válido con permisos de lectura pública; el Client ID no es secreto.
printf '{\n  "googleClientId": "%s"\n}\n' "${google_client_id}" \
    | install -m 0644 -o root -g root /dev/stdin "${config_file}"

# Comprueba con Python que el archivo resultante sea JSON válido y contenga el ID.
python3 -c 'import json; value=json.load(open("/opt/codecafe-studio/apps/codecafe-cv-studio/cloud-config.json")); assert value["googleClientId"].endswith(".apps.googleusercontent.com")'

# Verifica que NGINX pueda entregar la configuración solamente para cv.codecafe.io.
curl --fail --silent --show-error \
    --header "Host: cv.codecafe.io" \
    http://127.0.0.1/cloud-config.json

# Confirma el resultado sin revelar ninguna contraseña o Client Secret.
echo "Google Drive quedó habilitado para CodeCafe CV Studio. Recarga la página."
