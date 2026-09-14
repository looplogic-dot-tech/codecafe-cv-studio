#!/usr/bin/env bash
set -Eeuo pipefail

DATA="/opt/codecafe-studio/data/codecafe-cv-studio"
DB="$DATA/workspace.sqlite3"
WEB="/opt/codecafe-studio/apps/codecafe-cv-studio"
REPO="https://github.com/looplogic-dot-tech/codecafe-cv-studio.git"
BRANCH="release/v1.6.3"
WORK="$HOME/codecafe-v163-drive-dedup-hard"
STAMP="$(date +%Y%m%d-%H%M%S)"
ROLLBACK="$HOME/codecafe-v163-frontend-$STAMP"

cleanup(){ rm -rf "$WORK" "$HOME/.npm/_npx" "$HOME/.npm/_cacache" 2>/dev/null || true; }
trap cleanup EXIT

sudo -n true >/dev/null 2>&1 || { echo "ERROR: passwordless sudo unavailable"; exit 1; }
sudo test -f "$DB" || { echo "ERROR: workspace.sqlite3 not found"; exit 1; }

fingerprint(){ sudo python3 - "$DB" <<'PY'
import hashlib,json,sqlite3,sys
p=sys.argv[1]
db=sqlite3.connect(f'file:{p}?mode=ro',uri=True)
row=db.execute('SELECT payload FROM workspace_state WHERE id=1').fetchone()
if not row: raise SystemExit('ERROR: workspace missing')
raw=row[0]
print(hashlib.sha256(raw.encode()).hexdigest())
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

# Materialize the current 1.6.3 source state, but keep the old migration chatter off-screen.
npx -y node@22 "$NPM_CLI" run prebuild >/tmp/codecafe-prebuild.log 2>&1

python3 - <<'PY'
from pathlib import Path
import re

app = Path('src/App.tsx')
s = app.read_text(encoding='utf-8')

# Fresh sessions never reconnect EC2 automatically.
s = re.sub(r'^\s*restoreServerSession,\n', '', s, flags=re.M)
s = re.sub(
    r'\n\s*(?://[^\n]*cookie[^\n]*\n\s*)?restoreServerSession\(\)\.then\(async \(session\) => \{.*?\}\)\.catch\(\(\) => undefined\);',
    '', s, count=1, flags=re.S | re.I,
)

# Ensure one local Drive disconnect implementation.
if 'disconnectGoogleDriveLocal,' not in s:
    s = s.replace('  disconnectServer,\n', '  disconnectServer,\n  disconnectGoogleDriveLocal,\n', 1)
if 'disconnectDrive:' not in s:
    s = s.replace('loadDrive: "Load from Drive",', 'loadDrive: "Load from Drive", disconnectDrive: "Disconnect Drive",', 1)
    s = s.replace('loadDrive: "Cargar desde Drive",', 'loadDrive: "Cargar desde Drive", disconnectDrive: "Desconectar Drive",', 1)
if 'const disconnectDrive = () =>' not in s:
    marker='  const openLibrary = async () => {\n'
    fn='''  const disconnectDrive = () => {\n    disconnectGoogleDriveLocal();\n    setGoogleToken("");\n    setCloudMessage("");\n    setCloudStatus(serverSession ? "connected" : "local");\n  };\n'''
    if marker not in s: raise SystemExit('ERROR: Drive disconnect insertion point not found')
    s=s.replace(marker,fn+marker,1)

# Replace the whole Drive provider block with the exact intended connected/disconnected UI.
provider = re.compile(
    r'\n\s*<div className="cloudProvider">\s*\n\s*<div><b>Google Drive</b>.*?</div>\s*\n\s*<div className="cloudPortable">',
    re.S,
)
replacement='''\n          <div className="cloudProvider" data-provider="google-drive">\n            <div><b>Google Drive</b><span>{googleToken ? t.driveReady : cloudConfig.googleClientId ? t.driveAvailable : t.driveUnavailable}</span><small className="hint">{t.driveFiles}</small></div>\n            <div className="cloudActions">{googleToken\n              ? <><button onClick={restoreDrive}>{t.loadDrive}</button><button onClick={disconnectDrive}>{t.disconnectDrive}</button></>\n              : <button disabled={!cloudConfig.googleClientId} onClick={connectDrive}>{t.connectDrive}</button>}\n            </div>\n          </div>\n          <div className="cloudPortable">'''
s,count=provider.subn(replacement,s,count=1)
if count != 1: raise SystemExit(f'ERROR: Google Drive provider replacement count={count}')

# Successful Drive load/connect clears stale error state.
for fn_name,msg in [('connectDrive','t.driveReady'),('restoreDrive','t.cloudLoaded')]:
    pos=s.find(f'  const {fn_name} = async () => {{')
    if pos == -1: continue
    end=s.find('  const ',pos+10)
    block=s[pos:end if end!=-1 else len(s)]
    if fn_name=='restoreDrive':
        block=block.replace('      applyBackup(backup);','      applyBackup(backup);\n      setCloudStatus(serverSession ? "connected" : "synced");\n      setCloudMessage(t.cloudLoaded);',1)
    elif 'setCloudStatus(serverSession ? "connected" : "synced");' not in block:
        block=block.replace('      setCloudMessage(t.driveReady);','      setCloudStatus(serverSession ? "connected" : "synced");\n      setCloudMessage(t.driveReady);',1)
    s=s[:pos]+block+s[end if end!=-1 else len(s):]

app.write_text(s,encoding='utf-8')

cloud=Path('src/cloud.ts')
c=cloud.read_text(encoding='utf-8')
if 'export function disconnectGoogleDriveLocal()' not in c:
    marker='export function loadStoredGoogleToken(): string {\n'
    helper='''export function disconnectGoogleDriveLocal(): void {\n  localStorage.removeItem(GOOGLE_TOKEN_KEY);\n  localStorage.removeItem(GOOGLE_GRANT_KEY);\n}\n\n'''
    if marker not in c: raise SystemExit('ERROR: Google token loader not found')
    c=c.replace(marker,helper+marker,1)
cloud.write_text(c,encoding='utf-8')

# Hard guard: if any legacy runtime injector recreates a third Drive disconnect button,
# remove only that extra control while preserving Load + Disconnect Drive.
main=Path('src/main.tsx')
m=main.read_text(encoding='utf-8')
if 'codecafe-drive-dedup-guard' not in m:
    guard='''\n// codecafe-drive-dedup-guard\nfunction removeDuplicateDriveDisconnect(): void {\n  const provider = document.querySelector<HTMLElement>('[data-provider="google-drive"]');\n  if (!provider) return;\n  const buttons = Array.from(provider.querySelectorAll<HTMLButtonElement>('button'));\n  const disconnects = buttons.filter((button) => /disconnect.*drive/i.test((button.textContent || '').trim()));\n  if (disconnects.length <= 1) return;\n  disconnects.slice(1).forEach((button) => button.remove());\n}\nconst driveDedupObserver = new MutationObserver(removeDuplicateDriveDisconnect);\ndriveDedupObserver.observe(document.documentElement, { childList: true, subtree: true });\nwindow.addEventListener('load', removeDuplicateDriveDisconnect);\n'''
    m += guard
main.write_text(m,encoding='utf-8')
PY

# Validate source before build.
python3 - <<'PY'
from pathlib import Path
s=Path('src/App.tsx').read_text(encoding='utf-8')
start=s.find('data-provider="google-drive"')
end=s.find('<div className="cloudPortable">',start)
chunk=s[start:end]
assert chunk.count('onClick={restoreDrive}') == 1, 'Drive Load button count is not 1'
assert chunk.count('onClick={disconnectDrive}') == 1, 'Drive Disconnect button count is not 1'
print('PASS: source contains exactly Load + one Disconnect for connected Google Drive.')
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
echo "CODECAFE CV STUDIO 1.6.3 DRIVE UI FIX DEPLOYED"
echo "✓ connected Drive shows Load + ONE Disconnect"
echo "✓ duplicate legacy Drive button is actively suppressed"
echo "✓ workspace unchanged: $AFTER"
echo "============================================================"
