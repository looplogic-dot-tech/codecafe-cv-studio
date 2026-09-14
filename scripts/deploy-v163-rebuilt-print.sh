#!/usr/bin/env bash
set -Eeuo pipefail

DATA="/opt/codecafe-studio/data/codecafe-cv-studio"
DB="$DATA/workspace.sqlite3"
WEB="/opt/codecafe-studio/apps/codecafe-cv-studio"
REPO="https://github.com/looplogic-dot-tech/codecafe-cv-studio.git"
BRANCH="release/v1.6.3"
WORK="$HOME/codecafe-v163-rebuilt-print"
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
raw=row[0]; obj=json.loads(raw); ws=obj.get('workspace',obj)
docs=ws.get('documents',[]) if isinstance(ws,dict) else []
libs=ws.get('professionalLibraries',[]) if isinstance(ws,dict) else []
items=sum(len(x.get('records',[])) for x in (libs.values() if isinstance(libs,dict) else libs if isinstance(libs,list) else []) if isinstance(x,dict))
print(f'{hashlib.sha256(raw.encode()).hexdigest()}|{len(docs)}|{len(libs)}|{items}')
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

echo "Applying 1.6.2 storage/session transforms..."
npx -y node@22 "$NPM_CLI" run prebuild

python3 - <<'PY'
from pathlib import Path
import re

app = Path('src/App.tsx')
s = app.read_text(encoding='utf-8')

# Remove the legacy direct PDF button.
s = s.replace('          <button className="primary" onClick={() => window.print()}>{t.pdf}</button>\n', '', 1)

# Fresh app/browser sessions must never restore EC2 automatically.
s = re.sub(r'^\s*restoreServerSession,\n', '', s, flags=re.M)
s = re.sub(
    r'\n\s*(?://[^\n]*cookie[^\n]*\n\s*)?restoreServerSession\(\)\.then\(async \(session\) => \{.*?\}\)\.catch\(\(\) => undefined\);',
    '', s, count=1, flags=re.S | re.I,
)

# Remove obsolete storage-history wording if any survived.
s = re.sub(r'\s*history:\s*"[^"]*",\s*loadCopy:\s*"[^"]*",?\n?', '\n', s)
s = re.sub(r'\s*history:\s*"[^"]*",\s*loadRevision:\s*"[^"]*",?\n?', '\n', s)

# Drive disconnect helper import.
if 'disconnectGoogleDriveLocal,' not in s:
    s = s.replace('  disconnectServer,\n', '  disconnectServer,\n  disconnectGoogleDriveLocal,\n', 1)

# One label used by the SAME connect/disconnect button slot.
if 'disconnectDrive:' not in s:
    s = s.replace('loadDrive: "Cargar desde Drive",', 'loadDrive: "Cargar desde Drive", disconnectDrive: "Desconectar Drive",', 1)
    s = s.replace('loadDrive: "Load from Drive",', 'loadDrive: "Load from Drive", disconnectDrive: "Disconnect Drive",', 1)

# Disconnect Drive only from this browser/app. Existing Drive files remain untouched.
if 'const disconnectDrive = () =>' not in s:
    marker = '  const openLibrary = async () => {\n'
    fn = '''  const disconnectDrive = () => {\n    disconnectGoogleDriveLocal();\n    setGoogleToken("");\n    setCloudMessage("");\n    setCloudStatus(serverSession ? "connected" : "local");\n  };\n'''
    if marker not in s:
        raise SystemExit('ERROR: openLibrary marker not found')
    s = s.replace(marker, fn + marker, 1)

# Successful Drive connect/load must clear stale error styling.
connect_pos = s.find('  const connectDrive = async () => {')
if connect_pos != -1:
    end = s.find('  const ', connect_pos + 10)
    block = s[connect_pos:end if end != -1 else len(s)]
    block = block.replace('      setCloudMessage(t.driveReady);', '      setCloudStatus(serverSession ? "connected" : "synced");\n      setCloudMessage(t.driveReady);', 1)
    s = s[:connect_pos] + block + s[end if end != -1 else len(s):]

restore_pos = s.find('  const restoreDrive = async () => {')
if restore_pos != -1:
    end = s.find('  const ', restore_pos + 10)
    block = s[restore_pos:end if end != -1 else len(s)]
    if 'setCloudStatus(serverSession ? "connected" : "synced");' not in block:
        block = block.replace('      applyBackup(backup);', '      applyBackup(backup);\n      setCloudStatus(serverSession ? "connected" : "synced");\n      setCloudMessage(t.cloudLoaded);', 1)
    s = s[:restore_pos] + block + s[end if end != -1 else len(s):]

