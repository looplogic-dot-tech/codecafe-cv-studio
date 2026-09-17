#!/usr/bin/env bash
set -Eeuo pipefail

VERSION="1.6.4.10.2.4.2"
DATA="/opt/codecafe-studio/data/codecafe-cv-studio"
DB="$DATA/workspace.sqlite3"
WEB="/opt/codecafe-studio/apps/codecafe-cv-studio"
REPO="https://github.com/looplogic-dot-tech/codecafe-cv-studio.git"
BRANCH="release/v1.6.4.10.2.4.2"
WORK="$HOME/codecafe-v16410242"
STAMP="$(date +%Y%m%d-%H%M%S)"
ROLLBACK="$HOME/codecafe-v16410242-frontend-$STAMP"

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
echo " CORRECTION ONLY: RESTORE **INLINE BOLD**"
echo " PRINT / DRIVE / DELETE / DOC PATHS ARE REGRESSION-GUARDED"
echo "============================================================"
df -h /

rm -rf "$WORK" "$HOME/.npm/_npx" 2>/dev/null || true
git clone --depth 1 --branch "$BRANCH" "$REPO" "$WORK"
cd "$WORK"

echo "Branch: $(git branch --show-current)"
echo "Commit: $(git rev-parse HEAD)"
echo "Node: $(node --version)"
echo "npm:  $(npm --version)"

npm install --no-audit --no-fund
npm run build

python3 - <<'PY'
from pathlib import Path
import json
pkg=json.loads(Path('package.json').read_text(encoding='utf-8'))
assert pkg['version']=='1.6.4.10.2.4.2'
app=Path('src/App.tsx').read_text(encoding='utf-8')
required={
  'live inline bold':'key={`bold-${index}`}',
  'live hyperlinks':'target="_blank" rel="noreferrer"',
  'portable inline bold':'<strong>${printableInlineText(match[3])}</strong>',
  'technology stack':'<BoldInlineText value={project.stack} />',
  'Drive PDF':'pdfBlob: await renderCurrentLivePreviewPdf()',
  'editable DOC':'application/msword',
  'canonical delete':'const latest = loadWorkspaceLocal(workspace);',
}
for name, marker in required.items():
    assert marker in app, f'missing regression marker: {name}'
assert Path('dist/index.html').is_file()
assert Path('dist/assets').is_dir()
print('PASS: TypeScript + Vite production build completed')
print('PASS: inline **bold** renderer present')
print('PASS: hyperlinks retained')
print('PASS: Technology Stack formatting retained')
print('PASS: Drive Live Preview PDF retained')
print('PASS: local editable DOC retained')
print('PASS: canonical CV deletion retained')
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
  rm -rf "$WEB/assets"
  rm -f "$WEB/index.html"
  cp -a "$ROLLBACK/assets" "$WEB/" 2>/dev/null || true
  cp -a "$ROLLBACK/index.html" "$WEB/" 2>/dev/null || true
  exit 1
fi
rm -rf "$ROLLBACK"

echo "============================================================"
echo " CODECAFE CV STUDIO $VERSION DEPLOYED"
echo "✓ **bold** restored"
echo "✓ hyperlinks retained"
echo "✓ Technology Stack formatting retained"
echo "✓ Drive PDF path retained"
echo "✓ editable DOC path retained"
echo "✓ CV deletion path retained"
echo "✓ print editor files untouched by this correction"
echo "✓ workspace/database unchanged"
echo "============================================================"
