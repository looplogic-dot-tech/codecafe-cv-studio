type PaperKey = "letter" | "a4" | "legal";
type MarginSide = "top" | "right" | "bottom" | "left";

type PrintSettings = {
  top: number;
  right: number;
  bottom: number;
  left: number;
  protectBreaks: boolean;
  manualBreaks: string[];
  paperSize: PaperKey;
};

type BreakCandidate = { key: string; element: HTMLElement };

const STYLE_ID = "codecafe-print-editor-v3-style";
const LAUNCHER_ID = "codecafe-print-editor-launcher";
const OVERLAY_ID = "codecafe-print-editor-v3";
const WORKSPACE_KEY = "codecafe-cv-workspace-v2";
const PREVIEW_SCALE = 0.56;
const PX_PER_MM = 96 / 25.4;

const papers = {
  letter: { es: "Carta", en: "Letter", width: 215.9, height: 279.4, css: "Letter" },
  a4: { es: "A4", en: "A4", width: 210, height: 297, css: "A4" },
  legal: { es: "Legal", en: "Legal", width: 215.9, height: 355.6, css: "Legal" },
} satisfies Record<PaperKey, { es: string; en: string; width: number; height: number; css: string }>;

const defaults: PrintSettings = {
  top: 14,
  right: 16,
  bottom: 14,
  left: 16,
  protectBreaks: true,
  manualBreaks: [],
  paperSize: "letter",
};

const presets = {
  compact: { top: 10, right: 12, bottom: 10, left: 12 },
  balanced: { top: 14, right: 16, bottom: 14, left: 16 },
  wide: { top: 18, right: 20, bottom: 18, left: 20 },
};

function language(): "es" | "en" {
  return document.querySelector("main")?.getAttribute("lang") === "en" ? "en" : "es";
}

function readWorkspace(): any | null {
  try {
    const value = JSON.parse(localStorage.getItem(WORKSPACE_KEY) || "null");
    return value?.schema === 2 && Array.isArray(value.documents) ? value : null;
  } catch {
    return null;
  }
}

function activeDocumentId(): string {
  return readWorkspace()?.activeDocumentId || "default";
}

function storageKey(): string {
  return `codecafe-print-settings:${activeDocumentId()}`;
}

function clamp(value: number): number {
  if (!Number.isFinite(value)) return 14;
  return Math.min(50, Math.max(0, Math.round(value * 10) / 10));
}

function normalize(value: any): PrintSettings {
  const paperSize: PaperKey = value?.paperSize === "a4" || value?.paperSize === "legal" ? value.paperSize : "letter";
  return {
    top: clamp(Number(value?.top ?? defaults.top)),
    right: clamp(Number(value?.right ?? defaults.right)),
    bottom: clamp(Number(value?.bottom ?? defaults.bottom)),
    left: clamp(Number(value?.left ?? defaults.left)),
    protectBreaks: value?.protectBreaks !== false,
    manualBreaks: Array.isArray(value?.manualBreaks) ? value.manualBreaks.filter((v: unknown): v is string => typeof v === "string") : [],
    paperSize,
  };
}

function loadSettings(): PrintSettings {
  let local: any = null;
  try { local = JSON.parse(localStorage.getItem(storageKey()) || "null"); } catch {}
  const workspace = readWorkspace();
  const document = workspace?.documents?.find((item: any) => item.id === workspace.activeDocumentId);
  const synced = document?.settings?.print || null;
  const paperSize = local?.paperSize || localStorage.getItem(`codecafe-print-paper:${activeDocumentId()}`) || "letter";
  return normalize({ ...(synced || {}), ...(local || {}), paperSize });
}

function saveSettings(settings: PrintSettings): void {
  localStorage.setItem(storageKey(), JSON.stringify(settings));
  localStorage.setItem(`codecafe-print-paper:${activeDocumentId()}`, settings.paperSize);

  const workspace = readWorkspace();
  if (!workspace) return;
  const documents = workspace.documents.map((document: any) => document.id === workspace.activeDocumentId
    ? {
        ...document,
        settings: {
          ...document.settings,
          print: {
            top: settings.top,
            right: settings.right,
            bottom: settings.bottom,
            left: settings.left,
            protectBreaks: settings.protectBreaks,
            manualBreaks: settings.manualBreaks,
          },
        },
        updatedAt: new Date().toISOString(),
      }
    : document);
  localStorage.setItem(WORKSPACE_KEY, JSON.stringify({ ...workspace, documents }));
}

