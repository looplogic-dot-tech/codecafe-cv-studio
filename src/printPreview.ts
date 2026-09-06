type PrintSettings = {
  top: number;
  right: number;
  bottom: number;
  left: number;
  protectBreaks: boolean;
  manualBreaks: string[];
};

type BreakCandidate = {
  key: string;
  element: HTMLElement;
};

const DEFAULTS: PrintSettings = {
  top: 14,
  right: 16,
  bottom: 14,
  left: 16,
  protectBreaks: true,
  manualBreaks: [],
};
const STYLE_ID = "codecafe-print-settings-style";
const LAUNCHER_ID = "codecafe-print-preview-launcher";
const OVERLAY_ID = "codecafe-print-setup";
const PREVIEW_SCALE = 0.55;
const LETTER_WIDTH_MM = 215.9;
const LETTER_HEIGHT_MM = 279.4;
const LETTER_HEIGHT_PX = 1056;
const PX_PER_MM = 96 / 25.4;

const presets: Record<string, Omit<PrintSettings, "protectBreaks" | "manualBreaks">> = {
  compact: { top: 10, right: 12, bottom: 10, left: 12 },
  balanced: { top: 14, right: 16, bottom: 14, left: 16 },
  comfortable: { top: 18, right: 20, bottom: 18, left: 20 },
};

function activeDocumentId(): string {
  try {
    const workspace = JSON.parse(localStorage.getItem("codecafe-cv-workspace-v2") || "null");
    return workspace?.activeDocumentId || "default";
  } catch {
    return "default";
  }
}

function storageKey(): string {
  return `codecafe-print-settings:${activeDocumentId()}`;
}

function clamp(value: number): number {
  if (!Number.isFinite(value)) return 14;
  return Math.min(30, Math.max(5, Math.round(value * 10) / 10));
}

function loadSettings(): PrintSettings {
  try {
    const stored = JSON.parse(localStorage.getItem(storageKey()) || "null");
    if (!stored) return { ...DEFAULTS };
    return {
      top: clamp(Number(stored.top)),
      right: clamp(Number(stored.right)),
      bottom: clamp(Number(stored.bottom)),
      left: clamp(Number(stored.left)),
      protectBreaks: stored.protectBreaks !== false,
      manualBreaks: Array.isArray(stored.manualBreaks)
        ? stored.manualBreaks.filter((value: unknown): value is string => typeof value === "string")
        : [],
    };
  } catch {
    return { ...DEFAULTS };
  }
}

function saveSettings(settings: PrintSettings): void {
  localStorage.setItem(storageKey(), JSON.stringify(settings));
}

function language(): "es" | "en" {
  return document.querySelector("main")?.getAttribute("lang") === "en" ? "en" : "es";
}

function breakCandidates(root: ParentNode): BreakCandidate[] {
  const groups = [
    ["section", ".cvSection"],
    ["job", ".cvJob"],
    ["project", ".cvProject"],
    ["columns", ".twoCols"],
  ] as const;
  const candidates: BreakCandidate[] = [];
  for (const [kind, selector] of groups) {
    [...root.querySelectorAll<HTMLElement>(selector)].forEach((element, index) => {
      candidates.push({ key: `${kind}:${index}`, element });
    });
  }
  return candidates;
}

function applyManualBreakClasses(settings: PrintSettings): void {
  const paper = document.querySelector<HTMLElement>(".previewPane .paper");
  if (!paper) return;
  paper.querySelectorAll<HTMLElement>(".manualPrintBreak").forEach((element) => element.classList.remove("manualPrintBreak"));
  const selected = new Set(settings.manualBreaks);
  for (const candidate of breakCandidates(paper)) {
    if (selected.has(candidate.key)) candidate.element.classList.add("manualPrintBreak");
  }
}

