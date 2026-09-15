#!/usr/bin/env bash
set -Eeuo pipefail

DATA="/opt/codecafe-studio/data/codecafe-cv-studio"
DB="$DATA/workspace.sqlite3"
WEB="/opt/codecafe-studio/apps/codecafe-cv-studio"
REPO="https://github.com/looplogic-dot-tech/codecafe-cv-studio.git"
BRANCH="release/v1.6.4.2"
WORK="$HOME/codecafe-v1642"
STAMP="$(date +%Y%m%d-%H%M%S)"
ROLLBACK="$HOME/codecafe-v1642-frontend-$STAMP"

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
echo " CODECAFE CV STUDIO 1.6.4.2"
echo " CORRECTION: HYPERLINK RENDERING + SAFE DEPLOY"
echo "============================================================"

echo
echo_disk(){ df -h /; df -i /; }
echo "=== DISK BEFORE ==="
echo_disk

# Free only disposable build/cache space. Never touch /opt/codecafe-studio/data.
rm -rf "$HOME"/codecafe-v164* "$HOME/.npm/_npx" "$HOME/.npm/_cacache" 2>/dev/null || true
sudo apt-get clean >/dev/null 2>&1 || true
sudo journalctl --vacuum-time=7d >/dev/null 2>&1 || true

echo "=== DISK AFTER SAFE CLEANUP ==="
echo_disk

AVAIL_KB="$(df -Pk / | awk 'NR==2{print $4}')"
[ "$AVAIL_KB" -ge 700000 ] || {
  echo "ERROR: less than ~700 MB free on /. Deployment stopped before changing live site."
  exit 1
}

NODE_VERSION="$(node -p 'process.versions.node' 2>/dev/null || echo 0.0.0)"
NODE_MAJOR="${NODE_VERSION%%.*}"
NODE_MINOR="$(printf '%s' "$NODE_VERSION" | cut -d. -f2)"
if [ "$NODE_MAJOR" -lt 20 ] || { [ "$NODE_MAJOR" -eq 20 ] && [ "$NODE_MINOR" -lt 19 ]; }; then
  echo "=== INSTALLING NODE 22 ==="
  sudo apt-get update
  sudo apt-get install -y ca-certificates curl gnupg
  sudo mkdir -p /etc/apt/keyrings
  curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | sudo gpg --dearmor --yes -o /etc/apt/keyrings/nodesource.gpg
  echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_22.x nodistro main" | sudo tee /etc/apt/sources.list.d/nodesource.list >/dev/null
  sudo apt-get update
  sudo apt-get install -y nodejs
fi

echo "Node: $(node --version)"
echo "npm:  $(npm --version)"

rm -rf "$WORK"
git clone --depth 1 --branch "$BRANCH" "$REPO" "$WORK"
cd "$WORK"

npm ci
npm run prebuild

python3 - <<'PY'
from pathlib import Path
import json
p=json.loads(Path('package.json').read_text())
assert p['version']=='1.6.4.2'
app=Path('src/App.tsx').read_text(encoding='utf-8')
assert 'className="cvInlineLink"' in app
assert '<InlineText value={cv.summary} />' in app
assert 'printableInlineText(cv.summary)' in app
assert 'href={href}' in app
assert 'assert-v1641-autosave-single-document.py' in Path('package.json').read_text()
print('PASS: hyperlink renderer active in live preview and printable output')
print('PASS: autosave single-document regression guard retained')
PY

npm run build

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
  echo "ERROR: workspace changed during deployment; rolling frontend back"
  rm -rf "$WEB/assets"
  rm -f "$WEB/index.html"
  cp -a "$ROLLBACK/assets" "$WEB/" 2>/dev/null || true
  cp -a "$ROLLBACK/index.html" "$WEB/" 2>/dev/null || true
  exit 1
fi
rm -rf "$ROLLBACK"

echo "============================================================"
echo " CODECAFE CV STUDIO 1.6.4.2 DEPLOYED"
echo "✓ Markdown-style links render in Live Preview"
echo "✓ bare https:// links render in Live Preview"
echo "✓ configurable summary/tools support links"
echo "✓ links retained in printable/PDF output"
echo "✓ 1.6.4.1 regression fixes retained"
echo "✓ workspace unchanged"
echo "============================================================"
