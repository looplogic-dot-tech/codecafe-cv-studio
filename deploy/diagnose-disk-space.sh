#!/usr/bin/env bash

# Read-only disk report for Phase 0. This script does not delete, truncate,
# compress, move, or modify any CV Studio data.
set -euo pipefail

if [[ "${EUID}" -ne 0 ]]; then
    echo "Ejecuta este diagnóstico con sudo para medir todas las rutas." >&2
    exit 1
fi

echo "========== CODECAFE CV STUDIO - DISK REPORT =========="
echo
echo "Filesystem root:"
df -h /

echo
echo "Largest top-level directories under /opt/codecafe-studio:"
du -xhd1 /opt/codecafe-studio 2>/dev/null | sort -h | tail -n 20

echo
echo "CV Studio source components:"
for path in \
    /opt/codecafe-studio/apps/codecafe-cv-studio-source/node_modules \
    /opt/codecafe-studio/apps/codecafe-cv-studio-source/dist \
    /opt/codecafe-studio/apps/codecafe-cv-studio-source/.git \
    /opt/codecafe-studio/apps/codecafe-cv-studio \
    /opt/codecafe-studio/data/codecafe-cv-studio; do
    if [[ -e "${path}" ]]; then
        du -xsh "${path}" 2>/dev/null || true
    fi
done

echo
echo "Package-manager caches:"
du -sh /var/cache/apt 2>/dev/null || true
du -sh /root/.npm 2>/dev/null || true
du -sh /home/ubuntu/.npm 2>/dev/null || true

echo
echo "Journal usage:"
journalctl --disk-usage 2>/dev/null || true

echo
echo "Largest files in CV Studio paths (top 25):"
find /opt/codecafe-studio -xdev -type f -printf '%s %p\n' 2>/dev/null \
    | sort -n \
    | tail -n 25 \
    | awk '{ bytes=$1; $1=""; printf "%.1f MB%s\n", bytes/1048576, $0 }'

echo
echo "Old deployed index backups:"
find /opt/codecafe-studio/apps/codecafe-cv-studio -maxdepth 1 -type f \
    -name 'index.html.before-*' -printf '%TY-%Tm-%Td %TH:%TM  %s bytes  %p\n' 2>/dev/null \
    | sort || true

echo
echo "NOTE: this report is read-only. Do not delete anything based only on size;"
echo "we will classify safe/rebuildable files before cleanup."
echo "========================================================"
