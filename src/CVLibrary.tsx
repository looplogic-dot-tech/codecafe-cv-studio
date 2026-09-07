import { useState } from "react";
import CVLibraryComposer from "./CVLibraryComposer";
import ProfessionalLibrary from "./ProfessionalLibrary";
import type { CVDocument, CVWorkspace } from "./workspace";
import { activeDocument, loadWorkspaceLocal, MAX_ACTIVE_CVS, newId, saveWorkspaceLocal } from "./workspace";

type LibraryCopy = {
  title: string;
  subtitle: string;
  active: string;
  archived: string;
  newCv: string;
  saveAs: string;
  newName: string;
  collection: string;
  create: string;
  createSuggestions: string;
  cancel: string;
  edit: string;
  duplicate: string;
  rename: string;
  move: string;
  archive: string;
  restore: string;
  remove: string;
  removeBlocked: string;
  newCollection: string;
  collectionName: string;
  limit: string;
  empty: string;
  close: string;
  inheritBasics: string;
  cvsTab: string;
  professionalTab: string;
  build: string;
};

const libraryCopy: Record<"es" | "en", LibraryCopy> = {
  es: {
    title: "Mis CVs", subtitle: "Organiza cada CV según el tipo de trabajo.", active: "Activos", archived: "Archivados",
    newCv: "Nuevo CV en blanco", saveAs: "Guardar actual como nuevo", newName: "Nombre del CV", collection: "Colección",
    create: "Crear", createSuggestions: "Crear y ver sugerencias", cancel: "Cancelar", edit: "Editar", duplicate: "Duplicar", rename: "Renombrar", move: "Mover a", archive: "Archivar", restore: "Restaurar",
    remove: "Eliminar CV", removeBlocked: "Debe quedar al menos un CV activo en este perfil.", newCollection: "Nueva colección", collectionName: "Nombre de la colección",
    limit: "Límite actual: 20 CVs en total, incluidos los archivados", empty: "Esta colección todavía no contiene CVs.", close: "Cerrar",
    inheritBasics: "Heredar datos básicos de este perfil", cvsTab: "CVs", professionalTab: "Biblioteca Profesional", build: "Usar Biblioteca",
  },
  en: {
    title: "My CVs", subtitle: "Organize each résumé by the kind of work it targets.", active: "Active", archived: "Archived",
    newCv: "New blank CV", saveAs: "Save current as new", newName: "CV name", collection: "Collection",
    create: "Create", createSuggestions: "Create and show suggestions", cancel: "Cancel", edit: "Edit", duplicate: "Duplicate", rename: "Rename", move: "Move to", archive: "Archive", restore: "Restore",
    remove: "Remove CV", removeBlocked: "At least one active CV must remain in this profile.", newCollection: "New collection", collectionName: "Collection name",
    limit: "Current limit: 20 total CVs, including archived CVs", empty: "This collection does not contain any CVs yet.", close: "Close",
    inheritBasics: "Reuse this profile's basic information", cvsTab: "CVs", professionalTab: "Professional Library", build: "Use Library",
  },
};

type Props = {
  lang: "es" | "en";
  workspace: CVWorkspace;
  selectedCollection: string;
  showArchived: boolean;
  draftName: string;
  draftCollection: string;
  creationMode: "blank" | "copy" | null;
  inheritBasics: boolean;
  onSelectCollection(id: string): void;
  onShowArchived(value: boolean): void;
  onDraftName(value: string): void;
  onDraftCollection(value: string): void;
  onStartCreate(mode: "blank" | "copy"): void;
  onInheritBasics(value: boolean): void;
  onCancelCreate(): void;
  onCreate(): void;
  onOpen(id: string): void;
  onDuplicate(id: string): void;
  onRename(id: string): void;
  onMove(id: string, collectionId: string): void;
  onArchive(id: string, archived: boolean): void;
  onDelete(id: string): void;
  onCreateCollection(): void;
  onClose(): void;
};

