export type ImportTarget = "summary" | "experience" | "coreSkills" | "tools" | "projects" | "certifications" | "education" | "languages" | "custom" | "skip";

export type ImportedBlock = {
  id: string;
  heading: string;
  text: string;
  target: ImportTarget;
  customTitle?: string;
};

const targetPatterns: Array<[ImportTarget, RegExp]> = [
  ["summary", /^(perfil|resumen|objetivo|professional profile|professional summary|profile|summary|objective)/i],
  ["experience", /^(experiencia|historial laboral|professional experience|experience|employment|work history|work experience)/i],
  ["coreSkills", /^(competencias|habilidades|core skills|key skills)/i],
  ["tools", /^(herramientas|tecnolog[ií]as|tools and technologies|technical skills|tools|technology)/i],
  ["projects", /^(proyectos|selected projects|projects)/i],
  ["certifications", /^(certificaciones|cursos|certifications and coursework|certifications|courses|training)/i],
  ["education", /^(educaci[oó]n|formaci[oó]n acad[eé]mica|education|academic background)/i],
  ["languages", /^(idiomas|languages)/i],
];

function xmlText(xml: string): string {
  const document = new DOMParser().parseFromString(xml, "application/xml");
  document.querySelectorAll("text\\:tab, tab").forEach((node) => node.replaceWith("\t"));
  document.querySelectorAll("text\\:line-break, line-break").forEach((node) => node.replaceWith("\n"));
  const paragraphs = Array.from(document.querySelectorAll("text\\:p, text\\:h, p, h"));
  return paragraphs.map((node) => node.textContent?.trim() || "").filter(Boolean).join("\n");
}

function cleanExtractedText(value: string): string {
  return value.replace(/\r/g, "").replace(/[ \t]+\n/g, "\n").replace(/\n{3,}/g, "\n\n").trim();
}

type PdfTextItem = {
  str: string;
  transform: number[];
  width: number;
  height: number;
  hasEOL?: boolean;
};

type PdfLine = {
  text: string;
  height: number;
};

// Reconstruye renglones usando la posición visual de cada fragmento del PDF.
function rebuildPdfLines(items: unknown[]): PdfLine[] {
  const fragments = items.filter((item): item is PdfTextItem => {
    if (!item || typeof item !== "object") return false;
    const candidate = item as Partial<PdfTextItem>;
    return typeof candidate.str === "string" && Array.isArray(candidate.transform);
  });
  const lines: PdfLine[] = [];
  let text = "";
  let baseline: number | null = null;
  let lineHeight = 0;
  let previousEnd = 0;
  const flush = () => {
    const normalized = text.replace(/\s+/g, " ").trim();
    if (normalized) lines.push({ text: normalized, height: lineHeight || 10 });
    text = "";
    baseline = null;
    lineHeight = 0;
    previousEnd = 0;
  };
  for (const fragment of fragments) {
    const x = Number(fragment.transform[4] ?? 0);
    const y = Number(fragment.transform[5] ?? 0);
    const height = Math.abs(Number(fragment.height || fragment.transform[3] || 10));
    const movedToAnotherLine = baseline !== null && Math.abs(y - baseline) > Math.max(2, height * 0.45);
    if (movedToAnotherLine) flush();
    const horizontalGap = text ? x - previousEnd : 0;
    if (text && horizontalGap > Math.max(1.5, height * 0.14)) text += " ";
    text += fragment.str;
    baseline = y;
    lineHeight = Math.max(lineHeight, height);
    previousEnd = x + Math.abs(Number(fragment.width || 0));
    if (fragment.hasEOL) flush();
  }
  flush();
  return lines;
}

function normalizedHeading(value: string): string {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^A-Za-z ]/g, " ").replace(/\s+/g, " ").trim().toLowerCase();
}

const recognizedHeadings = /^(perfil( profesional)?|resumen( profesional)?|objetivo( profesional)?|professional (profile|summary)|summary|experiencia( profesional| laboral)?|historial laboral|professional experience|work (experience|history)|competencias( tecnicas)?|habilidades( tecnicas| principales)?|core skills|key skills|herramientas( y tecnologias)?|tecnologias|tools( and technologies)?|technical skills|proyectos( seleccionados)?|selected projects|projects|certificaciones( y cursos)?|cursos|certifications( and coursework)?|education|educacion|formacion academica|idiomas|languages)$/i;

