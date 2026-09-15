from pathlib import Path

pe=Path('src/printEditorV3.ts').read_text(encoding='utf-8')
css=Path('src/styles.css').read_text(encoding='utf-8')
assert 'height:calc(${paper.height}mm - .5mm)!important' in pe
assert 'break-inside:avoid-page!important' in pe
assert 'codecafe-no-alternating-blank-pages-v1646' in css
print('PASS: v1.6.4.6 print geometry guards present')
