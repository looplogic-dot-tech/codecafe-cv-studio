import {
  isWorkspace,
  normalizeWorkspace,
  WORKSPACE_KEY,
  type CVDocument,
  type CVSettings,
  type CVWorkspace,
} from "./workspace";

const STARTUP_BLANK_ID = "cv-startup-blank";

function blankCv(): CVDocument["cv"] {
  return {
    name: "",
    title: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
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
}

function defaultSettings(): CVSettings {
  return { lang: "es", template: "ats", photoOn: false };
}

/**
 * Keeps the complete saved library but makes a single blank document active
 * before React starts. The fixed id prevents blank placeholders from
 * accumulating across launches. Cloud/local libraries remain untouched.
 */
export function prepareBlankStartupWorkspaceFromStorage(): void {
  try {
    const raw = localStorage.getItem(WORKSPACE_KEY);
    if (!raw) {
      localStorage.removeItem("codecafe-cv");
      localStorage.removeItem("codecafe-cv-settings");
      return;
    }

    const parsed = JSON.parse(raw) as unknown;
    if (!isWorkspace(parsed)) return;

    const workspace = normalizeWorkspace(parsed as CVWorkspace);
    const priorActive = workspace.documents.find((document) => document.id === workspace.activeDocumentId);
    const documents = workspace.documents.filter((document) => document.id !== STARTUP_BLANK_ID);

    // The product limit is 20 stored CVs. Never discard a real CV merely to
    // make room for the temporary startup editor.
    if (documents.length >= 20) return;

    const now = new Date().toISOString();
    const cv = blankCv();
    const settings = priorActive?.settings ?? defaultSettings();
    const profileId = workspace.activeProfileId ?? workspace.profiles?.[0]?.id;
    const startupDocument: CVDocument = {
      id: STARTUP_BLANK_ID,
      name: "New CV",
      collectionId: "general",
      cv,
      settings,
      createdAt: now,
      updatedAt: now,
      archived: false,
      ...(profileId ? { profileId } : {}),
    };

    const prepared: CVWorkspace = {
      ...workspace,
      documents: [...documents, startupDocument],
      activeDocumentId: STARTUP_BLANK_ID,
    };

    localStorage.setItem(WORKSPACE_KEY, JSON.stringify(prepared));
    // App still reads these legacy keys during migration. Keep them blank so
    // an old example/person can never win the startup race.
    localStorage.setItem("codecafe-cv", JSON.stringify(cv));
    localStorage.setItem("codecafe-cv-settings", JSON.stringify(settings));
  } catch {
    // Leave the existing workspace untouched if local storage is malformed.
  }
}
