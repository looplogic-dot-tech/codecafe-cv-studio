#!/usr/bin/env bash
set -Eeuo pipefail

DATA="/opt/codecafe-studio/data/codecafe-cv-studio"
DB="$DATA/workspace.sqlite3"
WEB="/opt/codecafe-studio/apps/codecafe-cv-studio"
REPO="https://github.com/looplogic-dot-tech/codecafe-cv-studio.git"
BRANCH="release/v1.6.4.1"
WORK="$HOME/codecafe-v1641"
STAMP="$(date +%Y%m%d-%H%M%S)"
ROLLBACK="$HOME/codecafe-v1641-frontend-$STAMP"

cleanup(){
  rm -rf "$WORK" 2>/dev/null || true
}
trap cleanup EXIT

sudo -n true >/dev/null 2>&1 || { echo "ERROR: passwordless sudo unavailable"; exit 1; }
sudo test -f "$DB" || { echo "ERROR: workspace.sqlite3 not found: $DB"; exit 1; }

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
echo " CODECAFE CV STUDIO 1.6.4.1"
echo " CORRECTION: LIVE FIELD VISIBILITY + PRINT PREVIEW + AUTOSAVE"
echo "============================================================"
echo "Workspace before: $BEFORE"

rm -rf "$WORK"
git clone --depth 1 --branch "$BRANCH" "$REPO" "$WORK"
cd "$WORK"

echo "Branch: $(git branch --show-current)"
echo "Commit: $(git rev-parse HEAD)"
echo "Node: $(node --version 2>/dev/null || echo missing)"
echo "npm: $(npm --version 2>/dev/null || echo missing)"

command -v node >/dev/null 2>&1 || { echo "ERROR: Node.js is not installed on this server"; exit 1; }
command -v npm >/dev/null 2>&1 || { echo "ERROR: npm is not installed on this server"; exit 1; }

python3 - <<'PY'
import json, subprocess
from pathlib import Path
p=json.loads(Path('package.json').read_text())
assert p['version']=='1.6.4.1', f"wrong version: {p['version']}"
pre=p['scripts']['prebuild']
for required in (
    'apply-v163-canonical-baseline.py',
    'apply-v163-field-visibility.py',
    'apply-v164-inline-links.py',
    'apply-v164-print-preview-fix.py',
    'assert-v1641-autosave-single-document.py',
):
    assert required in pre, f'missing prebuild step: {required}'
version=subprocess.check_output(['node','-p','process.versions.node'], text=True).strip()
major, minor, patch=(int(x) for x in version.split('.')[:3])
if not (major >= 22 or (major == 20 and minor >= 19)):
    raise SystemExit(f'ERROR: installed Node {version} is too old; need Node 20.19+ or 22+. Deployment stopped before changing the live site.')
print('PASS: correction build 1.6.4.1')
print(f'PASS: using installed Node {version}; no npx Node download')
PY

# Use the already installed Node/npm. Do not bootstrap node@22 through npx;
# that download was the source of the long reify:node-bin-setup stall.
npm ci --no-audit --no-fund
npm run prebuild

python3 - <<'PY'
from pathlib import Path
app=Path('src/App.tsx').read_text(encoding='utf-8')
pe=Path('src/printEditorV3.ts').read_text(encoding='utf-8')
workspace=Path('src/workspace.ts').read_text(encoding='utf-8')
cloud=Path('src/cloud.ts').read_text(encoding='utf-8')
assert 'fieldId="skills"' in app
assert 'fieldId="education"' in app
assert '!isFieldHidden("skills", t.keywords)' in app
assert '!isFieldHidden("education", t.education)' in app
assert 'onVisibilityChange?.()' in app
assert 'function InlineText' in app
assert 'href={match[2]}' in app or 'href={href}' in app
assert 'printEditorContentViewport' in pe
assert 'clone.classList.remove("paper")' not in pe
assert 'clone.classList.add("printEditorFlowContent")' in pe
start=workspace.find('export function replaceCurrentDocument(')
end=workspace.find('\nexport function saveWorkspaceLocal', start)
body=workspace[start:end]
assert 'documents: normalized.documents.map(' in body
assert 'newId(' not in body
assert 'documents: [...' not in body
assert 'method: existingId ? "PATCH" : "POST"' in cloud
assert '/api/workspace' in cloud
assert '/api/backups' not in cloud
print('PASS: field deletion/restoration updates live preview')
print('PASS: inline hyperlinks retained')
print('PASS: print editor content retained')
print('PASS: autosave/save updates the same CV document')
PY

./node_modules/.bin/tsc --noEmit
./node_modules/.bin/vite build

test -f dist/index.html
test -d dist/assets

mkdir -p "$ROLLBACK"
cp -a "$WEB/index.html" "$ROLLBACK/" 2>/dev/null || true
cp -a "$WEB/assets" "$ROLLBACK/" 2>/dev/null || true

rm -rf "$WEB/assets"
rm -f "$WEB/index.html"
cp -a dist/assets "$WEB/"
cp -a dist/index.html "$WEB/"

AFTER="$(fingerprint)"
if [ "$BEFORE" != "$AFTER" ]; then
  echo "ERROR: workspace changed during deployment; restoring previous frontend"
  rm -rf "$WEB/assets"
  rm -f "$WEB/index.html"
  cp -a "$ROLLBACK/assets" "$WEB/" 2>/dev/null || true
  cp -a "$ROLLBACK/index.html" "$WEB/" 2>/dev/null || true
  exit 1
fi
rm -rf "$ROLLBACK"

echo "============================================================"
echo " CODECAFE CV STUDIO 1.6.4.1 DEPLOYED"
echo "============================================================"
echo "✓ field hide/restore updates Live Preview immediately"
echo "✓ hyperlinks retained"
echo "✓ print editor/preview content retained"
echo "✓ autosave updates the same active CV"
echo "✓ Google Drive updates matching Doc/PDF instead of duplicating"
echo "✓ EC2 uses one current workspace, not revision documents"
echo "✓ workspace unchanged during deployment: $AFTER"
echo "============================================================"