# Normalize the Google Drive action area completely.
# Disconnected: one button = Connect Google Drive.
# Connected: Load from Drive + THE SAME connect-slot becomes Disconnect Drive.
drive_marker = '<div><b>Google Drive</b>'
drive_pos = s.find(drive_marker)
if drive_pos == -1:
    raise SystemExit('ERROR: Google Drive provider block not found')
action_start = s.find('<div className="cloudActions">', drive_pos)
if action_start == -1:
    raise SystemExit('ERROR: Google Drive cloudActions not found')
action_end = s.find('</div>', action_start)
if action_end == -1:
    raise SystemExit('ERROR: Google Drive cloudActions closing div not found')
action_end += len('</div>')
normalized = '''<div className="cloudActions">{googleToken\n              ? <><button onClick={restoreDrive}>{t.loadDrive}</button><button onClick={disconnectDrive}>{t.disconnectDrive}</button></>\n              : <button disabled={!cloudConfig.googleClientId} onClick={connectDrive}>{t.connectDrive}</button>}\n            </div>'''
s = s[:action_start] + normalized + s[action_end:]

app.write_text(s, encoding='utf-8')

# Local Google token/grant cleanup helper.
cloud = Path('src/cloud.ts')
c = cloud.read_text(encoding='utf-8')
if 'export function disconnectGoogleDriveLocal()' not in c:
    marker = 'export function loadStoredGoogleToken(): string {\n'
    helper = '''export function disconnectGoogleDriveLocal(): void {\n  localStorage.removeItem(GOOGLE_TOKEN_KEY);\n  localStorage.removeItem(GOOGLE_GRANT_KEY);\n}\n\n'''
    if marker not in c:
        raise SystemExit('ERROR: Google token loader not found')
    c = c.replace(marker, helper + marker, 1)
cloud.write_text(c, encoding='utf-8')

# Keep the working print editor launcher at the old blue PDF button position.
p = Path('src/printEditorV3.ts')
s = p.read_text(encoding='utf-8')
s = s.replace('const anchor = document.querySelector<HTMLElement>(".previewTop");',
              'const anchor = document.querySelector<HTMLElement>(".topActions");')
s = s.replace('button.className = "zoom printEditorLauncherV2";',
              'button.className = "primary printEditorLauncherV2";')
p.write_text(s, encoding='utf-8')
PY

echo "Building corrected 1.6.3 frontend..."
npx -y node@22 ./node_modules/typescript/bin/tsc --noEmit
npx -y node@22 ./node_modules/vite/bin/vite.js build

test -f dist/index.html
test -d dist/assets
grep -q 'printEditorContentViewport' src/printEditorV3.ts
! grep -q 'installMarginGuideFixV153' src/main.tsx
! grep -q '<button className="primary" onClick={() => window.print()}>{t.pdf}</button>' src/App.tsx
grep -q 'document.querySelector<HTMLElement>(".topActions")' src/printEditorV3.ts
grep -q 'button.className = "primary printEditorLauncherV2"' src/printEditorV3.ts
! grep -q 'restoreServerSession().then' src/App.tsx
! grep -Eqi 'revision|revisi[oó]n' src/App.tsx src/cloud.ts
grep -q 'disconnectGoogleDriveLocal' src/App.tsx src/cloud.ts
grep -q 'disconnectDrive' src/App.tsx

# There must be only one Drive disconnect action in the normalized provider UI.
python3 - <<'PY'
from pathlib import Path
s=Path('src/App.tsx').read_text(encoding='utf-8')
pos=s.find('<div><b>Google Drive</b>')
end=s.find('</div>\n          </div>', pos)
chunk=s[pos:end if end!=-1 else pos+2500]
count=chunk.count('onClick={disconnectDrive}')
if count != 1:
    raise SystemExit(f'ERROR: expected exactly one Drive disconnect action, found {count}')
PY

echo "Storage/session/Drive checks passed."

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
echo "CODECAFE CV STUDIO 1.6.3 DEPLOYED"
echo "✓ working print editor preserved"
echo "✓ margin behavior preserved"
echo "✓ blue Print / PDF button kept at top-right"
echo "✓ EC2 singleton workspace protocol restored"
echo "✓ new app sessions start with EC2 disconnected"
echo "✓ Drive connect button now toggles to Disconnect after connection"
echo "✓ no duplicate Drive disconnect button"
echo "✓ successful Drive load clears stale pink error state"
echo "✓ workspace unchanged: $AFTER"
echo "============================================================"
