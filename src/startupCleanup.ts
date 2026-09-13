const WORKSPACE_KEY = "codecafe-cv-workspace-v2";
const LEGACY_CV_KEY = "codecafe-cv";
const DEMO_NAME = "alex rivera";
const DEMO_EMAIL = "alex.rivera@example.com";

const blankLegacyCV = {
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

function normalize(value: unknown): string {
  return typeof value === "string" ? value.trim().toLowerCase() : "";
}

function isDemoCV(value: any): boolean {
  if (!value || typeof value !== "object") return false;
  return normalize(value.name) === DEMO_NAME || normalize(value.email) === DEMO_EMAIL;
}

function cleanLegacyCV(): void {
  try {
    const raw = localStorage.getItem(LEGACY_CV_KEY);
    if (!raw) {
      localStorage.setItem(LEGACY_CV_KEY, JSON.stringify(blankLegacyCV));
      return;
    }
    const parsed = JSON.parse(raw);
    if (isDemoCV(parsed)) localStorage.setItem(LEGACY_CV_KEY, JSON.stringify(blankLegacyCV));
  } catch {
    localStorage.setItem(LEGACY_CV_KEY, JSON.stringify(blankLegacyCV));
  }
}

function cleanWorkspace(): void {
  try {
    const raw = localStorage.getItem(WORKSPACE_KEY);
    if (!raw) return;
    const workspace = JSON.parse(raw);
    if (!workspace || workspace.schema !== 2 || !Array.isArray(workspace.documents)) return;

    const removedDocumentIds = new Set<string>();
    const removedProfileIds = new Set<string>();
    const documents = workspace.documents.filter((document: any) => {
      const demo = isDemoCV(document?.cv) || normalize(document?.name) === DEMO_NAME;
      if (demo) {
        if (typeof document?.id === "string") removedDocumentIds.add(document.id);
        if (typeof document?.profileId === "string") removedProfileIds.add(document.profileId);
      }
      return !demo;
    });

    if (documents.length === workspace.documents.length) return;

    for (const id of removedDocumentIds) {
      localStorage.removeItem(`codecafe-print-settings:${id}`);
      localStorage.removeItem(`codecafe-print-paper:${id}`);
    }

    if (documents.length === 0) {
      localStorage.removeItem(WORKSPACE_KEY);
      localStorage.setItem(LEGACY_CV_KEY, JSON.stringify(blankLegacyCV));
      return;
    }

    const profiles = Array.isArray(workspace.profiles)
      ? workspace.profiles.filter((profile: any) => {
          const demo = normalize(profile?.name) === DEMO_NAME || isDemoCV(profile?.basicInfo);
          if (demo && typeof profile?.id === "string") removedProfileIds.add(profile.id);
          return !demo;
        })
      : workspace.profiles;

    const professionalLibraries = Array.isArray(workspace.professionalLibraries)
      ? workspace.professionalLibraries.filter((library: any) => !removedProfileIds.has(library?.profileId))
      : workspace.professionalLibraries;

    const activeDocumentId = documents.some((document: any) => document.id === workspace.activeDocumentId)
      ? workspace.activeDocumentId
      : documents[0].id;

    const survivingProfileIds = new Set(documents.map((document: any) => document.profileId).filter(Boolean));
    const activeProfileId = survivingProfileIds.has(workspace.activeProfileId)
      ? workspace.activeProfileId
      : (documents.find((document: any) => document.profileId)?.profileId || profiles?.[0]?.id);

    localStorage.setItem(WORKSPACE_KEY, JSON.stringify({
      ...workspace,
      documents,
      profiles,
      professionalLibraries,
      activeDocumentId,
      activeProfileId,
    }));
  } catch {
    // Never block startup because of malformed legacy data.
  }
}

function cleanOtherDemoKeys(storage: Storage): void {
  for (const key of Object.keys(storage)) {
    if (key === WORKSPACE_KEY || key === LEGACY_CV_KEY) continue;
    const raw = storage.getItem(key);
    if (!raw) continue;
    const lowered = raw.toLowerCase();
    if (lowered.includes(DEMO_NAME) || lowered.includes(DEMO_EMAIL)) storage.removeItem(key);
  }
}

export function removeAlexRiveraDemoData(): void {
  cleanWorkspace();
  cleanLegacyCV();
  cleanOtherDemoKeys(localStorage);
  cleanOtherDemoKeys(sessionStorage);
}
