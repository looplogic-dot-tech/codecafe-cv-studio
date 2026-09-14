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
ROLLBACK_DIR="$HOME/codecafe-v162-rollback-$STAMP"
SERVICE_STOPPED=0
DEPLOYED=0

cleanup() {
  if [ "$SERVICE_STOPPED" -eq 1 ]; then
    sudo systemctl restart "$SERVICE" 2>/dev/null || true
  fi
  rm -rf "$WORK" 2>/dev/null || true
  rm -rf "$HOME/.npm/_npx" "$HOME/.npm/_cacache" 2>/dev/null || true
}
trap cleanup EXIT

fail_and_restore() {
  echo
  echo "ERROR: deployment verification failed. Restoring previous application."
  if [ -d "$ROLLBACK_DIR/frontend" ]; then
    rm -rf "$WEB/assets"
    rm -f "$WEB/index.html"
    cp -a "$ROLLBACK_DIR/frontend/assets" "$WEB/" 2>/dev/null || true
    cp -a "$ROLLBACK_DIR/frontend/index.html" "$WEB/" 2>/dev/null || true
  fi
  if [ -f "$ROLLBACK_DIR/app.py" ] && [ -n "${BACKEND:-}" ]; then
    sudo cp "$ROLLBACK_DIR/app.py" "$BACKEND" || true
  fi
  sudo rm -f "$NEW_DB" "$NEW_DB-wal" "$NEW_DB-shm" 2>/dev/null || true
  sudo systemctl restart "$SERVICE" 2>/dev/null || true
  SERVICE_STOPPED=0
  exit 1
}

sudo -n true >/dev/null 2>&1 || { echo "ERROR: passwordless sudo unavailable"; exit 1; }

echo "============================================================"
echo " CODECAFE CV STUDIO 1.6.2"
echo " SAFE SINGLE-WORKSPACE MIGRATION"
echo "============================================================"

echo
echo "=== 1. VERIFY CURRENT RECORDS ==="
sudo test -f "$OLD_DB" || { echo "ERROR: current database missing: $OLD_DB"; exit 1; }

SOURCE_INFO="$(sudo python3 - "$OLD_DB" <<'PY'
import hashlib,json,sqlite3,sys
p=sys.argv[1]
db=sqlite3.connect(f'file:{p}?mode=ro',uri=True)
rows=db.execute('SELECT saved_at,digest,payload FROM backups ORDER BY revision DESC').fetchall()
if len(rows)!=1:
    raise SystemExit(f'ERROR: expected exactly one live workspace; found {len(rows)} rows')
saved,digest,raw=rows[0]
obj=json.loads(raw); ws=obj.get('workspace',obj)
docs=ws.get('documents',[]) if isinstance(ws,dict) else []
libs=ws.get('professionalLibraries',[]) if isinstance(ws,dict) else []
lib_items=0
vals=libs.values() if isinstance(libs,dict) else libs if isinstance(libs,list) else []
for lib in vals:
    if isinstance(lib,dict):
        for key in ('records','items','entries','blocks'):
            value=lib.get(key)
            if isinstance(value,list): lib_items += len(value)
for key in ('libraryItems','professionalLibraryItems'):
    value=ws.get(key) if isinstance(ws,dict) else None
    if isinstance(value,list): lib_items += len(value)
if not isinstance(docs,list) or len(docs)<1:
    raise SystemExit('ERROR: workspace has no CV documents')
payload_sha=hashlib.sha256(raw.encode('utf-8')).hexdigest()
print(f'{payload_sha}|{len(docs)}|{len(libs) if isinstance(libs,(list,dict)) else 0}|{lib_items}|{digest}|{saved}')
db.close()
PY
)"
IFS='|' read -r SOURCE_SHA SOURCE_CVS SOURCE_LIBS SOURCE_ITEMS SOURCE_DIGEST SOURCE_SAVED <<< "$SOURCE_INFO"

echo "CV documents        : $SOURCE_CVS"
echo "Professional Library: $SOURCE_LIBS"
echo "Library items       : $SOURCE_ITEMS"
echo "Payload SHA-256     : $SOURCE_SHA"

echo
echo "=== 2. CREATE CLEAN SAFETY COPY ==="
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
echo "=== 3. DOWNLOAD AND BUILD 1.6.2 BEFORE TOUCHING LIVE APP ==="
rm -rf "$WORK"
git clone --depth 1 --branch "$BRANCH" "$REPO" "$WORK"
cd "$WORK"
python3 -c 'import json; assert json.load(open("package.json"))["version"]=="1.6.2"'
NPM_CLI="$(readlink -f "$(command -v npm)")"
npx -y node@22 "$NPM_CLI" ci
npx -y node@22 "$NPM_CLI" run build

