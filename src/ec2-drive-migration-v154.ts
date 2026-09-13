import {
  decryptBackup,
  loadGoogleBackup,
  loadServerBackup,
  loadStoredGoogleToken,
  restoreServerSession,
  saveGoogleBackup,
  type GooglePrintableCV,
} from "./cloud";
import {
  activeDocument,
  createInitialWorkspace,
  isWorkspace,
  loadWorkspaceLocal,
  mergeWorkspaces,
  saveWorkspaceLocal,
  type CVWorkspace,
} from "./workspace";

type LegacyBackupDocument = {
  schema: 1;
  savedAt: string;
  cv: any;
  settings: { lang: "es" | "en"; template: "ats" | "modern"; photoOn: boolean };
};

type WorkspaceBackupDocument = {
  schema: 2;
  savedAt: string;
  workspace: CVWorkspace;
};

type BackupDocument = LegacyBackupDocument | WorkspaceBackupDocument;

type BackupEnvelope = {
  version: 1;
  algorithm: "AES-GCM";
  kdf: "PBKDF2-SHA256";
  iterations: number;
  salt: string;
  iv: string;
  ciphertext: string;
};

const BUTTON_ID = "codecafe-ec2-drive-migrate-v154";

function language(): "es" | "en" {
  return document.querySelector("main")?.getAttribute("lang") === "en" ? "en" : "es";
}

function isEncryptedEnvelope(value: unknown): value is BackupEnvelope {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<BackupEnvelope>;
  return candidate.version === 1
    && candidate.algorithm === "AES-GCM"
    && typeof candidate.ciphertext === "string";
}

function backupToWorkspace(document: BackupDocument): CVWorkspace {
  if (document.schema === 2) {
    if (!isWorkspace(document.workspace)) throw new Error("The EC2 workspace is not valid.");
    return document.workspace;
  }
  if (document.schema === 1 && document.cv && document.settings) {
    return createInitialWorkspace(document.cv, document.settings);
  }
  throw new Error("The EC2 backup is not a CodeCafe CV Studio workspace.");
}

function escapeHtml(value: unknown): string {
  return String(value ?? "").replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }[character] || character));
}

