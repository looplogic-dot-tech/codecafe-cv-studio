#!/usr/bin/env bash

# Detiene la actualización ante el primer error, variable ausente o tubería fallida.
set -euo pipefail

# Declara únicamente las rutas exclusivas de CodeCafe CV Studio.
source_dir="/opt/codecafe-studio/apps/codecafe-cv-studio-source"
web_root="/opt/codecafe-studio/apps/codecafe-cv-studio"

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
    "${web_root}/index.html"; do
    if [[ ! -e "${required}" ]]; then
        echo "DETENIDO: falta el recurso esperado ${required}" >&2
        exit 1
    fi
done

# Comprueba que el repositorio seleccionado declara exactamente la versión esperada.
python3 -c 'import json; assert json.load(open("/opt/codecafe-studio/apps/codecafe-cv-studio-source/package.json"))["version"] == "1.2.0"'

# Crea un respaldo recuperable del HTML que actualmente mantiene el sitio funcionando.
timestamp="$(date -u +%Y%m%d-%H%M%S)"
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

# Confirma que tanto NGINX como la sincronización siguen activos sin reiniciarlos.
systemctl is-active nginx
systemctl is-active codecafe-cv-sync.service

# Imprime la ruta exacta que permite regresar manualmente al HTML anterior.
echo "CodeCafe CV Studio v1.2.0 activo. Respaldo anterior: ${index_backup}"
