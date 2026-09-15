from pathlib import Path

MARKER = 'codecafe-stable-page-breaks-v1645'


def replace_once(text: str, old: str, new: str, label: str) -> str:
    if new in text:
        return text
    if old not in text:
        raise SystemExit(f'ERROR: {label} target not found')
    return text.replace(old, new, 1)


p = Path('src/printEditorV3.ts')
s = p.read_text(encoding='utf-8')

if MARKER not in s:
    s = replace_once(
        s,
        'type MarginSide = "top" | "right" | "bottom" | "left";\n\ntype PrintSettings = {',
        'type MarginSide = "top" | "right" | "bottom" | "left";\ntype BreakCandidate = { key: string; element: HTMLElement };\n\n// ' + MARKER + '\ntype PrintSettings = {',
        'break candidate type',
    )
    s = replace_once(
        s,
        '  paperSize: PaperKey;\n  protectBreaks: boolean;\n};',
        '  paperSize: PaperKey;\n  protectBreaks: boolean;\n  manualBreaks: string[];\n};',
        'manualBreaks type',
    )
    s = replace_once(
        s,
        '  paperSize: "letter",\n  protectBreaks: true,\n};',
        '  paperSize: "letter",\n  protectBreaks: true,\n  manualBreaks: [],\n};',
        'manualBreaks defaults',
    )
    s = replace_once(
        s,
        '    paperSize,\n    protectBreaks: value?.protectBreaks !== false,\n  };',
        '    paperSize,\n    protectBreaks: value?.protectBreaks !== false,\n    manualBreaks: Array.isArray(value?.manualBreaks)\n      ? value!.manualBreaks.filter((item: unknown): item is string => typeof item === "string")\n      : [],\n  };',
        'manualBreaks normalize',
    )
    s = replace_once(
        s,
        '            paperSize: settings.paperSize,\n            protectBreaks: settings.protectBreaks,\n',
        '            paperSize: settings.paperSize,\n            protectBreaks: settings.protectBreaks,\n            manualBreaks: settings.manualBreaks,\n',
        'manualBreaks persistence',
    )

    source_anchor = '''function sourcePaper(): HTMLElement | null {\n  return document.querySelector<HTMLElement>(".previewPane .paper");\n}\n'''
    helpers = '''function sourcePaper(): HTMLElement | null {\n  const candidates = Array.from(document.querySelectorAll<HTMLElement>(".previewPane .paper"));\n  return candidates.find((node) => {\n    const style = window.getComputedStyle(node);\n    const rect = node.getBoundingClientRect();\n    return style.display !== "none" && style.visibility !== "hidden" && rect.width > 0 && rect.height > 0;\n  }) || candidates[0] || null;\n}\n\nfunction breakCandidates(root: ParentNode): BreakCandidate[] {\n  const selectors = [\n    ["section", ".cvSection"],\n    ["job", ".cvJob"],\n    ["project", ".cvProject"],\n    ["columns", ".twoCols"],\n  ] as const;\n  const result: BreakCandidate[] = [];\n  for (const [kind, selector] of selectors) {\n    [...root.querySelectorAll<HTMLElement>(selector)].forEach((element, index) => {\n      result.push({ key: `${kind}:${index}`, element });\n    });\n  }\n  return result;\n}\n\nlet manualLayoutBusy = false;\nlet lastManualLayoutSignature = "";\nfunction applyManualBreakLayout(settings: PrintSettings, force = false): void {\n  if (manualLayoutBusy) return;\n  const source = sourcePaper();\n  if (!source) return;\n  const expected = settings.manualBreaks.length;\n  const signature = JSON.stringify(settings.manualBreaks) + "|" + source.textContent + "|" + breakCandidates(source).length;\n  const currentSpacers = source.querySelectorAll(".manualPrintBreakSpacerRuntime").length;\n  if (!force && signature === lastManualLayoutSignature && currentSpacers === expected) return;\n\n  manualLayoutBusy = true;\n  try {\n    source.querySelectorAll(".manualPrintBreakSpacerRuntime").forEach((node) => node.remove());\n    source.querySelectorAll<HTMLElement>(".manualPrintBreak").forEach((node) => node.classList.remove("manualPrintBreak"));\n    const selected = new Set(settings.manualBreaks);\n    const paper = PAPERS[settings.paperSize];\n    const contentHeightPx = Math.max(40, paper.height - settings.top - settings.bottom) * PX_PER_MM;\n    const candidates = breakCandidates(source);\n    for (const candidate of candidates) {\n      if (!selected.has(candidate.key)) continue;\n      const top = candidate.element.offsetTop;\n      const inside = ((top % contentHeightPx) + contentHeightPx) % contentHeightPx;\n      if (inside > 4) {\n        const spacer = document.createElement("span");\n        spacer.className = "manualPrintBreakSpacerRuntime";\n        spacer.setAttribute("aria-hidden", "true");\n        spacer.style.display = "block";\n        spacer.style.height = `${Math.max(0, contentHeightPx - inside)}px`;\n        candidate.element.before(spacer);\n      }\n      candidate.element.classList.add("manualPrintBreak");\n    }\n    lastManualLayoutSignature = signature;\n  } finally {\n    manualLayoutBusy = false;\n  }\n}\n\nfunction installBreakTargets(root: HTMLElement, settings: PrintSettings, enabled: boolean, toggle: (key: string) => void): void {\n  const selected = new Set(settings.manualBreaks);\n  if (!enabled && selected.size === 0) return;\n  for (const candidate of breakCandidates(root)) {\n    const active = selected.has(candidate.key);\n    if (!enabled && !active) continue;\n    const marker = document.createElement("span");\n    marker.className = `printBreakMarkerV3${active ? " active" : ""}`;\n    marker.style.display = "block";\n    marker.style.height = "0";\n    marker.style.position = "relative";\n    marker.style.zIndex = "60";\n    const button = document.createElement("button");\n    button.type = "button";\n    button.className = "printBreakButtonV3";\n    button.textContent = active\n      ? (language() === "es" ? "✓ Salto" : "✓ Break")\n      : (language() === "es" ? "+ Salto aquí" : "+ Break here");\n    button.addEventListener("click", (event) => {\n      event.preventDefault();\n      event.stopPropagation();\n      toggle(candidate.key);\n    });\n    marker.appendChild(button);\n    candidate.element.before(marker);\n  }\n}\n'''
    if source_anchor not in s:
        # The older print-preview fix may already have upgraded sourcePaper.
        start = s.find('function sourcePaper(): HTMLElement | null {')
        end = s.find('\nfunction makeContentClone', start)
        if start < 0 or end < 0:
            raise SystemExit('ERROR: sourcePaper block not found')
        s = s[:start] + helpers + s[end:]
    else:
        s = s.replace(source_anchor, helpers, 1)

    old_clone_cleanup = '  clone.querySelectorAll<HTMLElement>(".manualPrintBreak,.printMarginGuidesV2,.printBreakTargetV2,.printBreakSpacerV2").forEach((node) => node.remove());'
    new_clone_cleanup = '  clone.querySelectorAll<HTMLElement>(".manualPrintBreak").forEach((node) => node.classList.remove("manualPrintBreak"));\n  clone.querySelectorAll<HTMLElement>(".printMarginGuidesV2,.printBreakTargetV2,.printBreakSpacerV2,.printBreakMarkerV3,.printBreakButtonV3").forEach((node) => node.remove());'
    s = replace_once(s, old_clone_cleanup, new_clone_cleanup, 'clone cleanup')

    s = replace_once(
        s,
        '      .previewPane>.paper,.paper{box-shadow:none!important;max-width:none!important;width:auto!important;min-height:0!important;margin:0!important;padding:0!important}\n      ${protectedCss}',
        '      .previewPane>.paper,.paper{box-shadow:none!important;max-width:none!important;width:auto!important;min-height:0!important;margin:0!important;padding:0!important}\n      .manualPrintBreak{break-before:page!important;page-break-before:always!important}\n      .manualPrintBreakSpacerRuntime{display:none!important}\n      ${protectedCss}',
        'print break CSS',
    )
    s = replace_once(
        s,
        '  `;\n}\n\nfunction createNumberField',
        '  `;\n  applyManualBreakLayout(settings);\n}\n\nfunction createNumberField',
        'apply manual layout from print style',
    )

    s = replace_once(
        s,
        'function buildPageStack(host: HTMLElement, settings: PrintSettings, onChange: (side: MarginSide, value: number) => void): void {',
        'function buildPageStack(host: HTMLElement, settings: PrintSettings, onChange: (side: MarginSide, value: number) => void, breakMode: boolean, toggleBreak: (key: string) => void): void {',
        'buildPageStack signature',
    )
    s = replace_once(
        s,
        '    viewport.appendChild(flow);\n    page.appendChild(viewport);',
        '    viewport.appendChild(flow);\n    installBreakTargets(flow, settings, breakMode, toggleBreak);\n    page.appendChild(viewport);',
        'preview break targets',
    )

    s = replace_once(
        s,
        '  let settings = loadSettings();\n  const es = language() === "es";',
        '  let settings = loadSettings();\n  let breakMode = false;\n  const es = language() === "es";',
        'break mode state',
    )
    s = replace_once(
        s,
        '    protect: "Evitar cortes entre puestos, proyectos y encabezados", reset: "Restablecer", print: "Imprimir / Guardar PDF", close: "Cerrar",',
        '    protect: "Evitar cortes entre puestos, proyectos y encabezados", breaks: "Saltos de página", placeBreaks: "Colocar saltos", doneBreaks: "Terminar saltos", clearBreaks: "Quitar saltos", reset: "Restablecer", print: "Imprimir / Guardar PDF", close: "Cerrar",',
        'Spanish break labels',
    )
    s = replace_once(
        s,
        '    protect: "Avoid splitting jobs, projects and headings", reset: "Reset", print: "Print / Save PDF", close: "Close",',
        '    protect: "Avoid splitting jobs, projects and headings", breaks: "Page breaks", placeBreaks: "Place page breaks", doneBreaks: "Done placing breaks", clearBreaks: "Clear breaks", reset: "Reset", print: "Print / Save PDF", close: "Close",',
        'English break labels',
    )
    s = replace_once(
        s,
        '  const changeMargin = (side: MarginSide, value: number) => setSetting({ [side]: value } as Partial<PrintSettings>);\n\n  const render = () => {',
        '''  const changeMargin = (side: MarginSide, value: number) => setSetting({ [side]: value } as Partial<PrintSettings>);\n  const toggleBreak = (key: string) => {\n    const selected = new Set(settings.manualBreaks);\n    if (selected.has(key)) selected.delete(key); else selected.add(key);\n    setSetting({ manualBreaks: [...selected] });\n  };\n\n  const render = () => {''',
        'toggleBreak callback',
    )

    old_protect_actions = '''    const protect = document.createElement("label"); protect.className = "printEditorCheckRowV2";\n    const checkbox = document.createElement("input"); checkbox.type = "checkbox"; checkbox.checked = settings.protectBreaks; checkbox.onchange = () => setSetting({ protectBreaks: checkbox.checked });\n    const protectText = document.createElement("span"); protectText.textContent = text.protect; protect.append(checkbox, protectText);\n\n    const actions = document.createElement("div"); actions.className = "printEditorActionsV2";'''
    new_protect_actions = '''    const protect = document.createElement("label"); protect.className = "printEditorCheckRowV2";\n    const checkbox = document.createElement("input"); checkbox.type = "checkbox"; checkbox.checked = settings.protectBreaks; checkbox.onchange = () => setSetting({ protectBreaks: checkbox.checked });\n    const protectText = document.createElement("span"); protectText.textContent = text.protect; protect.append(checkbox, protectText);\n\n    const breakTitle = document.createElement("h3"); breakTitle.textContent = text.breaks;\n    const breakActions = document.createElement("div"); breakActions.className = "printEditorBreakActionsV3";\n    const placeBreaks = document.createElement("button"); placeBreaks.type = "button"; placeBreaks.textContent = breakMode ? text.doneBreaks : text.placeBreaks;\n    placeBreaks.onclick = () => { breakMode = !breakMode; render(); };\n    const clearBreaks = document.createElement("button"); clearBreaks.type = "button"; clearBreaks.textContent = text.clearBreaks; clearBreaks.disabled = settings.manualBreaks.length === 0;\n    clearBreaks.onclick = () => setSetting({ manualBreaks: [] });\n    breakActions.append(placeBreaks, clearBreaks);\n\n    const actions = document.createElement("div"); actions.className = "printEditorActionsV2";'''
    s = replace_once(s, old_protect_actions, new_protect_actions, 'page break controls')
    s = replace_once(
        s,
        '    controls.append(head, paperLabel, marginTitle, presets, marginGrid, protect, actions);\n    buildPageStack(previewHost, settings, changeMargin);',
        '    applyManualBreakLayout(settings);\n    controls.append(head, paperLabel, marginTitle, presets, marginGrid, protect, breakTitle, breakActions, actions);\n    buildPageStack(previewHost, settings, changeMargin, breakMode, toggleBreak);',
        'render page breaks',
    )

    s = replace_once(
        s,
        'export function installPrintEditorV3(): void {\n  installRuntimePrintStyle(loadSettings());',
        '''export function installPrintEditorV3(): void {\n  installRuntimePrintStyle(loadSettings());\n  let scheduled = false;\n  const scheduleBreakRefresh = () => {\n    if (scheduled) return;\n    scheduled = true;\n    window.requestAnimationFrame(() => { scheduled = false; applyManualBreakLayout(loadSettings()); });\n  };\n  const layoutObserver = new MutationObserver(scheduleBreakRefresh);\n  layoutObserver.observe(document.documentElement, { childList: true, subtree: true, characterData: true });''',
        'runtime break refresh',
    )

    p.write_text(s, encoding='utf-8')

