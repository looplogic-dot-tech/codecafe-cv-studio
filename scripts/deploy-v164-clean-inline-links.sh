#!/usr/bin/env bash
set -Eeuo pipefail

DATA="/opt/codecafe-studio/data/codecafe-cv-studio"
DB="$DATA/workspace.sqlite3"
WEB="/opt/codecafe-studio/apps/codecafe-cv-studio"
REPO="https://github.com/looplogic-dot-tech/codecafe-cv-studio.git"
BASE_BRANCH="release/v1.6.3"
WORK="$HOME/codecafe-v164-clean"
STAMP="$(date +%Y%m%d-%H%M%S)"
ROLLBACK="$HOME/codecafe-v164-rollback-$STAMP"

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

echo "============================================================"
echo " CODECAFE CV STUDIO 1.6.4"
echo " CLEAN 1.6.3 BASELINE + INLINE HYPERLINKS"
echo "============================================================"
echo "Workspace before: $BEFORE"

rm -rf "$WORK"
git clone --depth 1 --branch "$BASE_BRANCH" "$REPO" "$WORK"
cd "$WORK"
NPM_CLI="$(readlink -f "$(command -v npm)")"
npx -y node@22 "$NPM_CLI" ci
npx -y node@22 "$NPM_CLI" run prebuild >/tmp/codecafe-v164-prebuild.log 2>&1

python3 - <<'PY'
from pathlib import Path
import json,re

# ---- package version ----
pkg=Path('package.json')
data=json.loads(pkg.read_text(encoding='utf-8'))
data['version']='1.6.4'
pkg.write_text(json.dumps(data,indent=2,ensure_ascii=False)+'\n',encoding='utf-8')

# ---- preserve repaired 1.6.3 baseline behavior ----
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
    if marker not in s: raise SystemExit('ERROR: Drive insertion point missing')
    s=s.replace(marker,fn+marker,1)

provider=re.compile(r'\n\s*<div className="cloudProvider"(?:\s+data-provider="google-drive")?>\s*\n\s*<div><b>Google Drive</b>.*?</div>\s*\n\s*<div className="cloudPortable">',re.S)
replacement='''\n          <div className="cloudProvider" data-provider="google-drive">\n            <div><b>Google Drive</b><span>{googleToken ? t.driveReady : cloudConfig.googleClientId ? t.driveAvailable : t.driveUnavailable}</span><small className="hint">{t.driveFiles}</small></div>\n            <div className="cloudActions">{googleToken\n              ? <><button onClick={restoreDrive}>{t.loadDrive}</button><button onClick={disconnectDrive}>{t.disconnectDrive}</button></>\n              : <button disabled={!cloudConfig.googleClientId} onClick={connectDrive}>{t.connectDrive}</button>}\n            </div>\n          </div>\n          <div className="cloudPortable">'''
s,count=provider.subn(replacement,s,count=1)
if count != 1: raise SystemExit(f'ERROR: Google Drive provider replacement count={count}')

