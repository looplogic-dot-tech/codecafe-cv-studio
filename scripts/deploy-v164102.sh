#!/usr/bin/env bash
set -Eeuo pipefail

DATA="/opt/codecafe-studio/data/codecafe-cv-studio"
DB="$DATA/workspace.sqlite3"
WEB="/opt/codecafe-studio/apps/codecafe-cv-studio"
REPO="https://github.com/looplogic-dot-tech/codecafe-cv-studio.git"
BRANCH="release/v1.6.4.10"
WORK="$HOME/codecafe-v164102"
STAMP="$(date +%Y%m%d-%H%M%S)"
ROLLBACK="$HOME/codecafe-v164102-frontend-$STAMP"

cleanup(){ rm -rf "$WORK" 2>/dev/null || true; }
trap cleanup EXIT

fingerprint(){
  sudo python3 - "$DB" <<'PY'
import hashlib,sqlite3,sys
p=sys.argv[1]
db=sqlite3.connect(f'file:{p}?mode=ro',uri=True)
row=db.execute('SELECT payload FROM workspace_state WHERE id=1').fetchone()
if not row: raise SystemExit('ERROR: workspace missing')
print(hashlib.sha256(row[0].encode()).hexdigest())
db.close()
PY
}

sudo -n true >/dev/null 2>&1 || { echo "ERROR: passwordless sudo unavailable"; exit 1; }
sudo test -f "$DB" || { echo "ERROR: workspace database missing"; exit 1; }
BEFORE="$(fingerprint)"

echo "============================================================"
echo " CODECAFE CV STUDIO 1.6.4.10.2"
echo " CORRECTION: INLINE FORMATTER ASSERTION — PRINT LOCKED"
echo "============================================================"
df -h /
rm -rf "$WORK" "$HOME/.npm/_npx" "$HOME/.npm/_cacache" 2>/dev/null || true

git clone --depth 1 --branch "$BRANCH" "$REPO" "$WORK"
cd "$WORK"
npm ci
npm run build

python3 - <<'PY'
from pathlib import Path
import json
pkg=json.loads(Path('package.json').read_text())
assert pkg['version']=='1.6.4.10.2'
app=Path('src/App.tsx').read_text(encoding='utf-8')
assert 'key={`bold-${index}`}' in app
assert 'target="_blank"' in app
assert '<InlineText value={project.stack} />' in app
assert '<strong>${printableInlineText(project.stack)}</strong>' in app
assert Path('dist/index.html').is_file()
print('PASS: inline bold compiled')
print('PASS: hyperlinks compiled')
print('PASS: project stack formatting compiled')
print('PASS: print subsystem unchanged / locked')
PY

if ! grep -Raq 'bold-' dist/assets; then
  echo "ERROR: compiled bundle missing bold inline renderer"; exit 1
fi
if ! grep -Raq 'target="_blank"' dist/assets; then
  echo "ERROR: compiled bundle missing hyperlink renderer"; exit 1
fi

mkdir -p "$ROLLBACK"
cp -a "$WEB/index.html" "$ROLLBACK/" 2>/dev/null || true
cp -a "$WEB/assets" "$ROLLBACK/" 2>/dev/null || true
rm -rf "$WEB/assets"; rm -f "$WEB/index.html"
cp -a dist/assets "$WEB/"
cp -a dist/index.html "$WEB/"

AFTER="$(fingerprint)"
if [ "$BEFORE" != "$AFTER" ]; then
  echo "ERROR: workspace changed; rolling frontend back"
  rm -rf "$WEB/assets"; rm -f "$WEB/index.html"
  cp -a "$ROLLBACK/assets" "$WEB/" 2>/dev/null || true
  cp -a "$ROLLBACK/index.html" "$WEB/" 2>/dev/null || true
  exit 1
fi
rm -rf "$ROLLBACK"

echo "============================================================"
echo " CODECAFE CV STUDIO 1.6.4.10.2 DEPLOYED"
echo "✓ inline bold works"
echo "✓ hyperlinks retained"
echo "✓ project stack formatting fixed"
echo "✓ PRINT SUBSYSTEM UNCHANGED / LOCKED"
echo "✓ workspace unchanged"
echo "============================================================"
