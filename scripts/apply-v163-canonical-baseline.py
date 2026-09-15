from pathlib import Path
import re

app = Path('src/App.tsx')
s = app.read_text(encoding='utf-8')

# Canonical 1.6.3 baseline: EC2 must start disconnected on a new browser session.
s = re.sub(r'^\s*restoreServerSession,\n', '', s, flags=re.M)
s = re.sub(r'\n\s*(?://[^\n]*cookie[^\n]*\n\s*)?restoreServerSession\(\)\.then\(async \(session\) => \{.*?\}\)\.catch\(\(\) => undefined\);', '', s, count=1, flags=re.S|re.I)

# Old direct PDF launcher is redundant; Print/PDF is supplied by the working print editor.
s = re.sub(r'\s*<button\s+className="primary"\s+onClick=\{\(\)\s*=>\s*window\.print\(\)\}>\{t\.pdf\}</button>', '', s, count=1)

# Google Drive must have exactly one React-owned disconnect action.
if 'disconnectGoogleDriveLocal,' not in s:
    s = s.replace('  disconnectServer,\n', '  disconnectServer,\n  disconnectGoogleDriveLocal,\n', 1)
if 'disconnectDrive:' not in s:
    s = s.replace('loadDrive: "Load from Drive",', 'loadDrive: "Load from Drive", disconnectDrive: "Disconnect Drive",', 1)
    s = s.replace('loadDrive: "Cargar desde Drive",', 'loadDrive: "Cargar desde Drive", disconnectDrive: "Desconectar Drive",', 1)
if 'const disconnectDrive = () =>' not in s:
    marker = '  const openLibrary = async () => {\n'
    fn = '''  const disconnectDrive = () => {\n    disconnectGoogleDriveLocal();\n    setGoogleToken("");\n    setCloudMessage("");\n    setCloudStatus(serverSession ? "connected" : "local");\n  };\n'''
    if marker not in s:
        raise SystemExit('ERROR: Drive disconnect insertion point not found')
    s = s.replace(marker, fn + marker, 1)
provider = re.compile(r'\n\s*<div className="cloudProvider"(?:\s+data-provider="google-drive")?>\s*\n\s*<div><b>Google Drive</b>.*?</div>\s*\n\s*<div className="cloudPortable">', re.S)
replacement = '''\n          <div className="cloudProvider" data-provider="google-drive">\n            <div><b>Google Drive</b><span>{googleToken ? t.driveReady : cloudConfig.googleClientId ? t.driveAvailable : t.driveUnavailable}</span><small className="hint">{t.driveFiles}</small></div>\n            <div className="cloudActions">{googleToken\n              ? <><button onClick={restoreDrive}>{t.loadDrive}</button><button onClick={disconnectDrive}>{t.disconnectDrive}</button></>\n              : <button disabled={!cloudConfig.googleClientId} onClick={connectDrive}>{t.connectDrive}</button>}\n            </div>\n          </div>\n          <div className="cloudPortable">'''
s, count = provider.subn(replacement, s, count=1)
if count != 1 and 'data-provider="google-drive"' not in s:
    raise SystemExit(f'ERROR: Google Drive provider replacement count={count}')

# Configurable content fields: identity/contact fields stay fixed.
old = '''function Field({ label, wide, children }: { label: string; wide?: boolean; children: React.ReactNode }) {\n  return <label className={wide ? "wide" : ""}>{label}{children}</label>;\n}'''
if old in s:
    new = '''function Field({ label, wide, configurable = false, children }: { label: string; wide?: boolean; configurable?: boolean; children: React.ReactNode }) {\n  const documentId = (() => { try { const ws = JSON.parse(localStorage.getItem("codecafe-cv-workspace-v2") || "null"); return ws?.activeDocumentId || "default"; } catch { return "default"; } })();\n  const key = label.trim().toLocaleLowerCase().replace(/[^a-z0-9áéíóúñ]+/gi, "-").replace(/^-|-$/g, "");\n  const storageKey = `codecafe-configurable-field:${documentId}:${key}`;\n  const [fieldState, setFieldState] = useState<{hidden:boolean;customLabel?:string}>(() => {\n    try { return JSON.parse(localStorage.getItem(storageKey) || "null") || { hidden:false }; } catch { return { hidden:false }; }\n  });\n  const save = (next:{hidden:boolean;customLabel?:string}) => { setFieldState(next); localStorage.setItem(storageKey, JSON.stringify(next)); };\n  if (configurable && fieldState.hidden) return <div className={wide ? "wide editorFieldRestore" : "editorFieldRestore"}><button type="button" onClick={() => save({ ...fieldState, hidden:false })}>＋ {fieldState.customLabel || label}</button></div>;\n  return <label className={`${wide ? "wide " : ""}${configurable ? "editorManagedField" : ""}`}>\n    {configurable ? <span className="editorFieldHead"><span>{fieldState.customLabel || label}</span><span className="editorFieldActions"><button type="button" title="Edit field title" aria-label="Edit field title" onClick={(event) => { event.preventDefault(); const next = window.prompt("Field title:", fieldState.customLabel || label)?.trim(); if (next) save({ ...fieldState, customLabel:next }); }}>✎</button><button type="button" title="Remove field" aria-label="Remove field" onClick={(event) => { event.preventDefault(); save({ ...fieldState, hidden:true }); }}>×</button></span></span> : label}\n    {children}\n  </label>;\n}'''
    s = s.replace(old, new, 1)