function isRecognizedHeading(value: string): boolean {
  return recognizedHeadings.test(normalizedHeading(value));
}

// Inserta separadores antes de encabezados conocidos o visualmente destacados.
function formatPdfLines(lines: PdfLine[]): string {
  if (!lines.length) return "";
  const heights = lines.map((line) => line.height).sort((left, right) => left - right);
  const medianHeight = heights[Math.floor(heights.length / 2)] || 10;
  const output: string[] = [];
  lines.forEach((line, index) => {
    const shortProminentLine = line.text.length <= 80 && line.height >= medianHeight * 1.18;
    const uppercaseHeading = line.text.length <= 65 && /[A-ZÁÉÍÓÚÑ]/.test(line.text) && line.text === line.text.toUpperCase();
    const beginsBlock = index > 0 && (isRecognizedHeading(line.text) || shortProminentLine || uppercaseHeading);
    if (beginsBlock && output.at(-1) !== "") output.push("");
    output.push(line.text);
  });
  return cleanExtractedText(output.join("\n"));
}

export async function extractCVText(file: File): Promise<string> {
  const extension = file.name.toLowerCase().split(".").pop() || "";
  if (extension === "pdf") {
    const pdfjs = await import("pdfjs-dist/legacy/build/pdf.mjs");
    pdfjs.GlobalWorkerOptions.workerSrc = "https://cdn.jsdelivr.net/npm/pdfjs-dist@5.4.149/legacy/build/pdf.worker.min.mjs";
    const pdf = await pdfjs.getDocument({ data: new Uint8Array(await file.arrayBuffer()) }).promise;
    const pages: string[] = [];
    for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
      const content = await (await pdf.getPage(pageNumber)).getTextContent();
      pages.push(formatPdfLines(rebuildPdfLines(content.items)));
    }
    return cleanExtractedText(pages.join("\n\n"));
  }
  if (extension === "docx") {
    const { default: mammoth } = await import("mammoth");
    const result = await mammoth.extractRawText({ arrayBuffer: await file.arrayBuffer() });
    return cleanExtractedText(result.value);
  }
  if (["odt", "ods"].includes(extension)) {
    const { default: JSZip } = await import("jszip");
    const zip = await JSZip.loadAsync(await file.arrayBuffer());
    const content = await zip.file("content.xml")?.async("string");
    if (!content) throw new Error("El archivo OpenDocument no contiene content.xml.");
    return cleanExtractedText(xmlText(content));
  }
  if (["txt", "md", "csv", "rtf"].includes(extension)) return cleanExtractedText(await file.text());
  throw new Error("Formato no compatible. Usa PDF, DOCX, ODT, ODS, TXT, MD, CSV o RTF.");
}

function inferTarget(heading: string, text: string): ImportTarget {
  const candidate = `${heading} ${text.slice(0, 100)}`.trim();
  return targetPatterns.find(([, pattern]) => pattern.test(candidate))?.[0] || "custom";
}

export function detectCVBlocks(value: string): ImportedBlock[] {
  const clean = cleanExtractedText(value);
  const separatedLines: string[] = [];
  clean.split("\n").forEach((line, index) => {
    const trimmed = line.trim();
    if (index > 0 && trimmed && isRecognizedHeading(trimmed) && separatedLines.at(-1) !== "") separatedLines.push("");
    separatedLines.push(trimmed);
  });
  const groups = cleanExtractedText(separatedLines.join("\n")).split(/\n\s*\n/).map((group) => group.trim()).filter(Boolean);
  return groups.map((group, index) => {
    const lines = group.split("\n").map((line) => line.trim()).filter(Boolean);
    const first = lines[0] || "";
    const looksLikeHeading = lines.length > 1 && (first.length <= 55 || /:$/.test(first));
    const heading = looksLikeHeading ? first.replace(/:$/, "") : `Bloque ${index + 1}`;
    const text = looksLikeHeading ? lines.slice(1).join("\n") : lines.join("\n");
    const target = inferTarget(heading, text);
    return { id: `import-${index}-${heading}`, heading, text, target, customTitle: target === "custom" ? heading : undefined };
  });
}
