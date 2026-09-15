from pathlib import Path

p = Path('src/printEditorV3.ts')
s = p.read_text(encoding='utf-8')

start = s.find('    print.onclick = () => {')
if start < 0:
    raise SystemExit('ERROR: print handler not found')
end = s.find('\n    actions.append(reset, print);', start)
if end < 0:
    raise SystemExit('ERROR: print handler end not found')

new = '''    print.onclick = () => {
      saveSettings(settings);
      window.dispatchEvent(new Event("codecafe-print-layout-changed"));

      // 1.6.4.9: the Live Preview pages are the document.
      // Do not recalculate, reflow, slice, or rebuild CV content for print.
      document.getElementById("codecafe-print-only-root")?.remove();
      const liveHost = document.getElementById("codecafe-live-page-preview");
      if (!liveHost) {
        window.alert(language() === "es" ? "No hay vista previa del CV disponible para imprimir." : "CV preview is not available to print.");
        return;
      }

      const sourceWraps = Array.from(liveHost.querySelectorAll<HTMLElement>(":scope > .livePageWrap"));
      if (sourceWraps.length === 0) {
        window.alert(language() === "es" ? "No hay páginas del CV disponibles para imprimir." : "No CV pages are available to print.");
        return;
      }

      const printRoot = document.createElement("div");
      printRoot.id = "codecafe-print-only-root";
      const paper = PAPERS[settings.paperSize];

      // Clone each already-paginated page wrapper without touching its content.
      // Page boundaries come from Live Preview, not from the browser paginator.
      sourceWraps.forEach((sourceWrap, index) => {
        const wrap = sourceWrap.cloneNode(true) as HTMLElement;
        wrap.classList.add("codecafeExactPrintPage");
        wrap.querySelectorAll<HTMLElement>(".livePageLabel,.livePageCount,.printMarginGuidesV2,.printBreakTargetV2,.printBreakSpacerV2,.manualPrintBreakSpacerRuntime").forEach((node) => node.remove());
        wrap.dataset.printPage = String(index + 1);
        printRoot.appendChild(wrap);
      });
      document.body.appendChild(printRoot);

      let printStyle = document.getElementById("codecafe-print-only-style") as HTMLStyleElement | null;
      if (!printStyle) {
        printStyle = document.createElement("style");
        printStyle.id = "codecafe-print-only-style";
        document.head.appendChild(printStyle);
      }

      printStyle.textContent = `
        @page{size:${paper.css} portrait;margin:0}
        @media print{
          html,body{margin:0!important;padding:0!important;background:#fff!important;width:auto!important;height:auto!important}
          body > *:not(#codecafe-print-only-root){display:none!important}
          #codecafe-print-only-root{display:block!important;margin:0!important;padding:0!important;width:${paper.width}mm!important;background:#fff!important}

          /* Exactly one Live Preview wrapper = exactly one physical PDF page. */
          #codecafe-print-only-root > .codecafeExactPrintPage{
            display:block!important;
            position:relative!important;
            width:${paper.width}mm!important;
            height:${paper.height}mm!important;
            min-height:${paper.height}mm!important;
            max-height:${paper.height}mm!important;
            margin:0!important;
            padding:0!important;
            gap:0!important;
            overflow:hidden!important;
            break-inside:avoid!important;
            page-break-inside:avoid!important;
            break-after:auto!important;
            page-break-after:auto!important;
          }
          #codecafe-print-only-root > .codecafeExactPrintPage:not(:first-child){
            break-before:page!important;
            page-break-before:always!important;
          }

          /* Preserve the exact Live Preview geometry instead of letting print CSS reflow it. */
          #codecafe-print-only-root .livePagePaper{
            display:block!important;
            position:relative!important;
            width:${paper.width}mm!important;
            height:${paper.height}mm!important;
            min-height:${paper.height}mm!important;
            max-height:${paper.height}mm!important;
            max-width:none!important;
            margin:0!important;
            padding:0!important;
            box-shadow:none!important;
            transform:none!important;
            overflow:hidden!important;
            break-inside:avoid!important;
            page-break-inside:avoid!important;
          }
          #codecafe-print-only-root .livePageViewport{
            display:block!important;
            position:absolute!important;
            overflow:hidden!important;
            box-sizing:border-box!important;
          }
          #codecafe-print-only-root .livePageFlow{
            display:block!important;
            position:absolute!important;
          }
          #codecafe-print-only-root .livePreviewFlowContent{
            display:block!important;
            visibility:visible!important;
            opacity:1!important;
          }

          /* Never let generic print rules create a second pagination pass inside our fixed pages. */
          #codecafe-print-only-root .manualPrintBreak{break-before:auto!important;page-break-before:auto!important}
        }
      `;

      const cleanupPrintRoot = () => {
        document.getElementById("codecafe-print-only-root")?.remove();
        window.removeEventListener("afterprint", cleanupPrintRoot);
      };
      window.addEventListener("afterprint", cleanupPrintRoot);
      requestAnimationFrame(() => requestAnimationFrame(() => window.print()));
    };'''

s = s[:start] + new + s[end:]
p.write_text(s, encoding='utf-8')

final = p.read_text(encoding='utf-8')
assert 'codecafeExactPrintPage' in final
assert 'sourceWraps.forEach' in final
assert 'break-before:page!important' in final
assert 'break-after:page!important' not in final[final.find('print.onclick'):final.find('actions.append(reset, print);')]
assert 'installRuntimePrintStyle(settings);' not in final[final.find('print.onclick'):final.find('actions.append(reset, print);')]
assert 'max-height:${paper.height}mm!important' in final
print('PASS: v1.6.4.9 maps each existing Live Preview page to exactly one PDF page without reflow')
