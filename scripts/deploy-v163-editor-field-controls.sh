#!/usr/bin/env bash
set -Eeuo pipefail

DATA="/opt/codecafe-studio/data/codecafe-cv-studio"
DB="$DATA/workspace.sqlite3"
WEB="/opt/codecafe-studio/apps/codecafe-cv-studio"
REPO="https://github.com/looplogic-dot-tech/codecafe-cv-studio.git"
BRANCH="release/v1.6.3"
WORK="$HOME/codecafe-v163-field-controls"
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

# Re-apply the already proven 1.6.3 control/Drive safety repairs after the historical prebuild chain.
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
main.write_text(m,encoding='utf-8')
PY

# Restore EDIT / REMOVE / ADD-BACK controls to every standard editor Field.
python3 - <<'PY'
from pathlib import Path
import re
p=Path('src/App.tsx')
s=p.read_text(encoding='utf-8')
old='''function Field({ label, wide, children }: { label: string; wide?: boolean; children: React.ReactNode }) {\n  return <label className={wide ? "wide" : ""}>{label}{children}</label>;\n}'''
new=r'''function editorFieldKey(label: string): string {
  const normalized = label.trim().toLocaleLowerCase();
  const ids: Record<string,string> = {
    "full name":"name", "nombre completo":"name",
    "professional title":"professional-title", "título profesional":"professional-title",
    "email":"email", "correo":"email",
    "phone":"phone", "teléfono":"phone",
    "location":"location", "ubicación":"location",
    "linkedin / portfolio":"linkedin", "linkedin / portafolio":"linkedin",
    "professional summary":"summary", "resumen profesional":"summary",
    "position":"role", "puesto":"role",
    "company":"company", "empresa":"company",
    "dates":"dates", "periodo":"dates",
    "achievements and responsibilities":"achievements", "logros y responsabilidades":"achievements",
    "core skills":"core-skills", "core skills / competencias centrales":"core-skills",
    "tools & technologies":"tools", "herramientas y tecnologías":"tools",
    "certifications & coursework":"certifications", "certificaciones y cursos":"certifications",
    "project name":"project-name", "nombre del proyecto":"project-name",
    "technology stack":"project-stack", "tecnologías":"project-stack",
    "description and outcome":"project-description", "descripción y resultado":"project-description",
    "repository":"repository", "repositorio":"repository",
    "section title":"custom-title", "título de la sección":"custom-title",
    "content":"custom-content", "contenido":"custom-content",
    "skills and keywords":"skills", "habilidades y palabras clave":"skills",
    "education":"education", "educación":"education",
    "languages":"languages", "idiomas":"languages"
  };
  return ids[normalized] || normalized.replace(/[^a-z0-9áéíóúñ]+/gi,"-").replace(/^-|-$/g,"");
}

function activeEditorDocumentId(): string {
  try {
    const ws = JSON.parse(localStorage.getItem("codecafe-cv-workspace-v2") || "null");
    return ws?.activeDocumentId || "default";
  } catch { return "default"; }
}

function Field({ label, wide, children }: { label: string; wide?: boolean; children: React.ReactNode }) {
  const key = editorFieldKey(label);
  const storageKey = `codecafe-editor-field:${activeEditorDocumentId()}:${key}`;
  const [config, setConfig] = useState<{hidden:boolean;label:string;value?:string}>(() => {
    try { return JSON.parse(localStorage.getItem(storageKey) || "null") || { hidden:false, label }; }
    catch { return { hidden:false, label }; }
  });
  const labelRef = useRef<HTMLLabelElement | null>(null);
  const saveConfig = (next:{hidden:boolean;label:string;value?:string}) => { setConfig(next); localStorage.setItem(storageKey, JSON.stringify(next)); };
  const edit = () => {
    const next = window.prompt("Field name:", config.label || label)?.trim();
    if (next) saveConfig({ ...config, label: next });
  };
  const remove = () => {
    const control = labelRef.current?.querySelector<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>("input,textarea,select");
    const value = control?.value ?? config.value ?? "";
    if (control) {
      const proto = control instanceof HTMLTextAreaElement ? HTMLTextAreaElement.prototype : control instanceof HTMLSelectElement ? HTMLSelectElement.prototype : HTMLInputElement.prototype;
      const setter = Object.getOwnPropertyDescriptor(proto,"value")?.set;
      setter?.call(control,"");
      control.dispatchEvent(new Event("input",{bubbles:true}));
      control.dispatchEvent(new Event("change",{bubbles:true}));
    }
    saveConfig({ ...config, hidden:true, value });
  };
  const restore = () => {
    const remembered = config.value ?? "";
    saveConfig({ ...config, hidden:false });
    window.requestAnimationFrame(() => window.requestAnimationFrame(() => {
      const root = document.querySelector<HTMLElement>(`[data-editor-field="${key}"]`);
      const control = root?.querySelector<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>("input,textarea,select");
      if (!control || !remembered) return;
      const proto = control instanceof HTMLTextAreaElement ? HTMLTextAreaElement.prototype : control instanceof HTMLSelectElement ? HTMLSelectElement.prototype : HTMLInputElement.prototype;
      const setter = Object.getOwnPropertyDescriptor(proto,"value")?.set;
      setter?.call(control,remembered);
      control.dispatchEvent(new Event("input",{bubbles:true}));
      control.dispatchEvent(new Event("change",{bubbles:true}));
    }));
  };
  if (config.hidden) return <div className={wide ? "wide editorFieldRestore" : "editorFieldRestore"}><button type="button" onClick={restore}>＋ {config.label || label}</button></div>;
  return <label ref={labelRef} data-editor-field={key} className={`${wide ? "wide " : ""}editorManagedField`}><span className="editorFieldHead"><span>{config.label || label}</span><span className="editorFieldActions"><button type="button" title="Edit field" aria-label="Edit field" onClick={(event) => { event.preventDefault(); edit(); }}>✎</button><button type="button" title="Remove field" aria-label="Remove field" onClick={(event) => { event.preventDefault(); remove(); }}>×</button></span></span>{children}</label>;
}'''
if old not in s:
    raise SystemExit('ERROR: Field component signature not found; refusing unsafe patch')
