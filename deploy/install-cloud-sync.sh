#!/usr/bin/env bash

# Detiene la instalación ante el primer error, variable ausente o tubería fallida.
set -euo pipefail

# Define exclusivamente las rutas nuevas de CodeCafe CV Studio.
source_dir="/opt/codecafe-studio/apps/codecafe-cv-studio-source"
web_root="/opt/codecafe-studio/apps/codecafe-cv-studio"
data_dir="/opt/codecafe-studio/data/codecafe-cv-studio"
nginx_site="/etc/nginx/sites-available/cv.codecafe.io"
environment_file="/etc/codecafe-cv-sync.env"
service_file="/etc/systemd/system/codecafe-cv-sync.service"
nginx_snippet="/etc/nginx/snippets/cv-sync-api.conf"

# Confirma que el script se ejecuta como root mediante sudo.
if [[ "${EUID}" -ne 0 ]]; then
    echo "DETENIDO: ejecuta este instalador con sudo." >&2
    exit 1
fi

# Confirma que se está trabajando sobre el repositorio y el sitio CV esperados.
for required in \
    "${source_dir}/server/app.py" \
    "${source_dir}/dist/index.html" \
    "${source_dir}/deploy/codecafe-cv-sync.service" \
    "${source_dir}/deploy/nginx-api-location.conf" \
    "${nginx_site}" \
    "${web_root}/index.html"; do
    if [[ ! -f "${required}" ]]; then
        echo "DETENIDO: falta el archivo esperado ${required}" >&2
        exit 1
    fi
done

# Crea un usuario de servicio sin contraseña ni posibilidad de iniciar sesión.
if ! id codecafe-cv >/dev/null 2>&1; then
    useradd --system --home-dir /nonexistent --shell /usr/sbin/nologin codecafe-cv
fi

# Crea solamente el directorio nuevo de datos y limita su acceso al servicio.
install -d -m 0700 -o codecafe-cv -g codecafe-cv "${data_dir}"

# Genera el hash de la contraseña sólo durante la primera instalación.
# La contraseña se captura sin mostrarla y nunca se escribe en el historial.
if [[ ! -f "${environment_file}" ]]; then
    password_hash="$(python3 "${source_dir}/server/app.py" --hash-password)"
    install -m 0600 -o root -g root /dev/null "${environment_file}"
    {
        echo "CODECAFE_CV_PASSWORD_HASH=${password_hash}"
        echo "CODECAFE_CV_DATA_DIR=${data_dir}"
        echo "CODECAFE_CV_HOST=127.0.0.1"
        echo "CODECAFE_CV_PORT=5002"
        echo "CODECAFE_CV_RETENTION=20"
        echo "CODECAFE_CV_ORIGIN=https://cv.codecafe.io"
    } > "${environment_file}"
    unset password_hash
fi

# Instala el servicio independiente de systemd y recarga su catálogo.
install -m 0644 -o root -g root "${source_dir}/deploy/codecafe-cv-sync.service" "${service_file}"
systemctl daemon-reload

# Inicia CV Sync. Esta acción no reinicia ni detiene NGINX, Atlas o Docker.
systemctl enable --now codecafe-cv-sync.service

# Espera brevemente a que systemd termine de iniciar Python antes de consultar la API.
# Este ciclo corrige la carrera observada en la instalación inicial sin ocultar fallos reales.
health_response=""
for attempt in {1..20}; do
    if health_response="$(curl --fail --silent http://127.0.0.1:5002/api/health)"; then
        break
    fi
    sleep 0.25
done

# Confirma que la API privada responde antes de conectarla con NGINX.
if [[ -z "${health_response}" ]]; then
    echo "DETENIDO: CodeCafe CV Sync no respondió después de cinco segundos." >&2
    systemctl status codecafe-cv-sync.service --no-pager >&2
    exit 1
fi
printf '%s\n' "${health_response}"
if [[ "${health_response}" != *'"service":"CodeCafe CV Sync"'* ]]; then
    echo "DETENIDO: el puerto 5002 no respondió como CodeCafe CV Sync." >&2
    exit 1
fi
echo

# Copia los recursos compilados nuevos sin borrar los recursos de v1.0.1.
install -d -m 0755 -o root -g root "${web_root}/assets"
for asset in "${source_dir}"/dist/assets/*; do
    install -m 0644 -o root -g root "${asset}" "${web_root}/assets/$(basename "${asset}")"
done

# Conserva el HTML funcional anterior antes de activar la compilación actual.
timestamp="$(date -u +%Y%m%d-%H%M%S)"
index_backup="${web_root}/index.html.before-v1.2.0-${timestamp}"
cp --archive "${web_root}/index.html" "${index_backup}"

# Sustituye únicamente index.html; los assets anteriores permanecen para rollback.
index_temporary="$(mktemp --tmpdir="${web_root}" .index-v1.2.0.XXXXXX)"
install -m 0644 -o root -g root "${source_dir}/dist/index.html" "${index_temporary}"
mv --force "${index_temporary}" "${web_root}/index.html"

# Instala un snippet nuevo; no reemplaza el archivo HTTPS administrado por Certbot.
install -m 0644 -o root -g root "${source_dir}/deploy/nginx-api-location.conf" "${nginx_snippet}"

# Añade el include solamente si encuentra exactamente un bloque HTTPS del dominio CV.
nginx_update_output="$(python3 "${source_dir}/deploy/enable-nginx-api.py" "${nginx_site}")"
echo "${nginx_update_output}"
nginx_backup="$(printf '%s\n' "${nginx_update_output}" | tail -n 1)"

# Valida toda la configuración antes de permitir una recarga de NGINX.
if ! nginx -t; then
    echo "La validación falló; se restaura automáticamente el archivo NGINX anterior." >&2
    if [[ -f "${nginx_backup}" ]]; then
        cp --archive "${nginx_backup}" "${nginx_site}"
    fi
    cp --archive "${index_backup}" "${web_root}/index.html"
    nginx -t
    exit 1
fi

# Recarga NGINX sin interrumpir las conexiones activas ni reiniciar otros servicios.
systemctl reload nginx

# Verifica la API a través del HTTPS público y el certificado actual.
if ! public_health="$(curl --fail --silent --show-error \
    --resolve cv.codecafe.io:443:127.0.0.1 \
    https://cv.codecafe.io/api/health)"; then
    echo "La verificación HTTPS falló; se restauran NGINX e index.html." >&2
    if [[ -f "${nginx_backup}" ]]; then
        cp --archive "${nginx_backup}" "${nginx_site}"
    fi
    cp --archive "${index_backup}" "${web_root}/index.html"
    nginx -t
    systemctl reload nginx
    exit 1
fi
printf '%s\n' "${public_health}"

# Muestra las comprobaciones finales y la ubicación del rollback del HTML.
systemctl is-active codecafe-cv-sync.service
systemctl is-active nginx
echo "CodeCafe CV Studio v1.2.0 instalado. Respaldo HTML: ${index_backup}"
