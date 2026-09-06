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

export type CVProfile = { id: string; name: string; createdAt: string };

export type CVDocument = {
  id: string;
  name: string;
  collectionId: string;
  cv: CV;
  settings: CVSettings;
  createdAt: string;
  updatedAt: string;
  archived: boolean;
  profileId?: string;
};

export type CVWorkspace = {
  schema: 2;
  collections: CVCollection[];
  documents: CVDocument[];
  activeDocumentId: string;
  profiles?: CVProfile[];
  activeProfileId?: string;
};

export const DEFAULT_PROFILE_ID = "profile-owner";

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
    profileId: DEFAULT_PROFILE_ID,
  };
  return {
    schema: 2,
    collections: defaultCollections,
    documents: [document],
    activeDocumentId: document.id,
    profiles: [{ id: DEFAULT_PROFILE_ID, name: "Jaime", createdAt: now }],
    activeProfileId: DEFAULT_PROFILE_ID,
  };
}

export function normalizeWorkspace(workspace: CVWorkspace): CVWorkspace {
  const profiles = workspace.profiles?.length ? workspace.profiles : [{ id: DEFAULT_PROFILE_ID, name: "Jaime", createdAt: new Date().toISOString() }];
  const activeProfileId = profiles.some((profile) => profile.id === workspace.activeProfileId) ? workspace.activeProfileId! : profiles[0].id;
  const documents = workspace.documents.map((document) => ({ ...document, profileId: document.profileId || profiles[0].id }));
  const activeDocumentId = documents.some((document) => document.id === workspace.activeDocumentId && document.profileId === activeProfileId && !document.archived)
    ? workspace.activeDocumentId
    : documents.find((document) => document.profileId === activeProfileId && !document.archived)?.id || workspace.activeDocumentId;
  return { ...workspace, profiles, activeProfileId, documents, activeDocumentId };
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
  const normalized = normalizeWorkspace(workspace);
  return normalized.documents.find((document) => document.id === normalized.activeDocumentId && document.profileId === normalized.activeProfileId)
    ?? normalized.documents.find((document) => document.profileId === normalized.activeProfileId && !document.archived)
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
    return normalizeWorkspace(parsed);
  } catch {
    return fallback;
  }
}

// Combina la biblioteca de Drive con la local sin eliminar documentos de ninguno de los dos lados.
export function mergeWorkspaces(local: CVWorkspace, remote: CVWorkspace): CVWorkspace {
  const left = normalizeWorkspace(local);
  const right = normalizeWorkspace(remote);
  const documents = new Map(left.documents.map((document) => [document.id, document]));
  for (const document of right.documents) {
    const existing = documents.get(document.id);
    if (!existing || document.updatedAt > existing.updatedAt) documents.set(document.id, document);
  }
  const profiles = new Map((left.profiles ?? []).map((profile) => [profile.id, profile]));
  for (const profile of right.profiles ?? []) profiles.set(profile.id, profiles.get(profile.id) ?? profile);
  const collections = new Map(left.collections.map((collection) => [collection.id, collection]));
  for (const collection of right.collections) collections.set(collection.id, collections.get(collection.id) ?? collection);
  return normalizeWorkspace({
    ...left,
    collections: [...collections.values()],
    profiles: [...profiles.values()],
    documents: [...documents.values()],
  });
}
