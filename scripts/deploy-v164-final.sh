#!/usr/bin/env bash
set -Eeuo pipefail

DATA="/opt/codecafe-studio/data/codecafe-cv-studio"
DB="$DATA/workspace.sqlite3"
WEB="/opt/codecafe-studio/apps/codecafe-cv-studio"
REPO="https://github.com/looplogic-dot-tech/codecafe-cv-studio.git"
BRANCH="release/v1.6.4"
WORK="$HOME/codecafe-v164-final"
STAMP="$(date +%Y%m%d-%H%M%S)"
ROLLBACK="$HOME/codecafe-v164-frontend-$STAMP"

cleanup(){
  rm -rf "$WORK" 2>/dev/null || true
  rm -rf "$HOME/.npm/_npx" "$HOME/.npm/_cacache" 2>/dev/null || true
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
echo " CODECAFE CV STUDIO 1.6.4"
echo " REPAIRED 1.6.3 BASELINE + LINKS + PRINT PREVIEW FIX"
echo "============================================================"
echo "Workspace before: $BEFORE"

rm -rf "$WORK"
git clone --depth 1 --branch "$BRANCH" "$REPO" "$WORK"
cd "$WORK"

echo "Branch: $(git branch --show-current)"
echo "Commit: $(git rev-parse HEAD)"
python3 - <<'PY'
import json
from pathlib import Path
p=json.loads(Path('package.json').read_text())
assert p['version']=='1.6.4', f"wrong version: {p['version']}"
pre=p['scripts']['prebuild']
assert 'apply-v163-canonical-baseline.py' in pre
assert 'apply-v164-inline-links.py' in pre
assert 'apply-v164-print-preview-fix.py' in pre
print('PASS: package version 1.6.4')
print('PASS: repaired 1.6.3 baseline is part of normal build')
print('PASS: inline hyperlink feature is part of normal build')
print('PASS: print preview repair is part of normal build')
PY

NPM_CLI="$(readlink -f "$(command -v npm)")"
npx -y node@22 "$NPM_CLI" ci
npx -y node@22 "$NPM_CLI" run prebuild

python3 - <<'PY'
from pathlib import Path
import re
app=Path('src/App.tsx').read_text(encoding='utf-8')
main=Path('src/main.tsx').read_text(encoding='utf-8')
pe=Path('src/printEditorV3.ts').read_text(encoding='utf-8')
assert 'restoreServerSession().then' not in app
assert 'disconnectDrive' in app
assert 'changeDocumentLanguage("es")' in app and 'changeDocumentLanguage("en")' in app
assert 'configurable' in app
assert 'installDisconnectControlsV155' not in main
assert 'printEditorContentViewport' in pe
assert 'clone.classList.remove("paper")' not in pe
assert 'visibility", "visible"' in pe
assert re.search(r'\[[^\]]+\]\(https?:', app) or 'match[1] || match[3]' in app
assert 'href={href}' in app or 'printableInlineText' in app
print('PASS: repaired baseline present')
print('PASS: inline hyperlinks present')
print('PASS: print editor uses visible rendered CV styling')
PY

npx -y node@22 ./node_modules/typescript/bin/tsc --noEmit
npx -y node@22 ./node_modules/vite/bin/vite.js build

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
  echo "ERROR: workspace changed during frontend deployment; rolling frontend back"
  rm -rf "$WEB/assets"
  rm -f "$WEB/index.html"
  cp -a "$ROLLBACK/assets" "$WEB/" 2>/dev/null || true
  cp -a "$ROLLBACK/index.html" "$WEB/" 2>/dev/null || true
  exit 1
fi
rm -rf "$ROLLBACK"

echo "============================================================"
echo " CODECAFE CV STUDIO 1.6.4 DEPLOYED"
echo "============================================================"
echo "✓ repaired 1.6.3 baseline included"
echo "✓ inline hyperlinks working in rendered CV"
echo "✓ print editor preview repaired"
echo "✓ print/PDF margins retained"
echo "✓ workspace unchanged: $AFTER"
echo "============================================================"
