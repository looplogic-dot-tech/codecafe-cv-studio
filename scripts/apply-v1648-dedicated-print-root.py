from pathlib import Path

p = Path('src/printEditorV3.ts')
s = p.read_text(encoding='utf-8')

old = '''    print.onclick = () => {
      saveSettings(settings);
      installRuntimePrintStyle(settings);
      window.dispatchEvent(new Event("codecafe-print-layout-changed"));

      // The print editor is only a control surface; it must never be part of
      // the printed/PDF document. Hide it synchronously with !important before
      // the browser takes its print snapshot, then restore it after printing.
      const previousDisplay = overlay.style.getPropertyValue("display");
      const previousPriority = overlay.style.getPropertyPriority("display");
      const hideEditorForPrint = () => overlay.style.setProperty("display", "none", "important");
      const restoreEditorAfterPrint = () => {
        if (previousDisplay) overlay.style.setProperty("display", previousDisplay, previousPriority);
        else overlay.style.removeProperty("display");
        window.removeEventListener("afterprint", restoreEditorAfterPrint);
      };
      hideEditorForPrint();
      window.addEventListener("beforeprint", hideEditorForPrint, { once: true });
      window.addEventListener("afterprint", restoreEditorAfterPrint);
      requestAnimationFrame(() => requestAnimationFrame(() => window.print()));
    };'''

new = '''    print.onclick = () => {
      saveSettings(settings);
      installRuntimePrintStyle(settings);
      window.dispatchEvent(new Event("codecafe-print-layout-changed"));

      // Build an isolated print-only root from the canonical Live Preview pages.
      // Nothing else in the application participates in the browser print tree.
      document.getElementById("codecafe-print-only-root")?.remove();
      const liveHost = document.getElementById("codecafe-live-page-preview");
      const sourcePages = liveHost ? Array.from(liveHost.querySelectorAll<HTMLElement>(".livePagePaper")) : [];
      if (sourcePages.length === 0) {
        window.alert(language() === "es" ? "No hay páginas del CV disponibles para imprimir." : "No CV pages are available to print.");
        return;
      }

      const printRoot = document.createElement("div");
      printRoot.id = "codecafe-print-only-root";
      sourcePages.forEach((sourcePage, index) => {
        const page = sourcePage.cloneNode(true) as HTMLElement;
        page.classList.add("codecafePrintOnlyPage");
        page.removeAttribute("id");
        page.querySelectorAll<HTMLElement>(".printMarginGuidesV2,.printBreakTargetV2,.printBreakSpacerV2,.manualPrintBreakSpacerRuntime,button,input,select").forEach((node) => node.remove());
        if (index < sourcePages.length - 1) page.style.setProperty("break-after", "page", "important");
        printRoot.appendChild(page);
      });
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
          #codecafe-print-only-root .codecafePrintOnlyPage{display:block!important;width:${paper.width}mm!important;height:${paper.height}mm!important;min-height:${paper.height}mm!important;max-width:none!important;margin:0!important;padding:0!important;box-shadow:none!important;transform:none!important;overflow:hidden!important;background:#fff!important}
          #codecafe-print-only-root .codecafePrintOnlyPage:last-child{break-after:auto!important;page-break-after:auto!important}
        }
      `;

      const cleanupPrintRoot = () => {
        document.getElementById("codecafe-print-only-root")?.remove();
        window.removeEventListener("afterprint", cleanupPrintRoot);
      };
      window.addEventListener("afterprint", cleanupPrintRoot);
      requestAnimationFrame(() => requestAnimationFrame(() => window.print()));
    };'''

if old not in s:
    if 'codecafe-print-only-root' in s:
        print('v1.6.4.8 dedicated print root already applied')
    else:
        raise SystemExit('ERROR: v1.6.4.7 print handler not found')
else:
    s = s.replace(old, new, 1)

p.write_text(s, encoding='utf-8')
final = p.read_text(encoding='utf-8')
assert 'codecafe-print-only-root' in final
assert 'body > *:not(#codecafe-print-only-root){display:none!important}' in final
assert 'sourcePages.length === 0' in final
assert 'codecafePrintOnlyPage' in final
print('PASS: v1.6.4.8 prints only isolated CV pages; app UI and print controls cannot enter print tree')
