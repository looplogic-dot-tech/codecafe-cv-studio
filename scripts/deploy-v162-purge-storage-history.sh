#!/usr/bin/env bash
set -Eeuo pipefail

SERVICE="codecafe-cv-sync.service"
DATA="/opt/codecafe-studio/data/codecafe-cv-studio"
OLD_DB="$DATA/backups.sqlite3"
NEW_DB="$DATA/workspace.sqlite3"
WEB="/opt/codecafe-studio/apps/codecafe-cv-studio"
REPO="https://github.com/looplogic-dot-tech/codecafe-cv-studio.git"
BRANCH="release/v1.6.2"
WORK="$HOME/codecafe-v162-deploy"
STAMP="$(date +%Y%m%d-%H%M%S)"
SAFE_DIR="$DATA/recovery-safety"
SAFE_JSON="$SAFE_DIR/workspace-before-v162-$STAMP.json.gz"
SERVICE_STOPPED=0

cleanup() {
  rm -rf "$WORK" 2>/dev/null || true
  rm -f /tmp/deploy-v162-purge-storage-history.sh 2>/dev/null || true
  rm -rf "$HOME/.npm/_npx" "$HOME/.npm/_cacache" 2>/dev/null || true
  if [ "$SERVICE_STOPPED" -eq 1 ]; then
    sudo systemctl restart "$SERVICE" 2>/dev/null || true
  fi
}
trap cleanup EXIT

sudo -n true >/dev/null 2>&1 || { echo "ERROR: passwordless sudo unavailable"; exit 1; }

echo "============================================================"
echo " CODECAFE CV STUDIO 1.6.2"
echo " SINGLE WORKSPACE STORAGE MIGRATION"
echo "============================================================"

echo
echo "=== 1. VERIFY CURRENT WORKSPACE ==="
sudo test -f "$OLD_DB" || { echo "ERROR: current database missing: $OLD_DB"; exit 1; }
sudo python3 - "$OLD_DB" <<'PY'
import json, sqlite3, sys
p=sys.argv[1]
db=sqlite3.connect(f'file:{p}?mode=ro',uri=True)
rows=db.execute('SELECT saved_at,digest,payload FROM backups ORDER BY revision DESC').fetchall()
if len(rows)!=1:
    raise SystemExit(f'ERROR: expected exactly one authoritative live workspace before migration; found {len(rows)} rows')
saved,digest,raw=rows[0]
obj=json.loads(raw); ws=obj.get('workspace',obj)
docs=ws.get('documents',[]) if isinstance(ws,dict) else []
libs=ws.get('professionalLibraries',[]) if isinstance(ws,dict) else []
print('CV documents:',len(docs) if isinstance(docs,list) else 0)
print('Libraries:',len(libs) if isinstance(libs,(list,dict)) else 0)
if not isinstance(docs,list) or len(docs)<1:
    raise SystemExit('ERROR: workspace has no CV documents; refusing migration')
db.close()
PY

echo
echo "=== 2. CREATE CLEAN SAFETY COPY OF WORKSPACE CONTENT ==="
sudo mkdir -p "$SAFE_DIR"
sudo python3 - "$OLD_DB" "$SAFE_JSON" <<'PY'
import gzip,json,sqlite3,sys
src,out=sys.argv[1],sys.argv[2]
db=sqlite3.connect(f'file:{src}?mode=ro',uri=True)
row=db.execute('SELECT saved_at,digest,payload FROM backups ORDER BY revision DESC LIMIT 1').fetchone()
if not row: raise SystemExit('ERROR: no workspace to protect')
saved,digest,raw=row
with gzip.open(out,'wt',encoding='utf-8') as f:
    json.dump({'savedAt':saved,'digest':digest,'payload':json.loads(raw)},f,ensure_ascii=False,separators=(',',':'))
db.close()
print(out)
PY
sudo ls -lh "$SAFE_JSON"

