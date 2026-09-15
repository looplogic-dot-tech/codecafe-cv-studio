from pathlib import Path

p = Path('src/printEditorV3.ts')
s = p.read_text(encoding='utf-8')

old = '  clone.classList.remove("paper");\n  clone.classList.add("printEditorFlowContent");'
new = '  // Keep the paper class: CV typography/layout rules are scoped under .paper.\n  // Removing it makes the print editor clone visually blank.\n  clone.classList.add("printEditorFlowContent");'
if old in s:
    s = s.replace(old, new, 1)
elif 'clone.classList.add("printEditorFlowContent");' not in s:
    raise SystemExit('ERROR: print editor clone block not found')

p.write_text(s, encoding='utf-8')

check = p.read_text(encoding='utf-8')
assert 'clone.classList.remove("paper")' not in check
assert 'clone.classList.add("printEditorFlowContent")' in check
assert 'printEditorContentViewport' in check
print('v1.6.3 print editor baseline restored')
