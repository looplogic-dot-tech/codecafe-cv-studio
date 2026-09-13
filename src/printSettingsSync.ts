import {
  DEFAULT_PRINT_SETTINGS,
  normalizePrintSettings,
  WORKSPACE_KEY,
  type CVPrintSettings,
  type CVWorkspace,
} from "./workspace";

// Print Preview existed before its settings became part of the synchronized
// workspace. This bridge preserves that working UI while moving its data into
// CVDocument.settings.print without destructive migration.
const POLL_MS = 300;

function legacyKey(documentId: string): string {
  return `codecafe-print-settings:${documentId}`;
}

function serialize(settings: CVPrintSettings): string {
  return JSON.stringify(normalizePrintSettings(settings));
}

function readWorkspace(): CVWorkspace | null {
  try {
    const parsed = JSON.parse(localStorage.getItem(WORKSPACE_KEY) || "null") as CVWorkspace | null;
    return parsed?.schema === 2 && Array.isArray(parsed.documents) ? parsed : null;
  } catch {
    return null;
  }
}

function readLegacy(documentId: string): CVPrintSettings | null {
  try {
    const raw = localStorage.getItem(legacyKey(documentId));
    return raw ? normalizePrintSettings(JSON.parse(raw)) : null;
  } catch {
    return null;
  }
}

function writeLegacy(documentId: string, settings: CVPrintSettings): void {
  localStorage.setItem(legacyKey(documentId), serialize(settings));
}

function writeWorkspacePrint(workspace: CVWorkspace, documentId: string, settings: CVPrintSettings): CVWorkspace {
  const normalized = normalizePrintSettings(settings);
  return {
    ...workspace,
    documents: workspace.documents.map((document) => document.id === documentId
      ? {
        ...document,
        settings: { ...document.settings, print: normalized },
        updatedAt: new Date().toISOString(),
      }
      : document),
  };
}

function enforceLetterPreviewLabel(): void {
  const zoom = document.querySelector<HTMLElement>(".previewTop .zoom");
  if (zoom && zoom.textContent !== "Letter · 100%") zoom.textContent = "Letter · 100%";
}

export function installPrintSettingsSync(): void {
  let currentDocumentId = "";
  let lastLegacy = "";
  let lastWorkspace = "";

  const synchronize = () => {
    enforceLetterPreviewLabel();
    const workspace = readWorkspace();
    if (!workspace) return;
    const document = workspace.documents.find((item) => item.id === workspace.activeDocumentId);
    if (!document) return;

    const documentId = document.id;
    const workspacePrint = document.settings.print ? normalizePrintSettings(document.settings.print) : null;
    const legacyPrint = readLegacy(documentId);
    let workspaceRaw = workspacePrint ? serialize(workspacePrint) : "";
    let legacyRaw = legacyPrint ? serialize(legacyPrint) : "";

    // Al cambiar de CV, el dato sincronizado tiene prioridad. Si el CV todavía
    // no tiene print settings, se conserva y migra la configuración local antigua.
    if (documentId !== currentDocumentId) {
      currentDocumentId = documentId;
      if (workspacePrint) {
        writeLegacy(documentId, workspacePrint);
        legacyRaw = workspaceRaw;
      } else if (legacyPrint && legacyRaw !== serialize(DEFAULT_PRINT_SETTINGS)) {
        const updated = writeWorkspacePrint(workspace, documentId, legacyPrint);
        localStorage.setItem(WORKSPACE_KEY, JSON.stringify(updated));
        workspaceRaw = legacyRaw;
      }
      lastLegacy = legacyRaw;
      lastWorkspace = workspaceRaw;
      return;
    }

    // El panel Print Preview escribe primero su clave local histórica. Cuando
    // cambia, copiamos exactamente esos márgenes y saltos al documento activo.
    if (legacyRaw && legacyRaw !== lastLegacy) {
      const updated = writeWorkspacePrint(workspace, documentId, legacyPrint!);
      localStorage.setItem(WORKSPACE_KEY, JSON.stringify(updated));
      workspaceRaw = legacyRaw;
      lastLegacy = legacyRaw;
      lastWorkspace = workspaceRaw;
      return;
    }

    // Si Drive/EC2 cargó una configuración distinta, la proyectamos en la clave
    // que Print Preview ya entiende para que el teléfono o navegador nuevo la use.
    if (workspaceRaw && workspaceRaw !== lastWorkspace && workspaceRaw !== legacyRaw) {
      writeLegacy(documentId, workspacePrint!);
      legacyRaw = workspaceRaw;
    }

    lastLegacy = legacyRaw;
    lastWorkspace = workspaceRaw;
  };

  synchronize();
  window.setInterval(synchronize, POLL_MS);
  window.addEventListener("focus", synchronize);
}
