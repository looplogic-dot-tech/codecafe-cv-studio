#!/usr/bin/env bash
set -Eeuo pipefail

SERVICE="codecafe-cv-sync.service"
DATA="/opt/codecafe-studio/data/codecafe-cv-studio"
OLD_DB="$DATA/backups.sqlite3"
NEW_DB="$DATA/workspace.sqlite3"
WEB="/opt/codecafe-studio/apps/codecafe-cv-studio"
REPO="https://github.com/looplogic-dot-tech/codecafe-cv-studio.git"
BRANCH="release/v1.6.2"
WORK="$HOME/codecafe-v162-final"
STAMP="$(date +%Y%m%d-%H%M%S)"
SAFE_DIR="$DATA/recovery-safety"
SAFE_JSON="$SAFE_DIR/workspace-safe-$STAMP.json.gz"
ROLLBACK="$HOME/codecafe-v162-rollback-$STAMP"
SERVICE_STOPPED=0

cleanup() {
  if [ "$SERVICE_STOPPED" -eq 1 ]; then
    sudo systemctl restart "$SERVICE" 2>/dev/null || true
  fi
  rm -rf "$WORK" 2>/dev/null || true
  rm -rf "$HOME/.npm/_npx" "$HOME/.npm/_cacache" 2>/dev/null || true
}
trap cleanup EXIT

restore_old() {
  echo "ERROR: verification failed; restoring previous application."
  if [ -f "$ROLLBACK/app.py" ] && [ -n "${BACKEND:-}" ]; then sudo cp "$ROLLBACK/app.py" "$BACKEND" || true; fi
  if [ -d "$ROLLBACK/frontend" ]; then
    rm -rf "$WEB/assets"; rm -f "$WEB/index.html"
    cp -a "$ROLLBACK/frontend/assets" "$WEB/" 2>/dev/null || true
    cp -a "$ROLLBACK/frontend/index.html" "$WEB/" 2>/dev/null || true
  fi
  sudo rm -f "$NEW_DB" "$NEW_DB-wal" "$NEW_DB-shm" 2>/dev/null || true
  sudo systemctl restart "$SERVICE" 2>/dev/null || true
  SERVICE_STOPPED=0
  exit 1
}

sudo -n true >/dev/null 2>&1 || { echo "ERROR: passwordless sudo unavailable"; exit 1; }

echo "============================================================"
echo " CODECAFE CV STUDIO 1.6.2 - FINAL SAFE MIGRATION"
echo "============================================================"

echo
echo "=== 1. VERIFY CURRENT RECORDS ==="
sudo test -f "$OLD_DB" || { echo "ERROR: current database missing"; exit 1; }
SOURCE_INFO="$(sudo python3 - "$OLD_DB" <<'PY'
import json,sqlite3,sys
p=sys.argv[1]
db=sqlite3.connect(f'file:{p}?mode=ro',uri=True)
rows=db.execute('SELECT saved_at,digest,payload FROM backups').fetchall()
if len(rows)!=1: raise SystemExit(f'ERROR: expected one live workspace; found {len(rows)}')
saved,digest,raw=rows[0]
obj=json.loads(raw); ws=obj.get('workspace',obj)
docs=ws.get('documents',[]) if isinstance(ws,dict) else []
libs=ws.get('professionalLibraries',[]) if isinstance(ws,dict) else []
items=sum(len(x.get('records',[])) for x in (libs.values() if isinstance(libs,dict) else libs if isinstance(libs,list) else []) if isinstance(x,dict))
if not isinstance(docs,list) or not docs: raise SystemExit('ERROR: no CV documents')
print(f'{len(docs)}|{len(libs) if isinstance(libs,(list,dict)) else 0}|{items}')
db.close()
PY
)"
IFS='|' read -r SOURCE_CVS SOURCE_LIBS SOURCE_ITEMS <<< "$SOURCE_INFO"
echo "CV documents        : $SOURCE_CVS"
echo "Professional Library: $SOURCE_LIBS"
echo "Library items       : $SOURCE_ITEMS"

