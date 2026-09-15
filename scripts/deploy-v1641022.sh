#!/usr/bin/env bash
set -Eeuo pipefail

VERSION="1.6.4.10.2.2"
DATA="/opt/codecafe-studio/data/codecafe-cv-studio"
DB="$DATA/workspace.sqlite3"
WEB="/opt/codecafe-studio/apps/codecafe-cv-studio"
REPO="https://github.com/looplogic-dot-tech/codecafe-cv-studio.git"
BRANCH="release/v1.6.4.10.2.2"
WORK="$HOME/codecafe-v1641022"
STAMP="$(date +%Y%m%d-%H%M%S)"
ROLLBACK="$HOME/codecafe-v1641022-frontend-$STAMP"

cleanup(){ rm -rf "$WORK" 2>/dev/null || true; }
trap cleanup EXIT

fingerprint(){
  sudo python3 - "$DB" <<'PY'
import hashlib, sqlite3, sys
p=sys.argv[1]
db=sqlite3.connect(f'file:{p}?mode=ro', uri=True)
row=db.execute('SELECT payload FROM workspace_state WHERE id=1').fetchone()
if not row:
    raise SystemExit('ERROR: workspace state missing')
print(hashlib.sha256(row[0].encode()).hexdigest())
db.close()
PY
}

sudo -n true >/dev/null 2>&1 || { echo "ERROR: passwordless sudo unavailable"; exit 1; }
sudo test -f "$DB" || { echo "ERROR: workspace database missing: $DB"; exit 1; }
BEFORE="$(fingerprint)"

echo "============================================================"
echo " CODECAFE CV STUDIO $VERSION"
echo " RECOVERY: 1.6.4.10.2 BASE + DRIVE + PRINT WINDOW + VERSION"
echo "============================================================"
df -h /

rm -rf "$WORK" "$HOME/.npm/_npx" 2>/dev/null || true
git clone --depth 1 --branch "$BRANCH" "$REPO" "$WORK"
cd "$WORK"

echo "Branch: $(git branch --show-current)"
echo "Commit: $(git rev-parse HEAD)"
echo "Node: $(node --version)"
echo "npm:  $(npm --version)"

npm ci
npm run build

python3 - <<'PY'
from pathlib import Path
import json
pkg=json.loads(Path('package.json').read_text(encoding='utf-8'))
assert pkg['version']=='1.6.4.10.2.2'
app=Path('src/App.tsx').read_text(encoding='utf-8')
cloud=Path('src/cloud.ts').read_text(encoding='utf-8')
pe=Path('src/printEditorV3.ts').read_text(encoding='utf-8')
assert 'v1.6.4.10.2.2' in app
assert 'codecafe-print-editor-launcher' in app
assert '<button className="primary" onClick={() => window.print()}>{t.pdf}</button>' not in app
assert 'if (stale && !window.google?.accounts.oauth2) stale.remove();' in cloud
assert 'codecafeExactPrintPage' in pe
assert 'sourceWraps.forEach' in pe
assert 'break-before:page!important' in pe
handler=pe[pe.find('print.onclick'):pe.find('actions.append(reset, print);')]
assert 'break-after:page!important' not in handler
assert Path('dist/index.html').is_file()
assert Path('dist/assets').is_dir()
print('PASS: visible version marker compiled from source')
print('PASS: top Print/PDF opens Print Editor')
print('PASS: exact Live Preview -> PDF page mapping retained')
print('PASS: Google Drive stale-GIS reconnect recovery present')
PY

# Verify the production JS actually contains the markers before replacing anything.
grep -Raq '1.6.4.10.2.2' dist/assets || { echo "ERROR: compiled bundle missing visible version"; exit 1; }
grep -Raq 'codecafeExactPrintPage' dist/assets || { echo "ERROR: compiled bundle missing stable print mapping"; exit 1; }
grep -Raq 'Google Identity Services tard' dist/assets || { echo "ERROR: compiled bundle missing Drive recovery"; exit 1; }

mkdir -p "$ROLLBACK"
cp -a "$WEB/index.html" "$ROLLBACK/" 2>/dev/null || true
cp -a "$WEB/assets" "$ROLLBACK/" 2>/dev/null || true

rm -rf "$WEB/assets"
rm -f "$WEB/index.html"
cp -a dist/assets "$WEB/"
cp -a dist/index.html "$WEB/"

AFTER="$(fingerprint)"
if [ "$BEFORE" != "$AFTER" ]; then
  echo "ERROR: workspace changed. Rolling frontend back immediately."
  rm -rf "$WEB/assets"
  rm -f "$WEB/index.html"
  cp -a "$ROLLBACK/assets" "$WEB/" 2>/dev/null || true
  cp -a "$ROLLBACK/index.html" "$WEB/" 2>/dev/null || true
  exit 1
fi

rm -rf "$ROLLBACK"

echo "============================================================"
echo " CODECAFE CV STUDIO $VERSION DEPLOYED"
echo "✓ visible version shown in CV Studio"
echo "✓ Google Drive Connect/reauthorize recovery restored"
echo "✓ main Print/PDF button opens the Print Editor"
echo "✓ known exact Live Preview -> PDF mapping retained"
echo "✓ current CV workspace/database unchanged"
echo "============================================================"