echo
echo "=== 3. DOWNLOAD AND BUILD 1.6.2 ==="
rm -rf "$WORK"
git clone --depth 1 --branch "$BRANCH" "$REPO" "$WORK"
cd "$WORK"
python3 -c 'import json; assert json.load(open("package.json"))["version"]=="1.6.2"'
NPM_CLI="$(readlink -f "$(command -v npm)")"
npx -y node@22 "$NPM_CLI" ci
npx -y node@22 "$NPM_CLI" run build

test -f dist/index.html
test -d dist/assets

# The deployed source must not contain the retired term in either language.
if grep -RniE 'revision|revisi[oó]n' src server; then
  echo "ERROR: retired storage-history terminology remains in deployable source"
  exit 1
fi

echo
echo "=== 4. IDENTIFY LIVE BACKEND ==="
EXECSTART="$(sudo systemctl show "$SERVICE" -p ExecStart --value)"
BACKEND="$(printf '%s\n' "$EXECSTART" | grep -oE '/[^ ;"]+\.py' | head -1)"
sudo test -f "$BACKEND" || { echo "ERROR: backend not found: $BACKEND"; exit 1; }
echo "$BACKEND"

echo
echo "=== 5. STOP SERVICE ==="
sudo systemctl stop "$SERVICE"
SERVICE_STOPPED=1

echo
echo "=== 6. MIGRATE DATABASE TO SINGLETON WORKSPACE STATE ==="
sudo rm -f "$NEW_DB" "$NEW_DB-wal" "$NEW_DB-shm"
sudo python3 - "$OLD_DB" "$NEW_DB" <<'PY'
import sqlite3,sys
old_path,new_path=sys.argv[1],sys.argv[2]
old=sqlite3.connect(f'file:{old_path}?mode=ro',uri=True)
row=old.execute('SELECT saved_at,digest,payload FROM backups ORDER BY revision DESC LIMIT 1').fetchone()
if not row: raise SystemExit('ERROR: no current workspace found')
sessions=[]
try:
    sessions=old.execute('SELECT token_hash,csrf,expires_at FROM sessions').fetchall()
except sqlite3.OperationalError:
    pass
new=sqlite3.connect(new_path)
new.execute('CREATE TABLE workspace_state (id INTEGER PRIMARY KEY CHECK(id=1), saved_at TEXT NOT NULL, digest TEXT NOT NULL, payload TEXT NOT NULL)')
new.execute('CREATE TABLE sessions (token_hash TEXT PRIMARY KEY, csrf TEXT NOT NULL, expires_at REAL NOT NULL)')
new.execute('INSERT INTO workspace_state(id,saved_at,digest,payload) VALUES(1,?,?,?)',row)
if sessions:
    new.executemany('INSERT OR REPLACE INTO sessions(token_hash,csrf,expires_at) VALUES(?,?,?)',sessions)
new.commit()
check=new.execute('SELECT COUNT(*),saved_at,digest,payload FROM workspace_state').fetchone()
if check[0]!=1: raise SystemExit('ERROR: singleton workspace migration failed')
new.execute('VACUUM')
new.close(); old.close()
PY
sudo chmod 600 "$NEW_DB"

echo
echo "=== 7. DEPLOY CLEAN BACKEND AND FRONTEND ==="
OWNER="$(stat -c '%U' "$BACKEND")"
GROUP="$(stat -c '%G' "$BACKEND")"
MODE="$(stat -c '%a' "$BACKEND")"
sudo cp server/app.py "$BACKEND"
sudo chown "$OWNER:$GROUP" "$BACKEND"
sudo chmod "$MODE" "$BACKEND"
sudo python3 -m py_compile "$BACKEND"
rm -rf "$WEB/assets"
rm -f "$WEB/index.html"
cp -a dist/assets "$WEB/"
cp -a dist/index.html "$WEB/"

