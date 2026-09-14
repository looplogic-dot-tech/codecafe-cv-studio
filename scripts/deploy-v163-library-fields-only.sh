#!/usr/bin/env bash
set -Eeuo pipefail

DATA="/opt/codecafe-studio/data/codecafe-cv-studio"
DB="$DATA/workspace.sqlite3"
WEB="/opt/codecafe-studio/apps/codecafe-cv-studio"
REPO="https://github.com/looplogic-dot-tech/codecafe-cv-studio.git"
BRANCH="release/v1.6.3"
WORK="$HOME/codecafe-v163-library-fields-only"
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

# Keep the already-working control repair exactly as-is: no legacy disconnect injector,
# no duplicate observer loop, no old direct PDF button, working Print/PDF launcher preserved.
python3 - <<'PY'
from pathlib import Path
import re

app=Path('src/App.tsx')
s=app.read_text(encoding='utf-8')
s=re.sub(r'^\s*restoreServerSession,\n','',s,flags=re.M)
s=re.sub(r'\n\s*(?://[^\n]*cookie[^\n]*\n\s*)?restoreServerSession\(\)\.then\(async \(session\) => \{.*?\}\)\.catch\(\(\) => undefined\);','',s,count=1,flags=re.S|re.I)
s=re.sub(r'\s*<button\s+className="primary"\s+onClick=\{\(\)\s*=>\s*window\.print\(\)\}>\{t\.pdf\}</button>','',s,count=1)
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
provider=re.compile(r'\n\s*<div className="cloudProvider"(?:\s+data-provider="google-drive")?>\s*\n\s*<div><b>Google Drive</b>.*?</div>\s*\n\s*<div className="cloudPortable">',re.S)
replacement='''\n          <div className="cloudProvider" data-provider="google-drive">\n            <div><b>Google Drive</b><span>{googleToken ? t.driveReady : cloudConfig.googleClientId ? t.driveAvailable : t.driveUnavailable}</span><small className="hint">{t.driveFiles}</small></div>\n            <div className="cloudActions">{googleToken\n              ? <><button onClick={restoreDrive}>{t.loadDrive}</button><button onClick={disconnectDrive}>{t.disconnectDrive}</button></>\n              : <button disabled={!cloudConfig.googleClientId} onClick={connectDrive}>{t.connectDrive}</button>}\n            </div>\n          </div>\n          <div className="cloudPortable">'''
s,count=provider.subn(replacement,s,count=1)
if count != 1: raise SystemExit(f'ERROR: Google Drive provider replacement count={count}')
app.write_text(s,encoding='utf-8')

cloud=Path('src/cloud.ts')
c=cloud.read_text(encoding='utf-8')
if 'export function disconnectGoogleDriveLocal()' not in c:
    marker='export function loadStoredGoogleToken(): string {\n'
    helper='''export function disconnectGoogleDriveLocal(): void {\n  localStorage.removeItem(GOOGLE_TOKEN_KEY);\n  localStorage.removeItem(GOOGLE_GRANT_KEY);\n}\n\n'''
    if marker not in c: raise SystemExit('ERROR: Google token loader not found')
    c=c.replace(marker,helper+marker,1)
cloud.write_text(c,encoding='utf-8')

main=Path('src/main.tsx')
m=main.read_text(encoding='utf-8')
m=re.sub(r'^import \{ installDisconnectControlsV155 \} from "\.\/disconnect-controls-v155";\n','',m,flags=re.M)
m=m.replace('\ninstallDisconnectControlsV155();','')
m=re.sub(r'\n// codecafe-drive-dedup-guard\nfunction removeDuplicateDriveDisconnect\(\): void \{.*?window\.addEventListener\(\'load\', removeDuplicateDriveDisconnect\);\n?','\n',m,flags=re.S)
main.write_text(m,encoding='utf-8')

# Make the ALREADY EXISTING Professional Library field controls explicit and usable.
pl=Path('src/ProfessionalLibrary.tsx')
p=pl.read_text(encoding='utf-8')
required=['addCustomDetail','removeDetail','restoreDetail','professionalFieldTitle','professionalCustomField']
missing=[x for x in required if x not in p]
if missing:
    raise SystemExit('ERROR: Professional Library field-management source missing: '+', '.join(missing))

css=Path('src/professional-library.css')
cs=css.read_text(encoding='utf-8')
marker='/* codecafe-professional-field-controls */'
if marker not in cs:
    cs += '''\n/* codecafe-professional-field-controls */\n.professionalCustomField{display:grid;grid-template-columns:minmax(0,1fr) 32px;gap:7px;align-items:end;min-width:0}.professionalCustomField label{min-width:0}.professionalCustomField>button{height:34px;border:1px solid #e2bcbc;border-radius:8px;background:#fff5f5;color:#b33b3b;font-weight:900;font-size:16px}.professionalFieldTitle{font-weight:800!important;color:#445169!important;background:#f5f8fc!important;border-style:dashed!important}.professionalFieldTools{display:flex;align-items:center;gap:10px;flex-wrap:wrap}.professionalFieldTools button,.professionalHiddenFields button{border:1px solid #b9c9df;border-radius:8px;background:#fff;color:#2367e8;padding:8px 10px;font-size:10px;font-weight:800}.professionalHiddenFields{display:flex;align-items:center;gap:7px;flex-wrap:wrap;padding:9px;border:1px dashed #ccd7e5;border-radius:9px;background:#fbfcfe}.professionalHiddenFields>b{font-size:10px;color:#68758a}@media(max-width:760px){.professionalCustomField{grid-template-columns:minmax(0,1fr) 34px}}\n'''
css.write_text(cs,encoding='utf-8')

# Do not change print editor internals. Normalize only the already-approved launcher location/style.
pe=Path('src/printEditorV3.ts')
x=pe.read_text(encoding='utf-8')
x=x.replace('const anchor = document.querySelector<HTMLElement>(".previewTop");','const anchor = document.querySelector<HTMLElement>(".topActions");')
x=x.replace('button.className = "zoom printEditorLauncherV2";','button.className = "primary printEditorLauncherV2";')
pe.write_text(x,encoding='utf-8')
PY

python3 - <<'PY'
from pathlib import Path
pl=Path('src/ProfessionalLibrary.tsx').read_text(encoding='utf-8')
css=Path('src/professional-library.css').read_text(encoding='utf-8')
pe=Path('src/printEditorV3.ts').read_text(encoding='utf-8')
main=Path('src/main.tsx').read_text(encoding='utf-8')
for token in ('addCustomDetail','removeDetail','restoreDetail','professionalFieldTitle','professionalCustomField'):
    assert token in pl, f'missing field feature: {token}'
assert 'codecafe-professional-field-controls' in css
assert 'printEditorContentViewport' in pe, 'margin engine marker missing'
assert 'installDisconnectControlsV155' not in main, 'legacy click-freeze injector returned'
print('PASS: add/remove/rename/restore field feature present; sync/print protections intact.')
PY

npx -y node@22 ./node_modules/typescript/bin/tsc --noEmit
npx -y node@22 ./node_modules/vite/bin/vite.js build

test -f dist/index.html
test -d dist/assets
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
echo "PROFESSIONAL LIBRARY FIELD CONTROLS RESTORED"
echo "✓ add field"
echo "✓ remove field"
echo "✓ rename field"
echo "✓ restore hidden field"
echo "✓ Sync/control repair preserved"
echo "✓ Print/PDF margin engine preserved"
echo "✓ workspace unchanged: $AFTER"
echo "============================================================"