css = Path('src/print-editor-v2.css')
cs = css.read_text(encoding='utf-8')
css_marker = '/* codecafe-stable-page-breaks-v1645 */'
if css_marker not in cs:
    cs += '''\n/* codecafe-stable-page-breaks-v1645 */\n.printEditorBreakActionsV3{display:grid;grid-template-columns:1fr 1fr;gap:7px}.printEditorBreakActionsV3 button{border:1px solid #cbd5e1;background:#fff;border-radius:8px;padding:7px 8px;font:inherit;font-weight:700;cursor:pointer}.printEditorBreakActionsV3 button:disabled{opacity:.45;cursor:default}.printBreakMarkerV3{pointer-events:none}.printBreakButtonV3{pointer-events:auto;position:absolute;left:-4px;top:-13px;border:1px solid #2367e8;border-radius:999px;background:#fff;color:#2367e8;padding:2px 7px;font-size:10px;font-weight:800;white-space:nowrap;box-shadow:0 1px 4px rgba(15,23,42,.16);cursor:pointer}.printBreakMarkerV3.active .printBreakButtonV3{background:#2367e8;color:#fff}\n'''
    css.write_text(cs, encoding='utf-8')

lp = Path('src/livePreviewPages.ts')
l = lp.read_text(encoding='utf-8')
l = l.replace('clone.querySelectorAll<HTMLElement>(".manualPrintBreak,.printMarginGuidesV2,.printBreakTargetV2,.printBreakSpacerV2").forEach(n=>n.remove());', 'clone.querySelectorAll<HTMLElement>(".manualPrintBreak").forEach(n=>n.classList.remove("manualPrintBreak")); clone.querySelectorAll<HTMLElement>(".printMarginGuidesV2,.printBreakTargetV2,.printBreakSpacerV2,.printBreakMarkerV3,.printBreakButtonV3").forEach(n=>n.remove());')
l = l.replace('  if (!force && sig===lastSignature) return;', '  const existingHost=document.getElementById(HOST_ID);\n  if (!force && sig===lastSignature && existingHost?.isConnected) return;')
l = l.replace('    let host=document.getElementById(HOST_ID) as HTMLElement|null;', '    let host=existingHost as HTMLElement|null;')
lp.write_text(l, encoding='utf-8')

# Final assertions: this must remain the existing V3 print editor, now with inherited page breaks.
final = p.read_text(encoding='utf-8')
assert MARKER in final
assert 'manualBreaks: string[]' in final
assert 'Place page breaks' in final
assert 'applyManualBreakLayout(settings)' in final
assert 'installPrintEditorV3' in final
assert 'installPrintPreview' not in final
assert 'manualPrintBreak{break-before:page' in final
live = lp.read_text(encoding='utf-8')
assert 'existingHost?.isConnected' in live
print('PASS: V3 controls retained; manual page breaks and resilient live page stack restored')
