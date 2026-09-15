from pathlib import Path

p = Path('src/printEditorV3.ts')
s = p.read_text(encoding='utf-8')

# Ensure every print-only control/overlay is excluded from actual browser output.
old = '      .topbar,.editor,.previewTop,.atsCheck,#${OVERLAY_ID},#${LAUNCHER_ID}{display:none!important}'
new = '      .topbar,.editor,.previewTop,.atsCheck,#${OVERLAY_ID},#${LAUNCHER_ID},.printEditorControls,.printEditorHeadV2,.printEditorActionsV2,.printEditorMarginGridV2,.printEditorPresetRowV2,.printEditorCompactRowV2,.printEditorCheckRowV2,.printMarginGuidesV2,.printBreakTargetV2,.printBreakSpacerV2{display:none!important}'
if old in s:
    s = s.replace(old, new, 1)
elif new not in s:
    raise SystemExit('ERROR: print exclusion CSS target not found')

# Hide the entire print editor overlay in the DOM before invoking the browser print
# dialog. Restore it after printing/canceling. This is deliberately redundant with
# @media print so controls cannot leak into PDF output even if browser print CSS
# evaluation is delayed.
old_click = '    print.onclick = () => { saveSettings(settings); installRuntimePrintStyle(settings); requestAnimationFrame(() => window.print()); };'
new_click = '''    print.onclick = () => {
      saveSettings(settings);
      installRuntimePrintStyle(settings);
      const previousDisplay = overlay.style.display;
      overlay.style.setProperty("display", "none", "important");
      const restore = () => {
        overlay.style.display = previousDisplay;
        window.removeEventListener("afterprint", restore);
      };
      window.addEventListener("afterprint", restore, { once: true });
      requestAnimationFrame(() => requestAnimationFrame(() => window.print()));
    };'''
if old_click in s:
    s = s.replace(old_click, new_click, 1)
elif 'overlay.style.setProperty("display", "none", "important")' not in s:
    raise SystemExit('ERROR: print action target not found')

# Also protect Ctrl+P / browser menu printing while the editor overlay is open.
old_tail = '  window.addEventListener("beforeprint", () => installRuntimePrintStyle(loadSettings()));\n}'
new_tail = '''  let beforePrintDisplay: string | null = null;
  window.addEventListener("beforeprint", () => {
    installRuntimePrintStyle(loadSettings());
    const overlay = document.getElementById(OVERLAY_ID) as HTMLElement | null;
    if (overlay) {
      beforePrintDisplay = overlay.style.display;
      overlay.style.setProperty("display", "none", "important");
    }
  });
  window.addEventListener("afterprint", () => {
    const overlay = document.getElementById(OVERLAY_ID) as HTMLElement | null;
    if (overlay && beforePrintDisplay !== null) overlay.style.display = beforePrintDisplay;
    beforePrintDisplay = null;
  });
}'''
if old_tail in s:
    s = s.replace(old_tail, new_tail, 1)
elif 'beforePrintDisplay' not in s:
    raise SystemExit('ERROR: beforeprint target not found')

p.write_text(s, encoding='utf-8')
final = p.read_text(encoding='utf-8')
assert '.printEditorControls' in final
assert '.printMarginGuidesV2' in final
assert 'overlay.style.setProperty("display", "none", "important")' in final
assert 'beforePrintDisplay' in final
print('PASS: print editor controls are excluded from browser/PDF output')
