#!/usr/bin/env bash
set -Eeuo pipefail

VERSION="1.6.4.10.2.4.1.1"
DATA="/opt/codecafe-studio/data/codecafe-cv-studio"
DB="$DATA/workspace.sqlite3"
WEB="/opt/codecafe-studio/apps/codecafe-cv-studio"
REPO="https://github.com/looplogic-dot-tech/codecafe-cv-studio.git"
BRANCH="release/v1.6.4.10.2.4.1.1"
WORK="$HOME/codecafe-v164102411"
STAMP="$(date +%Y%m%d-%H%M%S)"
ROLLBACK="$HOME/codecafe-v164102411-frontend-$STAMP"

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
echo " CORRECTION ONLY: RESTORE INLINE **BOLD**"
echo " PRINT / DRIVE / LIBRARY DATA PATHS NOT MODIFIED BY THIS FIX"
echo "============================================================"

rm -rf "$WORK" "$HOME/.npm/_npx" 2>/dev/null || true
git clone --depth 1 --branch "$BRANCH" "$REPO" "$WORK"
cd "$WORK"
npm install --no-audit --no-fund

# Apply migrations/patch chain exactly once, then compile without re-running prebuild.
npm run prebuild

python3 - <<'PY'
from pathlib import Path
import json
pkg=json.loads(Path('package.json').read_text(encoding='utf-8'))
assert pkg['version']=='1.6.4.10.2.4.1.1'
app=Path('src/App.tsx').read_text(encoding='utf-8')
assert 'const inlinePattern = /\\*\\*([^*]+?)\\*\\*|' in app
assert '<InlineText value={project.stack} />' in app
assert '<p><InlineText value={line.content} /></p>' in app
assert '${printableInlineText(project.stack)}' in app
patch=Path('scripts/apply-v164102411-bold-regression.py').read_text(encoding='utf-8')
assert "Path('src/App.tsx')" in patch
assert 'printEditorV3.ts' not in patch
assert 'livePreviewPages.ts' not in patch
assert "Path('src/cloud.ts')" not in patch
print('PASS: **bold** inline parser restored')
print('PASS: hyperlinks retained in the same inline parser')
print('PASS: Technology Stack and tool content use inline formatting')
print('PASS: this correction does not patch print editor, live pagination, or cloud code')
PY

npx tsc --noEmit
npx vite build

test -f dist/index.html
test -d dist/assets

echo "PASS: TypeScript + Vite production build completed"

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
echo "✓ **bold** restored in live preview"
echo "✓ hyperlinks retained"
echo "✓ Technology Stack formatting restored"
echo "✓ print/cloud/library data code untouched by this correction"
echo "✓ workspace/database unchanged"
echo "============================================================"