function applyPrintStyle(settings: PrintSettings): void {
  let style = document.getElementById(STYLE_ID) as HTMLStyleElement | null;
  if (!style) {
    style = document.createElement("style");
    style.id = STYLE_ID;
    document.head.appendChild(style);
  }
  const protectedBreaks = settings.protectBreaks ? `
    .cvHeader,.cvJob,.cvProject,.twoCols,.toolCategory{break-inside:avoid-page;page-break-inside:avoid}
    .editableSectionTitle,.jobHeading{break-after:avoid-page;page-break-after:avoid}
    .editableSectionTitle + *{break-before:avoid-page;page-break-before:avoid}
    .cvJob + .cvJob{break-before:auto}
    p,li{orphans:3;widows:3}
  ` : "";
  style.textContent = `
    @page{size:Letter portrait;margin:${settings.top}mm ${settings.right}mm ${settings.bottom}mm ${settings.left}mm}
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

function labeledNumber(label: string, value: number, onChange: (value: number) => void): HTMLLabelElement {
  const wrapper = document.createElement("label");
  wrapper.className = "printMarginField";
  const span = document.createElement("span");
  span.textContent = label;
  const row = document.createElement("div");
  const input = document.createElement("input");
  input.type = "number";
  input.min = "5";
  input.max = "30";
  input.step = "1";
  input.value = String(value);
  const suffix = document.createElement("span");
  suffix.textContent = "mm";
  input.addEventListener("input", () => onChange(clamp(Number(input.value))));
  row.append(input, suffix);
  wrapper.append(span, row);
  return wrapper;
}

function addPreviewBreakControls(page: HTMLElement, settings: PrintSettings, toggle: (key: string) => void): void {
  const selected = new Set(settings.manualBreaks);
  for (const candidate of breakCandidates(page)) {
    const marker = document.createElement("span");
    marker.className = `printBreakMarker${selected.has(candidate.key) ? " selected" : ""}`;
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = selected.has(candidate.key)
      ? (language() === "es" ? "✓ Salto de página" : "✓ Page break")
      : (language() === "es" ? "+ Salto aquí" : "+ Break here");
    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      toggle(candidate.key);
    });
    marker.append(button);
    candidate.element.before(marker);
  }
}

function simulateManualBreaks(page: HTMLElement, settings: PrintSettings): void {
  page.querySelectorAll(".printBreakSpacer").forEach((spacer) => spacer.remove());
  const selected = new Set(settings.manualBreaks);
  const topMarginPx = settings.top * PX_PER_MM;
  const candidates = breakCandidates(page).filter((candidate) => selected.has(candidate.key));
  candidates.sort((left, right) => left.element.offsetTop - right.element.offsetTop);

  for (const candidate of candidates) {
    const currentTop = candidate.element.offsetTop;
    const currentPage = Math.floor(currentTop / LETTER_HEIGHT_PX);
    const offsetInsidePage = currentTop - currentPage * LETTER_HEIGHT_PX;
    if (Math.abs(offsetInsidePage - topMarginPx) < 8 || offsetInsidePage < topMarginPx + 8) continue;
    const desiredTop = (currentPage + 1) * LETTER_HEIGHT_PX + topMarginPx;
    const needed = Math.max(0, desiredTop - currentTop);
    if (needed < 2) continue;
    const spacer = document.createElement("span");
    spacer.className = "printBreakSpacer";
    spacer.style.height = `${needed}px`;
    candidate.element.before(spacer);
  }
}

function buildPreview(
  settings: PrintSettings,
  host: HTMLElement,
  toggleBreak: (key: string) => void,
): void {
  host.replaceChildren();
  const source = document.querySelector<HTMLElement>(".previewPane .paper");
  if (!source) return;

  const frame = document.createElement("div");
  frame.className = "printPreviewFrame";
  const page = source.cloneNode(true) as HTMLElement;
  page.classList.add("printSetupPaper");
  page.removeAttribute("style");
  page.querySelectorAll<HTMLElement>(".manualPrintBreak").forEach((element) => element.classList.remove("manualPrintBreak"));
  page.style.width = `${LETTER_WIDTH_MM}mm`;
  page.style.minHeight = `${LETTER_HEIGHT_MM}mm`;
  page.style.maxWidth = "none";
  page.style.margin = "0";
  page.style.boxShadow = "none";
  page.style.padding = `${settings.top}mm ${settings.right}mm ${settings.bottom}mm ${settings.left}mm`;
  page.style.transform = `scale(${PREVIEW_SCALE})`;
  page.style.transformOrigin = "top left";

  addPreviewBreakControls(page, settings, toggleBreak);

  const guides = document.createElement("div");
  guides.className = "printPageGuides";
  guides.style.transform = `scale(${PREVIEW_SCALE})`;
  guides.style.transformOrigin = "top left";

  frame.append(page, guides);
  host.append(frame);

  requestAnimationFrame(() => {
    simulateManualBreaks(page, settings);
    requestAnimationFrame(() => {
      const unscaledHeight = Math.max(page.scrollHeight, LETTER_HEIGHT_PX);
      const pages = Math.max(1, Math.ceil(unscaledHeight / LETTER_HEIGHT_PX));
      guides.style.height = `${pages * LETTER_HEIGHT_PX}px`;
      frame.style.height = `${Math.max(unscaledHeight, pages * LETTER_HEIGHT_PX) * PREVIEW_SCALE}px`;
    });
  });
}

function openPrintSetup(): void {
  document.getElementById(OVERLAY_ID)?.remove();
  let settings = loadSettings();
  applyPrintStyle(settings);
  const lang = language();
  const text = lang === "es" ? {
    title: "Vista previa de impresión Carta",
    subtitle: "8.5 × 11 in · 215.9 × 279.4 mm · Los ajustes se recuerdan para este CV.",
    margins: "Márgenes",
    compact: "Compactos",
    balanced: "Equilibrados",
    comfortable: "Amplios",
    top: "Superior",
    right: "Derecho",
    bottom: "Inferior",
    left: "Izquierdo",
    protect: "Evitar cortes incómodos entre puestos, proyectos y encabezados",
    breaks: "Saltos de página",
    breaksHelp: "Haz clic en ‘+ Salto aquí’ dentro de la vista previa. Todo lo que sigue se moverá automáticamente a la página siguiente.",
    clearBreaks: "Quitar saltos manuales",
    note: "En la ventana del navegador deja Papel: Carta / Letter y Escala: 100%. Los márgenes y saltos los controla CV Studio.",
    print: "Abrir vista previa / Imprimir",
    reset: "Restablecer",
  } : {
    title: "Letter print preview",
    subtitle: "8.5 × 11 in · 215.9 × 279.4 mm · Settings are remembered for this CV.",
    margins: "Margins",
    compact: "Compact",
    balanced: "Balanced",
    comfortable: "Comfortable",
    top: "Top",
    right: "Right",
    bottom: "Bottom",
    left: "Left",
    protect: "Avoid awkward splits between jobs, projects and headings",
    breaks: "Page breaks",
    breaksHelp: "Click ‘+ Break here’ inside the preview. Everything after that point automatically flows to the next page.",
    clearBreaks: "Clear manual breaks",
    note: "In the browser print window keep Paper: Letter and Scale: 100%. CV Studio controls margins and page breaks.",
    print: "Open print preview / Print",
    reset: "Reset",
  };

  const overlay = document.createElement("div");
  overlay.id = OVERLAY_ID;
  overlay.className = "printSetupOverlay";
  const dialog = document.createElement("section");
  dialog.className = "printSetupDialog";

  const previewColumn = document.createElement("div");
  previewColumn.className = "printSetupPreviewColumn";
  const previewHost = document.createElement("div");
  previewHost.className = "printSetupPreviewHost";
  previewColumn.append(previewHost);

  const controls = document.createElement("aside");
  controls.className = "printSetupControls";
  const head = document.createElement("div");
  head.className = "printSetupHead";
  const heading = document.createElement("div");
  const eyebrow = document.createElement("span");
  eyebrow.className = "eyebrow";
  eyebrow.textContent = "CODECAFE PRINT";
  const h2 = document.createElement("h2");
  h2.textContent = text.title;
  const subtitle = document.createElement("p");
  subtitle.textContent = text.subtitle;
  heading.append(eyebrow, h2, subtitle);
  const x = document.createElement("button");
  x.className = "printSetupCloseX";
  x.textContent = "×";
  head.append(heading, x);

  const marginTitle = document.createElement("h3");
  marginTitle.textContent = text.margins;
  const presetRow = document.createElement("div");
  presetRow.className = "printPresetRow";
  const presetButtons = [
    ["compact", text.compact],
    ["balanced", text.balanced],
    ["comfortable", text.comfortable],
  ] as const;

  const fields = document.createElement("div");
  fields.className = "printMarginGrid";
  const protectLabel = document.createElement("label");
  protectLabel.className = "printProtectRow";
  const protect = document.createElement("input");
  protect.type = "checkbox";
  protect.checked = settings.protectBreaks;
  const protectText = document.createElement("span");
  protectText.textContent = text.protect;
  protectLabel.append(protect, protectText);

  const breaksTitle = document.createElement("h3");
  breaksTitle.textContent = text.breaks;
  const breaksHelp = document.createElement("p");
  breaksHelp.className = "printSetupNote printBreakHelp";
  breaksHelp.textContent = text.breaksHelp;
  const clearBreaks = document.createElement("button");
  clearBreaks.className = "printClearBreaks";
  clearBreaks.textContent = text.clearBreaks;

  const note = document.createElement("p");
  note.className = "printSetupNote";
  note.textContent = text.note;
  const actions = document.createElement("div");
  actions.className = "printSetupActions";
  const reset = document.createElement("button");
  reset.textContent = text.reset;
  const print = document.createElement("button");
  print.className = "primary";
  print.textContent = text.print;

  const toggleBreak = (key: string) => {
    const selected = new Set(settings.manualBreaks);
    if (selected.has(key)) selected.delete(key);
    else selected.add(key);
    settings = { ...settings, manualBreaks: [...selected] };
    refresh();
  };

  const refresh = () => {
    saveSettings(settings);
    applyPrintStyle(settings);
    fields.replaceChildren(
      labeledNumber(text.top, settings.top, (value) => { settings = { ...settings, top: value }; refresh(); }),
      labeledNumber(text.right, settings.right, (value) => { settings = { ...settings, right: value }; refresh(); }),
      labeledNumber(text.bottom, settings.bottom, (value) => { settings = { ...settings, bottom: value }; refresh(); }),
      labeledNumber(text.left, settings.left, (value) => { settings = { ...settings, left: value }; refresh(); }),
    );
    protect.checked = settings.protectBreaks;
    clearBreaks.disabled = settings.manualBreaks.length === 0;
    buildPreview(settings, previewHost, toggleBreak);
  };

  for (const [key, label] of presetButtons) {
    const button = document.createElement("button");
    button.textContent = label;
    button.addEventListener("click", () => {
      settings = { ...settings, ...presets[key] };
      refresh();
    });
    presetRow.append(button);
  }

  protect.addEventListener("change", () => {
    settings = { ...settings, protectBreaks: protect.checked };
    refresh();
  });
  clearBreaks.addEventListener("click", () => {
    settings = { ...settings, manualBreaks: [] };
    refresh();
  });
  reset.addEventListener("click", () => {
    settings = { ...DEFAULTS, manualBreaks: [] };
    refresh();
  });
  print.addEventListener("click", () => {
    saveSettings(settings);
    applyPrintStyle(settings);
    window.print();
  });
  const close = () => overlay.remove();
  x.addEventListener("click", close);
  overlay.addEventListener("mousedown", (event) => { if (event.target === overlay) close(); });

  actions.append(reset, print);
  controls.append(
    head,
    marginTitle,
    presetRow,
    fields,
    protectLabel,
    breaksTitle,
    breaksHelp,
    clearBreaks,
    note,
    actions,
  );
  dialog.append(previewColumn, controls);
  overlay.append(dialog);
  document.body.append(overlay);
  refresh();
}

function ensureLauncher(): void {
  const actions = document.querySelector<HTMLElement>(".topActions");
  if (!actions) return;
  const original = actions.querySelector<HTMLButtonElement>(":scope > button.primary");
  if (!original) return;
  original.style.display = "none";
  if (document.getElementById(LAUNCHER_ID)) return;

  const button = document.createElement("button");
  button.id = LAUNCHER_ID;
  button.className = "primary printPreviewLauncher";
  button.addEventListener("click", openPrintSetup);
  actions.appendChild(button);

  const updateLabel = () => {
    button.textContent = language() === "es" ? "Vista previa / PDF" : "Print preview / PDF";
  };
  updateLabel();
  new MutationObserver(updateLabel).observe(document.querySelector("main") || document.body, {
    attributes: true,
    attributeFilter: ["lang"],
  });
}

export function installPrintPreview(): void {
  ensureLauncher();
  const observer = new MutationObserver(ensureLauncher);
  observer.observe(document.body, { childList: true, subtree: true });
}
