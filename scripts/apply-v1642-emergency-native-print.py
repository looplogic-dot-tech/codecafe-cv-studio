from pathlib import Path

p = Path('src/printEditorV3.ts')
s = p.read_text(encoding='utf-8')

# Emergency correction: the visible Print/PDF launcher must print the live CV
# directly using the already-persisted page/margin settings. This bypasses the
# broken custom preview/editor path so the user can print/save PDF immediately.
s = s.replace('const anchor = document.querySelector<HTMLElement>(".previewTop");', 'const anchor = document.querySelector<HTMLElement>(".topActions");')
s = s.replace('button.className = "zoom printEditorLauncherV2";', 'button.className = "primary printEditorLauncherV2";')
s = s.replace('button.addEventListener("click", openEditor);', 'button.addEventListener("click", () => { const settings = loadSettings(); installRuntimePrintStyle(settings); requestAnimationFrame(() => window.print()); });')

# If a previous transform already changed the launcher, require the direct-print
# handler to be present rather than silently doing nothing.
if 'requestAnimationFrame(() => window.print())' not in s:
    raise SystemExit('ERROR: could not install direct Print/PDF handler')
if 'document.querySelector<HTMLElement>(".topActions")' not in s:
    raise SystemExit('ERROR: Print/PDF launcher is not in the top action corner')

p.write_text(s, encoding='utf-8')
print('v1.6.4.2 emergency native print path applied')
