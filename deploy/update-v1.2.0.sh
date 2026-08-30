#!/usr/bin/env bash

# Detiene la actualización ante el primer error, variable ausente o tubería fallida.
set -euo pipefail

# Declara únicamente las rutas exclusivas de CodeCafe CV Studio.
source_dir="/opt/codecafe-studio/apps/codecafe-cv-studio-source"
web_root="/opt/codecafe-studio/apps/codecafe-cv-studio"
server_program="${source_dir}/server/app.py"
previous_commit="c49bad77d059508f7bf9ddf51d279cdfc3aaebf3"

# Evita modificar archivos si el bloque no fue ejecutado mediante sudo.
if [[ "${EUID}" -ne 0 ]]; then
    echo "DETENIDO: ejecuta este actualizador con sudo." >&2
    exit 1
fi

# Confirma que la compilación v1.2.0 y el sitio funcional existen antes de copiar nada.
for required in \
    "${source_dir}/dist/index.html" \
    "${source_dir}/dist/assets" \
    "${source_dir}/package.json" \
    "${server_program}" \
    "${web_root}/index.html"; do
    if [[ ! -e "${required}" ]]; then
        echo "DETENIDO: falta el recurso esperado ${required}" >&2
        exit 1
    fi
done

# Comprueba que el repositorio seleccionado declara exactamente la versión esperada.
python3 -c 'import json; assert json.load(open("/opt/codecafe-studio/apps/codecafe-cv-studio-source/package.json"))["version"] == "1.2.0"'

# Recupera desde Git el programa Python de la versión funcional v1.1.0.
# Se conserva fuera del nombre activo para poder restaurarlo si el reinicio falla.
timestamp="$(date -u +%Y%m%d-%H%M%S)"
server_backup="${source_dir}/server/app.py.before-v1.2.0-${timestamp}"
git -C "${source_dir}" show "${previous_commit}:server/app.py" > "${server_backup}"
chmod 0644 "${server_backup}"

# Reinicia solamente CV Sync para cargar los endpoints nuevos de historial.
# No reinicia NGINX, Docker, Atlas ni ningún otro sitio.
systemctl restart codecafe-cv-sync.service

# Espera hasta cinco segundos para que el programa Python abra el puerto 5002.
health_response=""
for attempt in {1..20}; do
    if health_response="$(curl --fail --silent http://127.0.0.1:5002/api/health)"; then
        break
    fi
    sleep 0.25
done

# Restaura automáticamente el programa anterior si la API nueva no inicia.
if [[ "${health_response}" != *'"service":"CodeCafe CV Sync"'* ]]; then
    install -m 0644 -o root -g root "${server_backup}" "${server_program}"
    systemctl restart codecafe-cv-sync.service
    echo "DETENIDO: CV Sync no inició; el programa Python anterior fue restaurado." >&2
    exit 1
fi

# Crea un respaldo recuperable del HTML que actualmente mantiene el sitio funcionando.
index_backup="${web_root}/index.html.before-v1.2.0-${timestamp}"
cp --archive "${web_root}/index.html" "${index_backup}"

# Copia los nuevos archivos con nombres únicos sin borrar assets de versiones anteriores.
install -d -m 0755 -o root -g root "${web_root}/assets"
for asset in "${source_dir}"/dist/assets/*; do
    install -m 0644 -o root -g root "${asset}" "${web_root}/assets/$(basename "${asset}")"
done

# Prepara el HTML nuevo con un nombre temporal dentro del mismo sistema de archivos.
index_temporary="$(mktemp --tmpdir="${web_root}" .index-v1.2.0.XXXXXX)"
install -m 0644 -o root -g root "${source_dir}/dist/index.html" "${index_temporary}"

# Activa el HTML mediante un cambio atómico; una petición nunca verá un archivo incompleto.
mv --force "${index_temporary}" "${web_root}/index.html"

# Valida NGINX aunque esta actualización no modifica ninguno de sus archivos.
if ! nginx -t; then
    cp --archive "${index_backup}" "${web_root}/index.html"
    echo "DETENIDO: NGINX falló; el HTML anterior fue restaurado." >&2
    exit 1
fi

# Comprueba el HTML usando el Host correcto antes de probar la dirección pública.
if ! curl --fail --silent --show-error \
    --header "Host: cv.codecafe.io" \
    http://127.0.0.1/ \
    | grep --quiet --fixed-strings '<title>CodeCafe CV Studio</title>'; then
    cp --archive "${index_backup}" "${web_root}/index.html"
    echo "DETENIDO: la prueba local falló; el HTML anterior fue restaurado." >&2
    exit 1
fi

# Comprueba el sitio público con el certificado HTTPS actualmente instalado.
if ! curl --fail --silent --show-error \
    --resolve cv.codecafe.io:443:127.0.0.1 \
    https://cv.codecafe.io/ \
    | grep --quiet --fixed-strings '<title>CodeCafe CV Studio</title>'; then
    cp --archive "${index_backup}" "${web_root}/index.html"
    echo "DETENIDO: la prueba HTTPS falló; el HTML anterior fue restaurado." >&2
    exit 1
fi

# Confirma que NGINX continúa activo y que CV Sync terminó su reinicio controlado.
systemctl is-active nginx
systemctl is-active codecafe-cv-sync.service

# Imprime la ruta exacta que permite regresar manualmente al HTML anterior.
echo "CodeCafe CV Studio v1.2.0 activo. Respaldo HTML: ${index_backup}"
echo "Programa Python anterior: ${server_backup}"
