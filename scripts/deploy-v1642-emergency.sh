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
sudo test -f "$DB" || { echo "ERROR: workspace database not found: $DB"; exit 1; }
NODE_MAJOR="$(node -p 'process.versions.node.split(".")[0]' 2>/dev/null || echo 0)"
if [ "$NODE_MAJOR" -lt 22 ]; then
  sudo apt-get update
  sudo apt-get install -y ca-certificates curl gnupg
  sudo mkdir -p /etc/apt/keyrings
  curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | sudo gpg --dearmor --yes -o /etc/apt/keyrings/nodesource.gpg
  echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_22.x nodistro main" | sudo tee /etc/apt/sources.list.d/nodesource.list >/dev/null
  sudo apt-get update
  sudo apt-get install -y nodejs
fi
fingerprint(){ sudo python3 - "$DB" <<'PY'
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
rm -rf "$WORK"
git clone --depth 1 --branch "$BRANCH" "$REPO" "$WORK"
cd "$WORK"
npm ci
npm run prebuild
npx tsc --noEmit
npx vite build
test -f dist/index.html
test -d dist/assets
mkdir -p "$ROLLBACK"
cp -a "$WEB/index.html" "$ROLLBACK/" 2>/dev/null || true
cp -a "$WEB/assets" "$ROLLBACK/" 2>/dev/null || true
rm -rf "$WEB/assets"; rm -f "$WEB/index.html"
cp -a dist/assets "$WEB/"; cp -a dist/index.html "$WEB/"
AFTER="$(fingerprint)"
if [ "$BEFORE" != "$AFTER" ]; then
  rm -rf "$WEB/assets"; rm -f "$WEB/index.html"
  cp -a "$ROLLBACK/assets" "$WEB/" 2>/dev/null || true
  cp -a "$ROLLBACK/index.html" "$WEB/" 2>/dev/null || true
  echo "ERROR: workspace changed; previous frontend restored"
  exit 1
fi
rm -rf "$ROLLBACK"
echo "CODECAFE CV STUDIO 1.6.4.2 DEPLOYED"
echo "Print/PDF now prints the live CV directly using saved margins."
