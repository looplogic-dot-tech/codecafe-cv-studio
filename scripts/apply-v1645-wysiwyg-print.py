from pathlib import Path
import re

EVENT = 'codecafe-print-layout-changed'
MARKER = 'codecafe-wysiwyg-print-v1645'


def replace_once(text: str, old: str, new: str, label: str) -> str:
    if new in text:
        return text
    if old not in text:
        raise SystemExit(f'ERROR: {label} target not found')
    return text.replace(old, new, 1)


# ---------------------------------------------------------------------------
# Live Preview: use the exact same CV sheet classes and page geometry as the
# print editor. Do not create a simplified/re-styled clone.
# ---------------------------------------------------------------------------
live_path = Path('src/livePreviewPages.ts')
live = live_path.read_text(encoding='utf-8')

live = live.replace('  clone.classList.remove("paper");\n', '')

old_css = '  clone.style.cssText="width:100%!important;max-width:none!important;min-height:0!important;margin:0!important;padding:0!important;box-shadow:none!important;background:transparent!important;box-sizing:border-box!important;";'
new_css = '  clone.style.cssText="width:100%!important;max-width:none!important;min-height:0!important;height:auto!important;margin:0!important;padding:0!important;box-shadow:none!important;background:transparent!important;box-sizing:border-box!important;display:block!important;visibility:visible!important;opacity:1!important;";'
live = replace_once(live, old_css, new_css, 'live preview clone geometry')

old_flow = '      const flow=document.createElement("div"); flow.className="livePageFlow"; flow.style.width=`${contentW}mm`; flow.style.transform=`translateY(-${i*contentH}mm)`; flow.appendChild(cleanClone(source));'
new_flow = '      const flow=document.createElement("div"); flow.className="livePageFlow"; flow.style.width="100%"; flow.style.position="absolute"; flow.style.left="0"; flow.style.right="0"; flow.style.top=`${-(i*contentH*PX_PER_MM)}px`; flow.style.transform="none"; flow.appendChild(cleanClone(source));'
live = replace_once(live, old_flow, new_flow, 'live preview page offset')

zoom_anchor = '    const paper=PAPERS[s.paperSize];\n'
zoom_block = '    const paper=PAPERS[s.paperSize];\n    const zoom=document.querySelector<HTMLElement>(".previewTop .zoom");\n    if(zoom) zoom.textContent=`${paper.label} · 100%`;\n'
if zoom_block not in live:
    live = replace_once(live, zoom_anchor, zoom_block, 'live preview paper label')

listener_anchor = '  window.addEventListener("focus",()=>rebuild(true));\n'
listener_block = f'  window.addEventListener("focus",()=>rebuild(true));\n  window.addEventListener("{EVENT}",()=>rebuild(true));\n'
if listener_block not in live:
    live = replace_once(live, listener_anchor, listener_block, 'live preview layout event')

live_path.write_text(live, encoding='utf-8')

# ---------------------------------------------------------------------------
# Print editor: preserve the same original .paper/.modern/.ats classes, force
# the live page stack to refresh before printing, and print that exact page
# stack instead of asking the browser to paginate a different DOM tree.
# ---------------------------------------------------------------------------
print_path = Path('src/printEditorV3.ts')
pe = print_path.read_text(encoding='utf-8')
pe = pe.replace('  clone.classList.remove("paper");\n', '')

# Ensure cloned CV content is visible while retaining its original classes.
clone_anchor = '  clone.classList.add("printEditorFlowContent");\n'
clone_visibility = '  clone.classList.add("printEditorFlowContent");\n  clone.style.setProperty("display", "block", "important");\n  clone.style.setProperty("visibility", "visible", "important");\n  clone.style.setProperty("opacity", "1", "important");\n'
if clone_visibility not in pe:
    pe = replace_once(pe, clone_anchor, clone_visibility, 'print editor clone visibility')

# Any print setting change immediately invalidates/rebuilds the canonical
# page stack used by Live Preview and actual printing.
save_anchor = '  localStorage.setItem(settingsKey(), JSON.stringify(settings));\n'
save_event = f'  localStorage.setItem(settingsKey(), JSON.stringify(settings));\n  window.dispatchEvent(new Event("{EVENT}"));\n'
if save_event not in pe:
    pe = replace_once(pe, save_anchor, save_event, 'print layout change event')

