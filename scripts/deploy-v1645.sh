#!/usr/bin/env bash
set -Eeuo pipefail

DATA="/opt/codecafe-studio/data/codecafe-cv-studio"
DB="$DATA/workspace.sqlite3"
WEB="/opt/codecafe-studio/apps/codecafe-cv-studio"
REPO="https://github.com/looplogic-dot-tech/codecafe-cv-studio.git"
BRANCH="release/v1.6.4.5"
WORK="$HOME/codecafe-v1645"
STAMP="$(date +%Y%m%d-%H%M%S)"
ROLLBACK="$HOME/codecafe-v1645-frontend-$STAMP"

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
echo " CODECAFE CV STUDIO 1.6.4.5"
echo " STABLE PRINT / PAGE BREAKS + INLINE HYPERLINKS"
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

echo "Node: $(node --version)"
echo "npm:  $(npm --version)"

git clone --depth 1 --branch "$BRANCH" "$REPO" "$WORK"
cd "$WORK"

npm ci
npm run build

python3 - <<'PY'
from pathlib import Path
import json
pkg=json.loads(Path('package.json').read_text())
assert pkg['version']=='1.6.4.5'
app=Path('src/App.tsx').read_text(encoding='utf-8')
css=Path('src/styles.css').read_text(encoding='utf-8')
print_editor=Path('src/printEditorV3.ts').read_text(encoding='utf-8')
live_pages=Path('src/livePreviewPages.ts').read_text(encoding='utf-8')
main=Path('src/main.tsx').read_text(encoding='utf-8')
assert 'data-cv-inline-link="1"' in app
assert '<StructuredLines value={cv.certifications} />' in app
assert '<InlineText value={cv.summary} />' in app
assert '<li key={n}><InlineText value={bullet} /></li>' in app
assert 'printableInlineText(cv.summary)' in app
assert 'codecafe-inline-links-v1645' in css
assert 'manualBreaks: string[]' in print_editor
assert 'Place page breaks' in print_editor
assert 'manualPrintBreak{break-before:page' in print_editor
assert 'applyManualBreakLayout(settings)' in print_editor
assert 'id="codecafe-print-editor-launcher" className="primary"' in app
assert 'codecafe-open-print-editor' in app
assert app.index('cloudButton ${cloudStatus}') < app.index('id="codecafe-print-editor-launcher"')
assert 'const anchor = document.querySelector<HTMLElement>(".previewTop")' not in print_editor
assert 'const anchor = document.querySelector<HTMLElement>(".topActions")' not in print_editor
assert 'window.addEventListener("codecafe-open-print-editor", openEditor);' in print_editor
assert 'existingHost?.isConnected' in live_pages
assert 'installPrintEditorV3();' in main
assert 'installPrintPreview();' not in main
assert Path('dist/index.html').is_file()
assert Path('dist/assets').is_dir()
print('PASS: hyperlinks + V3 print controls + page breaks + original print-button placement are present in source')
PY

if ! grep -Raq 'data-cv-inline-link' dist/assets; then
  echo "ERROR: compiled JavaScript does not contain hyperlink renderer marker"
  exit 1
fi
if ! grep -Raq 'cvInlineLink' dist/assets; then
  echo "ERROR: compiled JavaScript does not contain hyperlink class"
  exit 1
fi
if ! grep -Raq 'Place page breaks' dist/assets; then
  echo "ERROR: compiled JavaScript does not contain page-break controls"
  exit 1
fi
if ! grep -Raq 'manualPrintBreak' dist/assets; then
  echo "ERROR: compiled JavaScript does not contain manual page-break support"
  exit 1
fi
if ! grep -Raq 'codecafe-open-print-editor' dist/assets; then
  echo "ERROR: compiled JavaScript does not contain original Print/PDF button binding"
  exit 1
fi

echo "PASS: compiled production bundle contains hyperlinks, page breaks and original print-button binding"
echo "Built assets:"
find dist/assets -maxdepth 1 -type f -printf '  %f\n' | sort

mkdir -p "$ROLLBACK"
cp -a "$WEB/index.html" "$ROLLBACK/" 2>/dev/null || true
cp -a "$WEB/assets" "$ROLLBACK/" 2>/dev/null || true

rm -rf "$WEB/assets"
rm -f "$WEB/index.html"
cp -a dist/assets "$WEB/"
cp -a dist/index.html "$WEB/"

if ! grep -Raq 'data-cv-inline-link' "$WEB/assets"; then
  echo "ERROR: live production assets do not contain hyperlink renderer; rolling back"
  rm -rf "$WEB/assets"; rm -f "$WEB/index.html"
  cp -a "$ROLLBACK/assets" "$WEB/" 2>/dev/null || true
  cp -a "$ROLLBACK/index.html" "$WEB/" 2>/dev/null || true
  exit 1
fi
if ! grep -Raq 'Place page breaks' "$WEB/assets"; then
  echo "ERROR: live production assets do not contain page-break controls; rolling back"
  rm -rf "$WEB/assets"; rm -f "$WEB/index.html"
  cp -a "$ROLLBACK/assets" "$WEB/" 2>/dev/null || true
  cp -a "$ROLLBACK/index.html" "$WEB/" 2>/dev/null || true
  exit 1
fi
if ! grep -Raq 'codecafe-open-print-editor' "$WEB/assets"; then
  echo "ERROR: live production assets do not contain original Print/PDF button binding; rolling back"
  rm -rf "$WEB/assets"; rm -f "$WEB/index.html"
  cp -a "$ROLLBACK/assets" "$WEB/" 2>/dev/null || true
  cp -a "$ROLLBACK/index.html" "$WEB/" 2>/dev/null || true
  exit 1
fi

echo "PASS: live production bundle contains hyperlinks, page breaks and original print-button binding"

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
echo " CODECAFE CV STUDIO 1.6.4.5 DEPLOYED"
echo "✓ page-by-page Live Preview retained"
echo "✓ manual page-break controls retained"
echo "✓ existing V3 print controls retained"
echo "✓ original React Print/PDF button restored after Cloud in the top action bar"
echo "✓ [text](https://url) rendered in Live Preview"
echo "✓ printable/PDF output uses the same link renderer"
echo "✓ compiled LIVE bundle verified"
echo "✓ workspace unchanged"
echo "============================================================"
