from pathlib import Path

# Correction 1.6.4.6: prevent browser print engines from inserting an
# extra blank sheet after every canonical CV page.  The canonical page
# content/pagination is unchanged; only print geometry is tightened.

pe_path = Path('src/printEditorV3.ts')
pe = pe_path.read_text(encoding='utf-8')

old = '''      .livePageWrap{display:block!important;width:${paper.width}mm!important;height:${paper.height}mm!important;margin:0!important;padding:0!important;gap:0!important;break-after:page!important;page-break-after:always!important}
      .livePageWrap:last-child{break-after:auto!important;page-break-after:auto!important}
      .livePagePaper{width:${paper.width}mm!important;height:${paper.height}mm!important;min-height:${paper.height}mm!important;max-width:none!important;margin:0!important;padding:0!important;box-shadow:none!important;transform:none!important;overflow:hidden!important}
'''
new = '''      .livePageWrap{display:block!important;width:${paper.width}mm!important;height:auto!important;min-height:0!important;margin:0!important;padding:0!important;gap:0!important;overflow:hidden!important;break-inside:avoid-page!important;page-break-inside:avoid!important;break-after:page!important;page-break-after:always!important}
      .livePageWrap:last-child{break-after:auto!important;page-break-after:auto!important}
      .livePagePaper{display:block!important;width:${paper.width}mm!important;height:calc(${paper.height}mm - .5mm)!important;min-height:0!important;max-height:calc(${paper.height}mm - .5mm)!important;max-width:none!important;margin:0!important;padding:0!important;box-shadow:none!important;transform:none!important;overflow:hidden!important;break-inside:avoid-page!important;page-break-inside:avoid!important}
'''
if old not in pe:
    raise SystemExit('ERROR: canonical runtime print geometry block not found')
pe = pe.replace(old, new, 1)
pe_path.write_text(pe, encoding='utf-8')

css_path = Path('src/live-preview-pages.css')
css = css_path.read_text(encoding='utf-8')
old_css = '@media print{#codecafe-live-page-preview{display:flex!important;flex-direction:column!important;gap:0!important;margin:0!important;max-width:none!important}.previewPane>.paper{display:none!important}.livePageCount,.livePageLabel{display:none!important}.livePageWrap{display:block!important;margin:0!important;padding:0!important;gap:0!important;break-after:page!important;page-break-after:always!important}.livePageWrap:last-child{break-after:auto!important;page-break-after:auto!important}.livePagePaper{box-shadow:none!important;transform:none!important;max-width:none!important;margin:0!important;padding:0!important}}'
new_css = '@media print{#codecafe-live-page-preview{display:block!important;margin:0!important;padding:0!important;max-width:none!important}.previewPane>.paper{display:none!important}.livePageCount,.livePageLabel{display:none!important}.livePageWrap{display:block!important;height:auto!important;min-height:0!important;margin:0!important;padding:0!important;gap:0!important;overflow:hidden!important;break-inside:avoid-page!important;page-break-inside:avoid!important;break-after:page!important;page-break-after:always!important}.livePageWrap:last-child{break-after:auto!important;page-break-after:auto!important}.livePagePaper{display:block!important;height:calc(100% - .5mm)!important;min-height:0!important;box-shadow:none!important;transform:none!important;max-width:none!important;margin:0!important;padding:0!important;overflow:hidden!important;break-inside:avoid-page!important;page-break-inside:avoid!important}}'
if old_css not in css:
    raise SystemExit('ERROR: static canonical print geometry block not found')
css = css.replace(old_css, new_css, 1)
css_path.write_text(css, encoding='utf-8')

# Ensure the main stylesheet cannot reintroduce browser page overflow for the
# canonical page stack.
styles_path = Path('src/styles.css')
styles = styles_path.read_text(encoding='utf-8')
marker = '/* codecafe-no-alternating-blank-pages-v1646 */'
if marker not in styles:
    styles += '''\n/* codecafe-no-alternating-blank-pages-v1646 */\n@media print{#codecafe-live-page-preview .livePageWrap{height:auto!important;min-height:0!important;overflow:hidden!important;break-inside:avoid-page!important;page-break-inside:avoid!important}#codecafe-live-page-preview .livePagePaper{min-height:0!important;overflow:hidden!important;break-inside:avoid-page!important;page-break-inside:avoid!important}}\n'''
styles_path.write_text(styles, encoding='utf-8')

final_pe = pe_path.read_text(encoding='utf-8')
final_css = css_path.read_text(encoding='utf-8')
assert 'height:calc(${paper.height}mm - .5mm)!important' in final_pe
assert 'break-inside:avoid-page!important' in final_pe
assert 'codecafe-no-alternating-blank-pages-v1646' in styles_path.read_text(encoding='utf-8')
print('v1.6.4.6 print pagination correction applied: no alternating blank sheets')
