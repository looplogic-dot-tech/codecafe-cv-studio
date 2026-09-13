import { useMemo, useState } from "react";
import {
  currentBindings,
  defaultPlacement,
  persistLibrarySelection,
  placementsForKind,
  suggestionScore,
  type LibraryPlacement,
  type LibrarySelection,
} from "./libraryLinking";
import { getProfessionalLibrary, type CVDocument, type CVWorkspace } from "./workspace";

type Props = {
  lang: "es" | "en";
  workspace: CVWorkspace;
  document: CVDocument;
  onClose(): void;
};

const copy = {
  es: {
    title: "Construir con Biblioteca Profesional",
    intro: "Selecciona qué datos profesionales usar en este CV. Los datos básicos del perfil no se tocan aquí.",
    search: "Buscar en la biblioteca…",
    suggested: "Sugerido",
    linked: "Vinculado",
    customized: "Personalizado en este CV",
    placement: "Sección del CV",
    none: "No hay registros revisados disponibles.",
    save: "Aplicar selección",
    applySuggested: "Aplicar sugerencias",
    cancel: "Cancelar",
    selected: "seleccionados",
    basics: "Nombre, email, teléfono, ubicación y LinkedIn continúan heredándose exclusivamente desde el perfil.",
  },
  en: {
    title: "Build from Professional Library",
    intro: "Choose which professional facts to use in this CV. Profile basic information is not touched here.",
    search: "Search the library…",
    suggested: "Suggested",
    linked: "Linked",
    customized: "Customized in this CV",
    placement: "CV section",
    none: "No reviewed library records are available.",
    save: "Apply selection",
    applySuggested: "Apply suggested",
    cancel: "Cancel",
    selected: "selected",
    basics: "Name, email, phone, location and LinkedIn continue to inherit exclusively from the profile.",
  },
} as const;

const placementLabels: Record<"es" | "en", Record<LibraryPlacement, string>> = {
  es: {
    summary: "Resumen profesional",
    experience: "Experiencia",
    coreSkills: "Core Skills",
    tools: "Herramientas y tecnologías",
    projects: "Proyectos",
    certifications: "Certificaciones",
    skills: "Habilidades y palabras clave",
    education: "Educación",
    languages: "Idiomas",
    custom: "Sección personalizada",
  },
  en: {
    summary: "Professional Summary",
    experience: "Experience",
    coreSkills: "Core Skills",
    tools: "Tools & Technologies",
    projects: "Projects",
    certifications: "Certifications",
    skills: "Skills & Keywords",
    education: "Education",
    languages: "Languages",
    custom: "Custom section",
  },
};

