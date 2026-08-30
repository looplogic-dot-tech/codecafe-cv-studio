#!/usr/bin/env python3
"""Añade de forma segura un include al bloque HTTPS exclusivo de cv.codecafe.io."""

from __future__ import annotations

import os
import re
import shutil
import stat
import sys
import tempfile
from datetime import datetime, timezone
from pathlib import Path

INCLUDE_LINE = "    include /etc/nginx/snippets/cv-sync-api.conf;\n"


def server_blocks(text: str) -> list[tuple[int, int, str]]:
    """Localiza bloques server contando llaves; no interpreta otras configuraciones."""
    blocks: list[tuple[int, int, str]] = []
    for match in re.finditer(r"(?m)^\s*server\s*\{", text):
        depth = 0
        for position in range(match.start(), len(text)):
            if text[position] == "{":
                depth += 1
            elif text[position] == "}":
                depth -= 1
                if depth == 0:
                    blocks.append((match.start(), position + 1, text[match.start():position + 1]))
                    break
    return blocks


def add_include(text: str) -> str:
    """Devuelve la configuración actualizada o se detiene si el destino es ambiguo."""
    if INCLUDE_LINE.strip() in text:
        return text
    candidates = []
    for start, end, block in server_blocks(text):
        has_domain = re.search(r"(?m)^\s*server_name\s+[^;]*\bcv\.codecafe\.io\b[^;]*;", block)
        has_https = re.search(r"(?m)^\s*listen\s+[^;]*\b443\b[^;]*\bssl\b[^;]*;", block)
        if has_domain and has_https:
            candidates.append((start, end, block))
    if len(candidates) != 1:
        raise ValueError(f"se esperó un bloque HTTPS de cv.codecafe.io y se encontraron {len(candidates)}")
    start, _end, block = candidates[0]
    server_name = re.search(r"(?m)^\s*server_name\s+[^;]*;\s*$", block)
    if not server_name:
        raise ValueError("no se encontró server_name dentro del bloque HTTPS")
    insertion = start + server_name.end()
    return text[:insertion] + "\n" + INCLUDE_LINE + text[insertion:]


def main() -> None:
    if len(sys.argv) != 2:
        raise SystemExit("Uso: enable-nginx-api.py /etc/nginx/sites-available/cv.codecafe.io")
    path = Path(sys.argv[1])
    text = path.read_text(encoding="utf-8")
    if INCLUDE_LINE.strip() in text:
        print("NGINX ya contiene el include de CV Sync; no se modificó.")
        return
    try:
        updated = add_include(text)
    except ValueError as error:
        raise SystemExit(f"DETENIDO: {error}.") from error

    timestamp = datetime.now(timezone.utc).strftime("%Y%m%d-%H%M%S")
    backup = path.with_name(f"{path.name}.before-cv-sync-{timestamp}")
    shutil.copy2(path, backup)

    metadata = path.stat()
    with tempfile.NamedTemporaryFile("w", encoding="utf-8", dir=path.parent, delete=False) as temporary:
        temporary.write(updated)
        temporary_path = Path(temporary.name)
    os.chmod(temporary_path, stat.S_IMODE(metadata.st_mode))
    os.chown(temporary_path, metadata.st_uid, metadata.st_gid)
    os.replace(temporary_path, path)
    print(f"NGINX actualizado. Respaldo anterior: {backup}")
    print(backup)


if __name__ == "__main__":
    main()
