from pathlib import Path

p = Path('src/printPreview.ts')
s = p.read_text(encoding='utf-8')
start = s.find('function ensureLauncher(): void {')
end = s.find('\nexport function installPrintPreview()', start)
if start < 0 or end < 0:
    raise SystemExit('ERROR: ensureLauncher block not found')

new = '''function ensureLauncher(): void {
  const actions = document.querySelector<HTMLElement>(".topActions");
  if (!actions) return;

  // Exact historical placement used by the working unified print editor:
  // final primary button in the top action bar, after the cloud control.
  const original = actions.querySelector<HTMLButtonElement>(":scope > button.primary");
  if (original) original.style.display = "none";

  let button = document.getElementById(LAUNCHER_ID) as HTMLButtonElement | null;
  if (!button) {
    button = document.createElement("button");
    button.id = LAUNCHER_ID;
    button.type = "button";
    button.className = "primary printEditorLauncherV2";
    button.addEventListener("click", openPrintSetup);
    actions.appendChild(button);
  }
  button.textContent = language() === "es" ? "Imprimir / PDF" : "Print / PDF";
}
'''

s = s[:start] + new + s[end:]
p.write_text(s, encoding='utf-8')
check = p.read_text(encoding='utf-8')
assert 'const actions = document.querySelector<HTMLElement>(".topActions")' in check
assert 'button.className = "primary printEditorLauncherV2"' in check
assert 'actions.appendChild(button)' in check
assert 'const anchor = document.querySelector<HTMLElement>(".previewTop")' not in check
print('PASS: Print/PDF restored to historical top action-bar slot')
