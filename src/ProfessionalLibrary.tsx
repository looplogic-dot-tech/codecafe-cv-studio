import { useEffect, useMemo, useState } from "react";
import {
  getProfessionalLibrary,
  loadWorkspaceLocal,
  newId,
  PROFESSIONAL_RECORD_KINDS,
  replaceProfessionalLibrary,
  saveWorkspaceLocal,
  type CVWorkspace,
  type ProfessionalRecord,
  type ProfessionalRecordKind,
  type ProfessionalRecordStatus,
} from "./workspace";

type Props = {
  lang: "es" | "en";
  workspace: CVWorkspace;
};

type Draft = {
  id?: string;
  kind: ProfessionalRecordKind;
  status: Exclude<ProfessionalRecordStatus, "archived">;
  title: string;
  content: string;
  tags: string;
  details: Record<string, string>;
};

const emptyDraft = (): Draft => ({
  kind: "experience",
  status: "reviewed",
  title: "",
  content: "",
  tags: "",
  details: {},
});

const detailFields: Partial<Record<ProfessionalRecordKind, string[]>> = {
  experience: ["role", "company", "dates"],
  project: ["stack", "repository"],
  education: ["institution", "dates"],
  certification: ["issuer", "date"],
  language: ["proficiency"],
  technology: ["category"],
  skill: ["category"],
};

const copy = {
  es: {
    title: "Biblioteca Profesional",
    intro: "Información profesional reutilizable para este perfil. Los CVs actuales no se modifican hasta que los vinculemos en una fase posterior.",
    contact: "Información de contacto del perfil",
    contactNote: "Estos datos siguen siendo exclusivos del perfil y permanecen editables en cada CV.",
    search: "Buscar experiencia, habilidad, proyecto, etiqueta…",
    add: "＋ Añadir registro",
    allKinds: "Todos los tipos",
    active: "Activos",
    pending: "Pendientes",
    reviewed: "Revisados",
    archived: "Archivados",
    all: "Todos",
    empty: "Todavía no hay registros que coincidan con estos filtros.",
    edit: "Editar",
    archive: "Archivar",
    restore: "Restaurar",
    markReviewed: "Marcar revisado",
    save: "Guardar registro",
    cancel: "Cancelar",
    titleField: "Título / nombre",
    content: "Descripción / contenido",
    tags: "Etiquetas",
    tagsHint: "Separadas por comas. Ej.: IT, soporte, Linux, turismo",
    type: "Tipo",
    status: "Estado",
    conflict: "Conflicto conservado para revisión",
    noDelete: "Los registros se archivan; no se eliminan en esta fase.",
    role: "Puesto",
    company: "Empresa",
    dates: "Periodo",
    stack: "Tecnologías",
    repository: "Repositorio",
    institution: "Institución",
    issuer: "Emisor",
    date: "Fecha",
    proficiency: "Nivel",
    category: "Categoría",
  },
  en: {
    title: "Professional Library",
    intro: "Reusable professional information for this profile. Existing CVs are not modified until linking is introduced in a later phase.",
    contact: "Profile contact information",
    contactNote: "These values remain exclusive to this profile and stay editable inside each CV.",
    search: "Search experience, skill, project, tag…",
    add: "＋ Add record",
    allKinds: "All types",
    active: "Active",
    pending: "Pending",
    reviewed: "Reviewed",
    archived: "Archived",
    all: "All",
    empty: "No records match these filters yet.",
    edit: "Edit",
    archive: "Archive",
    restore: "Restore",
    markReviewed: "Mark reviewed",
    save: "Save record",
    cancel: "Cancel",
    titleField: "Title / name",
    content: "Description / content",
    tags: "Tags",
    tagsHint: "Comma-separated. Example: IT, support, Linux, tourism",
    type: "Type",
    status: "Status",
    conflict: "Conflict copy preserved for review",
    noDelete: "Records are archived rather than deleted in this phase.",
    role: "Role",
    company: "Company",
    dates: "Dates",
    stack: "Technologies",
    repository: "Repository",
    institution: "Institution",
    issuer: "Issuer",
    date: "Date",
    proficiency: "Proficiency",
    category: "Category",
  },
} as const;