function breakCandidates(root: ParentNode): BreakCandidate[] {
  const selector = ".cvSection,.cvJob,.cvProject,.twoCols,.toolCategory,.editableSectionTitle,.jobHeading,section,h2,h3,p";
  const seen = new Set<HTMLElement>();
  const result: BreakCandidate[] = [];
  root.querySelectorAll<HTMLElement>(selector).forEach((element) => {
    if (seen.has(element)) return;
    if (element.closest(`#${OVERLAY_ID} .printEditorControls`)) return;
    seen.add(element);
    result.push({ key: `node:${result.length}`, element });
  });
  return result;
}

function applyManualBreakClasses(settings: PrintSettings): void {
  const paper = document.querySelector<HTMLElement>(".previewPane .paper");
  if (!paper) return;
  paper.querySelectorAll<HTMLElement>(".manualPrintBreak").forEach((element) => element.classList.remove("manualPrintBreak"));
  const selected = new Set(settings.manualBreaks);
  for (const candidate of breakCandidates(paper)) if (selected.has(candidate.key)) candidate.element.classList.add("manualPrintBreak");
}

function applyPrintStyle(settings: PrintSettings): void {
  let style = document.getElementById(STYLE_ID) as HTMLStyleElement | null;
  if (!style) {
    style = document.createElement("style");
    style.id = STYLE_ID;
    document.head.appendChild(style);
  }
  const paper = papers[settings.paperSize];
  const protectedBreaks = settings.protectBreaks ? `
    .cvHeader,.cvJob,.cvProject,.twoCols,.toolCategory{break-inside:avoid-page;page-break-inside:avoid}
    .editableSectionTitle,.jobHeading{break-after:avoid-page;page-break-after:avoid}
    .editableSectionTitle + *{break-before:avoid-page;page-break-before:avoid}
    p,li{orphans:3;widows:3}
  ` : "";
  style.textContent = `
    @page{size:${paper.css} portrait;margin:${settings.top}mm ${settings.right}mm ${settings.bottom}mm ${settings.left}mm}
    @media print{
      html,body{background:#fff!important;width:auto!important;height:auto!important}
      body{-webkit-print-color-adjust:exact;print-color-adjust:exact}
      .topbar,.editor,.previewTop,.atsCheck,#${OVERLAY_ID},#${LAUNCHER_ID}{display:none!important}
      .workspace{display:block!important;min-height:0!important}
      .previewPane{padding:0!important;max-height:none!important;overflow:visible!important}
      .paper{box-shadow:none!important;max-width:none!important;width:auto!important;min-height:0!important;margin:0!important;padding:0!important}
      .manualPrintBreak{break-before:page!important;page-break-before:always!important}
      ${protectedBreaks}
    }
  `;
  applyManualBreakClasses(settings);
}

function numberField(label: string, value: number, onChange: (value: number) => void): HTMLLabelElement {
  const field = document.createElement("label");
  field.className = "printEditorNumberField";
  const caption = document.createElement("span");
  caption.textContent = label;
  const row = document.createElement("div");
  const input = document.createElement("input");
  input.type = "number";
  input.min = "0";
  input.max = "50";
  input.step = "0.5";
  input.value = String(value);
  input.addEventListener("change", () => onChange(clamp(Number(input.value))));
  const unit = document.createElement("span");
  unit.textContent = "mm";
  row.append(input, unit);
  field.append(caption, row);
  return field;
}

function addBreakTargets(page: HTMLElement, settings: PrintSettings, enabled: boolean, toggle: (key: string) => void): void {
  const selected = new Set(settings.manualBreaks);
  if (!enabled && selected.size === 0) return;
  for (const candidate of breakCandidates(page)) {
    const active = selected.has(candidate.key);
    if (!enabled && !active) continue;
    const marker = document.createElement("button");
    marker.type = "button";
    marker.className = `printBreakTargetV2${active ? " active" : ""}`;
    marker.title = active ? (language() === "es" ? "Quitar salto" : "Remove break") : (language() === "es" ? "Insertar salto aquí" : "Insert break here");
    marker.innerHTML = `<span>${active ? "✓" : "+"}</span>`;
    marker.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      toggle(candidate.key);
    });
    candidate.element.before(marker);
  }
}