# The rendered page stack already contains the margins. Browser @page margins
# must therefore be zero or the printed result will differ from both previews.
pe = re.sub(
    r'@page\{size:\$\{paper\.css\} portrait;margin:\$\{settings\.top\}mm \$\{settings\.right\}mm \$\{settings\.bottom\}mm \$\{settings\.left\}mm\}',
    '@page{size:${paper.css} portrait;margin:0}',
    pe,
    count=1,
)

canonical_print_css = f'''      /* {MARKER} */
      #codecafe-live-page-preview{{display:flex!important;flex-direction:column!important;gap:0!important;align-items:flex-start!important;margin:0!important;max-width:none!important}}
      .previewPane>.paper{{display:none!important}}
      .livePageCount,.livePageLabel{{display:none!important}}
      .livePageWrap{{display:block!important;width:${{paper.width}}mm!important;height:${{paper.height}}mm!important;margin:0!important;padding:0!important;gap:0!important;break-after:page!important;page-break-after:always!important}}
      .livePageWrap:last-child{{break-after:auto!important;page-break-after:auto!important}}
      .livePagePaper{{width:${{paper.width}}mm!important;height:${{paper.height}}mm!important;min-height:${{paper.height}}mm!important;max-width:none!important;margin:0!important;box-shadow:none!important;transform:none!important;overflow:hidden!important}}
      .livePageViewport{{box-sizing:border-box!important}}
'''
if MARKER not in pe:
    css_anchor = '      .manualPrintBreakSpacerRuntime{display:none!important}\n'
    pe = replace_once(pe, css_anchor, css_anchor + canonical_print_css, 'canonical print page stack CSS')

old_print = '    print.onclick = () => { saveSettings(settings); installRuntimePrintStyle(settings); requestAnimationFrame(() => window.print()); };'
new_print = f'    print.onclick = () => {{ saveSettings(settings); installRuntimePrintStyle(settings); window.dispatchEvent(new Event("{EVENT}")); requestAnimationFrame(() => requestAnimationFrame(() => window.print())); }};'
pe = replace_once(pe, old_print, new_print, 'print action synchronization')

print_path.write_text(pe, encoding='utf-8')

# ---------------------------------------------------------------------------
# Static print CSS must agree with the runtime style. Runtime CSS supplies the
# selected paper dimensions; this block makes the intent safe and consistent.
# ---------------------------------------------------------------------------
css_path = Path('src/live-preview-pages.css')
css = css_path.read_text(encoding='utf-8')
old_print_css = '@media print{#codecafe-live-page-preview{display:none!important}.previewPane>.paper{display:block!important}}'
new_print_css = '@media print{#codecafe-live-page-preview{display:flex!important;flex-direction:column!important;gap:0!important;margin:0!important;max-width:none!important}.previewPane>.paper{display:none!important}.livePageCount,.livePageLabel{display:none!important}.livePageWrap{display:block!important;margin:0!important;padding:0!important;gap:0!important;break-after:page!important;page-break-after:always!important}.livePageWrap:last-child{break-after:auto!important;page-break-after:auto!important}.livePagePaper{box-shadow:none!important;transform:none!important;max-width:none!important;margin:0!important}}'
if new_print_css not in css:
    css = replace_once(css, old_print_css, new_print_css, 'static WYSIWYG print CSS')
css_path.write_text(css, encoding='utf-8')

# Regression guards. These fail the build before the live site is touched.
final_live = live_path.read_text(encoding='utf-8')
final_pe = print_path.read_text(encoding='utf-8')
final_css = css_path.read_text(encoding='utf-8')
assert 'clone.classList.remove("paper")' not in final_live
assert 'clone.classList.remove("paper")' not in final_pe
assert 'flow.style.top=`${-(i*contentH*PX_PER_MM)}px`' in final_live
assert f'window.addEventListener("{EVENT}",()=>rebuild(true));' in final_live
assert f'window.dispatchEvent(new Event("{EVENT}"));' in final_pe
assert f'/* {MARKER} */' in final_pe
assert '@page{size:${paper.css} portrait;margin:0}' in final_pe
assert '#codecafe-live-page-preview{display:flex!important' in final_pe
assert '.previewPane>.paper{display:none!important}' in final_pe
assert '#codecafe-live-page-preview{display:flex!important' in final_css
assert '.previewPane>.paper{display:none!important}' in final_css
print('PASS: Live Preview, Print Editor and printed/PDF output share one page renderer and one geometry')
