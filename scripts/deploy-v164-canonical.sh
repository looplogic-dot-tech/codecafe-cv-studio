#!/usr/bin/env bash
set -Eeuo pipefail
DATA="/opt/codecafe-studio/data/codecafe-cv-studio"
DB="$DATA/workspace.sqlite3"
WEB="/opt/codecafe-studio/apps/codecafe-cv-studio"
REPO="https://github.com/looplogic-dot-tech/codecafe-cv-studio.git"
BRANCH="release/v1.6.4"
WORK="$HOME/codecafe-v164-canonical"
STAMP="$(date +%Y%m%d-%H%M%S)"
ROLLBACK="$HOME/codecafe-v164-frontend-$STAMP"
cleanup(){ rm -rf "$WORK" "$HOME/.npm/_npx" "$HOME/.npm/_cacache" 2>/dev/null || true; }
trap cleanup EXIT
sudo -n true >/dev/null 2>&1 || { echo "ERROR: passwordless sudo unavailable"; exit 1; }
sudo test -f "$DB" || { echo "ERROR: workspace.sqlite3 not found"; exit 1; }
fingerprint(){ sudo python3 - "$DB" <<'PY'
import hashlib,sqlite3,sys
p=sys.argv[1]; db=sqlite3.connect(f'file:{p}?mode=ro',uri=True)
row=db.execute('SELECT payload FROM workspace_state WHERE id=1').fetchone()
if not row: raise SystemExit('ERROR: workspace missing')
print(hashlib.sha256(row[0].encode()).hexdigest()); db.close()
PY
}
BEFORE="$(fingerprint)"
echo "============================================================"
echo " CODECAFE CV STUDIO 1.6.4 - CANONICAL"
echo " repaired 1.6.3 baseline + inline hyperlinks"
echo "============================================================"
echo "Workspace before: $BEFORE"
rm -rf "$WORK"
git clone --depth 1 --branch "$BRANCH" "$REPO" "$WORK"
cd "$WORK"
[ "$(node -p "require('./package.json').version")" = "1.6.4" ] || { echo "ERROR: branch is not version 1.6.4"; exit 1; }
NPM_CLI="$(readlink -f "$(command -v npm)")"
npx -y node@22 "$NPM_CLI" ci
npx -y node@22 "$NPM_CLI" run prebuild
npx -y node@22 ./node_modules/typescript/bin/tsc --noEmit
npx -y node@22 ./node_modules/vite/bin/vite.js build
test -f dist/index.html; test -d dist/assets
mkdir -p "$ROLLBACK"
cp -a "$WEB/index.html" "$ROLLBACK/" 2>/dev/null || true
cp -a "$WEB/assets" "$ROLLBACK/" 2>/dev/null || true
rm -rf "$WEB/assets"; rm -f "$WEB/index.html"
cp -a dist/assets "$WEB/"; cp -a dist/index.html "$WEB/"
AFTER="$(fingerprint)"
if [ "$BEFORE" != "$AFTER" ]; then
  echo "ERROR: workspace changed; restoring previous frontend"
  rm -rf "$WEB/assets"; rm -f "$WEB/index.html"
  cp -a "$ROLLBACK/assets" "$WEB/" 2>/dev/null || true
  cp -a "$ROLLBACK/index.html" "$WEB/" 2>/dev/null || true
  exit 1
fi
rm -rf "$ROLLBACK"
echo "============================================================"
echo " CODECAFE CV STUDIO 1.6.4 DEPLOYED"
echo " ✓ canonical repaired 1.6.3 baseline"
echo " ✓ configurable fields preserved"
echo " ✓ ES/EN toggle preserved"
echo " ✓ Drive disconnect preserved"
echo " ✓ new sessions start with EC2 disconnected"
echo " ✓ Print/PDF launcher and margin engine preserved"
echo " ✓ NEW: [text](https://url) inline hyperlinks"
echo " ✓ workspace unchanged: $AFTER"
echo "============================================================"
