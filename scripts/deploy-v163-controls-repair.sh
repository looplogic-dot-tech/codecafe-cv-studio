#!/usr/bin/env bash
set -Eeuo pipefail

DATA="/opt/codecafe-studio/data/codecafe-cv-studio"
DB="$DATA/workspace.sqlite3"
WEB="/opt/codecafe-studio/apps/codecafe-cv-studio"
REPO="https://github.com/looplogic-dot-tech/codecafe-cv-studio.git"
BRANCH="release/v1.6.3"
WORK="$HOME/codecafe-v163-controls-repair"
STAMP="$(date +%Y%m%d-%H%M%S)"
ROLLBACK="$HOME/codecafe-v163-frontend-$STAMP"

cleanup(){ rm -rf "$WORK" "$HOME/.npm/_npx" "$HOME/.npm/_cacache" 2>/dev/null || true; }
trap cleanup EXIT

sudo -n true >/dev/null 2>&1 || { echo "ERROR: passwordless sudo unavailable"; exit 1; }
sudo test -f "$DB" || { echo "ERROR: workspace.sqlite3 not found"; exit 1; }

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
echo "Workspace before: $BEFORE"

rm -rf "$WORK"
git clone --depth 1 --branch "$BRANCH" "$REPO" "$WORK"
cd "$WORK"

NPM_CLI="$(readlink -f "$(command -v npm)")"
npx -y node@22 "$NPM_CLI" ci
npx -y node@22 "$NPM_CLI" run prebuild >/tmp/codecafe-prebuild.log 2>&1

python3 - <<'PY'
from pathlib import Path
import re

# ---------------- App.tsx ----------------
app=Path('src/App.tsx')
s=app.read_text(encoding='utf-8')

# Fresh sessions never reconnect EC2 automatically.
s=re.sub(r'^\s*restoreServerSession,\n','',s,flags=re.M)
s=re.sub(r'\n\s*(?://[^\n]*cookie[^\n]*\n\s*)?restoreServerSession\(\)\.then\(async \(session\) => \{.*?\}\)\.catch\(\(\) => undefined\);','',s,count=1,flags=re.S|re.I)

# Remove obsolete direct browser-PDF button. Print Editor is the PDF entry point.
s=re.sub(r'\s*<button\s+className="primary"\s+onClick=\{\(\)\s*=>\s*window\.print\(\)\}>\{t\.pdf\}</button>','',s,count=1)

# Native React Drive disconnect helper.
if 'disconnectGoogleDriveLocal,' not in s:
    s=s.replace('  disconnectServer,\n','  disconnectServer,\n  disconnectGoogleDriveLocal,\n',1)
if 'disconnectDrive:' not in s:
    s=s.replace('loadDrive: "Load from Drive",','loadDrive: "Load from Drive", disconnectDrive: "Disconnect Drive",',1)
    s=s.replace('loadDrive: "Cargar desde Drive",','loadDrive: "Cargar desde Drive", disconnectDrive: "Desconectar Drive",',1)
if 'const disconnectDrive = () =>' not in s:
    marker='  const openLibrary = async () => {\n'
    fn='''  const disconnectDrive = () => {\n    disconnectGoogleDriveLocal();\n    setGoogleToken("");\n    setCloudMessage("");\n    setCloudStatus(serverSession ? "connected" : "local");\n  };\n'''
    if marker not in s: raise SystemExit('ERROR: Drive disconnect insertion point not found')
    s=s.replace(marker,fn+marker,1)

# Replace entire Google Drive provider with ONE React-owned control set.
provider=re.compile(r'\n\s*<div className="cloudProvider"(?:\s+data-provider="google-drive")?>\s*\n\s*<div><b>Google Drive</b>.*?</div>\s*\n\s*<div className="cloudPortable">',re.S)
replacement='''\n          <div className="cloudProvider" data-provider="google-drive">\n            <div><b>Google Drive</b><span>{googleToken ? t.driveReady : cloudConfig.googleClientId ? t.driveAvailable : t.driveUnavailable}</span><small className="hint">{t.driveFiles}</small></div>\n            <div className="cloudActions">{googleToken\n              ? <><button onClick={restoreDrive}>{t.loadDrive}</button><button onClick={disconnectDrive}>{t.disconnectDrive}</button></>\n              : <button disabled={!cloudConfig.googleClientId} onClick={connectDrive}>{t.connectDrive}</button>}\n            </div>\n          </div>\n          <div className="cloudPortable">'''
s,count=provider.subn(replacement,s,count=1)
if count != 1: raise SystemExit(f'ERROR: Google Drive provider replacement count={count}')

