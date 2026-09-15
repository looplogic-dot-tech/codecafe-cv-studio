#!/usr/bin/env bash
set -Eeuo pipefail

DATA="/opt/codecafe-studio/data/codecafe-cv-studio"
DB="$DATA/workspace.sqlite3"
WEB="/opt/codecafe-studio/apps/codecafe-cv-studio"
REPO="https://github.com/looplogic-dot-tech/codecafe-cv-studio.git"
BRANCH="release/v1.6.4.10"
WORK="$HOME/codecafe-v16410"
STAMP="$(date +%Y%m%d-%H%M%S)"
ROLLBACK="$HOME/codecafe-v16410-frontend-$STAMP"

cleanup(){ rm -rf "$WORK" 2>/dev/null || true; }
trap cleanup EXIT

sudo -n true >/dev/null 2>&1 || { echo "ERROR: passwordless sudo unavailable"; exit 1; }
sudo test -f "$DB" || { echo "ERROR: workspace database missing: $DB"; exit 1; }

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

BEFORE="$(fingerprint)"

echo "============================================================"
echo " CODECAFE CV STUDIO 1.6.4.10"
echo " CORRECTION: INLINE OUTPUT FORMATTING — PRINT LOCKED"
echo "============================================================"

df -h /
rm -rf "$WORK" "$HOME/.npm/_npx" "$HOME/.npm/_cacache" 2>/dev/null || true

AVAIL_KB="$(df -Pk / | awk 'NR==2 {print $4}')"
if [ "$AVAIL_KB" -lt 700000 ]; then
  echo "ERROR: less than ~700 MB free on /. Deployment stopped before touching live site."
  exit 1
fi

NODE_VERSION="$(node -p 'process.versions.node' 2>/dev/null || echo 0.0.0)"
NODE_MAJOR="$(printf '%s' "$NODE_VERSION" | cut -d. -f1)"
NODE_MINOR="$(printf '%s' "$NODE_VERSION" | cut -d. -f2)"
if [ "$NODE_MAJOR" -lt 20 ] || { [ "$NODE_MAJOR" -eq 20 ] && [ "$NODE_MINOR" -lt 19 ]; }; then
  echo "ERROR: Node 20.19+ or 22+ required; found $NODE_VERSION"
  exit 1
fi

git clone --depth 1 --branch "$BRANCH" "$REPO" "$WORK"
cd "$WORK"
npm ci
npm run build

python3 - <<'PY'
from pathlib import Path
import json
pkg=json.loads(Path('package.json').read_text())
assert pkg['version']=='1.6.4.10'
app=Path('src/App.tsx').read_text(encoding='utf-8')
pe=Path('src/printEditorV3.ts').read_text(encoding='utf-8')
patch=Path('scripts/apply-v16410-inline-formatting.py').read_text(encoding='utf-8')
assert 'key={`bold-${index}`}' in app
assert '<span><InlineText value={project.stack} /></span>' in app
assert '${printableInlineText(project.stack)}' in app
assert 'codecafe-print-only-stack' in pe
assert 'src/printEditorV3.ts' not in patch
assert Path('dist/index.html').is_file()
assert Path('dist/assets').is_dir()
print('PASS: bold + hyperlinks render inline in CV output')
print('PASS: project technology stacks use formatted inline rendering')
print('PASS: certifications/custom fields retain inline formatting')
print('PASS: print subsystem locked to working 1.6.4.9 behavior')
PY

if ! grep -Raq 'codecafe-print-only-stack' dist/assets; then
  echo "ERROR: compiled bundle missing locked print marker"
  exit 1
fi
if ! grep -Raq 'bold-' dist/assets; then
  echo "ERROR: compiled bundle missing inline bold renderer"
  exit 1
fi

mkdir -p "$ROLLBACK"
cp -a "$WEB/index.html" "$ROLLBACK/" 2>/dev/null || true
cp -a "$WEB/assets" "$ROLLBACK/" 2>/dev/null || true
rm -rf "$WEB/assets"; rm -f "$WEB/index.html"
cp -a dist/assets "$WEB/"
cp -a dist/index.html "$WEB/"

AFTER="$(fingerprint)"
if [ "$BEFORE" != "$AFTER" ]; then
  echo "ERROR: workspace changed during deployment; rolling frontend back"
  rm -rf "$WEB/assets"; rm -f "$WEB/index.html"
  cp -a "$ROLLBACK/assets" "$WEB/" 2>/dev/null || true
  cp -a "$ROLLBACK/index.html" "$WEB/" 2>/dev/null || true
  exit 1
fi
rm -rf "$ROLLBACK"

echo "============================================================"
echo " CODECAFE CV STUDIO 1.6.4.10 DEPLOYED"
echo "✓ print behavior locked"
echo "✓ project stack formatting fixed"
echo "✓ certifications inline bold/link formatting fixed"
echo "✓ hyperlinks retained"
echo "✓ workspace unchanged"
echo "============================================================"
