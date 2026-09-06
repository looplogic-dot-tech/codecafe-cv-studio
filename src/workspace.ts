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

export type ProfileBasicInfo = Pick<CV, "name" | "email" | "phone" | "location" | "linkedin">;
export type CVProfile = {
  id: string;
  name: string;
  createdAt: string;
  // Datos base exclusivos de este perfil. Nunca se comparten con otro profileId.
  basicInfo?: ProfileBasicInfo;
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

const basicInfoFields: (keyof ProfileBasicInfo)[] = ["name", "email", "phone", "location", "linkedin"];

export function emptyProfileBasicInfo(): ProfileBasicInfo {
  return { name: "", email: "", phone: "", location: "", linkedin: "" };
}

function basicInfoFromCV(cv: CV, fallback: ProfileBasicInfo = emptyProfileBasicInfo()): ProfileBasicInfo {
  const next = { ...fallback };
  for (const field of basicInfoFields) {
    if (cv[field]?.trim()) next[field] = cv[field];
  }
  return next;
}

export function newId(prefix: string): string {
  return `${prefix}-${crypto.randomUUID()}`;
}

function profileDocuments(documents: CVDocument[], profileId: string): CVDocument[] {
  return documents
    .filter((document) => document.profileId === profileId)
    // Los CV activos tienen prioridad; dentro de ellos se usa primero el más reciente.
    .sort((left, right) => Number(left.archived) - Number(right.archived) || right.updatedAt.localeCompare(left.updatedAt));
}

function deriveProfileBasicInfo(documents: CVDocument[], profileId: string): ProfileBasicInfo {
  const candidates = profileDocuments(documents, profileId);
  const basicInfo = emptyProfileBasicInfo();
  for (const field of basicInfoFields) {
    const source = candidates.find((document) => document.cv[field]?.trim());
    if (source) basicInfo[field] = source.cv[field];
  }
  return basicInfo;
}

function fillMissingBasicInfo(cv: CV, basicInfo: ProfileBasicInfo): CV {
  const next = { ...cv };
  for (const field of basicInfoFields) {
    if (!next[field]?.trim() && basicInfo[field]?.trim()) next[field] = basicInfo[field];
  }
  return next;
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
    profiles: [{
      id: DEFAULT_PROFILE_ID,
      name: "Jaime",
      createdAt: now,
      basicInfo: basicInfoFromCV(cv),
    }],
    activeProfileId: DEFAULT_PROFILE_ID,
  };
}

export function normalizeWorkspace(workspace: CVWorkspace): CVWorkspace {
  const initialProfiles = workspace.profiles?.length
    ? workspace.profiles
    : [{ id: DEFAULT_PROFILE_ID, name: "Jaime", createdAt: new Date().toISOString() }];
  const activeProfileId = initialProfiles.some((profile) => profile.id === workspace.activeProfileId)
    ? workspace.activeProfileId!
    : initialProfiles[0].id;

  const assignedDocuments = workspace.documents.map((document) => ({
    ...document,
    profileId: document.profileId || initialProfiles[0].id,
  }));

  // Migración automática: perfiles de versiones anteriores obtienen sus datos base
  // sólo de CVs con el mismo profileId. También se rellenan una sola vez los campos
  // básicos vacíos de CVs ya existentes, sin sobrescribir información escrita.
  const newlyMigratedProfileIds = new Set<string>();
  const profiles = initialProfiles.map((profile) => {
    if (profile.basicInfo) return profile;
    newlyMigratedProfileIds.add(profile.id);
    return { ...profile, basicInfo: deriveProfileBasicInfo(assignedDocuments, profile.id) };
  });
  const basicsByProfile = new Map(profiles.map((profile) => [profile.id, profile.basicInfo!]));
  const documents = assignedDocuments.map((document) => {
    if (!newlyMigratedProfileIds.has(document.profileId!)) return document;
    const basicInfo = basicsByProfile.get(document.profileId!);
    return basicInfo ? { ...document, cv: fillMissingBasicInfo(document.cv, basicInfo) } : document;
  });

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

export function activeProfileBasicInfo(workspace: CVWorkspace): ProfileBasicInfo {
  const normalized = normalizeWorkspace(workspace);
  return normalized.profiles?.find((profile) => profile.id === normalized.activeProfileId)?.basicInfo
    ?? emptyProfileBasicInfo();
}

export function replaceCurrentDocument(
  workspace: CVWorkspace,
  cv: CV,
  settings: CVSettings,
): CVWorkspace {
  const normalized = normalizeWorkspace(workspace);
  const updatedAt = new Date().toISOString();
  const activeProfileId = normalized.activeProfileId;
  const profiles = normalized.profiles?.map((profile) => profile.id === activeProfileId
    ? { ...profile, basicInfo: basicInfoFromCV(cv, profile.basicInfo ?? emptyProfileBasicInfo()) }
    : profile);
  return {
    ...normalized,
    profiles,
    documents: normalized.documents.map((document) => document.id === normalized.activeDocumentId && document.profileId === activeProfileId
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
  const mergedDocuments = [...documents.values()];
  const profiles = new Map((left.profiles ?? []).map((profile) => [profile.id, profile]));
  for (const profile of right.profiles ?? []) profiles.set(profile.id, profiles.get(profile.id) ?? profile);
  const mergedProfiles = [...profiles.values()].map((profile) => ({
    ...profile,
    basicInfo: deriveProfileBasicInfo(mergedDocuments, profile.id),
  }));
  const collections = new Map(left.collections.map((collection) => [collection.id, collection]));
  for (const collection of right.collections) collections.set(collection.id, collections.get(collection.id) ?? collection);
  return normalizeWorkspace({
    ...left,
    collections: [...collections.values()],
    profiles: mergedProfiles,
    documents: mergedDocuments,
  });
}