function addMarginGuides(page: HTMLElement, settings: PrintSettings, onDrag: (side: MarginSide, value: number) => void): void {
  const paper = papers[settings.paperSize];
  const guides = document.createElement("div");
  guides.className = "printMarginGuidesV2";

  for (const side of ["top", "right", "bottom", "left"] as MarginSide[]) {
    const guide = document.createElement("button");
    guide.type = "button";
    guide.className = `printMarginGuideV2 ${side}`;
    if (side === "left") guide.style.left = `${settings.left}mm`;
    if (side === "right") guide.style.right = `${settings.right}mm`;
    if (side === "top") guide.style.top = `${settings.top}mm`;
    if (side === "bottom") guide.style.bottom = `${settings.bottom}mm`;

    guide.addEventListener("pointerdown", (event) => {
      event.preventDefault();
      event.stopPropagation();
      const rect = page.getBoundingClientRect();
      const move = (pointer: PointerEvent) => {
        let value = 0;
        if (side === "left") value = ((pointer.clientX - rect.left) / rect.width) * paper.width;
        if (side === "right") value = ((rect.right - pointer.clientX) / rect.width) * paper.width;
        if (side === "top") value = ((pointer.clientY - rect.top) / rect.height) * paper.height;
        if (side === "bottom") value = ((rect.bottom - pointer.clientY) / rect.height) * paper.height;
        onDrag(side, clamp(value));
      };
      const up = () => {
        window.removeEventListener("pointermove", move);
        window.removeEventListener("pointerup", up);
      };
      window.addEventListener("pointermove", move);
      window.addEventListener("pointerup", up, { once: true });
    });
    guides.append(guide);
  }
  page.append(guides);
}

function simulateBreaks(page: HTMLElement, settings: PrintSettings): void {
  page.querySelectorAll(".printBreakSpacerV2").forEach((node) => node.remove());
  const selected = new Set(settings.manualBreaks);
  const paper = papers[settings.paperSize];
  const pageHeight = paper.height * PX_PER_MM;
  const topMargin = settings.top * PX_PER_MM;
  const candidates = breakCandidates(page).filter((candidate) => selected.has(candidate.key));
  candidates.sort((a, b) => a.element.offsetTop - b.element.offsetTop);
  for (const candidate of candidates) {
    const currentTop = candidate.element.offsetTop;
    const currentPage = Math.floor(currentTop / pageHeight);
    const inside = currentTop - currentPage * pageHeight;
    if (inside <= topMargin + 8) continue;
    const target = (currentPage + 1) * pageHeight + topMargin;
    const needed = Math.max(0, target - currentTop);
    if (needed < 2) continue;
    const spacer = document.createElement("span");
    spacer.className = "printBreakSpacerV2";
    spacer.style.height = `${needed}px`;
    candidate.element.before(spacer);
  }
}

function buildPreview(settings: PrintSettings, host: HTMLElement, breakMode: boolean, toggle: (key: string) => void, onMargin: (side: MarginSide, value: number) => void): void {
  host.replaceChildren();
  const source = document.querySelector<HTMLElement>(".previewPane .paper");
  if (!source) return;
  const paper = papers[settings.paperSize];

  const viewport = document.createElement("div");
  viewport.className = "printEditorPreviewViewport";
  const frame = document.createElement("div");
  frame.className = "printEditorPreviewFrame";
  const page = source.cloneNode(true) as HTMLElement;
  page.classList.add("printEditorPaperV2");
  page.removeAttribute("style");
  page.querySelectorAll<HTMLElement>(".manualPrintBreak").forEach((element) => element.classList.remove("manualPrintBreak"));
  page.style.width = `${paper.width}mm`;
  page.style.minHeight = `${paper.height}mm`;
  page.style.maxWidth = "none";
  page.style.margin = "0";
  page.style.boxShadow = "none";
  page.style.boxSizing = "border-box";
  page.style.padding = `${settings.top}mm ${settings.right}mm ${settings.bottom}mm ${settings.left}mm`;
  page.style.position = "relative";
  page.style.transform = `scale(${PREVIEW_SCALE})`;
  page.style.transformOrigin = "top left";

  addBreakTargets(page, settings, breakMode, toggle);
  addMarginGuides(page, settings, onMargin);
  frame.append(page);
  viewport.append(frame);
  host.append(viewport);

  requestAnimationFrame(() => {
    simulateBreaks(page, settings);
    requestAnimationFrame(() => {
      const minHeight = paper.height * PX_PER_MM;
      const fullHeight = Math.max(page.scrollHeight, minHeight);
      frame.style.width = `${paper.width * PX_PER_MM * PREVIEW_SCALE}px`;
      frame.style.height = `${fullHeight * PREVIEW_SCALE}px`;
    });
  });
}

