from pathlib import Path
import re

app = Path('src/App.tsx')
a = app.read_text(encoding='utf-8')

# Restore the original React-owned Print/PDF button in the exact top-bar slot
# it historically occupied: immediately after the cloud button inside .topActions.
# Keep the same class and translated label; route the click into the existing
# V3 print editor instead of calling window.print() directly.
a = re.sub(
    r'\n\s*<button[^\n>]*className="primary"[^\n>]*>\{t\.pdf\}</button>',
    '',
    a,
    count=1,
)
cloud = '          <button className={`topActionButton cloudButton ${cloudStatus}`} onClick={() => setCloudOpen(true)} title={cloudStatusText}>☁ <span>{t.cloud}</span></button>'
button = '          <button id="codecafe-print-editor-launcher" className="primary" onClick={() => window.dispatchEvent(new Event("codecafe-open-print-editor"))}>{t.pdf}</button>'
if button not in a:
    if cloud not in a:
        raise SystemExit('ERROR: historical cloud/print slot not found in App.tsx')
    a = a.replace(cloud, cloud + '\n' + button, 1)
app.write_text(a, encoding='utf-8')

p = Path('src/printEditorV3.ts')
s = p.read_text(encoding='utf-8')

# Do not manufacture or append another print button. The button is React-owned
# in App.tsx, exactly where it was before. V3 only listens for its click event.
start = s.find('function installLauncher(): void {')
end = s.find('\nexport function installPrintEditorV3()', start)
if start < 0 or end < 0:
    raise SystemExit('ERROR: installLauncher block not found')
new_launcher = '''function installLauncher(): void {
  const button = document.getElementById(LAUNCHER_ID) as HTMLButtonElement | null;
  if (!button) return;
  button.dataset.codecafePrintEditor = "1";
}
'''
s = s[:start] + new_launcher + s[end:]

export_marker = 'export function installPrintEditorV3(): void {\n  installRuntimePrintStyle(loadSettings());'
replacement = '''let printLaunchEventBound = false;

export function installPrintEditorV3(): void {
  installRuntimePrintStyle(loadSettings());
  if (!printLaunchEventBound) {
    printLaunchEventBound = true;
    window.addEventListener("codecafe-open-print-editor", openEditor);
  }'''
if export_marker not in s:
    if 'window.addEventListener("codecafe-open-print-editor", openEditor);' not in s:
        raise SystemExit('ERROR: installPrintEditorV3 insertion point not found')
else:
    s = s.replace(export_marker, replacement, 1)

# A break that already lands at the top of a page does not need a spacer.
# Use the applied break classes, not spacer count, to determine whether the
# layout is already current; this prevents a MutationObserver refresh loop.
s = s.replace(
    '  const currentSpacers = source.querySelectorAll(".manualPrintBreakSpacerRuntime").length;\n  if (!force && signature === lastManualLayoutSignature && currentSpacers === expected) return;',
    '  const currentBreaks = source.querySelectorAll(".manualPrintBreak").length;\n  if (!force && signature === lastManualLayoutSignature && currentBreaks === expected) return;',
)

p.write_text(s, encoding='utf-8')

final_app = app.read_text(encoding='utf-8')
final = p.read_text(encoding='utf-8')
assert 'id="codecafe-print-editor-launcher" className="primary"' in final_app
assert 'codecafe-open-print-editor' in final_app
assert final_app.index('cloudButton ${cloudStatus}') < final_app.index('id="codecafe-print-editor-launcher"')
assert 'const anchor = document.querySelector<HTMLElement>(".previewTop")' not in final
assert 'const anchor = document.querySelector<HTMLElement>(".topActions")' not in final
assert 'window.addEventListener("codecafe-open-print-editor", openEditor);' in final
assert 'currentBreaks === expected' in final
assert 'manualBreaks: string[]' in final
assert 'Place page breaks' in final
print('PASS: original React Print/PDF button restored to its historical top-bar slot; V3 editor + page breaks retained')
