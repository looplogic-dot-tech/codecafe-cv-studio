import type { CV, Lang } from "./App";

// El límite incluye CVs activos y archivados para mantener el almacenamiento predecible.
export const MAX_ACTIVE_CVS = 20;
export const WORKSPACE_KEY = "codecafe-cv-workspace-v2";

export type CVPrintSettings = {
  top: number;
  right: number;
  bottom: number;
  left: number;
  protectBreaks: boolean;
  manualBreaks: string[];
};

export const DEFAULT_PRINT_SETTINGS: CVPrintSettings = {
  top: 14,
  right: 16,
  bottom: 14,
  left: 16,
  protectBreaks: true,
  manualBreaks: [],
};

export function normalizePrintSettings(value: unknown): CVPrintSettings {
  const candidate = value && typeof value === "object" ? value as Partial<CVPrintSettings> : {};
  const clamp = (number: unknown, fallback: number) => {
    const parsed = Number(number);
    if (!Number.isFinite(parsed)) return fallback;
    return Math.min(30, Math.max(5, Math.round(parsed * 10) / 10));
  };
  return {
    top: clamp(candidate.top, DEFAULT_PRINT_SETTINGS.top),
    right: clamp(candidate.right, DEFAULT_PRINT_SETTINGS.right),
    bottom: clamp(candidate.bottom, DEFAULT_PRINT_SETTINGS.bottom),
    left: clamp(candidate.left, DEFAULT_PRINT_SETTINGS.left),
    protectBreaks: candidate.protectBreaks !== false,
    manualBreaks: Array.isArray(candidate.manualBreaks)
      ? candidate.manualBreaks.filter((item): item is string => typeof item === "string")
      : [],
  };
}