function openPrintEditor(): void {
  document.getElementById(OVERLAY_ID)?.remove();
  let settings = loadSettings();
  let breakMode = false;
  applyPrintStyle(settings);
  const es = language() === "es";

  const text = es ? {
    title: "Editor de impresión",
    subtitle: "Vista previa y ajustes en un solo lugar. Carta es el tamaño predeterminado.",
    paper: "Papel",
    margins: "Márgenes",
    compact: "Compactos",
    balanced: "Equilibrados",
    wide: "Amplios",
    top: "Superior",
    right: "Derecho",
    bottom: "Inferior",
    left: "Izquierdo",
    protect: "Evitar cortes entre puestos, proyectos y encabezados",
    breaks: "Saltos de página",
    breakMode: "Colocar saltos",
    breaksHelp: "Activa este modo y usa los pequeños + en la vista previa donde quieras iniciar una página nueva.",
    dragHelp: "Arrastra las líneas de margen sobre la hoja. Los valores se actualizan y siguen siendo editables.",
    clear: "Quitar saltos",
    reset: "Restablecer",
    print: "Imprimir / Guardar PDF",
  } : {
    title: "Print editor",
    subtitle: "Preview and settings in one place. Letter is the default paper size.",
    paper: "Paper",
    margins: "Margins",
    compact: "Compact",
    balanced: "Balanced",
    wide: "Wide",
    top: "Top",
    right: "Right",
    bottom: "Bottom",
    left: "Left",
    protect: "Avoid splits between jobs, projects and headings",
    breaks: "Page breaks",
    breakMode: "Place breaks",
    breaksHelp: "Enable this mode and use the small + controls where a new page should begin.",
    dragHelp: "Drag the margin lines on the page. Values update and remain editable.",
    clear: "Clear breaks",
    reset: "Reset",
    print: "Print / Save PDF",
  };

  const overlay = document.createElement("div");
  overlay.id = OVERLAY_ID;
  overlay.className = "printEditorOverlayV2";
  const dialog = document.createElement("section");
  dialog.className = "printEditorDialogV2";
  const previewColumn = document.createElement("div");
  previewColumn.className = "printEditorPreviewColumnV2";
  const previewHost = document.createElement("div");
  previewHost.className = "printEditorPreviewHostV2";
  previewColumn.append(previewHost);

  const controls = document.createElement("aside");
  controls.className = "printEditorControls";
  const head = document.createElement("div");
  head.className = "printEditorHeadV2";
  const heading = document.createElement("div");
  const eyebrow = document.createElement("span");
  eyebrow.className = "eyebrow";
  eyebrow.textContent = "CODECAFE PRINT";
  const h2 = document.createElement("h2");
  h2.textContent = text.title;
  const subtitle = document.createElement("p");
  subtitle.textContent = text.subtitle;
  heading.append(eyebrow, h2, subtitle);
  const closeX = document.createElement("button");
  closeX.type = "button";
  closeX.className = "printEditorCloseV2";
  closeX.textContent = "×";
  head.append(heading, closeX);

  const paperRow = document.createElement("div");
  paperRow.className = "printEditorCompactRowV2";
  const paperLabel = document.createElement("label");
  paperLabel.textContent = text.paper;
  const paperSelect = document.createElement("select");
  for (const key of Object.keys(papers) as PaperKey[]) {
    const option = document.createElement("option");
    option.value = key;
    option.textContent = es ? papers[key].es : papers[key].en;
    paperSelect.append(option);
  }
  paperSelect.value = settings.paperSize;
  paperLabel.append(paperSelect);
  paperRow.append(paperLabel);

  const marginHeader = document.createElement("div");
  marginHeader.className = "printEditorSectionTitleV2";
  const marginTitle = document.createElement("h3");
  marginTitle.textContent = text.margins;
  const dragHelp = document.createElement("span");
  dragHelp.textContent = text.dragHelp;
  marginHeader.append(marginTitle, dragHelp);

  const presetRow = document.createElement("div");
  presetRow.className = "printEditorPresetRowV2";
  const fields = document.createElement("div");
  fields.className = "printEditorMarginGridV2";

  const protectLabel = document.createElement("label");
  protectLabel.className = "printEditorCheckRowV2";
  const protect = document.createElement("input");
  protect.type = "checkbox";
  const protectText = document.createElement("span");
  protectText.textContent = text.protect;
  protectLabel.append(protect, protectText);

  const breakBlock = document.createElement("div");
  breakBlock.className = "printEditorBreakBlockV2";
  const breakHeader = document.createElement("div");
  breakHeader.className = "printEditorSectionTitleV2";
  const breakTitle = document.createElement("h3");
  breakTitle.textContent = text.breaks;
  const breakToggle = document.createElement("button");
  breakToggle.type = "button";
  breakToggle.className = "printEditorBreakModeV2";
  breakToggle.textContent = text.breakMode;
  breakHeader.append(breakTitle, breakToggle);
  const breakHelp = document.createElement("p");
  breakHelp.className = "printEditorHintV2";
  breakHelp.textContent = text.breaksHelp;
  const clear = document.createElement("button");
  clear.type = "button";
  clear.className = "printEditorTextButtonV2";
  clear.textContent = text.clear;
  breakBlock.append(breakHeader, breakHelp, clear);

  const actions = document.createElement("div");
  actions.className = "printEditorActionsV2";
  const reset = document.createElement("button");
  reset.type = "button";
  reset.textContent = text.reset;
  const print = document.createElement("button");
  print.type = "button";
  print.className = "primary";
  print.textContent = text.print;
  actions.append(reset, print);

  const refresh = () => {
    saveSettings(settings);
    applyPrintStyle(settings);
    paperSelect.value = settings.paperSize;
    protect.checked = settings.protectBreaks;
    breakToggle.classList.toggle("active", breakMode);
    clear.disabled = settings.manualBreaks.length === 0;
    fields.replaceChildren(
      numberField(text.top, settings.top, (value) => setSetting({ top: value })),
      numberField(text.right, settings.right, (value) => setSetting({ right: value })),
      numberField(text.bottom, settings.bottom, (value) => setSetting({ bottom: value })),
      numberField(text.left, settings.left, (value) => setSetting({ left: value })),
    );
    buildPreview(settings, previewHost, breakMode, toggleBreak, (side, value) => setSetting({ [side]: value } as Partial<PrintSettings>));
  };

  const setSetting = (patch: Partial<PrintSettings>) => {
    settings = normalize({ ...settings, ...patch });
    refresh();
  };

  const toggleBreak = (key: string) => {
    const selected = new Set(settings.manualBreaks);
    if (selected.has(key)) selected.delete(key); else selected.add(key);
    setSetting({ manualBreaks: [...selected] });
  };

  paperSelect.addEventListener("change", () => setSetting({ paperSize: paperSelect.value as PaperKey }));
  for (const [key, label] of [["compact", text.compact], ["balanced", text.balanced], ["wide", text.wide]] as const) {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = label;
    button.addEventListener("click", () => setSetting(presets[key]));
    presetRow.append(button);
  }
  protect.addEventListener("change", () => setSetting({ protectBreaks: protect.checked }));
  breakToggle.addEventListener("click", () => { breakMode = !breakMode; refresh(); });
  clear.addEventListener("click", () => setSetting({ manualBreaks: [] }));
  reset.addEventListener("click", () => { settings = { ...defaults }; breakMode = false; refresh(); });
  print.addEventListener("click", () => { saveSettings(settings); applyPrintStyle(settings); window.print(); });
  const close = () => { saveSettings(settings); overlay.remove(); };
  closeX.addEventListener("click", close);
  overlay.addEventListener("mousedown", (event) => { if (event.target === overlay) close(); });

  controls.append(head, paperRow, marginHeader, presetRow, fields, protectLabel, breakBlock, actions);
  dialog.append(previewColumn, controls);
  overlay.append(dialog);
  document.body.append(overlay);
  refresh();
}

