#!/usr/bin/env bash
set -Eeuo pipefail

BASE_URL="https://raw.githubusercontent.com/looplogic-dot-tech/codecafe-cv-studio/release/v1.6.2/scripts/deploy-v162-final-clean.sh"
TMP="/tmp/deploy-v162-final-clean-fixed.sh"

curl -fsSL "$BASE_URL" -o "$TMP"

python3 - "$TMP" <<'PY'
from pathlib import Path
import sys
p = Path(sys.argv[1])
s = p.read_text(encoding='utf-8')
old = 'sudo chmod 600 "$NEW_DB"\n'
new = '''# Match the live database ownership so the systemd service can open the new DB.\nOLD_OWNER="$(sudo stat -c '%U' "$OLD_DB")"\nOLD_GROUP="$(sudo stat -c '%G' "$OLD_DB")"\nOLD_MODE="$(sudo stat -c '%a' "$OLD_DB")"\nsudo chown "$OLD_OWNER:$OLD_GROUP" "$NEW_DB"\nsudo chmod "$OLD_MODE" "$NEW_DB"\n'''
if old not in s:
    raise SystemExit('permission-fix anchor not found')
s = s.replace(old, new, 1)
# Improve failure diagnostics before rollback if service cannot start.
old2 = 'sudo systemctl is-active --quiet "$SERVICE" || restore_old\ncurl -fsS http://127.0.0.1:5002/api/health >/dev/null || restore_old\n'
new2 = '''if ! sudo systemctl is-active --quiet "$SERVICE"; then\n  echo "Service failed to start; recent log:"\n  sudo journalctl -u "$SERVICE" -n 80 --no-pager || true\n  restore_old\nfi\nif ! curl -fsS http://127.0.0.1:5002/api/health >/dev/null; then\n  echo "Health check failed; recent log:"\n  sudo journalctl -u "$SERVICE" -n 80 --no-pager || true\n  restore_old\nfi\n'''
if old2 not in s:
    raise SystemExit('diagnostic-fix anchor not found')
s = s.replace(old2, new2, 1)
p.write_text(s, encoding='utf-8')
PY

chmod +x "$TMP"
exec bash "$TMP"