# Configurable fields only; identity/contact remains fixed.
old='''function Field({ label, wide, children }: { label: string; wide?: boolean; children: React.ReactNode }) {\n  return <label className={wide ? "wide" : ""}>{label}{children}</label>;\n}'''
new='''function Field({ label, wide, configurable = false, children }: { label: string; wide?: boolean; configurable?: boolean; children: React.ReactNode }) {\n  const documentId = (() => { try { const ws = JSON.parse(localStorage.getItem("codecafe-cv-workspace-v2") || "null"); return ws?.activeDocumentId || "default"; } catch { return "default"; } })();\n  const key = label.trim().toLocaleLowerCase().replace(/[^a-z0-9áéíóúñ]+/gi, "-").replace(/^-|-$/g, "");\n  const storageKey = `codecafe-configurable-field:${documentId}:${key}`;\n  const [fieldState, setFieldState] = useState<{hidden:boolean;customLabel?:string}>(() => {\n    try { return JSON.parse(localStorage.getItem(storageKey) || "null") || { hidden:false }; } catch { return { hidden:false }; }\n  });\n  const save = (next:{hidden:boolean;customLabel?:string}) => { setFieldState(next); localStorage.setItem(storageKey, JSON.stringify(next)); };\n  if (configurable && fieldState.hidden) return <div className={wide ? "wide editorFieldRestore" : "editorFieldRestore"}><button type="button" onClick={() => save({ ...fieldState, hidden:false })}>＋ {fieldState.customLabel || label}</button></div>;\n  return <label className={`${wide ? "wide " : ""}${configurable ? "editorManagedField" : ""}`}>\n    {configurable ? <span className="editorFieldHead"><span>{fieldState.customLabel || label}</span><span className="editorFieldActions"><button type="button" title="Edit field title" aria-label="Edit field title" onClick={(event) => { event.preventDefault(); const next = window.prompt("Field title:", fieldState.customLabel || label)?.trim(); if (next) save({ ...fieldState, customLabel:next }); }}>✎</button><button type="button" title="Remove field" aria-label="Remove field" onClick={(event) => { event.preventDefault(); save({ ...fieldState, hidden:true }); }}>×</button></span></span> : label}\n    {children}\n  </label>;\n}'''
if old not in s: raise SystemExit('ERROR: base Field component missing')
s=s.replace(old,new,1)
for a,b in {
  '<Field label={t.summary} wide>':'<Field label={t.summary} wide configurable>',
  '<Field label={t.core}>':'<Field label={t.core} configurable>',
  '<Field label={t.tools}>':'<Field label={t.tools} configurable>',
  '<Field label={t.certifications}>':'<Field label={t.certifications} configurable>',
  '<Field label={t.keywords} wide>':'<Field label={t.keywords} wide configurable>',
  '<Field label={t.education} wide>':'<Field label={t.education} wide configurable>',
  '<Field label={t.languages} wide>':'<Field label={t.languages} wide configurable>',
}.items():
    if a not in s: raise SystemExit(f'ERROR: configurable field missing: {a}')
    s=s.replace(a,b,1)

needle='  const set = (key: keyof CV, value: string) => setCV((v) => ({ ...v, [key]: value }));'
if 'const changeDocumentLanguage' not in s:
    if needle not in s: raise SystemExit('ERROR: language insertion point missing')
    s=s.replace(needle,'  const changeDocumentLanguage = (next: Lang) => { setLang(next); setCloudStatus("local"); };\n'+needle,1)
s=s.replace('onClick={() => setLang("es")}>ES</button><button className={lang === "en" ? "selected" : ""} onClick={() => setLang("en")}>EN</button>', 'onClick={() => changeDocumentLanguage("es")}>ES</button><button className={lang === "en" ? "selected" : ""} onClick={() => changeDocumentLanguage("en")}>EN</button>',1)

# ---- NEW 1.6.4 FEATURE: inline hyperlinks in configurable content ----
start=s.find('function InlineText({ value }: { value: string })')
end=s.find('\nfunction BoldInlineText',start)
if start<0 or end<0: raise SystemExit('ERROR: InlineText renderer missing')
new_inline=r'''function InlineText({ value }: { value: string }) {
  const parts: React.ReactNode[] = [];
  const pattern = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)|(https?:\/\/[^\s<]+)/gi;
  let cursor = 0;
  let key = 0;
  for (const match of value.matchAll(pattern)) {
    const index = match.index ?? 0;
    if (index > cursor) parts.push(value.slice(cursor, index));
    const label = match[1] || match[3];
    const href = match[2] || match[3];
    parts.push(<a href={href} target="_blank" rel="noreferrer" key={`link-${key++}`}>{label}</a>);
    cursor = index + match[0].length;
  }
  if (cursor < value.length) parts.push(value.slice(cursor));
  return <>{parts}</>;
}
'''
s=s[:start]+new_inline+s[end:]

start=s.find('function printableInlineText(value: string): string')
end=s.find('\nfunction printableRepository',start)
if start<0 or end<0: raise SystemExit('ERROR: printableInlineText missing')
new_print=r'''function printableInlineText(value: string): string {
  const pattern = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)|(https?:\/\/[^\s<]+)/gi;
  let cursor = 0;
  let html = "";
  for (const match of value.matchAll(pattern)) {
    const index = match.index ?? 0;
    html += escapeHtml(value.slice(cursor, index));
    const label = match[1] || match[3];
    const href = match[2] || match[3];
    html += `<a href="${escapeHtml(href)}">${escapeHtml(label)}</a>`;
    cursor = index + match[0].length;
  }
  html += escapeHtml(value.slice(cursor));
  return html;
}
'''
s=s[:start]+new_print+s[end:]
app.write_text(s,encoding='utf-8')