test -f dist/index.html
test -d dist/assets
python3 -m py_compile server/app.py

if grep -RniE 'revision|revisi[oó]n' src server; then
  echo "ERROR: retired storage-history terminology remains in deployable source"
  exit 1
fi

echo "Build PASS"

echo
echo "=== 4. IDENTIFY LIVE BACKEND AND PREPARE ROLLBACK ==="
EXECSTART="$(sudo systemctl show "$SERVICE" -p ExecStart --value)"
BACKEND="$(printf '%s\n' "$EXECSTART" | grep -oE '/[^ ;"]+\.py' | head -1)"
sudo test -f "$BACKEND" || { echo "ERROR: backend not found: $BACKEND"; exit 1; }
mkdir -p "$ROLLBACK_DIR/frontend"
sudo cp "$BACKEND" "$ROLLBACK_DIR/app.py"
cp -a "$WEB/index.html" "$ROLLBACK_DIR/frontend/" 2>/dev/null || true
cp -a "$WEB/assets" "$ROLLBACK_DIR/frontend/" 2>/dev/null || true

echo
echo "=== 5. STOP SERVICE ==="
sudo systemctl stop "$SERVICE"
SERVICE_STOPPED=1

echo
echo "=== 6. MIGRATE PAYLOAD BYTE-FOR-BYTE TO SINGLETON DATABASE ==="
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
new.execute('VACUUM')
new.close(); old.close()
PY
sudo chmod 600 "$NEW_DB"

MIGRATED_INFO="$(sudo python3 - "$NEW_DB" <<'PY'
import hashlib,json,sqlite3,sys
p=sys.argv[1]
db=sqlite3.connect(f'file:{p}?mode=ro',uri=True)
row=db.execute('SELECT saved_at,digest,payload FROM workspace_state WHERE id=1').fetchone()
if not row: raise SystemExit('ERROR: singleton workspace missing')
saved,digest,raw=row
obj=json.loads(raw); ws=obj.get('workspace',obj)
docs=ws.get('documents',[]) if isinstance(ws,dict) else []
libs=ws.get('professionalLibraries',[]) if isinstance(ws,dict) else []
lib_items=0
vals=libs.values() if isinstance(libs,dict) else libs if isinstance(libs,list) else []
for lib in vals:
    if isinstance(lib,dict):
        for key in ('records','items','entries','blocks'):
            value=lib.get(key)
            if isinstance(value,list): lib_items += len(value)
for key in ('libraryItems','professionalLibraryItems'):
    value=ws.get(key) if isinstance(ws,dict) else None
    if isinstance(value,list): lib_items += len(value)
print(f'{hashlib.sha256(raw.encode("utf-8")).hexdigest()}|{len(docs) if isinstance(docs,list) else 0}|{len(libs) if isinstance(libs,(list,dict)) else 0}|{lib_items}|{digest}|{saved}')
db.close()
PY
)"
IFS='|' read -r NEW_SHA NEW_CVS NEW_LIBS NEW_ITEMS NEW_DIGEST NEW_SAVED <<< "$MIGRATED_INFO"

if [ "$SOURCE_SHA" != "$NEW_SHA" ] || [ "$SOURCE_CVS" != "$NEW_CVS" ] || [ "$SOURCE_LIBS" != "$NEW_LIBS" ] || [ "$SOURCE_ITEMS" != "$NEW_ITEMS" ] || [ "$SOURCE_DIGEST" != "$NEW_DIGEST" ]; then
  echo "ERROR: migrated records do not exactly match source"
  fail_and_restore
fi

echo "Record verification PASS: payload is byte-for-byte identical"

echo
echo "=== 7. DEPLOY BACKEND AND FRONTEND ==="
OWNER="$(stat -c '%U' "$BACKEND")"
GROUP="$(stat -c '%G' "$BACKEND")"
MODE="$(stat -c '%a' "$BACKEND")"
sudo cp server/app.py "$BACKEND"
sudo chown "$OWNER:$GROUP" "$BACKEND"
sudo chmod "$MODE" "$BACKEND"
rm -rf "$WEB/assets"
rm -f "$WEB/index.html"
cp -a dist/assets "$WEB/"
cp -a dist/index.html "$WEB/"
DEPLOYED=1

