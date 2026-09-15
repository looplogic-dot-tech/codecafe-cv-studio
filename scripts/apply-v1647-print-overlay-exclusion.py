from pathlib import Path

p = Path('src/printEditorV3.ts')
s = p.read_text(encoding='utf-8')

old = '    print.onclick = () => { saveSettings(settings); installRuntimePrintStyle(settings); window.dispatchEvent(new Event("codecafe-print-layout-changed")); requestAnimationFrame(() => requestAnimationFrame(() => window.print())); };'
new = '''    print.onclick = () => {
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

if old not in s:
    if 'hideEditorForPrint' in s:
        print('v1.6.4.7 print overlay exclusion already applied')
    else:
        raise SystemExit('ERROR: synchronized print handler not found')
else:
    s = s.replace(old, new, 1)

# Strengthen runtime print CSS as a second independent guard.
css_old = '      .topbar,.editor,.previewTop,.atsCheck,#${OVERLAY_ID},#${LAUNCHER_ID}{display:none!important}'
css_new = '      .topbar,.editor,.previewTop,.atsCheck,#${OVERLAY_ID},#${OVERLAY_ID} *,#${LAUNCHER_ID}{display:none!important}'
if css_old in s:
    s = s.replace(css_old, css_new, 1)
elif css_new not in s:
    raise SystemExit('ERROR: runtime print exclusion CSS not found')

p.write_text(s, encoding='utf-8')

final = p.read_text(encoding='utf-8')
assert 'hideEditorForPrint' in final
assert 'overlay.style.setProperty("display", "none", "important")' in final
assert 'window.addEventListener("beforeprint", hideEditorForPrint' in final
assert 'window.addEventListener("afterprint", restoreEditorAfterPrint)' in final
assert '#${OVERLAY_ID} *' in final
print('PASS: v1.6.4.7 print editor/control overlay is excluded from print/PDF output')