const kindLabels: Record<"es" | "en", Record<ProfessionalRecordKind, string>> = {
  es: {
    summary: "Resumen",
    experience: "Experiencia",
    skill: "Habilidad",
    technology: "Tecnología",
    project: "Proyecto",
    education: "Educación",
    certification: "Certificación",
    language: "Idioma",
    custom: "Otro",
  },
  en: {
    summary: "Summary",
    experience: "Experience",
    skill: "Skill",
    technology: "Technology",
    project: "Project",
    education: "Education",
    certification: "Certification",
    language: "Language",
    custom: "Other",
  },
};

function tagList(value: string): string[] {
  return [...new Set(value.split(",").map((tag) => tag.trim()).filter(Boolean))];
}

function detailLabel(lang: "es" | "en", key: string): string {
  const labels = copy[lang] as Record<string, string>;
  return labels[key] || key;
}

export default function ProfessionalLibrary({ lang, workspace }: Props) {
  const t = copy[lang];
  const [working, setWorking] = useState(() => loadWorkspaceLocal(workspace));
  const [query, setQuery] = useState("");
  const [kind, setKind] = useState<"all" | ProfessionalRecordKind>("all");
  const [status, setStatus] = useState<"active" | ProfessionalRecordStatus | "all">("active");
  const [draft, setDraft] = useState<Draft | null>(null);

  useEffect(() => {
    setWorking(loadWorkspaceLocal(workspace));
  }, [workspace, workspace.activeProfileId]);

  const profileId = working.activeProfileId || working.profiles?.[0]?.id || "profile-owner";
  const profile = working.profiles?.find((candidate) => candidate.id === profileId);
  const library = getProfessionalLibrary(working, profileId);

  const filtered = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase();
    return library.records
      .filter((record) => kind === "all" || record.kind === kind)
      .filter((record) => {
        if (status === "all") return true;
        if (status === "active") return record.status !== "archived";
        return record.status === status;
      })
      .filter((record) => {
        if (!needle) return true;
        const haystack = [
          record.title,
          record.content,
          ...record.tags,
          ...Object.values(record.details),
        ].join(" ").toLocaleLowerCase();
        return haystack.includes(needle);
      })
      .sort((left, right) => right.updatedAt.localeCompare(left.updatedAt));
  }, [library.records, kind, query, status]);

  const persist = (records: ProfessionalRecord[]) => {
    const latest = loadWorkspaceLocal(working);
    const updated = replaceProfessionalLibrary(latest, { version: 1, profileId, records });
    saveWorkspaceLocal(updated);
    setWorking(updated);
  };

  const startEdit = (record: ProfessionalRecord) => setDraft({
    id: record.id,
    kind: record.kind,
    status: record.status === "pending" ? "pending" : "reviewed",
    title: record.title,
    content: record.content,
    tags: record.tags.join(", "),
    details: { ...record.details },
  });

  const saveDraft = () => {
    if (!draft?.title.trim()) return;
    const now = new Date().toISOString();
    const existing = draft.id ? library.records.find((record) => record.id === draft.id) : undefined;
    const record: ProfessionalRecord = {
      id: existing?.id || newId("professional-record"),
      kind: draft.kind,
      status: draft.status,
      title: draft.title.trim(),
      content: draft.content.trim(),
      details: Object.fromEntries(Object.entries(draft.details).filter(([, value]) => value.trim()).map(([key, value]) => [key, value.trim()])),
      tags: tagList(draft.tags),
      revision: (existing?.revision || 0) + 1,
      createdAt: existing?.createdAt || now,
      updatedAt: now,
      source: existing?.source || { type: "manual" },
      ...(existing?.conflictOf ? { conflictOf: existing.conflictOf } : {}),
    };
    persist(existing
      ? library.records.map((candidate) => candidate.id === existing.id ? record : candidate)
      : [...library.records, record]);
    setDraft(null);
  };

  const changeStatus = (record: ProfessionalRecord, nextStatus: ProfessionalRecordStatus) => {
    const now = new Date().toISOString();
    persist(library.records.map((candidate) => candidate.id === record.id
      ? { ...candidate, status: nextStatus, updatedAt: now, revision: candidate.revision + 1 }
      : candidate));
  };

  const basic = profile?.basicInfo;
  const detailKeys = draft ? (detailFields[draft.kind] || []) : [];

  return <div className="professionalLibrary">
    <div className="professionalIntro">
      <div><span className="eyebrow">CODECAFE CAREER DATA</span><h3>{t.title}</h3><p>{t.intro}</p></div>
      <button className="primary" onClick={() => setDraft(emptyDraft())}>{t.add}</button>
    </div>

    <section className="professionalContact">
      <div><b>{t.contact}</b><span>{t.contactNote}</span></div>
      <dl>
        <div><dt>{lang === "es" ? "Nombre" : "Name"}</dt><dd>{basic?.name || "—"}</dd></div>
        <div><dt>Email</dt><dd>{basic?.email || "—"}</dd></div>
        <div><dt>{lang === "es" ? "Teléfono" : "Phone"}</dt><dd>{basic?.phone || "—"}</dd></div>
        <div><dt>{lang === "es" ? "Ubicación" : "Location"}</dt><dd>{basic?.location || "—"}</dd></div>
        <div><dt>LinkedIn</dt><dd>{basic?.linkedin || "—"}</dd></div>
      </dl>
    </section>

    {draft && <section className="professionalEditor">
      <div className="professionalFormGrid">
        <label>{t.type}<select value={draft.kind} onChange={(event) => setDraft({ ...draft, kind: event.target.value as ProfessionalRecordKind, details: {} })}>{PROFESSIONAL_RECORD_KINDS.map((value) => <option value={value} key={value}>{kindLabels[lang][value]}</option>)}</select></label>
        <label>{t.status}<select value={draft.status} onChange={(event) => setDraft({ ...draft, status: event.target.value as Draft["status"] })}><option value="reviewed">{t.reviewed}</option><option value="pending">{t.pending}</option></select></label>
        <label className="professionalWide">{t.titleField}<input value={draft.title} onChange={(event) => setDraft({ ...draft, title: event.target.value })} /></label>
        {detailKeys.map((key) => <label key={key}>{detailLabel(lang, key)}<input value={draft.details[key] || ""} onChange={(event) => setDraft({ ...draft, details: { ...draft.details, [key]: event.target.value } })} /></label>)}
        <label className="professionalWide">{t.content}<textarea rows={5} value={draft.content} onChange={(event) => setDraft({ ...draft, content: event.target.value })} /></label>
        <label className="professionalWide">{t.tags}<input value={draft.tags} onChange={(event) => setDraft({ ...draft, tags: event.target.value })} /><small>{t.tagsHint}</small></label>
      </div>
      <div className="professionalEditorActions"><button className="primary" disabled={!draft.title.trim()} onClick={saveDraft}>{t.save}</button><button onClick={() => setDraft(null)}>{t.cancel}</button></div>
    </section>}

    <div className="professionalFilters">
      <input type="search" placeholder={t.search} value={query} onChange={(event) => setQuery(event.target.value)} />
      <select value={kind} onChange={(event) => setKind(event.target.value as typeof kind)}><option value="all">{t.allKinds}</option>{PROFESSIONAL_RECORD_KINDS.map((value) => <option value={value} key={value}>{kindLabels[lang][value]}</option>)}</select>
      <select value={status} onChange={(event) => setStatus(event.target.value as typeof status)}><option value="active">{t.active}</option><option value="reviewed">{t.reviewed}</option><option value="pending">{t.pending}</option><option value="archived">{t.archived}</option><option value="all">{t.all}</option></select>
    </div>

    <div className="professionalRecordGrid">
      {filtered.length === 0 && <p className="professionalEmpty">{t.empty}</p>}
      {filtered.map((record) => <article className={`professionalRecord status-${record.status}`} key={record.id}>
        <header><div><span>{kindLabels[lang][record.kind]}</span><strong>{record.title}</strong></div><em>{record.status === "reviewed" ? t.reviewed : record.status === "pending" ? t.pending : t.archived}</em></header>
        {record.conflictOf && <p className="professionalConflict">⚠ {t.conflict}</p>}
        {Object.keys(record.details).length > 0 && <dl>{Object.entries(record.details).map(([key, value]) => <div key={key}><dt>{detailLabel(lang, key)}</dt><dd>{value}</dd></div>)}</dl>}
        {record.content && <p>{record.content}</p>}
        {record.tags.length > 0 && <div className="professionalTags">{record.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>}
        <footer>
          {record.status !== "archived" && <button onClick={() => startEdit(record)}>{t.edit}</button>}
          {record.status === "pending" && <button onClick={() => changeStatus(record, "reviewed")}>{t.markReviewed}</button>}
          {record.status === "archived"
            ? <button onClick={() => changeStatus(record, "reviewed")}>{t.restore}</button>
            : <button onClick={() => changeStatus(record, "archived")}>{t.archive}</button>}
        </footer>
      </article>)}
    </div>

    <p className="professionalNoDelete">{t.noDelete}</p>
  </div>;
}
