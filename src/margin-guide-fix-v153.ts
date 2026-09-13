type MarginSide = "top" | "right" | "bottom" | "left";

const PAPER_MM: Record<string, { width: number; height: number }> = {
  letter: { width: 215.9, height: 279.4 },
  a4: { width: 210, height: 297 },
  legal: { width: 215.9, height: 355.6 },
};

function clampMargin(value: number): number {
  if (!Number.isFinite(value)) return 14;
  return Math.min(50, Math.max(0, Math.round(value * 10) / 10));
}

function currentPaperSize(): keyof typeof PAPER_MM {
  const select = document.querySelector<HTMLSelectElement>("#codecafe-print-editor-v3 select");
  const value = (select?.value || "letter").toLowerCase();
  return value === "a4" || value === "legal" ? value : "letter";
}

function findMarginInput(side: MarginSide): HTMLInputElement | null {
  const labels = [...document.querySelectorAll<HTMLLabelElement>("#codecafe-print-editor-v3 .printEditorNumberField")];
  const names: Record<MarginSide, RegExp> = {
    top: /^(Superior|Top)$/i,
    right: /^(Derecho|Right)$/i,
    bottom: /^(Inferior|Bottom)$/i,
    left: /^(Izquierdo|Left)$/i,
  };
  for (const label of labels) {
    const caption = label.querySelector("span")?.textContent?.trim() || "";
    if (names[side].test(caption)) return label.querySelector<HTMLInputElement>('input[type="number"]');
  }
  return null;
}

function commitMargin(side: MarginSide, value: number): void {
  const input = findMarginInput(side);
  if (!input) return;
  input.value = String(clampMargin(value));
  input.dispatchEvent(new Event("change", { bubbles: true }));
}

function fixGuides(): void {
  const page = document.querySelector<HTMLElement>("#codecafe-print-editor-v3 .printEditorPaperV2");
  const guides = page?.querySelector<HTMLElement>(":scope > .printMarginGuidesV2");
  if (!page || !guides || guides.dataset.v153Fixed === "1") return;

  const paper = PAPER_MM[currentPaperSize()];
  guides.dataset.v153Fixed = "1";
  guides.style.inset = "auto";
  guides.style.top = "0";
  guides.style.left = "0";
  guides.style.width = `${paper.width}mm`;
  guides.style.height = `${paper.height}mm`;
  guides.style.pointerEvents = "none";

  guides.addEventListener("pointerdown", (event) => {
    const target = event.target as HTMLElement | null;
    const guide = target?.closest<HTMLButtonElement>(".printMarginGuideV2");
    if (!guide) return;

    const side = (["top", "right", "bottom", "left"] as MarginSide[])
      .find((candidate) => guide.classList.contains(candidate));
    if (!side) return;

    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();

    const rect = guides.getBoundingClientRect();
    const move = (pointer: PointerEvent) => {
      let value = 0;
      if (side === "left") value = ((pointer.clientX - rect.left) / rect.width) * paper.width;
      if (side === "right") value = ((rect.right - pointer.clientX) / rect.width) * paper.width;
      if (side === "top") value = ((pointer.clientY - rect.top) / rect.height) * paper.height;
      if (side === "bottom") value = ((rect.bottom - pointer.clientY) / rect.height) * paper.height;
      value = clampMargin(value);

      if (side === "left") guide.style.left = `${value}mm`;
      if (side === "right") guide.style.right = `${value}mm`;
      if (side === "top") guide.style.top = `${value}mm`;
      if (side === "bottom") guide.style.bottom = `${value}mm`;
      guide.dataset.pendingMargin = String(value);
    };

    const up = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      const value = Number(guide.dataset.pendingMargin);
      delete guide.dataset.pendingMargin;
      if (Number.isFinite(value)) commitMargin(side, value);
    };

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up, { once: true });
  }, true);
}

export function installMarginGuideFixV153(): void {
  fixGuides();
  const observer = new MutationObserver(() => fixGuides());
  observer.observe(document.documentElement, { childList: true, subtree: true });
}