# cloud helper
cloud=Path('src/cloud.ts')
c=cloud.read_text(encoding='utf-8')
if 'export function disconnectGoogleDriveLocal()' not in c:
    marker='export function loadStoredGoogleToken(): string {\n'
    helper='''export function disconnectGoogleDriveLocal(): void {\n  localStorage.removeItem(GOOGLE_TOKEN_KEY);\n  localStorage.removeItem(GOOGLE_GRANT_KEY);\n}\n\n'''
    if marker not in c: raise SystemExit('ERROR: Google token loader missing')
    c=c.replace(marker,helper+marker,1)
cloud.write_text(c,encoding='utf-8')

# legacy disconnect injector stays out
main=Path('src/main.tsx')
m=main.read_text(encoding='utf-8')
m=re.sub(r'^import \{ installDisconnectControlsV155 \} from "\.\/disconnect-controls-v155";\n','',m,flags=re.M)
m=m.replace('\ninstallDisconnectControlsV155();','')
main.write_text(m,encoding='utf-8')

# field-control styling
css=Path('src/styles.css')
c=css.read_text(encoding='utf-8')
if '/* codecafe-configurable-field-controls */' not in c:
    c+='''\n/* codecafe-configurable-field-controls */\n.editorManagedField{position:relative}.editorFieldHead{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:6px}.editorFieldHead>span:first-child{font-weight:700}.editorFieldActions{display:inline-flex;gap:5px}.editorFieldActions button{width:25px;height:25px;display:grid;place-items:center;border:1px solid #c8d2e2;border-radius:7px;background:#fff;color:#54657d;font-weight:900;line-height:1;cursor:pointer;padding:0}.editorFieldActions button:last-child{color:#b33b3b;border-color:#e5c3c3;background:#fff9f9}.editorFieldActions button:hover{background:#f2f6fb}.editorFieldRestore{display:flex;align-items:center;min-height:38px}.editorFieldRestore button{border:1px dashed #9fb5d5;border-radius:9px;background:#f7faff;color:#2367e8;padding:8px 11px;font-weight:800;cursor:pointer}\n'''
css.write_text(c,encoding='utf-8')

# launcher location only; margin engine untouched
pe=Path('src/printEditorV3.ts')
x=pe.read_text(encoding='utf-8')
x=x.replace('const anchor = document.querySelector<HTMLElement>(".previewTop");','const anchor = document.querySelector<HTMLElement>(".topActions");')
x=x.replace('button.className = "zoom printEditorLauncherV2";','button.className = "primary printEditorLauncherV2";')
pe.write_text(x,encoding='utf-8')
PY

python3 - <<'PY'
from pathlib import Path
import json
app=Path('src/App.tsx').read_text(encoding='utf-8')
main=Path('src/main.tsx').read_text(encoding='utf-8')
pe=Path('src/printEditorV3.ts').read_text(encoding='utf-8')
pkg=json.loads(Path('package.json').read_text(encoding='utf-8'))
assert pkg['version']=='1.6.4'
assert '<Field label={t.fullName} wide>' in app and '<Field label={t.fullName} wide configurable>' not in app
assert '<Field label={t.certifications} configurable>' in app
assert 'changeDocumentLanguage("es")' in app and 'changeDocumentLanguage("en")' in app
assert 'href={href}' in app and 'printableInlineText' in app
assert 'installDisconnectControlsV155' not in main
assert 'printEditorContentViewport' in pe
print('PASS: valid 1.6.3 baseline + only new 1.6.4 hyperlink feature')
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
echo " CODECAFE CV STUDIO 1.6.4 DEPLOYED"
echo "============================================================"
echo "✓ based only on release/v1.6.3"
echo "✓ repaired 1.6.3 baseline preserved"
echo "✓ NEW: inline hyperlinks [text](https://url)"
echo "✓ bare https:// URLs also link"
echo "✓ workspace unchanged: $AFTER"
echo "============================================================"
