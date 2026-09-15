from pathlib import Path

p = Path('src/printEditorV3.ts')
s = p.read_text(encoding='utf-8')

old = '''function makeContentClone(source: HTMLElement): HTMLElement {\n  const clone = source.cloneNode(true) as HTMLElement;\n  clone.classList.remove("paper");\n  clone.classList.add("printEditorFlowContent");\n  clone.querySelectorAll<HTMLElement>(".manualPrintBreak,.printMarginGuidesV2,.printBreakTargetV2,.printBreakSpacerV2").forEach((node) => node.remove());\n  clone.style.setProperty("width", "100%", "important");\n  clone.style.setProperty("max-width", "none", "important");\n  clone.style.setProperty("min-height", "0", "important");\n  clone.style.setProperty("margin", "0", "important");\n  clone.style.setProperty("padding", "0", "important");\n  clone.style.setProperty("box-shadow", "none", "important");\n  clone.style.setProperty("box-sizing", "border-box", "important");\n  clone.style.setProperty("background", "transparent", "important");\n  return clone;\n}'''

new = '''function makeContentClone(source: HTMLElement): HTMLElement {\n  const clone = source.cloneNode(true) as HTMLElement;\n  // Keep the original CV classes (including .paper/.modern/.ats) so the\n  // print editor uses exactly the same typography and section styling as\n  // the live preview. Only neutralize the outer sheet geometry.\n  clone.classList.add("printEditorFlowContent");\n  clone.querySelectorAll<HTMLElement>(".manualPrintBreak,.printMarginGuidesV2,.printBreakTargetV2,.printBreakSpacerV2").forEach((node) => node.remove());\n  clone.style.setProperty("width", "100%", "important");\n  clone.style.setProperty("max-width", "none", "important");\n  clone.style.setProperty("min-height", "0", "important");\n  clone.style.setProperty("height", "auto", "important");\n  clone.style.setProperty("margin", "0", "important");\n  clone.style.setProperty("padding", "0", "important");\n  clone.style.setProperty("box-shadow", "none", "important");\n  clone.style.setProperty("box-sizing", "border-box", "important");\n  clone.style.setProperty("background", "transparent", "important");\n  clone.style.setProperty("opacity", "1", "important");\n  clone.style.setProperty("visibility", "visible", "important");\n  clone.style.setProperty("display", "block", "important");\n  return clone;\n}'''

if old not in s:
    raise SystemExit('ERROR: expected makeContentClone implementation not found')
s = s.replace(old, new, 1)

# Do not allow a stale/hidden preview node to become the source. Prefer the
# visible rendered CV sheet and fall back to the first sheet only if needed.
old_source = '''function sourcePaper(): HTMLElement | null {\n  return document.querySelector<HTMLElement>(".previewPane .paper");\n}'''
new_source = '''function sourcePaper(): HTMLElement | null {\n  const candidates = Array.from(document.querySelectorAll<HTMLElement>(".previewPane .paper"));\n  return candidates.find((node) => {\n    const style = window.getComputedStyle(node);\n    const rect = node.getBoundingClientRect();\n    return style.display !== "none" && style.visibility !== "hidden" && rect.width > 0 && rect.height > 0;\n  }) || candidates[0] || null;\n}'''
if old_source in s:
    s = s.replace(old_source, new_source, 1)

p.write_text(s, encoding='utf-8')

final = p.read_text(encoding='utf-8')
assert 'clone.classList.remove("paper")' not in final
assert 'clone.classList.add("printEditorFlowContent")' in final
assert 'visibility", "visible"' in final
print('v1.6.4 print preview fix applied')
