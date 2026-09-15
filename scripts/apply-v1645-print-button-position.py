from pathlib import Path

p = Path('src/printPreview.ts')
s = p.read_text(encoding='utf-8')

old = '''function ensureLauncher(): void {
  const actions = document.querySelector<HTMLElement>(".topActions");
  if (!actions) return;
  const original = actions.querySelector<HTMLButtonElement>(":scope > button.primary");
  if (!original) return;
  original.style.display = "none";
  if (document.getElementById(LAUNCHER_ID)) return;

  const button = document.createElement("button");
  button.id = LAUNCHER_ID;
  button.className = "primary printPreviewLauncher";
  button.addEventListener("click", openPrintSetup);
  actions.appendChild(button);

  const updateLabel = () => {
    button.textContent = language() === "es" ? "Vista previa / PDF" : "Print preview / PDF";
  };
  updateLabel();
  new MutationObserver(updateLabel).observe(document.querySelector("main") || document.body, {
    attributes: true,
    attributeFilter: ["lang"],
  });
}
'''

new = '''function ensureLauncher(): void {
  // Restore the Print/PDF control to the exact live-preview header where it existed before.
  const anchor = document.querySelector<HTMLElement>(".previewTop");
  if (!anchor) return;
  if (document.getElementById(LAUNCHER_ID)) return;

  const button = document.createElement("button");
  button.id = LAUNCHER_ID;
  button.type = "button";
  button.className = "zoom printEditorLauncherV2";
  button.textContent = language() === "es" ? "Imprimir / PDF" : "Print / PDF";
  button.addEventListener("click", openPrintSetup);
  anchor.appendChild(button);
}
'''

if old in s:
    s = s.replace(old, new, 1)
elif 'const anchor = document.querySelector<HTMLElement>(".previewTop")' in s and 'printEditorLauncherV2' in s:
    print('print button already restored to live-preview header')
else:
    raise SystemExit('ERROR: ensureLauncher block not found')

p.write_text(s, encoding='utf-8')
check = p.read_text(encoding='utf-8')
assert 'original.style.display = "none"' not in check
assert 'const anchor = document.querySelector<HTMLElement>(".previewTop")' in check
assert 'button.className = "zoom printEditorLauncherV2"' in check
assert 'button.addEventListener("click", openPrintSetup)' in check
assert 'anchor.appendChild(button)' in check
print('PASS: Print/PDF button restored to original live-preview header position')
