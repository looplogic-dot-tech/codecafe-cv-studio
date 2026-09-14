type PaperKey = "letter" | "a4" | "legal";
type MarginSide = "top" | "right" | "bottom" | "left";

type PrintSettings = {
  top: number;
  right: number;
  bottom: number;
  left: number;
  paperSize: PaperKey;
  protectBreaks: boolean;
};

const OVERLAY_ID = "codecafe-print-editor-v3";
const LAUNCHER_ID = "codecafe-print-editor-launcher";
const STYLE_ID = "codecafe-print-editor-runtime-style";
const WORKSPACE_KEY = "codecafe-cv-workspace-v2";
const PREVIEW_SCALE = 0.56;
const PX_PER_MM = 96 / 25.4;

const PAPERS: Record<PaperKey, { width: number; height: number; css: string; es: string; en: string }> = {
  letter: { width: 215.9, height: 279.4, css: "Letter", es: "Carta", en: "Letter" },
  a4: { width: 210, height: 297, css: "A4", es: "A4", en: "A4" },
  legal: { width: 215.9, height: 355.6, css: "Legal", es: "Legal", en: "Legal" },
};

const DEFAULTS: PrintSettings = {
  top: 14,
  right: 16,
  bottom: 14,
  left: 16,
  paperSize: "letter",
  protectBreaks: true,
};

function language(): "es" | "en" {
  return document.querySelector("main")?.getAttribute("lang") === "en" ? "en" : "es";
}

function clampMargin(value: number): number {
  if (!Number.isFinite(value)) return 14;
  return Math.max(0, Math.min(50, Math.round(value * 10) / 10));
}

