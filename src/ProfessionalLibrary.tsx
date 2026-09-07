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
  type ProfileBasicInfo,
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

const emptyBasics = (): ProfileBasicInfo => ({ name: "", email: "", phone: "", location: "", linkedin: "" });

const detailFields: Partial<Record<ProfessionalRecordKind, string[]>> = {
  experience: ["role", "company", "dates"],
  project: ["stack", "repository"],
  education: ["institution", "dates"],
  certification: ["issuer", "date"],
  language: ["proficiency"],
  technology: ["category"],
  skill: ["category"],
};

const LABEL_PREFIX = "__label__:";
const HIDDEN_PREFIX = "__hidden__:";

const copy = {
  es: {
    title: "Biblioteca Profesional",
    intro: "Información profesional reutilizable para este perfil. Los CVs actuales no se modifican hasta que los vincules.",
    contact: "Información de contacto del perfil",
    contactNote: "Estos son los datos canónicos que heredarán automáticamente los nuevos CVs en blanco de este perfil. Los CVs existentes siguen siendo editables e independientes.",
    editContact: "Editar datos personales",
    saveContact: "Guardar datos personales",
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
    addField: "＋ Añadir campo",
    fieldName: "Nombre del nuevo campo:",
    removeField: "Quitar campo",
    hiddenFields: "Campos ocultos",
    restoreField: "Restaurar",
    renameHint: "El título del campo es editable. Quitar un campo no afecta los datos básicos del perfil.",
    name: "Nombre",
    email: "Correo",
    phone: "Teléfono",
    location: "Ubicación",
    linkedin: "LinkedIn / Portafolio",
  },
  en: {
    title: "Professional Library",
    intro: "Reusable professional information for this profile. Existing CVs are not modified until you link records.",
    contact: "Profile contact information",
    contactNote: "These are the canonical values automatically inherited by new blank CVs in this profile. Existing CVs remain editable and independent.",
    editContact: "Edit personal information",
    saveContact: "Save personal information",
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
    addField: "＋ Add field",
    fieldName: "New field name:",
    removeField: "Remove field",
    hiddenFields: "Hidden fields",
    restoreField: "Restore",
    renameHint: "Field titles are editable. Removing a field never affects profile basic information.",
    name: "Name",
    email: "Email",
    phone: "Phone",
    location: "Location",
    linkedin: "LinkedIn / Portfolio",
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

function isMetadataKey(key: string): boolean {
  return key.startsWith(LABEL_PREFIX) || key.startsWith(HIDDEN_PREFIX);
}

function defaultLabel(lang: "es" | "en", key: string): string {
  const labels = copy[lang] as Record<string, string>;
  return labels[key] || key;
}

function fieldLabel(lang: "es" | "en", details: Record<string, string>, key: string): string {
  return details[`${LABEL_PREFIX}${key}`]?.trim() || defaultLabel(lang, key);
}

function visibleDetailKeys(kind: ProfessionalRecordKind, details: Record<string, string>): string[] {
  const defaults = detailFields[kind] || [];
  const custom = Object.keys(details).filter((key) => !isMetadataKey(key) && !defaults.includes(key));
  return [...defaults.filter((key) => details[`${HIDDEN_PREFIX}${key}`] !== "1"), ...custom];
}

function hiddenDefaultKeys(kind: ProfessionalRecordKind, details: Record<string, string>): string[] {
  return (detailFields[kind] || []).filter((key) => details[`${HIDDEN_PREFIX}${key}`] === "1");
}

function recordVisibleDetails(record: ProfessionalRecord): [string, string][] {
  return Object.entries(record.details).filter(([key, value]) => !isMetadataKey(key) && value.trim() && record.details[`${HIDDEN_PREFIX}${key}`] !== "1");
}

export default function ProfessionalLibrary({ lang, workspace }: Props) {
  const t = copy[lang];
  const [working, setWorking] = useState(() => loadWorkspaceLocal(workspace));
  const [query, setQuery] = useState("");
  const [kind, setKind] = useState<"all" | ProfessionalRecordKind>("all");
  const [status, setStatus] = useState<"active" | ProfessionalRecordStatus | "all">("active");
  const [draft, setDraft] = useState<Draft | null>(null);
  const [basicDraft, setBasicDraft] = useState<ProfileBasicInfo | null>(null);

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
        const haystack = [record.title, record.content, ...record.tags, ...recordVisibleDetails(record).map(([, value]) => value)].join(" ").toLocaleLowerCase();
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

  const startBasicEdit = () => setBasicDraft({ ...(profile?.basicInfo || emptyBasics()) });

  const saveBasicInfo = () => {
    if (!basicDraft) return;
    const latest = loadWorkspaceLocal(working);
    const profiles = (latest.profiles ?? []).map((candidate) => candidate.id === profileId
      ? { ...candidate, basicInfo: { ...basicDraft } }
      : candidate);
    const updated = { ...latest, profiles };
    saveWorkspaceLocal(updated);
    setWorking(updated);
    setBasicDraft(null);
    // Remonta App desde la copia local para que un snapshot antiguo no pueda
    // sobrescribir después los nuevos defaults del perfil.
    window.dispatchEvent(new CustomEvent("codecafe-workspace-reload", { detail: { reason: "profile-basic-info" } }));
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

  const setDetail = (key: string, value: string) => {
    if (!draft) return;
    setDraft({ ...draft, details: { ...draft.details, [key]: value } });
  };

  const renameDetail = (key: string, label: string) => {
    if (!draft) return;
    setDraft({ ...draft, details: { ...draft.details, [`${LABEL_PREFIX}${key}`]: label } });
  };

  const removeDetail = (key: string) => {
    if (!draft) return;
    const next = { ...draft.details };
    const isDefault = (detailFields[draft.kind] || []).includes(key);
    delete next[key];
    if (isDefault) next[`${HIDDEN_PREFIX}${key}`] = "1";
    else {
      delete next[`${LABEL_PREFIX}${key}`];
      delete next[`${HIDDEN_PREFIX}${key}`];
    }
    setDraft({ ...draft, details: next });
  };

  const restoreDetail = (key: string) => {
    if (!draft) return;
    const next = { ...draft.details };
    delete next[`${HIDDEN_PREFIX}${key}`];
    setDraft({ ...draft, details: next });
  };

  const addCustomDetail = () => {
    if (!draft) return;
    const label = window.prompt(t.fieldName)?.trim();
    if (!label) return;
    const key = `custom_${crypto.randomUUID().replaceAll("-", "").slice(0, 12)}`;
    setDraft({ ...draft, details: { ...draft.details, [key]: "", [`${LABEL_PREFIX}${key}`]: label } });
  };

  const saveDraft = () => {
    if (!draft?.title.trim()) return;
    const now = new Date().toISOString();
    const existing = draft.id ? library.records.find((record) => record.id === draft.id) : undefined;
    const details = Object.fromEntries(Object.entries(draft.details).filter(([key, value]) => {
      if (key.startsWith(HIDDEN_PREFIX)) return value === "1";
      if (key.startsWith(LABEL_PREFIX)) return value.trim().length > 0;
      return value.trim().length > 0 || key.startsWith("custom_");
    }).map(([key, value]) => [key, value.trim()]));
    const record: ProfessionalRecord = {
      id: existing?.id || newId("professional-record"),
      kind: draft.kind,
      status: draft.status,
      title: draft.title.trim(),
      content: draft.content.trim(),
      details,
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
  const visibleKeys = draft ? visibleDetailKeys(draft.kind, draft.details) : [];
  const hiddenKeys = draft ? hiddenDefaultKeys(draft.kind, draft.details) : [];
  const basicFields: (keyof ProfileBasicInfo)[] = ["name", "email", "phone", "location", "linkedin"];

  return <div className="professionalLibrary">
    <div className="professionalIntro">
      <div><span className="eyebrow">CODECAFE CAREER DATA</span><h3>{t.title}</h3><p>{t.intro}</p></div>
      <button className="primary" onClick={() => setDraft(emptyDraft())}>{t.add}</button>
    </div>

    <section className="professionalContact">
      <div className="professionalContactHead"><div><b>{t.contact}</b><span>{t.contactNote}</span></div>{!basicDraft && <button onClick={startBasicEdit}>{t.editContact}</button>}</div>
      {basicDraft ? <div className="professionalBasicEditor">
        {basicFields.map((key) => <label key={key}>{t[key]}<input value={basicDraft[key]} onChange={(event) => setBasicDraft({ ...basicDraft, [key]: event.target.value })} /></label>)}
        <div className="professionalBasicActions"><button className="primary" onClick={saveBasicInfo}>{t.saveContact}</button><button onClick={() => setBasicDraft(null)}>{t.cancel}</button></div>
      </div> : <dl>
        <div><dt>{t.name}</dt><dd>{basic?.name || "—"}</dd></div>
        <div><dt>{t.email}</dt><dd>{basic?.email || "—"}</dd></div>
        <div><dt>{t.phone}</dt><dd>{basic?.phone || "—"}</dd></div>
        <div><dt>{t.location}</dt><dd>{basic?.location || "—"}</dd></div>
        <div><dt>{t.linkedin}</dt><dd>{basic?.linkedin || "—"}</dd></div>
      </dl>}
    </section>

    {draft && <section className="professionalEditor">
      <div className="professionalFormGrid">
        <label>{t.type}<select value={draft.kind} onChange={(event) => setDraft({ ...draft, kind: event.target.value as ProfessionalRecordKind, details: {} })}>{PROFESSIONAL_RECORD_KINDS.map((value) => <option value={value} key={value}>{kindLabels[lang][value]}</option>)}</select></label>
        <label>{t.status}<select value={draft.status} onChange={(event) => setDraft({ ...draft, status: event.target.value as Draft["status"] })}><option value="reviewed">{t.reviewed}</option><option value="pending">{t.pending}</option></select></label>
        <label className="professionalWide">{t.titleField}<input value={draft.title} onChange={(event) => setDraft({ ...draft, title: event.target.value })} /></label>
        {visibleKeys.map((key) => <div className="professionalCustomField" key={key}>
          <label><input className="professionalFieldTitle" aria-label={`${key} title`} value={fieldLabel(lang, draft.details, key)} onChange={(event) => renameDetail(key, event.target.value)} /><input value={draft.details[key] || ""} onChange={(event) => setDetail(key, event.target.value)} /></label>
          <button type="button" onClick={() => removeDetail(key)} title={t.removeField}>×</button>
        </div>)}
        <div className="professionalFieldTools professionalWide"><button type="button" onClick={addCustomDetail}>{t.addField}</button><small>{t.renameHint}</small></div>
        {hiddenKeys.length > 0 && <div className="professionalHiddenFields professionalWide"><b>{t.hiddenFields}</b>{hiddenKeys.map((key) => <button type="button" key={key} onClick={() => restoreDetail(key)}>＋ {fieldLabel(lang, draft.details, key)} · {t.restoreField}</button>)}</div>}
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
        {recordVisibleDetails(record).length > 0 && <dl>{recordVisibleDetails(record).map(([key, value]) => <div key={key}><dt>{fieldLabel(lang, record.details, key)}</dt><dd>{value}</dd></div>)}</dl>}
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