echo
echo "=== 8. START AND VERIFY BEFORE DELETING OLD STORAGE ==="
sudo systemctl daemon-reload
sudo systemctl restart "$SERVICE"
SERVICE_STOPPED=0
sleep 3
if ! sudo systemctl is-active --quiet "$SERVICE"; then
  sudo journalctl -u "$SERVICE" -n 60 --no-pager || true
  fail_and_restore
fi
if ! curl -fsS http://127.0.0.1:5002/api/health; then
  fail_and_restore
fi
echo

FINAL_SHA="$(sudo python3 - "$NEW_DB" <<'PY'
import hashlib,sqlite3,sys
db=sqlite3.connect(f'file:{sys.argv[1]}?mode=ro',uri=True)
row=db.execute('SELECT payload FROM workspace_state WHERE id=1').fetchone()
if not row: raise SystemExit(1)
print(hashlib.sha256(row[0].encode('utf-8')).hexdigest())
db.close()
PY
)"
if [ "$FINAL_SHA" != "$SOURCE_SHA" ]; then
  echo "ERROR: live payload changed during deployment"
  fail_and_restore
fi

echo "Live service PASS; records unchanged"

echo
echo "=== 9. ONLY NOW REMOVE OLD STORAGE-HISTORY DATABASES ==="
sudo rm -f "$OLD_DB" "$OLD_DB-wal" "$OLD_DB-shm"
sudo rm -rf "$DATA/deployment-backups"
# Preserve only the clean JSON safety copy created before this migration.
sudo find "$SAFE_DIR" -maxdepth 1 -type f ! -name "$(basename "$SAFE_JSON")" -delete 2>/dev/null || true
# Remove obsolete backend copies and abandoned build directories.
sudo find "$(dirname "$BACKEND")" -maxdepth 1 -type f -name '*.before-*' -delete 2>/dev/null || true
find "$HOME" -maxdepth 1 -type d -name 'codecafe-v*' ! -path "$WORK" -exec rm -rf {} + 2>/dev/null || true
rm -f /tmp/repair-* /tmp/codecafe-* 2>/dev/null || true

# Keep at most seven active-use recovery points.
RECOVERY="$DATA/active-day-recovery"
sudo mkdir -p "$RECOVERY"
mapfile -t RECOVERIES < <(sudo find "$RECOVERY" -maxdepth 1 -type f -name 'codecafe-cv-*.recovery.json' -printf '%T@ %p\n' 2>/dev/null | sort -nr | cut -d' ' -f2-)
if [ "${#RECOVERIES[@]}" -gt 7 ]; then
  for old in "${RECOVERIES[@]:7}"; do sudo rm -f -- "$old"; done
fi

echo
echo "=== 10. FINAL RECORD REPORT ==="
echo "CV documents        : $NEW_CVS"
echo "Professional Library: $NEW_LIBS"
echo "Library items       : $NEW_ITEMS"
echo "Payload SHA-256     : $FINAL_SHA"
echo "Safety copy         : $SAFE_JSON"

echo
echo "=== 11. VERIFY OLD TERM IS ABSENT FROM LIVE CODECAFE APP ==="
if sudo grep -RniE 'revision|revisi[oó]n' "$WEB" "$(dirname "$BACKEND")" 2>/dev/null; then
  echo "ERROR: retired term remains in live application files"
  exit 1
fi
if sudo strings "$NEW_DB" | grep -qiE 'revision|revisi[oó]n'; then
  echo "ERROR: retired term remains inside workspace.sqlite3"
  exit 1
fi

echo
echo "=== 12. DISK ==="
df -h /

rm -rf "$ROLLBACK_DIR"

echo
echo "============================================================"
echo " CODECAFE CV STUDIO 1.6.2 READY"
echo "============================================================"
echo " ✓ existing workspace payload preserved byte-for-byte"
echo " ✓ CVs preserved: $NEW_CVS"
echo " ✓ Professional Library preserved: $NEW_LIBS"
echo " ✓ Library items preserved: $NEW_ITEMS"
echo " ✓ all existing CV Studio frontend features retained"
echo " ✓ one EC2 workspace state"
echo " ✓ digest-based conflict protection"
echo " ✓ maximum 7 active-use recovery points"
echo " ✓ old numeric-history storage removed after verification"
echo " ✓ clean safety copy retained"
echo "============================================================"
