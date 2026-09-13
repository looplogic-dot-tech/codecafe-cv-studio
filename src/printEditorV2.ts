type PaperKey = "letter" | "a4" | "legal";
type MarginSide = "top" | "right" | "bottom" | "left";

type PrintSettingsV2 = {
  top: number;
  right: number;
  bottom: number;
  left: number;
  protectBreaks: boolean;
  manualBreaks: string[];
  paperSize: PaperKey;
};

type BreakCandidate = { key: string; element: HTMLElement };

type PaperDefinition = {
  labelEs: string;
  labelEn: string;
  widthMm: number;
  heightMm: number;
  cssName: string;
};

const STYLE_ID = "codecafe-print-editor-v2-style";
const LAUNCHER_ID = "codecafe-print-editor-launcher";
const OVERLAY_ID = "codecafe-print-editor-v2";
const WORKSPACE_KEY = "codecafe-cv-workspace-v2";
const PX_PER_MM = 96 / 25.4;
const PREVIEW_SCALE = 0.56;

const papers: Record<PaperKey, PaperDefinition> = {
  letter: { labelEs: "Carta", labelEn: "Letter", widthMm: 215.9, heightMm: 279.4, cssName: "Letter" },
  a4: { labelEs: "A4", labelEn: "A4", widthMm: 210, heightMm: 297, cssName: "A4" },
  legal: { labelEs: "Legal", labelEn: "Legal", widthMm: 215.9, heightMm: 355.6, cssName: "Legal" },
};

const defaults: PrintSettingsV2 = {
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
  comfortable: { top: 18, right: 20, bottom: 18, left: 20 },
};

function language(): "es" | "en" {
  return document.querySelector("main")?.getAttribute("lang") === "en" ? "en" : "es";
}

