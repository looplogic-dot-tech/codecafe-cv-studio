from pathlib import Path
import re

EVENT = 'codecafe-print-layout-changed'
MARKER = 'codecafe-wysiwyg-print-v1645'
CANONICAL = 'codecafe-canonical-pages-v1645'


def replace_once(text: str, old: str, new: str, label: str) -> str:
    if new in text:
        return text
    if old not in text:
        raise SystemExit(f'ERROR: {label} target not found')
    return text.replace(old, new, 1)


# ---------------------------------------------------------------------------
# LIVE PREVIEW = canonical pagination.
# It keeps the exact CV classes and creates the only authoritative page stack.
# Print Editor and actual print/PDF reuse these exact pages.
# ---------------------------------------------------------------------------
live_path = Path('src/livePreviewPages.ts')
live = live_path.read_text(encoding='utf-8')

live = live.replace('  clone.classList.remove("paper");\n', '')

old_css = '  clone.style.cssText="width:100%!important;max-width:none!important;min-height:0!important;margin:0!important;padding:0!important;box-shadow:none!important;background:transparent!important;box-sizing:border-box!important;";'
new_css = '  clone.style.cssText="width:100%!important;max-width:none!important;min-height:0!important;height:auto!important;margin:0!important;padding:0!important;box-shadow:none!important;background:transparent!important;box-sizing:border-box!important;display:block!important;visibility:visible!important;opacity:1!important;";'
if old_css in live:
    live = live.replace(old_css, new_css, 1)
elif new_css not in live:
    raise SystemExit('ERROR: live preview clone geometry target not found')

old_flow = '      const flow=document.createElement("div"); flow.className="livePageFlow"; flow.style.width=`${contentW}mm`; flow.style.transform=`translateY(-${i*contentH}mm)`; flow.appendChild(cleanClone(source));'
new_flow = '      const flow=document.createElement("div"); flow.className="livePageFlow"; flow.style.width="100%"; flow.style.position="absolute"; flow.style.left="0"; flow.style.right="0"; flow.style.top=`${-(i*contentH*PX_PER_MM)}px`; flow.style.transform="none"; flow.appendChild(cleanClone(source));'
if old_flow in live:
    live = live.replace(old_flow, new_flow, 1)
elif new_flow not in live:
    raise SystemExit('ERROR: live preview page offset target not found')

zoom_anchor = '    const paper=PAPERS[s.paperSize];\n'
zoom_block = '    const paper=PAPERS[s.paperSize];\n    const zoom=document.querySelector<HTMLElement>(".previewTop .zoom");\n    if(zoom) zoom.textContent=`${paper.label} · 100%`;\n'
if zoom_block not in live:
    live = replace_once(live, zoom_anchor, zoom_block, 'live preview paper label')

listener_anchor = '  window.addEventListener("focus",()=>rebuild(true));\n'
listener_block = f'  window.addEventListener("focus",()=>rebuild(true));\n  window.addEventListener("{EVENT}",()=>rebuild(true));\n'
if listener_block not in live:
    live = replace_once(live, listener_anchor, listener_block, 'live preview layout event')

# Stamp the canonical page host so the production bundle can be verified.
if CANONICAL not in live:
    host_anchor = '    if (!host) { host=document.createElement("div"); host.id=HOST_ID; host.className="livePageStack"; source.after(host); }'
    host_new = f'    if (!host) {{ host=document.createElement("div"); host.id=HOST_ID; host.className="livePageStack {CANONICAL}"; source.after(host); }}\n    else host.classList.add("{CANONICAL}");'
    live = replace_once(live, host_anchor, host_new, 'canonical live page host')

live_path.write_text(live, encoding='utf-8')

# ---------------------------------------------------------------------------
# PRINT EDITOR.
# IMPORTANT: it no longer paginates or measures the CV independently.
# It clones the canonical Live Preview pages, so 2 pages in Live Preview =
# exactly 2 pages in the Print Editor.
# ---------------------------------------------------------------------------
print_path = Path('src/printEditorV3.ts')
pe = print_path.read_text(encoding='utf-8')
pe = pe.replace('  clone.classList.remove("paper");\n', '')