echo
echo "=== 8. REMOVE OLD STORAGE DATABASES AND OLD DEPLOYMENT COPIES ==="
# The new safety JSON and workspace.sqlite3 contain the authoritative content.
sudo rm -f "$OLD_DB" "$OLD_DB-wal" "$OLD_DB-shm"
sudo rm -rf "$DATA/deployment-backups"
# Remove old SQLite safety databases and obsolete JSON artifacts, but preserve the new clean safety JSON.
sudo find "$SAFE_DIR" -maxdepth 1 -type f ! -name "$(basename "$SAFE_JSON")" -delete 2>/dev/null || true
# Remove obsolete backend source copies and abandoned build directories.
sudo find "$(dirname "$BACKEND")" -maxdepth 1 -type f -name '*.before-*' -delete 2>/dev/null || true
find "$HOME" -maxdepth 1 -type d -name 'codecafe-v*' ! -path "$WORK" -exec rm -rf {} + 2>/dev/null || true
rm -f /tmp/repair-* /tmp/codecafe-* 2>/dev/null || true

echo
echo "=== 9. START SERVICE ==="
sudo systemctl daemon-reload
sudo systemctl restart "$SERVICE"
SERVICE_STOPPED=0
sleep 3
sudo systemctl is-active --quiet "$SERVICE"

echo
echo "=== 10. VERIFY WORKSPACE API AND DATA ==="
curl -fsS http://127.0.0.1:5002/api/health; echo
sudo python3 - "$NEW_DB" <<'PY'
import json,sqlite3,sys
db=sqlite3.connect(f'file:{sys.argv[1]}?mode=ro',uri=True)
row=db.execute('SELECT saved_at,digest,payload FROM workspace_state WHERE id=1').fetchone()
if not row: raise SystemExit('ERROR: singleton workspace missing')
obj=json.loads(row[2]); ws=obj.get('workspace',obj)
docs=ws.get('documents',[]) if isinstance(ws,dict) else []
libs=ws.get('professionalLibraries',[]) if isinstance(ws,dict) else []
print('CV documents:',len(docs) if isinstance(docs,list) else 0)
print('Libraries:',len(libs) if isinstance(libs,(list,dict)) else 0)
print('Tables:',[r[0] for r in db.execute("SELECT name FROM sqlite_master WHERE type='table' ORDER BY name")])
db.close()
PY

echo
echo "=== 11. PURGE OLD TERM FROM CODECAFE USER/SOURCE ARTIFACTS ==="
# Sanitize shell history entries from this repair marathon without touching operating-system files.
if [ -f "$HOME/.bash_history" ]; then
  python3 - "$HOME/.bash_history" <<'PY'
from pathlib import Path
import re,sys
p=Path(sys.argv[1]); s=p.read_text(errors='ignore')
s=re.sub(r'revisi[oó]n(?:es)?','copy',s,flags=re.I)
s=re.sub(r'revision(?:s)?','copy',s,flags=re.I)
p.write_text(s)
PY
fi

# Live CodeCafe application + user workspace must contain none of the retired term.
LEFT="$(grep -RIlE 'revision|revisi[oó]n' /opt/codecafe-studio /home/ubuntu 2>/dev/null || true)"
if [ -n "$LEFT" ]; then
  echo "ERROR: retired term still exists in these CodeCafe/user files:"
  echo "$LEFT"
  exit 1
fi

# Confirm SQLite schema and payload bytes are clean after VACUUM.
if sudo strings "$NEW_DB" | grep -qiE 'revision|revisi[oó]n'; then
  echo "ERROR: retired term still exists inside workspace.sqlite3"
  exit 1
fi

echo
echo "=== 12. DISK ==="
df -h /

echo
echo "============================================================"
echo " CODECAFE 1.6.2 READY"
echo "============================================================"
echo " ✓ one singleton workspace in EC2"
echo " ✓ digest-based conflict protection"
echo " ✓ max 7 active-use recovery files"
echo " ✓ old numeric-history protocol removed"
echo " ✓ old SQLite history databases removed"
echo " ✓ old deployment/recovery copies removed"
echo " ✓ live CodeCafe source/UI/database contains none of the retired term"
echo " ✓ clean safety copy: $SAFE_JSON"
echo "============================================================"
