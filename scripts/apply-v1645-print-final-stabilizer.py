from pathlib import Path

p = Path('src/printEditorV3.ts')
s = p.read_text(encoding='utf-8')

# Preserve the historical working launcher in the Live Preview header.
s = s.replace('const anchor = document.querySelector<HTMLElement>(".topActions");', 'const anchor = document.querySelector<HTMLElement>(".previewTop");')
s = s.replace('button.className = "primary printEditorLauncherV2";', 'button.className = "zoom printEditorLauncherV2";')

# A break that already lands at the top of a page does not need a spacer.
# Use the applied break classes, not spacer count, to determine whether the
# layout is already current; this prevents a MutationObserver refresh loop.
s = s.replace(
    '  const currentSpacers = source.querySelectorAll(".manualPrintBreakSpacerRuntime").length;\n  if (!force && signature === lastManualLayoutSignature && currentSpacers === expected) return;',
    '  const currentBreaks = source.querySelectorAll(".manualPrintBreak").length;\n  if (!force && signature === lastManualLayoutSignature && currentBreaks === expected) return;',
)

p.write_text(s, encoding='utf-8')
final = p.read_text(encoding='utf-8')
assert 'const anchor = document.querySelector<HTMLElement>(".previewTop")' in final
assert 'button.className = "zoom printEditorLauncherV2"' in final
assert 'currentBreaks === expected' in final
assert 'manualBreaks: string[]' in final
assert 'Place page breaks' in final
print('PASS: print launcher preserved; page-break refresh loop guarded')