function printableFromWorkspace(workspace: CVWorkspace): GooglePrintableCV {
  const document = activeDocument(workspace);
  const collection = workspace.collections.find((item) => item.id === document.collectionId);
  const cv: any = document.cv;
  const jobs = Array.isArray(cv.jobs) ? cv.jobs : [];
  const projects = Array.isArray(cv.projects) ? cv.projects : [];
  const customSections = Array.isArray(cv.customSections) ? cv.customSections : [];
  const paragraphs = (value: unknown) => String(value ?? "").split("\n").filter(Boolean).map((line) => `<p>${escapeHtml(line)}</p>`).join("");
  const html = `<!doctype html><html><head><meta charset="utf-8"><title>${escapeHtml(document.name)}</title><style>@page{size:Letter portrait;margin:14mm 16mm}body{font:11pt Arial,sans-serif;color:#111;line-height:1.35}h1{margin:0 0 4px}h2{margin:18px 0 6px;font-size:13pt}h3{margin:10px 0 3px;font-size:11pt}p{margin:3px 0}.muted{color:#555}</style></head><body><h1>${escapeHtml(cv.name)}</h1><p><b>${escapeHtml(cv.title)}</b></p><p class="muted">${escapeHtml(cv.email)} ${cv.phone ? " · " + escapeHtml(cv.phone) : ""} ${cv.location ? " · " + escapeHtml(cv.location) : ""}</p>${cv.linkedin ? `<p>${escapeHtml(cv.linkedin)}</p>` : ""}${cv.summary ? `<h2>Professional Summary</h2>${paragraphs(cv.summary)}` : ""}${jobs.length ? `<h2>Professional Experience</h2>${jobs.map((job: any) => `<section><h3>${escapeHtml(job.role)}${job.company ? ` — ${escapeHtml(job.company)}` : ""}</h3><p class="muted">${escapeHtml(job.dates)}</p>${paragraphs(job.bullets)}</section>`).join("")}` : ""}${cv.coreSkills ? `<h2>Core Skills</h2>${paragraphs(cv.coreSkills)}` : ""}${cv.tools ? `<h2>Tools & Technologies</h2>${paragraphs(cv.tools)}` : ""}${projects.length ? `<h2>Projects</h2>${projects.map((project: any) => `<section><h3>${escapeHtml(project.name)}</h3><p class="muted">${escapeHtml(project.stack)}</p>${paragraphs(project.description)}${project.repository ? `<p>${escapeHtml(project.repository)}</p>` : ""}</section>`).join("")}` : ""}${cv.certifications ? `<h2>Certifications</h2>${paragraphs(cv.certifications)}` : ""}${customSections.map((section: any) => `<h2>${escapeHtml(section.title)}</h2>${paragraphs(section.content)}`).join("")}${cv.education ? `<h2>Education</h2>${paragraphs(cv.education)}` : ""}${cv.languages ? `<h2>Languages</h2>${paragraphs(cv.languages)}` : ""}</body></html>`;
  return {
    documentId: document.id,
    collectionName: collection?.name || "General Purpose",
    fileBaseName: (document.name || cv.name || "CV").replace(/[\\/:*?"<>|]/g, "-").slice(0, 100),
    html,
  };
}

async function readEc2Workspace(): Promise<CVWorkspace> {
  await restoreServerSession();
  const backup = await loadServerBackup();
  if (!backup) throw new Error("EC2 does not contain a backup yet.");
  let payload = backup.payload as BackupDocument | BackupEnvelope;
  if (isEncryptedEnvelope(payload)) {
    const promptText = language() === "es"
      ? "Este respaldo histórico de EC2 está cifrado. Escribe la contraseña de EC2 para migrarlo a Drive:"
      : "This historical EC2 backup is encrypted. Enter the EC2 password to migrate it to Drive:";
    const password = window.prompt(promptText);
    if (!password) throw new Error(language() === "es" ? "Migración cancelada." : "Migration cancelled.");
    payload = await decryptBackup<BackupDocument>(payload, password);
  }
  return backupToWorkspace(payload as BackupDocument);
}

async function migrateEc2ToDrive(button: HTMLButtonElement): Promise<void> {
  const es = language() === "es";
  const original = button.textContent || "";
  button.disabled = true;
  button.textContent = es ? "Migrando…" : "Migrating…";
  try {
    const token = loadStoredGoogleToken();
    if (!token) throw new Error(es ? "Conecta Google Drive primero." : "Connect Google Drive first.");

    const ec2Workspace = await readEc2Workspace();
    const localWorkspace = loadWorkspaceLocal(ec2Workspace);
    let merged = mergeWorkspaces(localWorkspace, ec2Workspace);

    const driveBackup = await loadGoogleBackup<BackupDocument>(token);
    if (driveBackup?.schema === 2 && isWorkspace(driveBackup.workspace)) {
      merged = mergeWorkspaces(merged, driveBackup.workspace);
    }

    saveWorkspaceLocal(merged);
    const payload: WorkspaceBackupDocument = {
      schema: 2,
      savedAt: new Date().toISOString(),
      workspace: merged,
    };
    await saveGoogleBackup(token, payload, printableFromWorkspace(merged));

    window.dispatchEvent(new CustomEvent("codecafe-workspace-reload", { detail: { reason: "ec2-drive-migration" } }));
    button.textContent = es ? "✓ EC2 → Drive completado" : "✓ EC2 → Drive complete";
    window.setTimeout(() => { button.textContent = original; button.disabled = false; }, 2600);
  } catch (error) {
    console.error("CodeCafe EC2 → Drive migration failed", error);
    button.disabled = false;
    button.textContent = original;
    window.alert((error as Error).message);
  }
}

function installButton(): void {
  if (document.getElementById(BUTTON_ID)) return;
  const syncButton = document.querySelector<HTMLButtonElement>(".cloudSyncNow");
  if (!syncButton) return;
  const button = document.createElement("button");
  button.id = BUTTON_ID;
  button.type = "button";
  button.className = "cloudEc2DriveTransfer";
  button.textContent = language() === "es" ? "Migrar EC2 → Google Drive" : "Transfer EC2 → Google Drive";
  button.title = language() === "es"
    ? "Combina la biblioteca y los CVs de EC2 con la copia local y Google Drive sin borrar registros existentes."
    : "Merges the EC2 library and CVs with the local and Google Drive copies without deleting existing records.";
  button.addEventListener("click", () => void migrateEc2ToDrive(button));
  syncButton.before(button);
}

export function installEc2DriveMigrationV154(): void {
  installButton();
  const observer = new MutationObserver(() => installButton());
  observer.observe(document.body, { childList: true, subtree: true });
}
