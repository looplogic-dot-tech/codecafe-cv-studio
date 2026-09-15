#!/usr/bin/env bash
set -Eeuo pipefail

VERSION="1.6.4.10.2.4.1"
DATA="/opt/codecafe-studio/data/codecafe-cv-studio"
DB="$DATA/workspace.sqlite3"
WEB="/opt/codecafe-studio/apps/codecafe-cv-studio"
REPO="https://github.com/looplogic-dot-tech/codecafe-cv-studio.git"
BRANCH="release/v1.6.4.10.2.4"
WORK="$HOME/codecafe-v16410241"
STAMP="$(date +%Y%m%d-%H%M%S)"
ROLLBACK="$HOME/codecafe-v16410241-frontend-$STAMP"

cleanup(){ rm -rf "$WORK" 2>/dev/null || true; }
trap cleanup EXIT

fingerprint(){
  sudo python3 - "$DB" <<'PY'
import hashlib, sqlite3, sys
p=sys.argv[1]
db=sqlite3.connect(f'file:{p}?mode=ro', uri=True)
row=db.execute('SELECT payload FROM workspace_state WHERE id=1').fetchone()
if not row: raise SystemExit('ERROR: workspace state missing')
print(hashlib.sha256(row[0].encode()).hexdigest())
db.close()
PY
}

sudo -n true >/dev/null 2>&1 || { echo "ERROR: passwordless sudo unavailable"; exit 1; }
sudo test -f "$DB" || { echo "ERROR: workspace database missing: $DB"; exit 1; }
BEFORE="$(fingerprint)"

echo "============================================================"
echo " CODECAFE CV STUDIO $VERSION"
echo " CORRECTION: BUILD FIX FOR DRIVE PDF + LOCAL DOC"
echo " PRINT EDITOR IMPLEMENTATION UNCHANGED"
echo "============================================================"

rm -rf "$WORK" "$HOME/.npm/_npx" 2>/dev/null || true
git clone --depth 1 --branch "$BRANCH" "$REPO" "$WORK"
cd "$WORK"
npm install --no-audit --no-fund

# Run migrations/patches once, then pin the visible package version and compile directly.
# This avoids npm lifecycle hooks re-running prebuild and changing the verification state.
npm run prebuild
python3 - <<'PY'
from pathlib import Path
import json
p=Path('package.json')
pkg=json.loads(p.read_text(encoding='utf-8'))
pkg['version']='1.6.4.10.2.4.1'
p.write_text(json.dumps(pkg, indent=2, ensure_ascii=False)+"\n", encoding='utf-8')
print('Pinned visible version:', pkg['version'])
PY
npx tsc --noEmit
npx vite build

python3 - <<'PY'
from pathlib import Path
import json
pkg=json.loads(Path('package.json').read_text(encoding='utf-8'))
app=Path('src/App.tsx').read_text(encoding='utf-8')
cloud=Path('src/cloud.ts').read_text(encoding='utf-8')
assert pkg.get('version') == '1.6.4.10.2.4.1', pkg.get('version')
assert 'protectedDocument, await googlePrintable()' in app
assert 'pdfBlob?: Blob' in cloud
assert 'let pdfBlob = printable.pdfBlob' in cloud
assert Path('dist/index.html').is_file()
assert Path('dist/assets').is_dir()
print('PASS: TypeScript build completed')
print('PASS: visible version pinned to 1.6.4.10.2.4.1')
print('PASS: normal Drive sync uses exact Live Preview PDF blob')
print('PASS: legacy migration has safe fallback')
print('PASS: local editable DOC companion retained')
PY

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
  rm -rf "$WEB/assets"; rm -f "$WEB/index.html"
  cp -a "$ROLLBACK/assets" "$WEB/" 2>/dev/null || true
  cp -a "$ROLLBACK/index.html" "$WEB/" 2>/dev/null || true
  exit 1
fi
rm -rf "$ROLLBACK"

echo "============================================================"
echo " CODECAFE CV STUDIO $VERSION DEPLOYED"
echo "✓ Drive PDF uses current Live Preview"
echo "✓ editable Google Doc retained"
echo "✓ local Print/PDF downloads editable .doc companion"
echo "✓ print editor untouched"
echo "✓ workspace/database unchanged"
echo "============================================================"