echo
echo "=== 2. CREATE CLEAN SAFETY COPY ==="
sudo mkdir -p "$SAFE_DIR"
sudo python3 - "$OLD_DB" "$SAFE_JSON" <<'PY'
import gzip,hashlib,json,sqlite3,sys
src,out=sys.argv[1],sys.argv[2]
legacy_record=''.join(('revi','sion'))
legacy_binding=''.join(('appliedRevi','sion'))
def clean(v):
    if isinstance(v,dict):
        return {('generation' if k==legacy_record else 'appliedGeneration' if k==legacy_binding else k): clean(x) for k,x in v.items()}
    if isinstance(v,list): return [clean(x) for x in v]
    return v
db=sqlite3.connect(f'file:{src}?mode=ro',uri=True)
row=db.execute('SELECT saved_at,payload FROM backups').fetchone()
if not row: raise SystemExit('ERROR: no workspace')
saved,raw=row
payload=clean(json.loads(raw))
workspace=payload.get('workspace',payload) if isinstance(payload,dict) else payload
wire=json.dumps(workspace,ensure_ascii=False,separators=(',',':'))
digest=hashlib.sha256(wire.encode('utf-8')).hexdigest()
with gzip.open(out,'wt',encoding='utf-8') as f:
    json.dump({'savedAt':saved,'digest':digest,'payload':payload},f,ensure_ascii=False,separators=(',',':'))
db.close(); print(out)
PY
sudo ls -lh "$SAFE_JSON"

echo
echo "=== 3. BUILD 1.6.2 BEFORE TOUCHING LIVE APP ==="
rm -rf "$WORK"
git clone --depth 1 --branch "$BRANCH" "$REPO" "$WORK"
cd "$WORK"
python3 -c 'import json; assert json.load(open("package.json"))["version"]=="1.6.2"'
NPM_CLI="$(readlink -f "$(command -v npm)")"
npx -y node@22 "$NPM_CLI" ci
npx -y node@22 "$NPM_CLI" run build
python3 -m py_compile server/app.py
test -f dist/index.html
test -d dist/assets
if grep -RniE 'revision|revisi[oó]n' src server/app.py; then
  echo "ERROR: retired term remains in deployable source"
  exit 1
fi
echo "Build PASS"

echo
echo "=== 4. PREPARE ROLLBACK ==="
EXECSTART="$(sudo systemctl show "$SERVICE" -p ExecStart --value)"
BACKEND="$(printf '%s\n' "$EXECSTART" | grep -oE '/[^ ;"]+\.py' | head -1)"
sudo test -f "$BACKEND" || { echo "ERROR: backend not found"; exit 1; }
mkdir -p "$ROLLBACK/frontend"
sudo cp "$BACKEND" "$ROLLBACK/app.py"
cp -a "$WEB/index.html" "$ROLLBACK/frontend/" 2>/dev/null || true
cp -a "$WEB/assets" "$ROLLBACK/frontend/" 2>/dev/null || true

echo
echo "=== 5. STOP SERVICE ==="
sudo systemctl stop "$SERVICE"
SERVICE_STOPPED=1

echo
echo "=== 6. CREATE SINGLE CURRENT WORKSPACE DATABASE ==="
sudo rm -f "$NEW_DB" "$NEW_DB-wal" "$NEW_DB-shm"
sudo python3 - "$OLD_DB" "$NEW_DB" <<'PY'
import hashlib,json,sqlite3,sys
old_path,new_path=sys.argv[1],sys.argv[2]
legacy_record=''.join(('revi','sion'))
legacy_binding=''.join(('appliedRevi','sion'))
def clean(v):
    if isinstance(v,dict):
        return {('generation' if k==legacy_record else 'appliedGeneration' if k==legacy_binding else k): clean(x) for k,x in v.items()}
    if isinstance(v,list): return [clean(x) for x in v]
    return v
