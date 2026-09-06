import JSZip from "jszip";
import mammoth from "mammoth";
import PdfWorker from "pdfjs-dist/legacy/build/pdf.worker.mjs?worker&inline";

export type ImportTarget = "summary" | "experience" | "coreSkills" | "tools" | "projects" | "certifications" | "education" | "languages" | "custom" | "skip";

export type ImportedBlock = {
  id: string;
  heading: string;
  text: string;
  target: ImportTarget;
  customTitle?: string;
};

const targetPatterns: Array<[ImportTarget, RegExp]> = [
  ["summary", /^(perfil|resumen|objetivo|profile|summary|objective)/i],
  ["experience", /^(experiencia|historial laboral|experience|employment|work history)/i],
  ["coreSkills", /^(competencias|habilidades principales|core skills|key skills)/i],
  ["tools", /^(herramientas|tecnolog[ií]as|technical skills|tools|technology)/i],
  ["projects", /^(proyectos|projects)/i],
  ["certifications", /^(certificaciones|cursos|certifications|courses|training)/i],
  ["education", /^(educaci[oó]n|formaci[oó]n acad[eé]mica|education|academic)/i],
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

export async function extractCVText(file: File): Promise<string> {
  const extension = file.name.toLowerCase().split(".").pop() || "";
  if (extension === "pdf") {
    const pdfjs = await import("pdfjs-dist/legacy/build/pdf.mjs");
    pdfjs.GlobalWorkerOptions.workerPort = new PdfWorker();
    const pdf = await pdfjs.getDocument({ data: new Uint8Array(await file.arrayBuffer()) }).promise;
    const pages: string[] = [];
    for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
      const content = await (await pdf.getPage(pageNumber)).getTextContent();
      pages.push(content.items.map((item) => "str" in item ? item.str : "").join(" "));
    }
    return cleanExtractedText(pages.join("\n\n"));
  }
  if (extension === "docx") {
    const result = await mammoth.extractRawText({ arrayBuffer: await file.arrayBuffer() });
    return cleanExtractedText(result.value);
  }
  if (["odt", "ods"].includes(extension)) {
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
  const groups = cleanExtractedText(value).split(/\n\s*\n/).map((group) => group.trim()).filter(Boolean);
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
