import type { CVWorkspace } from "./workspace";
import { MAX_ACTIVE_CVS } from "./workspace";

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
  cancel: string;
  edit: string;
  duplicate: string;
  rename: string;
  move: string;
  archive: string;
  restore: string;
  remove: string;
  newCollection: string;
  collectionName: string;
  limit: string;
  empty: string;
  close: string;
};

const libraryCopy: Record<"es" | "en", LibraryCopy> = {
  es: {
    title: "Mis CVs", subtitle: "Organiza cada CV según el tipo de trabajo.", active: "Activos", archived: "Archivados",
    newCv: "Nuevo CV en blanco", saveAs: "Guardar actual como nuevo", newName: "Nombre del CV", collection: "Colección",
    create: "Crear", cancel: "Cancelar", edit: "Editar", duplicate: "Duplicar", rename: "Renombrar", move: "Mover a", archive: "Archivar", restore: "Restaurar",
    remove: "Eliminar", newCollection: "Nueva colección", collectionName: "Nombre de la colección",
    limit: "Límite actual: 20 CVs en total, incluidos los archivados", empty: "Esta colección todavía no contiene CVs.", close: "Cerrar",
  },
  en: {
    title: "My CVs", subtitle: "Organize each résumé by the kind of work it targets.", active: "Active", archived: "Archived",
    newCv: "New blank CV", saveAs: "Save current as new", newName: "CV name", collection: "Collection",
    create: "Create", cancel: "Cancel", edit: "Edit", duplicate: "Duplicate", rename: "Rename", move: "Move to", archive: "Archive", restore: "Restore",
    remove: "Delete", newCollection: "New collection", collectionName: "Collection name",
    limit: "Current limit: 20 total CVs, including archived CVs", empty: "This collection does not contain any CVs yet.", close: "Close",
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
  onSelectCollection(id: string): void;
  onShowArchived(value: boolean): void;
  onDraftName(value: string): void;
  onDraftCollection(value: string): void;
  onStartCreate(mode: "blank" | "copy"): void;
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
  const activeCount = props.workspace.documents.filter((document) => !document.archived).length;
  const totalCount = props.workspace.documents.length;
  const documents = props.workspace.documents
    .filter((document) => props.showArchived
      ? document.archived
      : !document.archived && (props.selectedCollection === "all" || document.collectionId === props.selectedCollection))
    .sort((left, right) => right.updatedAt.localeCompare(left.updatedAt));

  return <div className="libraryOverlay" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) props.onClose(); }}>
    <section className="libraryPanel" role="dialog" aria-modal="true" aria-labelledby="library-title">
      <div className="libraryHead"><div><span className="eyebrow">CODECAFE LIBRARY</span><h2 id="library-title">{t.title}</h2><p>{t.subtitle}</p></div><button onClick={props.onClose} aria-label={t.close}>×</button></div>
      <div className="libraryToolbar">
        <button className="primary" disabled={totalCount >= MAX_ACTIVE_CVS} onClick={() => props.onStartCreate("blank")}>＋ {t.newCv}</button>
        <button disabled={totalCount >= MAX_ACTIVE_CVS} onClick={() => props.onStartCreate("copy")}>{t.saveAs}</button>
      </div>
      {props.creationMode && <div className="createCvPanel">
        <label>{t.newName}<input className="inputField" value={props.draftName} onChange={(event) => props.onDraftName(event.target.value)} /></label>
        <label>{t.collection}<select className="inputField" value={props.draftCollection} onChange={(event) => props.onDraftCollection(event.target.value)}>{[...props.workspace.collections].sort((a, b) => a.order - b.order).map((collection) => <option key={collection.id} value={collection.id}>{collection.name}</option>)}</select></label>
        <div><button className="primary" disabled={!props.draftName.trim()} onClick={props.onCreate}>{t.create}</button><button onClick={props.onCancelCreate}>{t.cancel}</button></div>
      </div>}
      <div className="libraryBody">
        <nav className="collectionNav">
          <button className={!props.showArchived && props.selectedCollection === "all" ? "selected" : ""} onClick={() => { props.onShowArchived(false); props.onSelectCollection("all"); }}>{t.active}<span>{activeCount}</span></button>
          {[...props.workspace.collections].sort((a, b) => a.order - b.order).map((collection) => <button key={collection.id} className={!props.showArchived && props.selectedCollection === collection.id ? "selected" : ""} onClick={() => { props.onShowArchived(false); props.onSelectCollection(collection.id); }}>{collection.name}<span>{props.workspace.documents.filter((document) => !document.archived && document.collectionId === collection.id).length}</span></button>)}
          <button onClick={props.onCreateCollection}>＋ {t.newCollection}</button>
          <button className={props.showArchived ? "selected" : ""} onClick={() => props.onShowArchived(true)}>{t.archived}<span>{props.workspace.documents.filter((document) => document.archived).length}</span></button>
        </nav>
        <div className="cvCardGrid">
          {documents.length === 0 && <p className="libraryEmpty">{t.empty}</p>}
          {documents.map((document) => <article className={`cvCard ${document.id === props.workspace.activeDocumentId ? "current" : ""}`} key={document.id}>
            <div><span>{document.settings.lang.toUpperCase()} · {document.settings.template === "ats" ? "ATS" : "Modern"}</span><h3>{document.name}</h3><p>{document.cv.title || document.cv.name}</p><time>{new Date(document.updatedAt).toLocaleString(props.lang)}</time></div>
            <div className="cvCardActions">
              {!document.archived && <button className="primary" onClick={() => props.onOpen(document.id)}>{t.edit}</button>}
              {!document.archived && <button disabled={totalCount >= MAX_ACTIVE_CVS} onClick={() => props.onDuplicate(document.id)}>{t.duplicate}</button>}
              <button onClick={() => props.onRename(document.id)}>{t.rename}</button>
              {!document.archived && <label className="moveCv">{t.move}<select value={document.collectionId} onChange={(event) => props.onMove(document.id, event.target.value)}>{[...props.workspace.collections].sort((a, b) => a.order - b.order).map((collection) => <option key={collection.id} value={collection.id}>{collection.name}</option>)}</select></label>}
              <button disabled={!document.archived && activeCount <= 1} onClick={() => props.onArchive(document.id, !document.archived)}>{document.archived ? t.restore : t.archive}</button>
              {document.archived && <button className="danger" onClick={() => props.onDelete(document.id)}>{t.remove}</button>}
            </div>
          </article>)}
        </div>
      </div>
      <footer className="libraryFooter"><span>{t.limit}</span><button onClick={props.onClose}>{t.close}</button></footer>
    </section>
  </div>;
}