function readWorkspace(): any | null {
  try {
    const parsed = JSON.parse(localStorage.getItem(WORKSPACE_KEY) || "null");
    return parsed?.schema === 2 && Array.isArray(parsed.documents) ? parsed : null;
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

function clampMargin(value: number): number {
  if (!Number.isFinite(value)) return 14;
  return Math.min(50, Math.max(0, Math.round(value * 10) / 10));
}

function normalizeSettings(value: any): PrintSettingsV2 {
  const paperSize: PaperKey = value?.paperSize === "a4" || value?.paperSize === "legal" ? value.paperSize : "letter";
  return {
    top: clampMargin(Number(value?.top ?? defaults.top)),
    right: clampMargin(Number(value?.right ?? defaults.right)),
    bottom: clampMargin(Number(value?.bottom ?? defaults.bottom)),
    left: clampMargin(Number(value?.left ?? defaults.left)),
    protectBreaks: value?.protectBreaks !== false,
    manualBreaks: Array.isArray(value?.manualBreaks)
      ? value.manualBreaks.filter((item: unknown): item is string => typeof item === "string")
      : [],
    paperSize,
  };
}

function loadSettings(): PrintSettingsV2 {
  let local: any = null;
  try {
    local = JSON.parse(localStorage.getItem(storageKey()) || "null");
  } catch {}

  const workspace = readWorkspace();
  const document = workspace?.documents?.find((item: any) => item.id === workspace.activeDocumentId);
  const synced = document?.settings?.print || null;
  const paperSize = local?.paperSize || localStorage.getItem(`codecafe-print-paper:${activeDocumentId()}`) || "letter";
  return normalizeSettings({ ...(synced || {}), ...(local || {}), paperSize });
}

function saveSettings(settings: PrintSettingsV2): void {
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

function candidateElements(root: ParentNode): HTMLElement[] {
  const selector = [
    ".cvSection",
    ".cvJob",
    ".cvProject",
    ".twoCols",
    ".toolCategory",
    ".editableSectionTitle",
    ".jobHeading",
    "section",
    "h2",
    "h3",
    "p",
  ].join(",");
  const seen = new Set<HTMLElement>();
  const result: HTMLElement[] = [];
  root.querySelectorAll<HTMLElement>(selector).forEach((element) => {
    if (seen.has(element)) return;
    if (element.closest(`#${OVERLAY_ID} .printEditorControls`)) return;
    seen.add(element);
    result.push(element);
  });
  return result;
}

function breakCandidates(root: ParentNode): BreakCandidate[] {
  return candidateElements(root).map((element, index) => ({ key: `node:${index}`, element }));
}

function applyManualBreakClasses(settings: PrintSettingsV2): void {
  const paper = document.querySelector<HTMLElement>(".previewPane .paper");
  if (!paper) return;
  paper.querySelectorAll<HTMLElement>(".manualPrintBreak").forEach((element) => element.classList.remove("manualPrintBreak"));
  const selected = new Set(settings.manualBreaks);
  for (const candidate of breakCandidates(paper)) {
    if (selected.has(candidate.key)) candidate.element.classList.add("manualPrintBreak");
  }
}

function applyPrintStyle(settings: PrintSettingsV2): void {
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
    @page{size:${paper.cssName} portrait;margin:${settings.top}mm ${settings.right}mm ${settings.bottom}mm ${settings.left}mm}
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

function simulateManualBreaks(page: HTMLElement, settings: PrintSettingsV2): void {
  page.querySelectorAll(".printBreakSpacerV2").forEach((spacer) => spacer.remove());
  const selected = new Set(settings.manualBreaks);
  const paper = papers[settings.paperSize];
  const pageHeightPx = paper.heightMm * PX_PER_MM;
  const topMarginPx = settings.top * PX_PER_MM;
  const candidates = breakCandidates(page).filter((candidate) => selected.has(candidate.key));
  candidates.sort((a, b) => a.element.offsetTop - b.element.offsetTop);
  for (const candidate of candidates) {
    const currentTop = candidate.element.offsetTop;
    const currentPage = Math.floor(currentTop / pageHeightPx);
    const offsetInsidePage = currentTop - currentPage * pageHeightPx;
    if (offsetInsidePage <= topMarginPx + 8) continue;
    const desiredTop = (currentPage + 1) * pageHeightPx + topMarginPx;
    const needed = Math.max(0, desiredTop - currentTop);
    if (needed < 2) continue;
    const spacer = document.createElement("span");
    spacer.className = "printBreakSpacerV2";
    spacer.style.height = `${needed}px`;
    candidate.element.before(spacer);
  }
}

function makeNumberField(label: string, value: number, onCommit: (value: number) => void): HTMLLabelElement {
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
  input.addEventListener("change", () => onCommit(clampMargin(Number(input.value))));
  const unit = document.createElement("span");
  unit.textContent = "mm";
  row.append(input, unit);
  field.append(caption, row);
  return field;
}

function installBreakTargets(
  page: HTMLElement,
  settings: PrintSettingsV2,
  breakMode: boolean,
  toggleBreak: (key: string) => void,
): void {
  if (!breakMode && settings.manualBreaks.length === 0) return;
  const selected = new Set(settings.manualBreaks);
  for (const candidate of breakCandidates(page)) {
    const active = selected.has(candidate.key);
    if (!breakMode && !active) continue;
    const marker = document.createElement("button");
    marker.type = "button";
    marker.className = `printBreakTargetV2${active ? " active" : ""}`;
    marker.dataset.breakKey = candidate.key;
    marker.title = active
      ? (language() === "es" ? "Quitar salto" : "Remove break")
      : (language() === "es" ? "Insertar salto aquí" : "Insert break here");
    marker.innerHTML = `<span>${active ? "✓" : "+"}</span>`;
    marker.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      toggleBreak(candidate.key);
    });
    candidate.element.before(marker);
  }
}

function addMarginGuides(
  page: HTMLElement,
  settings: PrintSettingsV2,
  onDrag: (side: MarginSide, value: number) => void,
): void {
  const paper = papers[settings.paperSize];
  const guides = document.createElement("div");
  guides.className = "printMarginGuidesV2";

  const positions: Record<MarginSide, number> = {
    top: settings.top,
    right: settings.right,
    bottom: settings.bottom,
    left: settings.left,
  };

  (["top", "right", "bottom", "left"] as MarginSide[]).forEach((side) => {
    const guide = document.createElement("button");
    guide.type = "button";
    guide.className = `printMarginGuideV2 ${side}`;
    guide.setAttribute("aria-label", `${side} margin`);
    if (side === "left") guide.style.left = `${positions.left}mm`;
    if (side === "right") guide.style.right = `${positions.right}mm`;
    if (side === "top") guide.style.top = `${positions.top}mm`;
    if (side === "bottom") guide.style.bottom = `${positions.bottom}mm`;

    guide.addEventListener("pointerdown", (event) => {
      event.preventDefault();
      event.stopPropagation();
      const rect = page.getBoundingClientRect();
      const move = (pointer: PointerEvent) => {
        let value = 0;
        if (side === "left") value = ((pointer.clientX - rect.left) / rect.width) * paper.widthMm;
        if (side === "right") value = ((rect.right - pointer.clientX) / rect.width) * paper.widthMm;
        if (side === "top") value = ((pointer.clientY - rect.top) / rect.height) * paper.heightMm;
        if (side === "bottom") value = ((rect.bottom - pointer.clientY) / rect.height) * paper.heightMm;
        onDrag(side, clampMargin(value));
      };
      const up = () => {
        window.removeEventListener("pointermove", move);
        window.removeEventListener("pointerup", up);
      };
      window.addEventListener("pointermove", move);
      window.addEventListener("pointerup", up, { once: true });
    });
    guides.append(guide);
  });
  page.append(guides);
}

function buildPreview(
  settings: PrintSettingsV2,
  host: HTMLElement,
  breakMode: boolean,
  toggleBreak: (key: string) => void,
  onMarginDrag: (side: MarginSide, value: number) => void,
): void {
  host.replaceChildren();
  const source = document.querySelector<HTMLElement>(".previewPane .paper");
  if (!source) return;
  const paperDef = papers[settings.paperSize];

  const viewport = document.createElement("div");
  viewport.className = "printEditorPreviewViewport";
  const frame = document.createElement("div");
  frame.className = "printEditorPreviewFrame";
  const page = source.cloneNode(true) as HTMLElement;
  page.classList.add("printEditorPaperV2");
  page.removeAttribute("style");
  page.querySelectorAll<HTMLElement>(".manualPrintBreak").forEach((element) => element.classList.remove("manualPrintBreak"));
  page.style.width = `${paperDef.widthMm}mm`;
  page.style.minHeight = `${paperDef.heightMm}mm`;
  page.style.maxWidth = "none";
  page.style.margin = "0";
  page.style.boxShadow = "none";
  page.style.boxSizing = "border-box";
  page.style.padding = `${settings.top}mm ${settings.right}mm ${settings.bottom}mm ${settings.left}mm`;
  page.style.position = "relative";
  page.style.transform = `scale(${PREVIEW_SCALE})`;
  page.style.transformOrigin = "top left";

  installBreakTargets(page, settings, breakMode, toggleBreak);
  addMarginGuides(page, settings, onMarginDrag);
  frame.append(page);
  viewport.append(frame);
  host.append(viewport);

  requestAnimationFrame(() => {
    simulateManualBreaks(page, settings);
    requestAnimationFrame(() => {
      const minHeight = paperDef.heightMm * PX_PER_MM;
      const unscaledHeight = Math.max(page.scrollHeight, minHeight);
      frame.style.width = `${paperDef.widthMm * PX_PER_MM * PREVIEW_SCALE}px`;
      frame.style.height = `${unscaledHeight * PREVIEW_SCALE}px`;
    });
  });
}

function openPrintEditor(): void {
  document.getElementById(OVERLAY_ID)?.remove();
  let settings = loadSettings();
  let breakMode = false;
  applyPrintStyle(settings);
  const lang = language();
  const es = lang === "es";

  const text = es ? {
    title: "Editor de impresión",
    subtitle: "Vista previa y ajustes en un solo lugar. Carta es el tamaño predeterminado.",
    paper: "Papel",
    margins: "Márgenes",
    compact: "Compactos",
    balanced: "Equilibrados",
    comfortable: "Amplios",
    top: "Superior",
    right: "Derecho",
    bottom: "Inferior",
    left: "Izquierdo",
    protect: "Evitar cortes entre puestos, proyectos y encabezados",
    breaks: "Saltos de página",
    breakMode: "Colocar saltos",
    breaksHelp: "Activa este modo y usa los pequeños + en la vista previa exactamente donde quieras iniciar una página nueva.",
    clearBreaks: "Quitar saltos",
    dragHelp: "Arrastra las líneas de margen sobre la hoja. Los valores numéricos se actualizan y siguen siendo editables.",
    print: "Imprimir / Guardar PDF",
    reset: "Restablecer",
  } : {
    title: "Print editor",
    subtitle: "Preview and settings in one place. Letter is always the default paper size.",
    paper: "Paper",
    margins: "Margins",
    compact: "Compact",
    balanced: "Balanced",
    comfortable: "Wide",
    top: "Top",
    right: "Right",
    bottom: "Bottom",
    left: "Left",
    protect: "Avoid splits between jobs, projects and headings",
    breaks: "Page breaks",
    breakMode: "Place breaks",
    breaksHelp: "Enable this mode and use the small + controls in the preview exactly where a new page should begin.",
    clearBreaks: "Clear breaks",
    dragHelp: "Drag the margin lines on the page. Numeric values update automatically and remain editable.",
    print: "Print / Save PDF",
    reset: "Reset",
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
  (Object.keys(papers) as PaperKey[]).forEach((key) => {
    const option = document.createElement("option");
    option.value = key;
    option.textContent = es ? papers[key].labelEs : papers[key].labelEn;
    paperSelect.append(option);
  });
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
  const presetDefinitions = [
    ["compact", text.compact],
    ["balanced", text.balanced],
    ["comfortable", text.comfortable],
  ] as const;

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
  const breaksTitle = document.createElement("h3");
  breaksTitle.textContent = text.breaks;
  const breakToggle = document.createElement("button");
  breakToggle.type = "button";
  breakToggle.className = "printEditorBreakModeV2";
  breakToggle.textContent = text.breakMode;
  breakHeader.append(breaksTitle, breakToggle);
  const breaksHelp = document.createElement("p");
  breaksHelp.className = "printEditorHintV2";
  breaksHelp.textContent = text.breaksHelp;
  const clearBreaks = document.createElement("button");
  clearBreaks.type = "button";
  clearBreaks.className = "printEditorTextButtonV2";
  clearBreaks.textContent = text.clearBreaks;
  breakBlock.append(breakHeader, breaksHelp, clearBreaks);

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

  const setSetting = (patch: Partial<PrintSettingsV2>) => {
    settings = normalizeSettings({ ...settings, ...patch });
    refresh();
  };

  const toggleBreak = (key: string) => {
    const selected = new Set(settings.manualBreaks);
    if (selected.has(key)) selected.delete(key);
    else selected.add(key);
    setSetting({ manualBreaks: [...selected] });
  };

  const refresh = () => {
    saveSettings(settings);
    applyPrintStyle(settings);
    paperSelect.value = settings.paperSize;
    protect.checked = settings.protectBreaks;
    breakToggle.classList.toggle("active", breakMode);
    clearBreaks.disabled = settings.manualBreaks.length === 0;
    fields.replaceChildren(
      makeNumberField(text.top, settings.top, (value) => setSetting({ top: value })),
      makeNumberField(text.right, settings.right, (value) => setSetting({ right: value })),
      makeNumberField(text.bottom, settings.bottom, (value) => setSetting({ bottom: value })),
      makeNumberField(text.left, settings.left, (value) => setSetting({ left: value })),
    );
    buildPreview(settings, previewHost, breakMode, toggleBreak, (side, value) => setSetting({ [side]: value } as Partial<PrintSettingsV2>));
  };

  paperSelect.addEventListener("change", () => setSetting({ paperSize: paperSelect.value as PaperKey }));
  for (const [key, label] of presetDefinitions) {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = label;
    button.addEventListener("click", () => setSetting(presets[key]));
    presetRow.append(button);
  }
  protect.addEventListener("change", () => setSetting({ protectBreaks: protect.checked }));
  breakToggle.addEventListener("click", () => {
    breakMode = !breakMode;
    refresh();
  });
  clearBreaks.addEventListener("click", () => setSetting({ manualBreaks: [] }));
  reset.addEventListener("click", () => {
    settings = { ...defaults, manualBreaks: [] };
    breakMode = false;
    refresh();
  });
  print.addEventListener("click", () => {
    saveSettings(settings);
    applyPrintStyle(settings);
    window.print();
  });

  const close = () => {
    saveSettings(settings);
    overlay.remove();
    window.dispatchEvent(new CustomEvent("codecafe-workspace-reload", { detail: { reason: "print-settings" } }));
  };
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
  if (original) original.style.display = "none";
  let button = document.getElementById(LAUNCHER_ID) as HTMLButtonElement | null;
  if (!button) {
    button = document.createElement("button");
    button.id = LAUNCHER_ID;
    button.className = "primary printEditorLauncherV2";
    button.type = "button";
    button.addEventListener("click", openPrintEditor);
    actions.appendChild(button);
  }
  button.textContent = language() === "es" ? "Imprimir / PDF" : "Print / PDF";
}

export function installPrintEditorV2(): void {
  ensureLauncher();
  const observer = new MutationObserver(ensureLauncher);
  observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ["lang"] });
}