function ensureLauncher(): void {
  const actions = document.querySelector<HTMLElement>(".topActions");
  if (!actions) return;
  const original = actions.querySelector<HTMLButtonElement>(":scope > button.primary");
  if (original && original.id !== LAUNCHER_ID && original.style.display !== "none") original.style.display = "none";

  let button = document.getElementById(LAUNCHER_ID) as HTMLButtonElement | null;
  if (!button) {
    button = document.createElement("button");
    button.id = LAUNCHER_ID;
    button.className = "primary printEditorLauncherV2";
    button.type = "button";
    button.addEventListener("click", openPrintEditor);
    actions.appendChild(button);
  }

  const desired = language() === "es" ? "Imprimir / PDF" : "Print / PDF";
  if (button.textContent !== desired) button.textContent = desired;
}

export function installPrintEditorV3(): void {
  ensureLauncher();

  // Only watch structural changes. Do not rewrite the button on every mutation;
  // doing so can create a self-triggering MutationObserver loop and freeze startup.
  const bodyObserver = new MutationObserver(() => ensureLauncher());
  bodyObserver.observe(document.body, { childList: true, subtree: true });

  const main = document.querySelector("main");
  if (main) {
    const langObserver = new MutationObserver(() => ensureLauncher());
    langObserver.observe(main, { attributes: true, attributeFilter: ["lang"] });
  }
}