export default function CVLibraryComposer({ lang, workspace, document, onClose }: Props) {
  const t = copy[lang];
  const library = getProfessionalLibrary(workspace, document.profileId);
  const collection = workspace.collections.find((item) => item.id === document.collectionId);
  const bindings = currentBindings(document);
  const initial = useMemo(() => new Map(bindings.map((binding) => [binding.recordId, {
    recordId: binding.recordId,
    placement: binding.placement,
    order: binding.order,
  } satisfies LibrarySelection])), [document.id]);
  const [selected, setSelected] = useState(initial);
  const [query, setQuery] = useState("");

  const scoredRecords = useMemo(() => library.records
    .filter((record) => record.status === "reviewed")
    .map((record) => ({ record, score: suggestionScore(record, document, collection?.name || "") })),
  [collection?.name, document, library.records]);

  const suggestedRecords = useMemo(() => scoredRecords
    .filter(({ score }) => score > 0)
    .sort((left, right) => right.score - left.score || right.record.updatedAt.localeCompare(left.record.updatedAt)),
  [scoredRecords]);

  const records = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase();
    return scoredRecords
      .filter(({ record }) => !needle || [record.title, record.content, ...record.tags, ...Object.values(record.details)].join(" ").toLocaleLowerCase().includes(needle))
      .sort((left, right) => {
        const leftSelected = selected.has(left.record.id) ? 1 : 0;
        const rightSelected = selected.has(right.record.id) ? 1 : 0;
        return rightSelected - leftSelected || right.score - left.score || right.record.updatedAt.localeCompare(left.record.updatedAt);
      });
  }, [query, scoredRecords, selected]);

  const toggle = (recordId: string, checked: boolean) => {
    const record = library.records.find((candidate) => candidate.id === recordId);
    if (!record) return;
    setSelected((current) => {
      const next = new Map(current);
      if (!checked) next.delete(recordId);
      else if (!next.has(recordId)) next.set(recordId, { recordId, placement: defaultPlacement(record.kind), order: next.size });
      return next;
    });
  };

  const changePlacement = (recordId: string, placement: LibraryPlacement) => {
    setSelected((current) => {
      const next = new Map(current);
      const item = next.get(recordId);
      if (item) next.set(recordId, { ...item, placement });
      return next;
    });
  };

  const move = (recordId: string, delta: number) => {
    setSelected((current) => {
      const ordered = [...current.values()].sort((a, b) => a.order - b.order);
      const index = ordered.findIndex((item) => item.recordId === recordId);
      const target = index + delta;
      if (index < 0 || target < 0 || target >= ordered.length) return current;
      [ordered[index], ordered[target]] = [ordered[target], ordered[index]];
      return new Map(ordered.map((item, order) => [item.recordId, { ...item, order }]));
    });
  };

  const persistSelections = (selections: LibrarySelection[]) => {
    const ordered = [...selections].sort((a, b) => a.order - b.order).map((item, order) => ({ ...item, order }));
    const updated = persistLibrarySelection(document.id, ordered);
    if (!updated) return;
    window.dispatchEvent(new CustomEvent("codecafe-workspace-reload", { detail: { documentId: document.id } }));
    onClose();
  };

  const apply = () => persistSelections([...selected.values()]);

  const applySuggested = () => {
    const next = new Map(selected);
    for (const { record } of suggestedRecords) {
      if (!next.has(record.id)) {
        next.set(record.id, {
          recordId: record.id,
          placement: defaultPlacement(record.kind),
          order: next.size,
        });
      }
    }
    persistSelections([...next.values()]);
  };

  return <section className="composerPanel">
    <header className="composerHead">
      <div><span className="eyebrow">CODECAFE COMPOSER</span><h3>{t.title}</h3><p>{t.intro}</p></div>
      <button onClick={onClose} aria-label={t.cancel}>×</button>
    </header>
    <div className="composerBasicGuard">🔒 {t.basics}</div>
    <div className="composerToolbar">
      <input type="search" placeholder={t.search} value={query} onChange={(event) => setQuery(event.target.value)} />
      <strong>{selected.size} {t.selected}</strong>
    </div>
    <div className="composerRecords">
      {records.length === 0 && <p className="composerEmpty">{t.none}</p>}
      {records.map(({ record, score }) => {
        const selection = selected.get(record.id);
        const binding = bindings.find((item) => item.recordId === record.id);
        const placements = placementsForKind(record.kind);
        return <article className={`composerRecord ${selection ? "selected" : ""}`} key={record.id}>
          <label className="composerPick"><input type="checkbox" checked={Boolean(selection)} onChange={(event) => toggle(record.id, event.target.checked)} /><span><b>{record.title}</b><small>{record.kind}</small></span></label>
          <div className="composerBadges">
            {score > 0 && <span>{t.suggested}</span>}
            {binding && <span>{t.linked}</span>}
            {binding?.override && <span className="warning">{t.customized}</span>}
          </div>
          {record.content && <p>{record.content}</p>}
          {record.tags.length > 0 && <div className="composerTags">{record.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>}
          {selection && <div className="composerPlacement">
            <label>{t.placement}<select value={selection.placement} onChange={(event) => changePlacement(record.id, event.target.value as LibraryPlacement)}>{placements.map((placement) => <option value={placement} key={placement}>{placementLabels[lang][placement]}</option>)}</select></label>
            <div><button onClick={() => move(record.id, -1)} aria-label="Move up">↑</button><button onClick={() => move(record.id, 1)} aria-label="Move down">↓</button></div>
          </div>}
        </article>;
      })}
    </div>
    <footer className="composerFooter">
      {suggestedRecords.length > 0 && <button className="primary" onClick={applySuggested}>✦ {t.applySuggested} ({suggestedRecords.length})</button>}
      <button className={suggestedRecords.length > 0 ? "" : "primary"} onClick={apply}>{t.save}</button>
      <button onClick={onClose}>{t.cancel}</button>
    </footer>
  </section>;
}
