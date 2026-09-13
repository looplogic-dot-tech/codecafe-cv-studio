import {
  isWorkspace,
  loadWorkspaceLocal,
  saveWorkspaceLocal,
  WORKSPACE_KEY,
  type CVWorkspace,
} from "./workspace";

/**
 * Applies the active profile's canonical basic information only to the active
 * document. This helper is intentionally called only after creating a NEW
 * BLANK CV. Existing CVs and "save current as new" copies are never changed.
 */
export function applyProfileBasicsToNewBlankCvFromStorage(): CVWorkspace | null {
  try {
    const raw = localStorage.getItem(WORKSPACE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as unknown;
    if (!isWorkspace(parsed)) return null;
    const workspace = loadWorkspaceLocal(parsed);
    const profileId = workspace.activeProfileId;
    const profile = workspace.profiles?.find((candidate) => candidate.id === profileId);
    const basic = profile?.basicInfo;
    if (!profileId || !basic) return workspace;

    const now = new Date().toISOString();
    const documents = workspace.documents.map((document) => document.id === workspace.activeDocumentId && document.profileId === profileId
      ? {
        ...document,
        cv: {
          ...document.cv,
          name: basic.name,
          email: basic.email,
          phone: basic.phone,
          location: basic.location,
          linkedin: basic.linkedin,
        },
        updatedAt: now,
      }
      : document);
    const updated = { ...workspace, documents };
    saveWorkspaceLocal(updated);
    return updated;
  } catch {
    return null;
  }
}