export type CVSettings = {
  lang: Lang;
  template: "ats" | "modern";
  photoOn: boolean;
  // La configuración de impresión viaja con el CV para que teléfono, EC2 y Drive
  // compartan los mismos márgenes y saltos. Sigue siendo opcional para CVs antiguos.
  print?: CVPrintSettings;
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

export type ProfessionalRecordKind =
  | "summary"
  | "experience"
  | "skill"
  | "technology"
  | "project"
  | "education"
  | "certification"
  | "language"
  | "custom";

export type ProfessionalRecordStatus = "pending" | "reviewed" | "archived";

export type ProfessionalRecordSource = {
  type: "manual" | "import" | "migration";
  label?: string;
};

export type ProfessionalRecord = {
  id: string;
  kind: ProfessionalRecordKind;
  status: ProfessionalRecordStatus;
  title: string;
  content: string;
  details: Record<string, string>;
  tags: string[];
  revision: number;
  createdAt: string;
  updatedAt: string;
  source?: ProfessionalRecordSource;
  conflictOf?: string;
};

export type ProfessionalLibrary = {
  version: 1;
  profileId: string;
  records: ProfessionalRecord[];
};

export const PROFESSIONAL_RECORD_KINDS: ProfessionalRecordKind[] = [
  "summary",
  "experience",
  "skill",
  "technology",
  "project",
  "education",
  "certification",
  "language",
  "custom",
];

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
  // Phase 1: contenedores independientes por perfil. Es opcional para mantener
  // compatibilidad total con espacios de trabajo creados antes de la biblioteca.
  professionalLibraries?: ProfessionalLibrary[];
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

function basicInfoFromCV(cv: CV): ProfileBasicInfo {
  return {
    name: cv.name,
    email: cv.email,
    phone: cv.phone,
    location: cv.location,
    linkedin: cv.linkedin,
  };
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

function normalizeTags(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  const unique = new Set<string>();
  for (const item of value) {
    if (typeof item !== "string") continue;
    const tag = item.trim();
    if (tag) unique.add(tag);
  }
  return [...unique];
}

function normalizeProfessionalRecord(value: unknown): ProfessionalRecord | null {
  if (!value || typeof value !== "object") return null;
  const candidate = value as Partial<ProfessionalRecord>;
  if (typeof candidate.id !== "string" || !candidate.id.trim()) return null;
  if (!PROFESSIONAL_RECORD_KINDS.includes(candidate.kind as ProfessionalRecordKind)) return null;
  const status: ProfessionalRecordStatus = candidate.status === "pending" || candidate.status === "archived"
    ? candidate.status
    : "reviewed";
  const now = new Date().toISOString();
  const details: Record<string, string> = {};
  if (candidate.details && typeof candidate.details === "object") {
    for (const [key, raw] of Object.entries(candidate.details)) {
      if (typeof raw === "string") details[key] = raw;
    }
  }
  return {
    id: candidate.id,
    kind: candidate.kind as ProfessionalRecordKind,
    status,
    title: typeof candidate.title === "string" ? candidate.title : "",
    content: typeof candidate.content === "string" ? candidate.content : "",
    details,
    tags: normalizeTags(candidate.tags),
    revision: Number.isInteger(candidate.revision) && Number(candidate.revision) > 0 ? Number(candidate.revision) : 1,
    createdAt: typeof candidate.createdAt === "string" ? candidate.createdAt : now,
    updatedAt: typeof candidate.updatedAt === "string" ? candidate.updatedAt : now,
    ...(candidate.source && typeof candidate.source === "object" ? { source: candidate.source } : {}),
    ...(typeof candidate.conflictOf === "string" ? { conflictOf: candidate.conflictOf } : {}),
  };
}

function normalizeProfessionalLibraries(workspace: CVWorkspace, profiles: CVProfile[]): ProfessionalLibrary[] {
  const existing = Array.isArray(workspace.professionalLibraries) ? workspace.professionalLibraries : [];
  const normalized = new Map<string, ProfessionalLibrary>();

  for (const value of existing) {
    if (!value || typeof value !== "object" || typeof value.profileId !== "string") continue;
    const records = Array.isArray(value.records)
      ? value.records.map(normalizeProfessionalRecord).filter((record): record is ProfessionalRecord => Boolean(record))
      : [];
    normalized.set(value.profileId, { version: 1, profileId: value.profileId, records });
  }

  // Cada perfil recibe su propio contenedor vacío si nunca tuvo biblioteca. No se
  // importa ni se copia contenido de otro perfil durante esta normalización.
  for (const profile of profiles) {
    if (!normalized.has(profile.id)) normalized.set(profile.id, { version: 1, profileId: profile.id, records: [] });
  }

  return [...normalized.values()];
}

export function getProfessionalLibrary(workspace: CVWorkspace, profileId?: string): ProfessionalLibrary {
  const targetProfileId = profileId || workspace.activeProfileId || workspace.profiles?.[0]?.id || DEFAULT_PROFILE_ID;
  const existing = workspace.professionalLibraries?.find((library) => library.profileId === targetProfileId);
  return existing
    ? { ...existing, records: [...existing.records] }
    : { version: 1, profileId: targetProfileId, records: [] };
}

export function replaceProfessionalLibrary(workspace: CVWorkspace, library: ProfessionalLibrary): CVWorkspace {
  const normalized = normalizeWorkspace(workspace);
  if (!(normalized.profiles ?? []).some((profile) => profile.id === library.profileId)) return normalized;
  const libraries = [...(normalized.professionalLibraries ?? [])];
  const index = libraries.findIndex((candidate) => candidate.profileId === library.profileId);
  const clean: ProfessionalLibrary = {
    version: 1,
    profileId: library.profileId,
    records: library.records.map(normalizeProfessionalRecord).filter((record): record is ProfessionalRecord => Boolean(record)),
  };
  if (index >= 0) libraries[index] = clean;
  else libraries.push(clean);
  return { ...normalized, professionalLibraries: libraries };
}

function persistedPrintSettings(documentId: string): CVPrintSettings | undefined {
  try {
    const stored = JSON.parse(localStorage.getItem(WORKSPACE_KEY) || "null") as CVWorkspace | null;
    const print = stored?.documents?.find((document) => document.id === documentId)?.settings?.print;
    return print ? normalizePrintSettings(print) : undefined;
  } catch {
    return undefined;
  }
}

function persistedProfessionalLibraries(): ProfessionalLibrary[] | undefined {
  try {
    const stored = JSON.parse(localStorage.getItem(WORKSPACE_KEY) || "null") as CVWorkspace | null;
    return Array.isArray(stored?.professionalLibraries) ? stored.professionalLibraries : undefined;
  } catch {
    return undefined;
  }
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
    profiles: [{ id: DEFAULT_PROFILE_ID, name: "Jaime", createdAt: now, basicInfo: basicInfoFromCV(cv) }],
    activeProfileId: DEFAULT_PROFILE_ID,
    professionalLibraries: [{ version: 1, profileId: DEFAULT_PROFILE_ID, records: [] }],
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

  // Migración automática: cada perfil obtiene datos básicos únicamente de CVs con el
  // mismo profileId. Los CVs existentes reciben esos valores sólo si el campo está vacío.
  // Los valores heredados siguen siendo campos normales y editables en cada CV.
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
  const professionalLibraries = normalizeProfessionalLibraries(workspace, profiles);

  const activeDocumentId = documents.some((document) => document.id === workspace.activeDocumentId && document.profileId === activeProfileId && !document.archived)
    ? workspace.activeDocumentId
    : documents.find((document) => document.profileId === activeProfileId && !document.archived)?.id || workspace.activeDocumentId;
  return { ...workspace, profiles, activeProfileId, documents, activeDocumentId, professionalLibraries };
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
  const normalized = normalizeWorkspace(workspace);
  const updatedAt = new Date().toISOString();
  const persistedPrint = persistedPrintSettings(normalized.activeDocumentId);
  const persistedLibraries = persistedProfessionalLibraries();
  return {
    ...normalized,
    // La biblioteca puede ser editada desde la capa My CVs mientras App conserva
    // un snapshot anterior en memoria. Se recupera la copia local más reciente
    // antes de cualquier guardado/sincronización para impedir que se pierda.
    professionalLibraries: persistedLibraries ?? normalized.professionalLibraries,
    documents: normalized.documents.map((document) => document.id === normalized.activeDocumentId && document.profileId === normalized.activeProfileId
      ? {
        ...document,
        cv,
        // Conserva campos opcionales ya asociados al documento y, en particular,
        // los ajustes de impresión guardados directamente por Print Preview.
        settings: {
          ...document.settings,
          ...settings,
          ...(persistedPrint ? { print: persistedPrint } : {}),
        },
        updatedAt,
      }
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

function sameProfessionalRecordContent(left: ProfessionalRecord, right: ProfessionalRecord): boolean {
  return left.kind === right.kind
    && left.status === right.status
    && left.title === right.title
    && left.content === right.content
    && JSON.stringify(left.details) === JSON.stringify(right.details)
    && JSON.stringify(left.tags) === JSON.stringify(right.tags)
    && left.revision === right.revision
    && left.conflictOf === right.conflictOf;
}

function conflictCopy(record: ProfessionalRecord, originalId: string): ProfessionalRecord {
  const suffix = record.updatedAt.replace(/[^0-9A-Za-z]/g, "").slice(0, 24) || "unknown";
  return {
    ...record,
    id: `${originalId}-conflict-${suffix}`,
    status: "pending",
    conflictOf: originalId,
  };
}

function mergeProfessionalLibrary(left: ProfessionalLibrary, right: ProfessionalLibrary): ProfessionalLibrary {
  const records = new Map(left.records.map((record) => [record.id, record]));
  for (const remote of right.records) {
    const local = records.get(remote.id);
    if (!local) {
      records.set(remote.id, remote);
      continue;
    }
    if (sameProfessionalRecordContent(local, remote)) {
      if (remote.updatedAt > local.updatedAt) records.set(remote.id, remote);
      continue;
    }

    // Un conflicto sobre el mismo ID nunca destruye silenciosamente una versión.
    // La más reciente conserva el ID principal y la otra queda como copia Pending.
    const remoteIsNewer = remote.updatedAt > local.updatedAt;
    const primary = remoteIsNewer ? remote : local;
    const secondary = remoteIsNewer ? local : remote;
    records.set(primary.id, primary);
    const conflict = conflictCopy(secondary, primary.id);
    if (!records.has(conflict.id)) records.set(conflict.id, conflict);
  }
  return { version: 1, profileId: left.profileId, records: [...records.values()] };
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

  const libraries = new Map((left.professionalLibraries ?? []).map((library) => [library.profileId, library]));
  for (const remoteLibrary of right.professionalLibraries ?? []) {
    const localLibrary = libraries.get(remoteLibrary.profileId);
    libraries.set(
      remoteLibrary.profileId,
      localLibrary ? mergeProfessionalLibrary(localLibrary, remoteLibrary) : remoteLibrary,
    );
  }

  return normalizeWorkspace({
    ...left,
    collections: [...collections.values()],
    profiles: [...profiles.values()],
    documents: [...documents.values()],
    professionalLibraries: [...libraries.values()],
  });
}