clone_anchor = '  clone.classList.add("printEditorFlowContent");\n'
clone_visibility = '  clone.classList.add("printEditorFlowContent");\n  clone.style.setProperty("display", "block", "important");\n  clone.style.setProperty("visibility", "visible", "important");\n  clone.style.setProperty("opacity", "1", "important");\n'
if clone_visibility not in pe and clone_anchor in pe:
    pe = pe.replace(clone_anchor, clone_visibility, 1)

# Any print setting change immediately rebuilds canonical Live Preview pages.
save_anchor = '  localStorage.setItem(settingsKey(), JSON.stringify(settings));\n'
save_event = f'  localStorage.setItem(settingsKey(), JSON.stringify(settings));\n  window.dispatchEvent(new Event("{EVENT}"));\n'
if save_event not in pe:
    pe = replace_once(pe, save_anchor, save_event, 'print layout change event')

# Replace V3 independent pagination with a clone of the canonical Live Preview.
start = pe.find('function buildPageStack(')
end = pe.find('\nfunction openEditor()', start)
if start < 0 or end < 0:
    raise SystemExit('ERROR: buildPageStack block not found')

canonical_stack = f'''function buildPageStack(host: HTMLElement, settings: PrintSettings, onChange: (side: MarginSide, value: number) => void, breakMode: boolean, toggleBreak: (key: string) => void): void {{
  host.replaceChildren();

  // Rebuild the authoritative Live Preview first, synchronously.
  window.dispatchEvent(new Event("{EVENT}"));
  const liveHost = document.getElementById("codecafe-live-page-preview");
  const sourcePages = liveHost
    ? Array.from(liveHost.querySelectorAll<HTMLElement>(".livePagePaper"))
    : [];

  if (sourcePages.length === 0) {{
    host.textContent = language() === "es" ? "No hay páginas de vista previa disponibles." : "Preview pages are not available.";
    return;
  }}

  const paper = PAPERS[settings.paperSize];
  const stack = document.createElement("div");
  stack.className = "printEditorPageStack {CANONICAL}";

  sourcePages.forEach((sourcePage, pageIndex) => {{
    const frame = document.createElement("div");
    frame.className = "printEditorPreviewFrame";
    frame.dataset.page = String(pageIndex + 1);
    frame.style.width = `${{paper.width * PX_PER_MM * PREVIEW_SCALE}}px`;
    frame.style.height = `${{paper.height * PX_PER_MM * PREVIEW_SCALE}}px`;

    const page = sourcePage.cloneNode(true) as HTMLElement;
    page.classList.add("printEditorPaperV2");
    page.style.setProperty("width", `${{paper.width}}mm`, "important");
    page.style.setProperty("height", `${{paper.height}}mm`, "important");
    page.style.setProperty("min-height", `${{paper.height}}mm`, "important");
    page.style.setProperty("max-width", "none", "important");
    page.style.setProperty("margin", "0", "important");
    page.style.setProperty("padding", "0", "important");
    page.style.setProperty("box-shadow", "none", "important");
    page.style.setProperty("transform", `scale(${{PREVIEW_SCALE}})`, "important");
    page.style.setProperty("transform-origin", "top left", "important");

    const flow = page.querySelector<HTMLElement>(".livePageFlow");
    if (flow) installBreakTargets(flow, settings, breakMode, toggleBreak);
    attachGuides(page, settings, onChange);
    frame.appendChild(page);
    stack.appendChild(frame);
  }});

  host.appendChild(stack);
}}'''
pe = pe[:start] + canonical_stack + pe[end:]

