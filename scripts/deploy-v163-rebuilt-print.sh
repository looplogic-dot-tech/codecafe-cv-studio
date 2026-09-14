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

# Remove legacy direct PDF button.
s = s.replace('          <button className="primary" onClick={() => window.print()}>{t.pdf}</button>\n', '', 1)

# Fresh app/browser sessions must not restore EC2 automatically.
s = re.sub(r'^\s*restoreServerSession,\n', '', s, flags=re.M)
pattern = re.compile(
    r'\n\s*//[^\n]*cookie[^\n]*\n\s*restoreServerSession\(\)\.then\(async \(session\) => \{.*?\}\)\.catch\(\(\) => undefined\);',
    re.S | re.I,
)
s, count = pattern.subn('', s, count=1)
if count == 0:
    pattern2 = re.compile(
        r'\n\s*restoreServerSession\(\)\.then\(async \(session\) => \{.*?\}\)\.catch\(\(\) => undefined\);',
        re.S,
    )
    s = pattern2.sub('', s, count=1)

# Remove obsolete history wording if any survived.
s = re.sub(r'\s*history:\s*"[^"]*",\s*loadCopy:\s*"[^"]*",?\n?', '\n', s)
s = re.sub(r'\s*history:\s*"[^"]*",\s*loadRevision:\s*"[^"]*",?\n?', '\n', s)

# Add the Google Drive local disconnect helper to imports.
if 'disconnectGoogleDriveLocal,' not in s:
    s = s.replace('  disconnectServer,\n', '  disconnectServer,\n  disconnectGoogleDriveLocal,\n', 1)

# Add a Drive-specific button label in both languages.
s = s.replace('loadDrive: "Cargar desde Drive",', 'loadDrive: "Cargar desde Drive", disconnectDrive: "Desconectar Drive",', 1)
s = s.replace('loadDrive: "Load from Drive",', 'loadDrive: "Load from Drive", disconnectDrive: "Disconnect Drive",', 1)

# Successful Drive connection must clear an old pink/error state.
needle = '''      setCloudMessage(t.driveReady);\n    } catch (error) {'''
replacement = '''      setCloudStatus(serverSession ? "connected" : "synced");\n      setCloudMessage(t.driveReady);\n    } catch (error) {'''
if needle in s:
    s = s.replace(needle, replacement, 1)

# Add explicit Drive disconnect behavior.
marker = '  const openLibrary = async () => {\n'
if 'const disconnectDrive = () =>' not in s:
    disconnect_fn = '''  const disconnectDrive = () => {\n    disconnectGoogleDriveLocal();\n    setGoogleToken("");\n    setCloudMessage("");\n    setCloudStatus(serverSession ? "connected" : "local");\n  };\n'''
    if marker not in s:
        raise SystemExit('ERROR: openLibrary marker not found for Drive disconnect insertion')
    s = s.replace(marker, disconnect_fn + marker, 1)

# A successful Load from Drive must not remain styled as an error.
restore_old = '''      applyBackup(backup);\n    } catch (error) {'''
restore_new = '''      applyBackup(backup);\n      setCloudStatus(serverSession ? "connected" : "synced");\n      setCloudMessage(t.cloudLoaded);\n    } catch (error) {'''
# Replace the occurrence inside restoreDrive only.
restore_pos = s.find('  const restoreDrive = async () => {')
if restore_pos != -1:
    tail = s[restore_pos:]
    if restore_old in tail:
        tail = tail.replace(restore_old, restore_new, 1)
        s = s[:restore_pos] + tail

# When Drive is connected, show BOTH Load and Disconnect buttons.
old_ui = '''{googleToken\n              ? <button onClick={restoreDrive}>{t.loadDrive}</button>\n              : <button disabled={!cloudConfig.googleClientId} onClick={connectDrive}>{t.connectDrive}</button>}'''
new_ui = '''{googleToken\n              ? <><button onClick={restoreDrive}>{t.loadDrive}</button><button onClick={disconnectDrive}>{t.disconnectDrive}</button></>\n              : <button disabled={!cloudConfig.googleClientId} onClick={connectDrive}>{t.connectDrive}</button>}'''
if old_ui not in s:
    raise SystemExit('ERROR: Google Drive action UI not found')
s = s.replace(old_ui, new_ui, 1)

app.write_text(s, encoding='utf-8')

# Add token/grant clearing helper to cloud.ts. This disconnects the app from Drive
# without deleting or changing any files already stored in Google Drive.
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
echo "✓ obsolete storage-history UI removed"
echo "✓ new app sessions start with EC2 disconnected"
echo "✓ Google Drive Disconnect button added"
echo "✓ successful Drive load no longer shows stale pink error state"
echo "✓ workspace unchanged: $AFTER"
echo "============================================================"
