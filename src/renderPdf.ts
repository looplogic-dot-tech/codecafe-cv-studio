import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

function parseMm(value: string, fallback: number): number {
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

export async function renderCurrentLivePreviewPdf(): Promise<Blob> {
  const pages = Array.from(document.querySelectorAll<HTMLElement>("#codecafe-live-page-preview .livePagePaper"));
  if (!pages.length) throw new Error("Live Preview pages are not available for PDF synchronization.");

  const first = pages[0];
  const widthMm = parseMm(first.style.width, 215.9);
  const heightMm = parseMm(first.style.height, 279.4);
  const orientation = widthMm > heightMm ? "landscape" : "portrait";
  const pdf = new jsPDF({ orientation, unit: "mm", format: [widthMm, heightMm], compress: true });

  for (let index = 0; index < pages.length; index += 1) {
    const page = pages[index];
    const canvas = await html2canvas(page, {
      backgroundColor: "#ffffff",
      scale: 2,
      useCORS: true,
      logging: false,
      removeContainer: true,
    });
    if (index > 0) pdf.addPage([widthMm, heightMm], orientation);
    const image = canvas.toDataURL("image/jpeg", 0.96);
    pdf.addImage(image, "JPEG", 0, 0, widthMm, heightMm, undefined, "FAST");
  }

  return pdf.output("blob");
}