# The rendered canonical page stack already contains the selected margins.
# Browser @page margins must be zero or PDF/print would add a second margin.
pe = re.sub(
    r'@page\{size:\$\{paper\.css\} portrait;margin:[^}]+\}',
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
      .livePagePaper{{width:${{paper.width}}mm!important;height:${{paper.height}}mm!important;min-height:${{paper.height}}mm!important;max-width:none!important;margin:0!important;padding:0!important;box-shadow:none!important;transform:none!important;overflow:hidden!important}}
      .livePageViewport{{box-sizing:border-box!important}}
'''
if MARKER not in pe:
    css_anchor = '      .manualPrintBreakSpacerRuntime{display:none!important}\n'
    pe = replace_once(pe, css_anchor, css_anchor + canonical_print_css, 'canonical print page stack CSS')

old_print = '    print.onclick = () => { saveSettings(settings); installRuntimePrintStyle(settings); requestAnimationFrame(() => window.print()); };'
new_print = f'    print.onclick = () => {{ saveSettings(settings); installRuntimePrintStyle(settings); window.dispatchEvent(new Event("{EVENT}")); requestAnimationFrame(() => requestAnimationFrame(() => window.print())); }};'
if old_print in pe:
    pe = pe.replace(old_print, new_print, 1)
elif new_print not in pe:
    raise SystemExit('ERROR: print action synchronization target not found')

print_path.write_text(pe, encoding='utf-8')

# ---------------------------------------------------------------------------
# ACTUAL OUTPUT = same canonical Live Preview page stack.
# Never print the hidden continuous source sheet.
# ---------------------------------------------------------------------------
css_path = Path('src/live-preview-pages.css')
css = css_path.read_text(encoding='utf-8')
old_print_css = '@media print{#codecafe-live-page-preview{display:none!important}.previewPane>.paper{display:block!important}}'
new_print_css = '@media print{#codecafe-live-page-preview{display:flex!important;flex-direction:column!important;gap:0!important;margin:0!important;max-width:none!important}.previewPane>.paper{display:none!important}.livePageCount,.livePageLabel{display:none!important}.livePageWrap{display:block!important;margin:0!important;padding:0!important;gap:0!important;break-after:page!important;page-break-after:always!important}.livePageWrap:last-child{break-after:auto!important;page-break-after:auto!important}.livePagePaper{box-shadow:none!important;transform:none!important;max-width:none!important;margin:0!important;padding:0!important}}'
if old_print_css in css:
    css = css.replace(old_print_css, new_print_css, 1)
elif new_print_css not in css:
    raise SystemExit('ERROR: static WYSIWYG print CSS target not found')
css_path.write_text(css, encoding='utf-8')

# Regression guards. If any of these fail, npm build stops before deployment.
final_live = live_path.read_text(encoding='utf-8')
final_pe = print_path.read_text(encoding='utf-8')
final_css = css_path.read_text(encoding='utf-8')
assert 'clone.classList.remove("paper")' not in final_live
assert 'clone.classList.remove("paper")' not in final_pe
assert 'flow.style.top=`${-(i*contentH*PX_PER_MM)}px`' in final_live
assert f'window.addEventListener("{EVENT}",()=>rebuild(true));' in final_live
assert CANONICAL in final_live
assert 'querySelectorAll<HTMLElement>(".livePagePaper")' in final_pe
assert f'printEditorPageStack {CANONICAL}' in final_pe
assert 'measureContent(source, contentWidthMm)' not in final_pe
assert f'window.dispatchEvent(new Event("{EVENT}"));' in final_pe
assert f'/* {MARKER} */' in final_pe
assert '@page{size:${paper.css} portrait;margin:0}' in final_pe
assert '#codecafe-live-page-preview{display:flex!important' in final_pe
assert '.previewPane>.paper{display:none!important}' in final_pe
assert '#codecafe-live-page-preview{display:flex!important' in final_css
assert '.previewPane>.paper{display:none!important}' in final_css
print('PASS: Live Preview is canonical; Print Editor clones the same pages; print/PDF outputs those same pages')
