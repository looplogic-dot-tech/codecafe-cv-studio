import type { CV, Lang } from "./App";

// El límite incluye CVs activos y archivados para mantener el almacenamiento predecible.
export const MAX_ACTIVE_CVS = 20;
export const WORKSPACE_KEY = "codecafe-cv-workspace-v2";

export type CVSettings = {
  lang: Lang;
  template: "ats" | "modern";
  photoOn: boolean;
};

export type CVCollection = {
  id: string;
  name: string;
  order: number;
};

export type CVDocument = {
  id: string;
  name: string;
  collectionId: string;
  cv: CV;
  settings: CVSettings;
  createdAt: string;
  updatedAt: string;
  archived: boolean;
};

export type CVWorkspace = {
  schema: 2;
  collections: CVCollection[];
  documents: CVDocument[];
  activeDocumentId: string;
};

export const defaultCollections: CVCollection[] = [
  { id: "it", name: "IT", order: 0 },
  { id: "construction", name: "Construction", order: 1 },
  { id: "general", name: "General Purpose", order: 2 },
];

export function newId(prefix: string): string {
  return `${prefix}-${crypto.randomUUID()}`;
}

export function createInitialWorkspace(cv: CV, settings: CVSettings): CVWorkspace {
  const now = new Date().toISOString();
  const document: CVDocument = {
    id: newId("cv"),
    name: cv.title || "Current CV",
    collectionId: "general",
    cv,
    settings,
    createdAt: now,
    updatedAt: now,
    archived: false,
  };
  return {
    schema: 2,
    collections: defaultCollections,
    documents: [document],
    activeDocumentId: document.id,
  };
}

export function isWorkspace(value: unknown): value is CVWorkspace {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<CVWorkspace>;
  return candidate.schema === 2
    && Array.isArray(candidate.collections)
    && Array.isArray(candidate.documents)
    && candidate.documents.length > 0
    && candidate.documents.length <= MAX_ACTIVE_CVS
    && typeof candidate.activeDocumentId === "string"
    && candidate.documents.some((document) => document?.id === candidate.activeDocumentId && !document.archived);
}

export function activeDocument(workspace: CVWorkspace): CVDocument {
  return workspace.documents.find((document) => document.id === workspace.activeDocumentId)
    ?? workspace.documents[0];
}

export function replaceCurrentDocument(
  workspace: CVWorkspace,
  cv: CV,
  settings: CVSettings,
): CVWorkspace {
  const updatedAt = new Date().toISOString();
  return {
    ...workspace,
    documents: workspace.documents.map((document) => document.id === workspace.activeDocumentId
      ? { ...document, cv, settings, updatedAt }
      : document),
  };
}

export function saveWorkspaceLocal(workspace: CVWorkspace): void {
  localStorage.setItem(WORKSPACE_KEY, JSON.stringify(workspace));
}

export function loadWorkspaceLocal(fallback: CVWorkspace): CVWorkspace {
  const stored = localStorage.getItem(WORKSPACE_KEY);
  if (!stored) return fallback;
  try {
    const parsed = JSON.parse(stored);
    if (!isWorkspace(parsed) || parsed.documents.length === 0) return fallback;
    return parsed;
  } catch {
    return fallback;
  }
}
