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
  const actions = document.querySelector<HTMLElement>(".topActions");
  if (!actions) return;

  // Keep the original primary print/PDF button exactly where App.tsx renders it.
  // Do not hide it and do not append a replacement button.
  document.getElementById(LAUNCHER_ID)?.remove();
  const original = actions.querySelector<HTMLButtonElement>(":scope > button.primary");
  if (!original) return;
  original.style.removeProperty("display");
  if (original.dataset.codecafePrintPreviewBound === "1") return;
  original.dataset.codecafePrintPreviewBound = "1";

  original.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    openPrintSetup();
  }, true);
}
'''

if old in s:
    s = s.replace(old, new, 1)
elif 'codecafePrintPreviewBound' in s:
    print('print button position already restored')
else:
    raise SystemExit('ERROR: ensureLauncher block not found')

p.write_text(s, encoding='utf-8')
check = p.read_text(encoding='utf-8')
assert 'original.style.display = "none"' not in check
assert 'actions.appendChild(button)' not in check
assert 'codecafePrintPreviewBound' in check
assert 'openPrintSetup();' in check
print('PASS: original print button kept in its original position and opens page-break print preview')