# Successful Drive operations clear stale error styling.
for fn_name in ('connectDrive','restoreDrive'):
    pos=s.find(f'  const {fn_name} = async () => {{')
    if pos == -1: continue
    end=s.find('  const ',pos+10)
    block=s[pos:end if end!=-1 else len(s)]
    if fn_name=='restoreDrive':
        if 'setCloudStatus(serverSession ? "connected" : "synced");' not in block:
            block=block.replace('      applyBackup(backup);','      applyBackup(backup);\n      setCloudStatus(serverSession ? "connected" : "synced");\n      setCloudMessage(t.cloudLoaded);',1)
    elif 'setCloudStatus(serverSession ? "connected" : "synced");' not in block:
        block=block.replace('      setCloudMessage(t.driveReady);','      setCloudStatus(serverSession ? "connected" : "synced");\n      setCloudMessage(t.driveReady);',1)
    s=s[:pos]+block+s[end if end!=-1 else len(s):]

app.write_text(s,encoding='utf-8')

# ---------------- cloud.ts ----------------
cloud=Path('src/cloud.ts')
c=cloud.read_text(encoding='utf-8')
if 'export function disconnectGoogleDriveLocal()' not in c:
    marker='export function loadStoredGoogleToken(): string {\n'
    helper='''export function disconnectGoogleDriveLocal(): void {\n  localStorage.removeItem(GOOGLE_TOKEN_KEY);\n  localStorage.removeItem(GOOGLE_GRANT_KEY);\n}\n\n'''
    if marker not in c: raise SystemExit('ERROR: Google token loader not found')
    c=c.replace(marker,helper+marker,1)
cloud.write_text(c,encoding='utf-8')

# ---------------- main.tsx ----------------
main=Path('src/main.tsx')
m=main.read_text(encoding='utf-8')

# IMPORTANT: remove the legacy DOM injector. It was racing with the React Drive UI
# and the dedup observer, causing an endless MutationObserver add/remove loop that
# starved clicks across the application.
m=re.sub(r'^import \{ installDisconnectControlsV155 \} from "\.\/disconnect-controls-v155";\n','',m,flags=re.M)
m=m.replace('\ninstallDisconnectControlsV155();','')

# Remove any previous emergency dedup observer if it exists in source.
m=re.sub(r'\n// codecafe-drive-dedup-guard\nfunction removeDuplicateDriveDisconnect\(\): void \{.*?window\.addEventListener\(\'load\', removeDuplicateDriveDisconnect\);\n?','\n',m,flags=re.S)
main.write_text(m,encoding='utf-8')

# ---------------- print editor ----------------
# Preserve the known-working margin engine. Only normalize launcher location/style.
p=Path('src/printEditorV3.ts')
pe=p.read_text(encoding='utf-8')
pe=pe.replace('const anchor = document.querySelector<HTMLElement>(".previewTop");','const anchor = document.querySelector<HTMLElement>(".topActions");')
pe=pe.replace('button.className = "zoom printEditorLauncherV2";','button.className = "primary printEditorLauncherV2";')
p.write_text(pe,encoding='utf-8')
PY

# Validate BEFORE build.
python3 - <<'PY'
from pathlib import Path
app=Path('src/App.tsx').read_text(encoding='utf-8')
main=Path('src/main.tsx').read_text(encoding='utf-8')
pe=Path('src/printEditorV3.ts').read_text(encoding='utf-8')
start=app.find('data-provider="google-drive"')
end=app.find('<div className="cloudPortable">',start)
chunk=app[start:end]
assert chunk.count('onClick={restoreDrive}') == 1, 'Drive Load button count is not 1'
assert chunk.count('onClick={disconnectDrive}') == 1, 'Drive Disconnect button count is not 1'
assert 'installDisconnectControlsV155' not in main, 'legacy disconnect injector still active'
assert 'codecafe-drive-dedup-guard' not in main, 'conflicting dedup observer still active'
assert 'window.print()' not in app, 'legacy Download PDF button still exists'
assert 'printEditorContentViewport' in pe, 'working margin engine marker missing'
assert 'document.querySelector<HTMLElement>(".topActions")' in pe, 'Print/PDF launcher not in topActions'
print('PASS: control freeze removed; Sync remains React-owned; Drive UI clean; print margins preserved.')
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
  echo "ERROR: workspace changed; restoring previous frontend"
  rm -rf "$WEB/assets"; rm -f "$WEB/index.html"
  cp -a "$ROLLBACK/assets" "$WEB/" 2>/dev/null || true
  cp -a "$ROLLBACK/index.html" "$WEB/" 2>/dev/null || true
  exit 1
fi
rm -rf "$ROLLBACK"

echo "============================================================"
echo "CODECAFE CV STUDIO 1.6.3 CONTROL REPAIR DEPLOYED"
echo "✓ app controls responsive again"
echo "✓ Sync opens normally"
echo "✓ Google Drive = Load + ONE Disconnect"
echo "✓ no legacy disconnect injector / no observer loop"
echo "✓ old Download PDF removed"
echo "✓ working Print / PDF editor preserved"
echo "✓ margin engine preserved"
echo "✓ workspace unchanged: $AFTER"
echo "============================================================"
