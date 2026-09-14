#!/usr/bin/env bash
set -Eeuo pipefail

SERVICE="codecafe-cv-sync.service"
DATA="/opt/codecafe-studio/data/codecafe-cv-studio"
LIVE_DB="$DATA/backups.sqlite3"
WEB="/opt/codecafe-studio/apps/codecafe-cv-studio"
REPO="https://github.com/looplogic-dot-tech/codecafe-cv-studio.git"
BRANCH="release/v1.6.1"
WORK="$HOME/codecafe-v161-repair"
STAMP="$(date +%Y%m%d-%H%M%S)"
REV79_JSON="/tmp/codecafe-revision79-$STAMP.json"
SAFETY="$DATA/recovery-safety/before-rev79-restore-$STAMP.sqlite3"
SERVICE_STOPPED=0

cleanup() {
  rm -rf "$WORK" 2>/dev/null || true
  rm -f "$REV79_JSON" 2>/dev/null || true
  rm -rf "$HOME/.npm/_npx" "$HOME/.npm/_cacache" 2>/dev/null || true
  if [ "$SERVICE_STOPPED" -eq 1 ]; then
    sudo systemctl restart "$SERVICE" 2>/dev/null || true
  fi
}
trap cleanup EXIT

echo "============================================================"
echo " CODECAFE CV STUDIO 1.6.1 - REVISION 79 RECOVERY"
echo "============================================================"

sudo -n true >/dev/null 2>&1 || { echo "ERROR: passwordless sudo unavailable"; exit 1; }
sudo test -f "$LIVE_DB" || { echo "ERROR: live database missing: $LIVE_DB"; exit 1; }

echo
echo "=== 1. FIND AUTHORITATIVE REVISION 79 ==="
mapfile -t DBS < <(sudo find "$DATA" /home/ubuntu -type f -name '*.sqlite3' 2>/dev/null | sort -u)
[ "${#DBS[@]}" -gt 0 ] || { echo "ERROR: no SQLite databases found"; exit 1; }

sudo python3 - "$REV79_JSON" "${DBS[@]}" <<'PY'
import json, sqlite3, sys
from pathlib import Path
out = Path(sys.argv[1])
paths = sys.argv[2:]
matches=[]

def lib_items(ws):
    total=0
    libs=ws.get('professionalLibraries', [])
    vals=libs.values() if isinstance(libs,dict) else libs if isinstance(libs,list) else []
    for lib in vals:
        if isinstance(lib,dict):
            for k in ('records','items','entries','blocks'):
                v=lib.get(k)
                if isinstance(v,list): total += len(v)
    for k in ('libraryItems','professionalLibraryItems'):
        v=ws.get(k)
        if isinstance(v,list): total += len(v)
    return total

for path in paths:
    try:
        db=sqlite3.connect(f'file:{path}?mode=ro', uri=True)
        tables={r[0] for r in db.execute("SELECT name FROM sqlite_master WHERE type='table'")}
        if 'backups' not in tables:
            db.close(); continue
        rows=db.execute("SELECT revision,saved_at,digest,payload FROM backups WHERE revision=79").fetchall()
        db.close()
        for rev,saved,digest,raw in rows:
            try: payload=json.loads(raw)
            except Exception: continue
            if not isinstance(payload,dict): continue
            ws=payload.get('workspace',payload)
            if not isinstance(ws,dict): continue
            docs=ws.get('documents',[])
            libs=ws.get('professionalLibraries',[])
            profiles=ws.get('profiles',[])
            collections=ws.get('collections',[])
            matches.append({
                'db':path,'revision':rev,'savedAt':saved,'digest':digest,'payload':payload,
                'cvCount':len(docs) if isinstance(docs,list) else 0,
                'libraryCount':len(libs) if isinstance(libs,(list,dict)) else 0,
                'libraryItems':lib_items(ws),
                'profileCount':len(profiles) if isinstance(profiles,list) else 0,
                'collectionCount':len(collections) if isinstance(collections,list) else 0,
            })
    except Exception:
        pass

