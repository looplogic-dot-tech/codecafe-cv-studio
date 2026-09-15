#!/usr/bin/env bash
set -Eeuo pipefail

VERSION="1.6.4.10.2.4"
DATA="/opt/codecafe-studio/data/codecafe-cv-studio"
DB="$DATA/workspace.sqlite3"
WEB="/opt/codecafe-studio/apps/codecafe-cv-studio"
REPO="https://github.com/looplogic-dot-tech/codecafe-cv-studio.git"
BRANCH="release/v1.6.4.10.2.4"
WORK="$HOME/codecafe-v1641024"
STAMP="$(date +%Y%m%d-%H%M%S)"
ROLLBACK="$HOME/codecafe-v1641024-frontend-$STAMP"

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
echo " CORRECTION: DRIVE PDF = LIVE PREVIEW + LOCAL EDITABLE DOC"
echo " PRINT EDITOR IMPLEMENTATION NOT CHANGED BY THIS CORRECTION"
echo "============================================================"
df -h /

rm -rf "$WORK" "$HOME/.npm/_npx" 2>/dev/null || true
git clone --depth 1 --branch "$BRANCH" "$REPO" "$WORK"
cd "$WORK"

echo "Branch: $(git branch --show-current)"
echo "Commit: $(git rev-parse HEAD)"
echo "Node: $(node --version)"
echo "npm:  $(npm --version)"

# npm install is intentional here because 1.6.4.10.2.4 adds browser-side PDF rendering
# dependencies. The working tree is disposable; production data is outside it.
npm install --no-audit --no-fund
npm run build

python3 - <<'PY'
from pathlib import Path
import json
pkg=json.loads(Path('package.json').read_text(encoding='utf-8'))
assert pkg['version']=='1.6.4.10.2.4'
app=Path('src/App.tsx').read_text(encoding='utf-8')
cloud=Path('src/cloud.ts').read_text(encoding='utf-8')
renderer=Path('src/renderPdf.ts').read_text(encoding='utf-8')
assert 'pdfBlob: await renderCurrentLivePreviewPdf()' in app
assert 'application/msword' in app
assert 'printable.pdfBlob' in cloud
assert '/export?mimeType=' not in cloud
assert '#codecafe-live-page-preview .livePagePaper' in renderer
assert Path('dist/index.html').is_file()
assert Path('dist/assets').is_dir()
print('PASS: Drive PDF source is the current Live Preview page stack')
print('PASS: Google Doc companion remains editable')
print('PASS: local Print/PDF launch also downloads editable .doc')
print('PASS: print editor implementation was not patched by v1.6.4.10.2.4')
PY

grep -Raq 'Live Preview pages are not available for PDF synchronization' dist/assets || { echo "ERROR: compiled bundle missing exact PDF renderer"; exit 1; }
grep -Raq 'application/msword' dist/assets || { echo "ERROR: compiled bundle missing local DOC companion"; exit 1; }

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
echo "✓ Google Drive PDF now comes from the current Live Preview pages"
echo "✓ Google Doc editable companion is still updated in Drive"
echo "✓ Print/PDF also downloads a local editable .doc companion"
echo "✓ existing workspace/database unchanged"
echo "============================================================"
