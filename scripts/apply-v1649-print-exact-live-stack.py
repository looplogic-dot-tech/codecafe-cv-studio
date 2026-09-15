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
      installRuntimePrintStyle(settings);
      window.dispatchEvent(new Event("codecafe-print-layout-changed"));

      // Print the exact canonical Live Preview stack. Do not rebuild, slice,
      // reflow, or restyle individual CV pages here: that caused sections to
      // jump between pages and left a trailing blank page.
      document.getElementById("codecafe-print-only-root")?.remove();
      const liveHost = document.getElementById("codecafe-live-page-preview");
      if (!liveHost) {
        window.alert(language() === "es" ? "No hay vista previa del CV disponible para imprimir." : "CV preview is not available to print.");
        return;
      }

      const sourcePages = Array.from(liveHost.querySelectorAll<HTMLElement>(".livePagePaper"));
      if (sourcePages.length === 0) {
        window.alert(language() === "es" ? "No hay páginas del CV disponibles para imprimir." : "No CV pages are available to print.");
        return;
      }

      const printRoot = document.createElement("div");
      printRoot.id = "codecafe-print-only-root";
      const stack = liveHost.cloneNode(true) as HTMLElement;
      stack.id = "codecafe-print-only-stack";
      stack.querySelectorAll<HTMLElement>(".livePageCount,.livePageLabel").forEach((node) => node.remove());
      // The canonical pages already contain the correct viewport, flow offset,
      // typography, section formatting and page assignment. Preserve them all.
      printRoot.appendChild(stack);
      document.body.appendChild(printRoot);

      let printStyle = document.getElementById("codecafe-print-only-style") as HTMLStyleElement | null;
      if (!printStyle) {
        printStyle = document.createElement("style");
        printStyle.id = "codecafe-print-only-style";
        document.head.appendChild(printStyle);
      }
      const paper = PAPERS[settings.paperSize];
      printStyle.textContent = `
        @page{size:${paper.css} portrait;margin:0}
        @media print{
          body > *:not(#codecafe-print-only-root){display:none!important}
          #codecafe-print-only-root{display:block!important;margin:0!important;padding:0!important;background:#fff!important}
          #codecafe-print-only-stack{display:block!important;margin:0!important;padding:0!important;max-width:none!important;background:#fff!important}
          #codecafe-print-only-stack .livePageWrap{display:block!important;width:${paper.width}mm!important;height:${paper.height}mm!important;margin:0!important;padding:0!important;break-after:page!important;page-break-after:always!important;overflow:hidden!important}
          #codecafe-print-only-stack .livePageWrap:last-child{break-after:auto!important;page-break-after:auto!important}
          #codecafe-print-only-stack .livePagePaper{display:block!important;margin:0!important;box-shadow:none!important;transform:none!important;max-width:none!important}
          #codecafe-print-only-stack .livePageViewport{display:block!important}
          #codecafe-print-only-stack .livePageFlow{display:block!important}
          #codecafe-print-only-stack .livePreviewFlowContent{display:block!important;visibility:visible!important;opacity:1!important}
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
assert 'codecafe-print-only-stack' in final
assert 'liveHost.cloneNode(true)' in final
assert 'sourcePages.forEach' not in final[final.find('print.onclick'):final.find('actions.append(reset, print);')]
assert '.livePageWrap:last-child' in final
print('PASS: v1.6.4.9 prints the exact canonical Live Preview stack without reconstructing individual pages')
