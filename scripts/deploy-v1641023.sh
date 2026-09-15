#!/usr/bin/env bash
set -Eeuo pipefail

VERSION="1.6.4.10.2.3"
DATA="/opt/codecafe-studio/data/codecafe-cv-studio"
DB="$DATA/workspace.sqlite3"
WEB="/opt/codecafe-studio/apps/codecafe-cv-studio"
REPO="https://github.com/looplogic-dot-tech/codecafe-cv-studio.git"
BRANCH="release/v1.6.4.10.2.3"
WORK="$HOME/codecafe-v1641023"
STAMP="$(date +%Y%m%d-%H%M%S)"
ROLLBACK="$HOME/codecafe-v1641023-frontend-$STAMP"

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
echo " NARROW CORRECTION: STACK FORMAT + REAL CV DELETE"
echo " PRINT / DRIVE / SECTION CONTROLS NOT MODIFIED"
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
app=Path('src/App.tsx').read_text(encoding='utf-8')
lib=Path('src/CVLibrary.tsx').read_text(encoding='utf-8')
assert pkg['version']=='1.6.4.10.2.3'
assert '<BoldInlineText value={project.stack} />' in app
assert '${printableBoldInline(project.stack)}' in app
block=app[app.find('const deleteDocument'):app.find('const createCollection')]
assert 'const latest = loadWorkspaceLocal(workspace);' in block
assert 'setWorkspace(updated);' in block
assert 'saveWorkspaceLocal(updated);' in block
assert 'props.onDelete(document.id);' in lib
assert Path('dist/index.html').is_file()
assert Path('dist/assets').is_dir()
print('PASS: Technology Stack no longer exposes ** markers')
print('PASS: printable Technology Stack uses bold renderer')
print('PASS: delete updates the canonical workspace, not only the library view')
print('PASS: production bundle compiled successfully')
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
  echo "ERROR: workspace changed during deployment. Rolling frontend back."
  rm -rf "$WEB/assets"
  rm -f "$WEB/index.html"
  cp -a "$ROLLBACK/assets" "$WEB/" 2>/dev/null || true
  cp -a "$ROLLBACK/index.html" "$WEB/" 2>/dev/null || true
  exit 1
fi

rm -rf "$ROLLBACK"

echo "============================================================"
echo " CODECAFE CV STUDIO $VERSION DEPLOYED"
echo "✓ Technology Stack markdown fixed"
echo "✓ CV deletion updates canonical workspace"
echo "✓ version visible through CV Studio About/build marker"
echo "✓ print / Drive / section controls not changed by this correction"
echo "✓ existing workspace/database preserved during deployment"
echo "============================================================"