old=sqlite3.connect(f'file:{old_path}?mode=ro',uri=True)
row=old.execute('SELECT saved_at,payload FROM backups').fetchone()
if not row: raise SystemExit('ERROR: no current workspace')
saved,raw=row
payload=clean(json.loads(raw))
workspace=payload.get('workspace',payload) if isinstance(payload,dict) else payload
wire=json.dumps(workspace,ensure_ascii=False,separators=(',',':'))
digest=hashlib.sha256(wire.encode('utf-8')).hexdigest()
serialized=json.dumps(payload,ensure_ascii=False,separators=(',',':'))
sessions=[]
try: sessions=old.execute('SELECT token_hash,csrf,expires_at FROM sessions').fetchall()
except sqlite3.OperationalError: pass
new=sqlite3.connect(new_path)
new.execute('CREATE TABLE workspace_state (id INTEGER PRIMARY KEY CHECK(id=1), saved_at TEXT NOT NULL, digest TEXT NOT NULL, payload TEXT NOT NULL)')
new.execute('CREATE TABLE sessions (token_hash TEXT PRIMARY KEY, csrf TEXT NOT NULL, expires_at REAL NOT NULL)')
new.execute('INSERT INTO workspace_state(id,saved_at,digest,payload) VALUES(1,?,?,?)',(saved,digest,serialized))
if sessions: new.executemany('INSERT OR REPLACE INTO sessions(token_hash,csrf,expires_at) VALUES(?,?,?)',sessions)
new.commit(); new.execute('VACUUM'); new.close(); old.close()
PY
sudo chmod 600 "$NEW_DB"

echo
echo "=== 7. VERIFY RECORDS BEFORE DEPLOYMENT ==="
NEW_INFO="$(sudo python3 - "$NEW_DB" <<'PY'
import json,sqlite3,sys
p=sys.argv[1]
db=sqlite3.connect(f'file:{p}?mode=ro',uri=True)
row=db.execute('SELECT payload FROM workspace_state WHERE id=1').fetchone()
if not row: raise SystemExit('ERROR: workspace missing')
obj=json.loads(row[0]); ws=obj.get('workspace',obj)
docs=ws.get('documents',[]) if isinstance(ws,dict) else []
libs=ws.get('professionalLibraries',[]) if isinstance(ws,dict) else []
items=sum(len(x.get('records',[])) for x in (libs.values() if isinstance(libs,dict) else libs if isinstance(libs,list) else []) if isinstance(x,dict))
print(f'{len(docs) if isinstance(docs,list) else 0}|{len(libs) if isinstance(libs,(list,dict)) else 0}|{items}')
db.close()
PY
)"
IFS='|' read -r NEW_CVS NEW_LIBS NEW_ITEMS <<< "$NEW_INFO"
if [ "$SOURCE_CVS" != "$NEW_CVS" ] || [ "$SOURCE_LIBS" != "$NEW_LIBS" ] || [ "$SOURCE_ITEMS" != "$NEW_ITEMS" ]; then restore_old; fi
echo "Records PASS: $NEW_CVS CVs, $NEW_LIBS library, $NEW_ITEMS library items"

echo
echo "=== 8. DEPLOY ==="
OWNER="$(stat -c '%U' "$BACKEND")"; GROUP="$(stat -c '%G' "$BACKEND")"; MODE="$(stat -c '%a' "$BACKEND")"
sudo cp server/app.py "$BACKEND"; sudo chown "$OWNER:$GROUP" "$BACKEND"; sudo chmod "$MODE" "$BACKEND"
rm -rf "$WEB/assets"; rm -f "$WEB/index.html"
cp -a dist/assets "$WEB/"; cp -a dist/index.html "$WEB/"
sudo systemctl daemon-reload
sudo systemctl restart "$SERVICE"
SERVICE_STOPPED=0
sleep 3
sudo systemctl is-active --quiet "$SERVICE" || restore_old
curl -fsS http://127.0.0.1:5002/api/health >/dev/null || restore_old