s=s.replace(old,new,1)
p.write_text(s,encoding='utf-8')

css=Path('src/styles.css')
c=css.read_text(encoding='utf-8')
marker='/* codecafe-editor-field-controls */'
if marker not in c:
    c += r'''
/* codecafe-editor-field-controls */
.editorManagedField{position:relative}.editorFieldHead{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:6px}.editorFieldHead>span:first-child{font-weight:700}.editorFieldActions{display:inline-flex;gap:5px;opacity:.9}.editorFieldActions button{width:25px;height:25px;display:grid;place-items:center;border:1px solid #c8d2e2;border-radius:7px;background:#fff;color:#54657d;font-weight:900;line-height:1;cursor:pointer;padding:0}.editorFieldActions button:last-child{color:#b33b3b;border-color:#e5c3c3;background:#fff9f9}.editorFieldActions button:hover{background:#f2f6fb}.editorFieldRestore{display:flex;align-items:center;min-height:38px}.editorFieldRestore button{border:1px dashed #9fb5d5;border-radius:9px;background:#f7faff;color:#2367e8;padding:8px 11px;font-weight:800;cursor:pointer}
'''
css.write_text(c,encoding='utf-8')
PY

# Keep current Print/PDF launcher placement; do not change print/margin internals.
python3 - <<'PY'
from pathlib import Path
p=Path('src/printEditorV3.ts')
s=p.read_text(encoding='utf-8')
s=s.replace('const anchor = document.querySelector<HTMLElement>(".previewTop");','const anchor = document.querySelector<HTMLElement>(".topActions");')
s=s.replace('button.className = "zoom printEditorLauncherV2";','button.className = "primary printEditorLauncherV2";')
p.write_text(s,encoding='utf-8')
PY

python3 - <<'PY'
from pathlib import Path
app=Path('src/App.tsx').read_text(encoding='utf-8')
main=Path('src/main.tsx').read_text(encoding='utf-8')
pe=Path('src/printEditorV3.ts').read_text(encoding='utf-8')
assert 'editorFieldActions' in app and 'editorFieldRestore' in app
assert 'installDisconnectControlsV155' not in main
assert 'printEditorContentViewport' in pe
print('PASS: every standard Field now has Edit + Remove and removed fields have Add-back control.')
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
echo "CV EDITOR FIELD CONTROLS RESTORED — VERSION REMAINS 1.6.3"
echo "✓ every standard field: Edit + Remove"
echo "✓ removed field: Add-back control"
echo "✓ removed value preserved for restore"
echo "✓ Sync/Drive repair preserved"
echo "✓ Print/PDF margin engine untouched"
echo "✓ workspace unchanged: $AFTER"
echo "============================================================"