function normalize(value: Partial<PrintSettings> | null | undefined): PrintSettings {
  const paperSize: PaperKey = value?.paperSize === "a4" || value?.paperSize === "legal" ? value.paperSize : "letter";
  return {
    top: clampMargin(Number(value?.top ?? DEFAULTS.top)),
    right: clampMargin(Number(value?.right ?? DEFAULTS.right)),
    bottom: clampMargin(Number(value?.bottom ?? DEFAULTS.bottom)),
    left: clampMargin(Number(value?.left ?? DEFAULTS.left)),
    paperSize,
    protectBreaks: value?.protectBreaks !== false,
  };
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

function settingsKey(): string {
  return `codecafe-print-settings:${activeDocumentId()}`;
}

function loadSettings(): PrintSettings {
  let local: Partial<PrintSettings> | null = null;
  try { local = JSON.parse(localStorage.getItem(settingsKey()) || "null"); } catch {}
  const workspace = readWorkspace();
  const document = workspace?.documents?.find((item: any) => item.id === workspace.activeDocumentId);
  const synced = document?.settings?.print || null;
  return normalize({ ...(synced || {}), ...(local || {}) });
}

function saveSettings(settings: PrintSettings): void {
  localStorage.setItem(settingsKey(), JSON.stringify(settings));
  const workspace = readWorkspace();
  if (!workspace) return;
  const documents = workspace.documents.map((document: any) => document.id === workspace.activeDocumentId
    ? {
        ...document,
        settings: {
          ...document.settings,
          print: {
            ...(document.settings?.print || {}),
            top: settings.top,
            right: settings.right,
            bottom: settings.bottom,
            left: settings.left,
            paperSize: settings.paperSize,
            protectBreaks: settings.protectBreaks,
          },
        },
        updatedAt: new Date().toISOString(),
      }
    : document);
  localStorage.setItem(WORKSPACE_KEY, JSON.stringify({ ...workspace, documents }));
}

function sourcePaper(): HTMLElement | null {
  return document.querySelector<HTMLElement>(".previewPane .paper");
}

function makeContentClone(source: HTMLElement): HTMLElement {
  const clone = source.cloneNode(true) as HTMLElement;
  clone.classList.remove("paper");
  clone.classList.add("printEditorFlowContent");
  clone.querySelectorAll<HTMLElement>(".manualPrintBreak,.printMarginGuidesV2,.printBreakTargetV2,.printBreakSpacerV2").forEach((node) => node.remove());
  clone.style.setProperty("width", "100%", "important");
  clone.style.setProperty("max-width", "none", "important");
  clone.style.setProperty("min-height", "0", "important");
  clone.style.setProperty("margin", "0", "important");
  clone.style.setProperty("padding", "0", "important");
  clone.style.setProperty("box-shadow", "none", "important");
  clone.style.setProperty("box-sizing", "border-box", "important");
  clone.style.setProperty("background", "transparent", "important");
  return clone;
}

function installRuntimePrintStyle(settings: PrintSettings): void {
  let style = document.getElementById(STYLE_ID) as HTMLStyleElement | null;
  if (!style) {
    style = document.createElement("style");
    style.id = STYLE_ID;
    document.head.appendChild(style);
  }
  const paper = PAPERS[settings.paperSize];
  const protectedCss = settings.protectBreaks
    ? ".cvHeader,.cvJob,.cvProject,.twoCols,.toolCategory{break-inside:avoid-page!important;page-break-inside:avoid!important}.editableSectionTitle,.jobHeading{break-after:avoid-page!important;page-break-after:avoid!important}"
    : "";
  style.textContent = `
    @page{size:${paper.css} portrait;margin:${settings.top}mm ${settings.right}mm ${settings.bottom}mm ${settings.left}mm}
    @media print{
      html,body{background:#fff!important;width:auto!important;height:auto!important}
      body{-webkit-print-color-adjust:exact;print-color-adjust:exact}
      .topbar,.editor,.previewTop,.atsCheck,#${OVERLAY_ID},#${LAUNCHER_ID}{display:none!important}
      .workspace{display:block!important;min-height:0!important}
      .previewPane{padding:0!important;max-height:none!important;overflow:visible!important}
      .previewPane>.paper,.paper{box-shadow:none!important;max-width:none!important;width:auto!important;min-height:0!important;margin:0!important;padding:0!important}
      ${protectedCss}
    }
  `;
}

function createNumberField(label: string, side: MarginSide, value: number, onChange: (side: MarginSide, value: number) => void): HTMLElement {
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
  const unit = document.createElement("span");
  unit.textContent = "mm";
  const commit = () => onChange(side, clampMargin(Number(input.value)));
  input.addEventListener("input", commit);
  input.addEventListener("change", commit);
  row.append(input, unit);
  field.append(caption, row);
  return field;
}

function attachGuides(page: HTMLElement, settings: PrintSettings, onChange: (side: MarginSide, value: number) => void): void {
  const paper = PAPERS[settings.paperSize];
  const guides = document.createElement("div");
  guides.className = "printMarginGuidesV2";
  const sides: MarginSide[] = ["top", "right", "bottom", "left"];
  for (const side of sides) {
    const guide = document.createElement("button");
    guide.type = "button";
    guide.className = `printMarginGuideV2 ${side}`;
    guide.style.setProperty(side, `${settings[side]}mm`, "important");
    guide.addEventListener("pointerdown", (event) => {
      event.preventDefault();
      event.stopPropagation();
      const rect = page.getBoundingClientRect();
      const move = (pointer: PointerEvent) => {
        let next = settings[side];
        if (side === "left") next = ((pointer.clientX - rect.left) / rect.width) * paper.width;
        if (side === "right") next = ((rect.right - pointer.clientX) / rect.width) * paper.width;
        if (side === "top") next = ((pointer.clientY - rect.top) / rect.height) * paper.height;
        if (side === "bottom") next = ((rect.bottom - pointer.clientY) / rect.height) * paper.height;
        onChange(side, clampMargin(next));
      };
      const up = () => {
        window.removeEventListener("pointermove", move);
        window.removeEventListener("pointerup", up);
      };
      window.addEventListener("pointermove", move);
      window.addEventListener("pointerup", up, { once: true });
    });
    guides.appendChild(guide);
  }
  page.appendChild(guides);
}

function measureContent(source: HTMLElement, widthMm: number): number {
  const holder = document.createElement("div");
  holder.style.cssText = "position:absolute;left:-100000px;top:0;visibility:hidden;pointer-events:none;";
  const clone = makeContentClone(source);
  clone.style.setProperty("width", `${widthMm}mm`, "important");
  holder.appendChild(clone);
  document.body.appendChild(holder);
  const height = Math.max(clone.scrollHeight, clone.getBoundingClientRect().height);
  holder.remove();
  return height;
}

function buildPageStack(host: HTMLElement, settings: PrintSettings, onChange: (side: MarginSide, value: number) => void): void {
  host.replaceChildren();
  const source = sourcePaper();
  if (!source) {
    host.textContent = language() === "es" ? "No hay una vista previa de CV disponible." : "CV preview is not available.";
    return;
  }

  const paper = PAPERS[settings.paperSize];
  const contentWidthMm = Math.max(40, paper.width - settings.left - settings.right);
  const contentHeightMm = Math.max(40, paper.height - settings.top - settings.bottom);
  const contentHeightPx = contentHeightMm * PX_PER_MM;
  const measuredHeight = measureContent(source, contentWidthMm);
  const pageCount = Math.max(1, Math.min(30, Math.ceil(measuredHeight / contentHeightPx)));

  const stack = document.createElement("div");
  stack.className = "printEditorPageStack";

  for (let pageIndex = 0; pageIndex < pageCount; pageIndex += 1) {
    const frame = document.createElement("div");
    frame.className = "printEditorPreviewFrame";
    frame.style.width = `${paper.width * PX_PER_MM * PREVIEW_SCALE}px`;
    frame.style.height = `${paper.height * PX_PER_MM * PREVIEW_SCALE}px`;

    const page = document.createElement("div");
    page.className = "printEditorPaperV2";
    page.style.setProperty("width", `${paper.width}mm`, "important");
    page.style.setProperty("height", `${paper.height}mm`, "important");
    page.style.setProperty("min-height", `${paper.height}mm`, "important");
    page.style.setProperty("max-width", "none", "important");
    page.style.setProperty("margin", "0", "important");
    page.style.setProperty("padding", "0", "important");
    page.style.setProperty("position", "relative", "important");
    page.style.setProperty("overflow", "hidden", "important");
    page.style.setProperty("transform", `scale(${PREVIEW_SCALE})`, "important");
    page.style.setProperty("transform-origin", "top left", "important");

    const viewport = document.createElement("div");
    viewport.className = "printEditorContentViewport";
    viewport.style.setProperty("position", "absolute", "important");
    viewport.style.setProperty("top", `${settings.top}mm`, "important");
    viewport.style.setProperty("right", `${settings.right}mm`, "important");
    viewport.style.setProperty("bottom", `${settings.bottom}mm`, "important");
    viewport.style.setProperty("left", `${settings.left}mm`, "important");
    viewport.style.setProperty("overflow", "hidden", "important");
    viewport.style.setProperty("box-sizing", "border-box", "important");

    const flow = makeContentClone(source);
    flow.style.setProperty("position", "absolute", "important");
    flow.style.setProperty("left", "0", "important");
    flow.style.setProperty("right", "0", "important");
    flow.style.setProperty("top", `${-(pageIndex * contentHeightPx)}px`, "important");
    flow.style.setProperty("width", "100%", "important");

    viewport.appendChild(flow);
    page.appendChild(viewport);
    attachGuides(page, settings, onChange);
    frame.appendChild(page);
    stack.appendChild(frame);
  }
  host.appendChild(stack);
}

function openEditor(): void {
  document.getElementById(OVERLAY_ID)?.remove();
  let settings = loadSettings();
  const es = language() === "es";
  const text = es ? {
    title: "Editor de impresión", subtitle: "Los márgenes controlan directamente el área útil de cada página.", paper: "Papel", margins: "Márgenes",
    top: "Superior", right: "Derecho", bottom: "Inferior", left: "Izquierdo", compact: "Compactos", balanced: "Equilibrados", wide: "Amplios",
    protect: "Evitar cortes entre puestos, proyectos y encabezados", reset: "Restablecer", print: "Imprimir / Guardar PDF", close: "Cerrar",
  } : {
    title: "Print editor", subtitle: "Margins directly control the usable area of every page.", paper: "Paper", margins: "Margins",
    top: "Top", right: "Right", bottom: "Bottom", left: "Left", compact: "Compact", balanced: "Balanced", wide: "Wide",
    protect: "Avoid splitting jobs, projects and headings", reset: "Reset", print: "Print / Save PDF", close: "Close",
  };

  const overlay = document.createElement("div");
  overlay.id = OVERLAY_ID;
  overlay.className = "printEditorOverlayV2";
  const dialog = document.createElement("div");
  dialog.className = "printEditorDialogV2";
  const previewColumn = document.createElement("div");
  previewColumn.className = "printEditorPreviewColumnV2";
  const previewHost = document.createElement("div");
  previewHost.className = "printEditorPreviewHostV2";
  previewColumn.appendChild(previewHost);
  const controls = document.createElement("div");
  controls.className = "printEditorControls";
  dialog.append(previewColumn, controls);
  overlay.appendChild(dialog);
  document.body.appendChild(overlay);

  const setSetting = (patch: Partial<PrintSettings>) => {
    settings = normalize({ ...settings, ...patch });
    saveSettings(settings);
    render();
  };
  const changeMargin = (side: MarginSide, value: number) => setSetting({ [side]: value } as Partial<PrintSettings>);

  const render = () => {
    controls.replaceChildren();
    const head = document.createElement("div"); head.className = "printEditorHeadV2";
    const titleWrap = document.createElement("div");
    const h2 = document.createElement("h2"); h2.textContent = text.title;
    const subtitle = document.createElement("p"); subtitle.textContent = text.subtitle;
    titleWrap.append(h2, subtitle);
    const close = document.createElement("button"); close.type = "button"; close.className = "printEditorCloseV2"; close.textContent = "×"; close.title = text.close; close.onclick = () => overlay.remove();
    head.append(titleWrap, close);

    const paperLabel = document.createElement("label"); paperLabel.className = "printEditorCompactRowV2";
    const paperText = document.createElement("span"); paperText.textContent = text.paper;
    const select = document.createElement("select");
    (["letter", "a4", "legal"] as PaperKey[]).forEach((key) => {
      const option = document.createElement("option"); option.value = key; option.textContent = PAPERS[key][es ? "es" : "en"]; option.selected = settings.paperSize === key; select.appendChild(option);
    });
    select.onchange = () => setSetting({ paperSize: select.value as PaperKey });
    paperLabel.append(paperText, select);

    const marginTitle = document.createElement("h3"); marginTitle.textContent = text.margins;
    const presets = document.createElement("div"); presets.className = "printEditorPresetRowV2";
    const addPreset = (label: string, values: Pick<PrintSettings, "top" | "right" | "bottom" | "left">) => {
      const button = document.createElement("button"); button.type = "button"; button.textContent = label; button.onclick = () => setSetting(values); presets.appendChild(button);
    };
    addPreset(text.compact, { top: 10, right: 12, bottom: 10, left: 12 });
    addPreset(text.balanced, { top: 14, right: 16, bottom: 14, left: 16 });
    addPreset(text.wide, { top: 18, right: 20, bottom: 18, left: 20 });

    const marginGrid = document.createElement("div"); marginGrid.className = "printEditorMarginGridV2";
    marginGrid.append(
      createNumberField(text.top, "top", settings.top, changeMargin),
      createNumberField(text.right, "right", settings.right, changeMargin),
      createNumberField(text.bottom, "bottom", settings.bottom, changeMargin),
      createNumberField(text.left, "left", settings.left, changeMargin),
    );

    const protect = document.createElement("label"); protect.className = "printEditorCheckRowV2";
    const checkbox = document.createElement("input"); checkbox.type = "checkbox"; checkbox.checked = settings.protectBreaks; checkbox.onchange = () => setSetting({ protectBreaks: checkbox.checked });
    const protectText = document.createElement("span"); protectText.textContent = text.protect; protect.append(checkbox, protectText);

    const actions = document.createElement("div"); actions.className = "printEditorActionsV2";
    const reset = document.createElement("button"); reset.type = "button"; reset.textContent = text.reset; reset.onclick = () => setSetting(DEFAULTS);
    const print = document.createElement("button"); print.type = "button"; print.className = "primary"; print.textContent = text.print;
    print.onclick = () => { saveSettings(settings); installRuntimePrintStyle(settings); requestAnimationFrame(() => window.print()); };
    actions.append(reset, print);

    controls.append(head, paperLabel, marginTitle, presets, marginGrid, protect, actions);
    buildPageStack(previewHost, settings, changeMargin);
    installRuntimePrintStyle(settings);
  };

  overlay.addEventListener("click", (event) => { if (event.target === overlay) overlay.remove(); });
  render();
}

function installLauncher(): void {
  if (document.getElementById(LAUNCHER_ID)) return;
  const anchor = document.querySelector<HTMLElement>(".previewTop");
  if (!anchor) return;
  const button = document.createElement("button");
  button.id = LAUNCHER_ID;
  button.type = "button";
  button.className = "zoom printEditorLauncherV2";
  button.textContent = language() === "es" ? "Imprimir / PDF" : "Print / PDF";
  button.addEventListener("click", openEditor);
  anchor.appendChild(button);
}

export function installPrintEditorV3(): void {
  installRuntimePrintStyle(loadSettings());
  installLauncher();
  const observer = new MutationObserver(() => installLauncher());
  observer.observe(document.documentElement, { childList: true, subtree: true });
  window.addEventListener("beforeprint", () => installRuntimePrintStyle(loadSettings()));
}