if not matches:
    raise SystemExit('ERROR: revision 79 was not found in any surviving SQLite database. NOTHING CHANGED.')

matches.sort(key=lambda x:(x['cvCount'],x['libraryItems'],x['libraryCount'],x['profileCount'],x['collectionCount']), reverse=True)
best=matches[0]
print('Revision 79 copies found:', len(matches))
for m in matches:
    print(f"  {m['db']} | CVs={m['cvCount']} libraries={m['libraryCount']} library_items={m['libraryItems']} saved={m['savedAt']}")
print('\nSelected authoritative revision 79:')
print('  source       :',best['db'])
print('  CVs          :',best['cvCount'])
print('  libraries    :',best['libraryCount'])
print('  library items:',best['libraryItems'])
ws=best['payload'].get('workspace',best['payload'])
docs=ws.get('documents',[]) if isinstance(ws,dict) else []
print('  CV names:')
for d in docs if isinstance(docs,list) else []:
    if isinstance(d,dict): print('   -', d.get('name') or d.get('title') or d.get('id') or '(unnamed)')
if best['cvCount']==0:
    raise SystemExit('ERROR: revision 79 contains zero CVs. NOTHING CHANGED.')
out.write_text(json.dumps(best,ensure_ascii=False),encoding='utf-8')
PY

echo
echo "=== 2. SAFETY COPY CURRENT LIVE DATABASE ==="
sudo mkdir -p "$DATA/recovery-safety"
sudo python3 - "$LIVE_DB" "$SAFETY" <<'PY'
import sqlite3,sys
src=sqlite3.connect(f'file:{sys.argv[1]}?mode=ro',uri=True)
dst=sqlite3.connect(sys.argv[2])
src.backup(dst)
dst.close(); src.close()
print(sys.argv[2])
PY

echo
echo "=== 3. DOWNLOAD AND BUILD CURRENT 1.6.1 ==="
rm -rf "$WORK"
git clone --depth 1 --branch "$BRANCH" "$REPO" "$WORK"
cd "$WORK"
python3 -c 'import json; assert json.load(open("package.json"))["version"]=="1.6.1"'
NPM_CLI="$(readlink -f "$(command -v npm)")"
npx -y node@22 "$NPM_CLI" ci
npx -y node@22 "$NPM_CLI" run build
test -f dist/index.html
test -d dist/assets
grep -q '_active_day_recovery' server/app.py
grep -q 'recoveries\[7:\]' server/app.py
grep -q 'codecafe-ec2-explicitly-disconnected' src/App.tsx
if grep -q 'className="revisionPicker"' src/App.tsx; then echo 'ERROR: revision picker still present'; exit 1; fi
if grep -q '<CloudStorageBrowser' src/App.tsx; then echo 'ERROR: old Stored content panel still present'; exit 1; fi

echo
echo "=== 4. IDENTIFY LIVE BACKEND ==="
EXECSTART="$(sudo systemctl show "$SERVICE" -p ExecStart --value)"
BACKEND="$(printf '%s\n' "$EXECSTART" | grep -oE '/[^ ;"]+\.py' | head -1)"
sudo test -f "$BACKEND" || { echo "ERROR: backend not found: $BACKEND"; exit 1; }
echo "$BACKEND"

echo
echo "=== 5. STOP SERVICE AND RESTORE REVISION 79 ==="
sudo systemctl stop "$SERVICE"
SERVICE_STOPPED=1
sudo python3 - "$LIVE_DB" "$REV79_JSON" <<'PY'
import json,sqlite3,sys
source=json.load(open(sys.argv[2],encoding='utf-8'))
if int(source['revision']) != 79: raise SystemExit('ERROR: source is not revision 79')
payload=json.dumps(source['payload'],separators=(',',':'),sort_keys=True)
db=sqlite3.connect(sys.argv[1])
db.execute('BEGIN IMMEDIATE')
db.execute('DELETE FROM backups')
db.execute('INSERT INTO backups(revision,saved_at,digest,payload) VALUES(79,?,?,?)',(source['savedAt'],source['digest'],payload))
try: db.execute("UPDATE sqlite_sequence SET seq=79 WHERE name='backups'")
except sqlite3.OperationalError: pass
db.commit()
row=db.execute('SELECT revision,payload FROM backups').fetchall()
if len(row)!=1 or row[0][0]!=79: raise SystemExit('ERROR: revision 79 restore verification failed')
ws=json.loads(row[0][1]); ws=ws.get('workspace',ws)
docs=ws.get('documents',[]) if isinstance(ws,dict) else []
libs=ws.get('professionalLibraries',[]) if isinstance(ws,dict) else []
print('Restored live revision: 79')
print('CV documents:',len(docs) if isinstance(docs,list) else 0)
print('Libraries:',len(libs) if isinstance(libs,(list,dict)) else 0)
db.close()
PY