replacements = {
  '<Field label={t.summary} wide>':'<Field label={t.summary} wide configurable>',
  '<Field label={t.core}>':'<Field label={t.core} configurable>',
  '<Field label={t.tools}>':'<Field label={t.tools} configurable>',
  '<Field label={t.certifications}>':'<Field label={t.certifications} configurable>',
  '<Field label={t.keywords} wide>':'<Field label={t.keywords} wide configurable>',
  '<Field label={t.education} wide>':'<Field label={t.education} wide configurable>',
  '<Field label={t.languages} wide>':'<Field label={t.languages} wide configurable>',
}
for a, b in replacements.items():
    if a in s:
        s = s.replace(a, b, 1)

# ES/EN toggle must actually change document language.
needle = '  const set = (key: keyof CV, value: string) => setCV((v) => ({ ...v, [key]: value }));'
if 'const changeDocumentLanguage' not in s and needle in s:
    s = s.replace(needle, '''  const changeDocumentLanguage = (next: Lang) => {\n    setLang(next);\n    setCloudStatus("local");\n  };\n''' + needle, 1)
s = s.replace('onClick={() => setLang("es")}>ES</button><button className={lang === "en" ? "selected" : ""} onClick={() => setLang("en")}>EN</button>', 'onClick={() => changeDocumentLanguage("es")}>ES</button><button className={lang === "en" ? "selected" : ""} onClick={() => changeDocumentLanguage("en")}>EN</button>')

app.write_text(s, encoding='utf-8')

cloud = Path('src/cloud.ts')
c = cloud.read_text(encoding='utf-8')
if 'export function disconnectGoogleDriveLocal()' not in c:
    marker = 'export function loadStoredGoogleToken(): string {\n'
    helper = '''export function disconnectGoogleDriveLocal(): void {\n  localStorage.removeItem(GOOGLE_TOKEN_KEY);\n  localStorage.removeItem(GOOGLE_GRANT_KEY);\n}\n\n'''
    if marker not in c:
        raise SystemExit('ERROR: Google token loader not found')
    c = c.replace(marker, helper + marker, 1)
cloud.write_text(c, encoding='utf-8')

# Remove the legacy DOM mutation disconnect installer that caused controls to stop responding.
main = Path('src/main.tsx')
m = main.read_text(encoding='utf-8')
m = re.sub(r'^import \{ installDisconnectControlsV155 \} from "\.\/disconnect-controls-v155";\n', '', m, flags=re.M)
m = m.replace('\ninstallDisconnectControlsV155();', '')
main.write_text(m, encoding='utf-8')

# Preserve working top-right Print/PDF launcher without changing pagination/margin internals.
pe = Path('src/printEditorV3.ts')
p = pe.read_text(encoding='utf-8')
p = p.replace('const anchor = document.querySelector<HTMLElement>(".previewTop");', 'const anchor = document.querySelector<HTMLElement>(".topActions");')
p = p.replace('button.className = "zoom printEditorLauncherV2";', 'button.className = "primary printEditorLauncherV2";')
pe.write_text(p, encoding='utf-8')

css = Path('src/styles.css')
cs = css.read_text(encoding='utf-8')
marker = '/* codecafe-configurable-field-controls */'
if marker not in cs:
    cs += '''\n/* codecafe-configurable-field-controls */\n.editorManagedField{position:relative}.editorFieldHead{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:6px}.editorFieldHead>span:first-child{font-weight:700}.editorFieldActions{display:inline-flex;gap:5px}.editorFieldActions button{width:25px;height:25px;display:grid;place-items:center;border:1px solid #c8d2e2;border-radius:7px;background:#fff;color:#54657d;font-weight:900;line-height:1;cursor:pointer;padding:0}.editorFieldActions button:last-child{color:#b33b3b;border-color:#e5c3c3;background:#fff9f9}.editorFieldActions button:hover{background:#f2f6fb}.editorFieldRestore{display:flex;align-items:center;min-height:38px}.editorFieldRestore button{border:1px dashed #9fb5d5;border-radius:9px;background:#f7faff;color:#2367e8;padding:8px 11px;font-weight:800;cursor:pointer}\n'''
css.write_text(cs, encoding='utf-8')

# Sanity checks for the canonical baseline.
final = app.read_text(encoding='utf-8')
assert '<Field label={t.fullName} wide>' in final and '<Field label={t.fullName} wide configurable>' not in final
assert '<Field label={t.email}>' in final and '<Field label={t.email} configurable>' not in final
assert '<Field label={t.certifications} configurable>' in final
assert '<Field label={t.education} wide configurable>' in final
assert 'changeDocumentLanguage("es")' in final and 'changeDocumentLanguage("en")' in final
assert 'restoreServerSession().then' not in final
assert 'installDisconnectControlsV155' not in main.read_text(encoding='utf-8')
assert 'printEditorContentViewport' in pe.read_text(encoding='utf-8')
print('v1.6.3 canonical baseline applied')
