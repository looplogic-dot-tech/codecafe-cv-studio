import { ChangeEvent, useState } from "react";
import { detectCVBlocks, extractCVText, ImportedBlock, ImportTarget } from "./cvImport";

type Props = {
  lang: "es" | "en";
  onInsert(blocks: ImportedBlock[]): void;
  onClose(): void;
};

const targets: Array<[ImportTarget, string, string]> = [
  ["summary", "Perfil profesional", "Professional summary"],
  ["experience", "Experiencia", "Experience"],
  ["coreSkills", "Competencias", "Core skills"],
  ["tools", "Herramientas y tecnologías", "Tools & technologies"],
  ["projects", "Proyectos", "Projects"],
  ["certifications", "Certificaciones", "Certifications"],
  ["education", "Educación", "Education"],
  ["languages", "Idiomas", "Languages"],
  ["about", "Acerca de", "About"],
  ["custom", "Nueva sección", "New section"],
  ["skip", "No insertar", "Do not insert"],
];

export default function CVImporter({ lang, onInsert, onClose }: Props) {
  const [blocks, setBlocks] = useState<ImportedBlock[]>([]);
  const [fileName, setFileName] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const es = lang === "es";
  const update = (id: string, values: Partial<ImportedBlock>) => setBlocks((current) => current.map((block) => block.id === id ? { ...block, ...values } : block));
  const readFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setBusy(true); setError(""); setFileName(file.name);
    try {
      const detected = detectCVBlocks(await extractCVText(file));
      if (!detected.length) throw new Error(es ? "No se detectó texto. El PDF podría ser una imagen escaneada." : "No text was detected. The PDF may be a scanned image.");
      setBlocks(detected);
    } catch (failure) {
      setBlocks([]); setError((failure as Error).message);
    } finally {
      setBusy(false); event.target.value = "";
    }
  };
  const selected = blocks.filter((block) => block.target !== "skip" && block.text.trim());
  return <div className="importOverlay" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
    <section className="importPanel" role="dialog" aria-modal="true" aria-labelledby="import-title">
      <div className="libraryHead"><div><span className="eyebrow">CODECAFE IMPORT</span><h2 id="import-title">{es ? "Importar contenido de un CV" : "Import résumé content"}</h2><p>{es ? "Revisa dónde se insertará cada texto antes de modificar el CV abierto." : "Review where every text block will go before the open résumé changes."}</p></div><button onClick={onClose} aria-label={es ? "Cerrar" : "Close"}>×</button></div>
      {!blocks.length && <div className="importStart"><label className="primary">{busy ? (es ? "Leyendo…" : "Reading…") : (es ? "Seleccionar documento" : "Choose document")}<input type="file" disabled={busy} accept=".pdf,.docx,.odt,.ods,.txt,.md,.csv,.rtf" onChange={readFile} /></label><small>{es ? "PDF, Word (.docx), ODT, ODS y formatos de texto" : "PDF, Word (.docx), ODT, ODS, and text formats"}</small>{error && <p className="importError">{error}</p>}</div>}
      {blocks.length > 0 && <><div className="importFile"><b>{fileName}</b><span>{blocks.length} {es ? "bloques detectados" : "detected blocks"}</span></div><div className="importBlocks">{blocks.map((block, index) => <article className="importBlock" key={block.id}>
        <div className="importBlockHead"><b>{index + 1}. {block.heading}</b><label>{es ? "Insertar en" : "Insert into"}<select value={block.target} onChange={(event) => update(block.id, { target: event.target.value as ImportTarget })}>{targets.map(([value, labelEs, labelEn]) => <option value={value} key={value}>{es ? labelEs : labelEn}</option>)}</select></label></div>
        {block.target === "custom" && <input className="inputField" aria-label={es ? "Título de la nueva sección" : "New section title"} value={block.customTitle || ""} onChange={(event) => update(block.id, { customTitle: event.target.value })} />}
        <textarea className="inputField" rows={Math.min(8, Math.max(3, block.text.split("\n").length + 1))} value={block.text} onChange={(event) => update(block.id, { text: event.target.value })} />
      </article>)}</div><footer className="importFooter"><button onClick={() => setBlocks([])}>{es ? "Elegir otro archivo" : "Choose another file"}</button><div><button onClick={onClose}>{es ? "Cancelar" : "Cancel"}</button><button className="primary" disabled={!selected.length} onClick={() => onInsert(selected)}>{es ? `Insertar seleccionados (${selected.length})` : `Insert selected (${selected.length})`}</button></div></footer></>}
    </section>
  </div>;
}