export default function CVLibrary(props: Props) {
  const t = libraryCopy[props.lang];
  const [mode, setMode] = useState<"cvs" | "professional">("cvs");
  const [composeDocumentId, setComposeDocumentId] = useState<string | null>(null);
  const activeProfileId = props.workspace.activeProfileId;
  const profileDocuments = props.workspace.documents.filter((document) => document.profileId === activeProfileId);
  const activeCount = profileDocuments.filter((document) => !document.archived).length;
  const totalCount = props.workspace.documents.length;
  const documents = profileDocuments
    .filter((document) => props.showArchived
      ? document.archived
      : !document.archived && (props.selectedCollection === "all" || document.collectionId === props.selectedCollection))
    .sort((left, right) => right.updatedAt.localeCompare(left.updatedAt));
  const composeWorkspace = composeDocumentId ? loadWorkspaceLocal(props.workspace) : props.workspace;
  const composeDocument = composeDocumentId ? composeWorkspace.documents.find((document) => document.id === composeDocumentId) : undefined;

  const createBlankAndCompose = () => {
    const latest = loadWorkspaceLocal(props.workspace);
    if (!props.draftName.trim() || latest.documents.length >= MAX_ACTIVE_CVS) return;
    const current = activeDocument(latest);
    const profileId = latest.activeProfileId || current.profileId;
    const profile = latest.profiles?.find((candidate) => candidate.id === profileId);
    const basics = profile?.basicInfo;
    const inherited = props.inheritBasics ? {
      name: basics?.name || current.cv.name,
      email: basics?.email || current.cv.email,
      phone: basics?.phone || current.cv.phone,
      location: basics?.location || current.cv.location,
      linkedin: basics?.linkedin || current.cv.linkedin,
    } : { name: "", email: "", phone: "", location: "", linkedin: "" };
    const now = new Date().toISOString();
    const cv: CVDocument["cv"] = {
      ...inherited,
      title: "",
      photo: "",
      summary: "",
      skills: "",
      coreSkills: "",
      tools: "",
      certifications: "",
      education: "",
      languages: "",
      jobs: [{ role: "", company: "", dates: "", bullets: "" }],
      projects: [],
      customSections: [],
    };
    const document: CVDocument = {
      id: newId("cv"),
      name: props.draftName.trim(),
      collectionId: props.draftCollection,
      cv,
      settings: { lang: props.lang, template: "ats", photoOn: false },
      createdAt: now,
      updatedAt: now,
      archived: false,
      profileId,
    };
    saveWorkspaceLocal({ ...latest, documents: [...latest.documents, document], activeDocumentId: document.id });
    props.onCancelCreate();
    setComposeDocumentId(document.id);
  };

  const createDocument = () => {
    if (props.creationMode === "blank") {
      createBlankAndCompose();
      return;
    }
    props.onCreate();
  };

  const closeComposer = () => {
    const documentId = composeDocumentId;
    const createdInsideLibrary = Boolean(documentId && !props.workspace.documents.some((document) => document.id === documentId));
    setComposeDocumentId(null);
    if (documentId && createdInsideLibrary) {
      window.dispatchEvent(new CustomEvent("codecafe-workspace-reload", { detail: { documentId, reason: "new-cv-composer-close" } }));
    }
  };

  const removeDocument = (document: CVDocument) => {
    if (document.archived) {
      props.onDelete(document.id);
      return;
    }
    const latest = loadWorkspaceLocal(props.workspace);
    const target = latest.documents.find((candidate) => candidate.id === document.id);
    if (!target) return;
    const activeInProfile = latest.documents.filter((candidate) => candidate.profileId === target.profileId && !candidate.archived);
    if (activeInProfile.length <= 1) return;
    const question = props.lang === "es"
      ? `¿Eliminar definitivamente “${target.name}”?`
      : `Permanently remove “${target.name}”?`;
    if (!window.confirm(question)) return;
    const remaining = latest.documents.filter((candidate) => candidate.id !== target.id);
    let activeDocumentId = latest.activeDocumentId;
    if (target.id === activeDocumentId) {
      const replacement = remaining.find((candidate) => candidate.profileId === target.profileId && !candidate.archived);
      if (!replacement) return;
      activeDocumentId = replacement.id;
    }
    saveWorkspaceLocal({ ...latest, documents: remaining, activeDocumentId });
    window.dispatchEvent(new CustomEvent("codecafe-workspace-reload", { detail: { documentId: activeDocumentId, reason: "cv-removed" } }));
  };

  return <div className="libraryOverlay" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) props.onClose(); }}>
    <section className="libraryPanel" role="dialog" aria-modal="true" aria-labelledby="library-title">
      <div className="libraryHead"><div><span className="eyebrow">CODECAFE LIBRARY</span><h2 id="library-title">{t.title}</h2><p>{t.subtitle}</p></div><button onClick={props.onClose} aria-label={t.close}>×</button></div>
      {composeDocument ? <CVLibraryComposer lang={props.lang} workspace={composeWorkspace} document={composeDocument} onClose={closeComposer} /> : <>
        <div className="libraryModeTabs" role="tablist" aria-label="CodeCafe Library">
          <button className={mode === "cvs" ? "selected" : ""} onClick={() => setMode("cvs")} role="tab" aria-selected={mode === "cvs"}>{t.cvsTab}</button>
          <button className={mode === "professional" ? "selected" : ""} onClick={() => setMode("professional")} role="tab" aria-selected={mode === "professional"}>{t.professionalTab}</button>
        </div>

        {mode === "professional" ? <ProfessionalLibrary lang={props.lang} workspace={props.workspace} /> : <>
          <div className="libraryToolbar">
            <button className="primary" disabled={totalCount >= MAX_ACTIVE_CVS} onClick={() => props.onStartCreate("blank")}>＋ {t.newCv}</button>
            <button disabled={totalCount >= MAX_ACTIVE_CVS} onClick={() => props.onStartCreate("copy")}>{t.saveAs}</button>
          </div>
          {props.creationMode && <div className="createCvPanel">
            <label>{t.newName}<input autoFocus className="inputField" value={props.draftName} onChange={(event) => props.onDraftName(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter" && props.draftName.trim()) createDocument(); }} /></label>
            <label>{t.collection}<select className="inputField" value={props.draftCollection} onChange={(event) => props.onDraftCollection(event.target.value)}>{[...props.workspace.collections].sort((a, b) => a.order - b.order).map((collection) => <option key={collection.id} value={collection.id}>{collection.name}</option>)}</select></label>
            <div><button className="primary" disabled={!props.draftName.trim()} onClick={createDocument}>{props.creationMode === "blank" ? t.createSuggestions : t.create}</button><button onClick={props.onCancelCreate}>{t.cancel}</button></div>
          </div>}
          <div className="libraryBody">
            <nav className="collectionNav">
              <button className={!props.showArchived && props.selectedCollection === "all" ? "selected" : ""} onClick={() => { props.onShowArchived(false); props.onSelectCollection("all"); }}>{t.active}<span>{activeCount}</span></button>
              {[...props.workspace.collections].sort((a, b) => a.order - b.order).map((collection) => <button key={collection.id} className={!props.showArchived && props.selectedCollection === collection.id ? "selected" : ""} onClick={() => { props.onShowArchived(false); props.onSelectCollection(collection.id); }}>{collection.name}<span>{profileDocuments.filter((document) => !document.archived && document.collectionId === collection.id).length}</span></button>)}
              <button onClick={props.onCreateCollection}>＋ {t.newCollection}</button>
              <button className={props.showArchived ? "selected" : ""} onClick={() => props.onShowArchived(true)}>{t.archived}<span>{profileDocuments.filter((document) => document.archived).length}</span></button>
            </nav>
            <div className="cvCardGrid">
              {documents.length === 0 && <p className="libraryEmpty">{t.empty}</p>}
              {documents.map((document) => <article className={`cvCard ${document.id === props.workspace.activeDocumentId ? "current" : ""}`} key={document.id}>
                <div><span>{document.settings.lang.toUpperCase()} · {document.settings.template === "ats" ? "ATS" : "Modern"}</span><h3>{document.name}</h3><p>{document.cv.title || document.cv.name}</p><time>{new Date(document.updatedAt).toLocaleString(props.lang)}</time></div>
                <div className="cvCardActions">
                  {!document.archived && <button className="primary" onClick={() => props.onOpen(document.id)}>{t.edit}</button>}
                  {!document.archived && <button className="libraryBuildButton" onClick={() => setComposeDocumentId(document.id)}>✦ {t.build}</button>}
                  {!document.archived && <button disabled={totalCount >= MAX_ACTIVE_CVS} onClick={() => props.onDuplicate(document.id)}>{t.duplicate}</button>}
                  <button onClick={() => props.onRename(document.id)}>{t.rename}</button>
                  {!document.archived && <label className="moveCv">{t.move}<select value={document.collectionId} onChange={(event) => props.onMove(document.id, event.target.value)}>{[...props.workspace.collections].sort((a, b) => a.order - b.order).map((collection) => <option key={collection.id} value={collection.id}>{collection.name}</option>)}</select></label>}
                  <button disabled={!document.archived && activeCount <= 1} onClick={() => props.onArchive(document.id, !document.archived)}>{document.archived ? t.restore : t.archive}</button>
                  <button className="danger" title={!document.archived && activeCount <= 1 ? t.removeBlocked : t.remove} disabled={!document.archived && activeCount <= 1} onClick={() => removeDocument(document)}>{t.remove}</button>
                </div>
              </article>)}
            </div>
          </div>
        </>}
        <footer className="libraryFooter"><span>{mode === "cvs" ? t.limit : t.professionalTab}</span><button onClick={props.onClose}>{t.close}</button></footer>
      </>}
    </section>
  </div>;
}