echo
echo "=== 6. REMOVE CALENDAR TIMER AND LIMIT RECOVERY TO 7 ==="
sudo systemctl disable --now codecafe-cv-daily-backup.timer 2>/dev/null || true
sudo rm -f /etc/systemd/system/codecafe-cv-daily-backup.timer /etc/systemd/system/codecafe-cv-daily-backup.service /usr/local/sbin/codecafe-cv-daily-backup 2>/dev/null || true
RECOVERY="$DATA/active-day-recovery"
sudo mkdir -p "$RECOVERY"
mapfile -t RECOVERIES < <(sudo find "$RECOVERY" -maxdepth 1 -type f -name 'codecafe-cv-*.recovery.json' -printf '%T@ %p\n' 2>/dev/null | sort -nr | cut -d' ' -f2-)
if [ "${#RECOVERIES[@]}" -gt 7 ]; then for old in "${RECOVERIES[@]:7}"; do sudo rm -f -- "$old"; done; fi

echo
echo "=== 7. DEPLOY BACKEND AND FRONTEND ==="
BACKEND_SAFE="${BACKEND}.before-rev79-$STAMP"
sudo cp -a "$BACKEND" "$BACKEND_SAFE"
OWNER="$(stat -c '%U' "$BACKEND")"; GROUP="$(stat -c '%G' "$BACKEND")"; MODE="$(stat -c '%a' "$BACKEND")"
sudo cp server/app.py "$BACKEND"
sudo chown "$OWNER:$GROUP" "$BACKEND"
sudo chmod "$MODE" "$BACKEND"
sudo python3 -m py_compile "$BACKEND"
rm -rf "$WEB/assets"; rm -f "$WEB/index.html"
cp -a dist/assets "$WEB/"; cp -a dist/index.html "$WEB/"

echo
echo "=== 8. START AND VERIFY ==="
sudo systemctl daemon-reload
sudo systemctl restart "$SERVICE"
SERVICE_STOPPED=0
sleep 3
sudo systemctl is-active --quiet "$SERVICE"
sudo python3 - "$LIVE_DB" <<'PY'
import json,sqlite3,sys
db=sqlite3.connect(f'file:{sys.argv[1]}?mode=ro',uri=True)
rows=db.execute('SELECT revision,payload FROM backups').fetchall()
if len(rows)!=1 or rows[0][0]!=79: raise SystemExit(f'ERROR: expected only revision 79, got {[(r[0]) for r in rows]}')
ws=json.loads(rows[0][1]); ws=ws.get('workspace',ws)
docs=ws.get('documents',[]) if isinstance(ws,dict) else []
libs=ws.get('professionalLibraries',[]) if isinstance(ws,dict) else []
print('Live rows: 1')
print('Source revision: 79')
print('CV documents:',len(docs) if isinstance(docs,list) else 0)
print('Libraries:',len(libs) if isinstance(libs,(list,dict)) else 0)
db.close()
PY
curl -fsS http://127.0.0.1:5002/api/health; echo
curl -fsS https://cv.codecafe.io/api/health; echo

echo
echo "============================================================"
echo " DONE"
echo " Revision 79 restored as the single live EC2 workspace."
echo " Max 7 active-change-day recovery points; no calendar timer."
echo " Safety database: $SAFETY"
echo "============================================================"