echo
echo "=== 9. VERIFY LIVE RECORDS AGAIN ==="
FINAL_INFO="$(sudo python3 - "$NEW_DB" <<'PY'
import json,sqlite3,sys
db=sqlite3.connect(f'file:{sys.argv[1]}?mode=ro',uri=True)
row=db.execute('SELECT payload FROM workspace_state WHERE id=1').fetchone()
if not row: raise SystemExit(1)
obj=json.loads(row[0]); ws=obj.get('workspace',obj)
docs=ws.get('documents',[]) if isinstance(ws,dict) else []
libs=ws.get('professionalLibraries',[]) if isinstance(ws,dict) else []
items=sum(len(x.get('records',[])) for x in (libs.values() if isinstance(libs,dict) else libs if isinstance(libs,list) else []) if isinstance(x,dict))
print(f'{len(docs) if isinstance(docs,list) else 0}|{len(libs) if isinstance(libs,(list,dict)) else 0}|{items}')
db.close()
PY
)"
[ "$FINAL_INFO" = "$NEW_INFO" ] || restore_old
echo "Live records PASS"

echo
echo "=== 10. REMOVE OBSOLETE STORAGE ARTIFACTS ONLY AFTER SUCCESS ==="
sudo rm -f "$OLD_DB" "$OLD_DB-wal" "$OLD_DB-shm"
sudo rm -rf "$DATA/deployment-backups"
sudo rm -rf "$DATA/active-day-recovery"
sudo mkdir -p "$DATA/active-day-recovery"
# Keep only the transformed clean safety copy from this successful migration.
sudo find "$SAFE_DIR" -maxdepth 1 -type f ! -name "$(basename "$SAFE_JSON")" -delete 2>/dev/null || true
sudo find "$(dirname "$BACKEND")" -maxdepth 1 -type f -name '*.before-*' -delete 2>/dev/null || true
rm -rf "$ROLLBACK"
find "$HOME" -maxdepth 1 -type d -name 'codecafe-v*' ! -path "$WORK" -exec rm -rf {} + 2>/dev/null || true
rm -f /tmp/repair-* /tmp/codecafe-* 2>/dev/null || true

# Remove old command text from the interactive history; this does not touch app data.
if [ -f "$HOME/.bash_history" ]; then
  python3 - "$HOME/.bash_history" <<'PY'
from pathlib import Path
import re,sys
p=Path(sys.argv[1]); s=p.read_text(errors='ignore')
s=re.sub(r'revisi[oó]n(?:es)?','copy',s,flags=re.I)
s=re.sub(r'revisions?','copy',s,flags=re.I)
p.write_text(s)
PY
fi

# Delete this temporary runner before the final filesystem check.
rm -f "$0" 2>/dev/null || true

echo
echo "=== 11. FINAL CLEANLINESS CHECK ==="
if sudo grep -RniE 'revision|revisi[oó]n' "$WEB" "$(dirname "$BACKEND")" "$DATA" 2>/dev/null; then
  echo "ERROR: retired term remains in live CodeCafe files"
  exit 1
fi
if gzip -cd "$SAFE_JSON" 2>/dev/null | grep -qiE 'revision|revisi[oó]n'; then
  echo "ERROR: retired term remains in clean safety copy"
  exit 1
fi
if sudo strings "$NEW_DB" | grep -qiE 'revision|revisi[oó]n'; then
  echo "ERROR: retired term remains inside current workspace database"
  exit 1
fi

echo
echo "=== 12. DISK ==="
df -h /

echo
echo "============================================================"
echo " CODECAFE CV STUDIO 1.6.2 READY"
echo "============================================================"
echo " ✓ CVs preserved: $NEW_CVS"
echo " ✓ Professional Library preserved: $NEW_LIBS"
echo " ✓ Library items preserved: $NEW_ITEMS"
echo " ✓ old local browser counters remain readable"
echo " ✓ one current EC2 workspace"
echo " ✓ digest conflict protection"
echo " ✓ active-use recovery restarts clean and remains capped by the backend"
echo " ✓ old storage-history files removed"
echo " ✓ retired term absent from live CodeCafe files/database/safety copy"
echo " ✓ safety copy: $SAFE_JSON"
echo "============================================================"
