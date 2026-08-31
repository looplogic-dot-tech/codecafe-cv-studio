export type BackupEnvelope = {
  version: 1;
  algorithm: "AES-GCM";
  kdf: "PBKDF2-SHA256";
  iterations: number;
  salt: string;
  iv: string;
  ciphertext: string;
};

export type ServerSession = {
  csrfToken: string;
  encryptionSalt: string;
  currentRevision: number;
};

export type ServerBackup = {
  revision: number;
  savedAt: string;
  digest: string;
  payload: unknown;
} | null;

export type ServerBackupRevision = {
  revision: number;
  savedAt: string;
  digest: string;
};

export type RuntimeCloudConfig = {
  googleClientId?: string;
};

const encoder = new TextEncoder();
const decoder = new TextDecoder();
const GOOGLE_ROOT_FOLDER = "CodeCafe CV Studio";
const GOOGLE_WORKSPACE_NAME = "CodeCafe-CV-Studio.workspace.json";
const GOOGLE_TOKEN_KEY = "codecafe-google-drive-token";
const GOOGLE_GRANT_KEY = "codecafe-google-drive-grant-known";

export type GooglePrintableCV = {
  documentId: string;
  collectionName: string;
  fileBaseName: string;
  html: string;
};

function base64ToBytes(value: string): Uint8Array {
  const binary = atob(value);
  return Uint8Array.from(binary, (character) => character.charCodeAt(0));
}

async function deriveKey(passphrase: string, salt: Uint8Array, iterations: number) {
  const material = await crypto.subtle.importKey(
    "raw",
    encoder.encode(passphrase),
    "PBKDF2",
    false,
    ["deriveKey"],
  );
  return crypto.subtle.deriveKey(
    { name: "PBKDF2", hash: "SHA-256", salt: salt as BufferSource, iterations },
    material,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"],
  );
}

// Sólo se descifran copias históricas creadas por versiones anteriores.
// Las versiones actuales nunca llaman una función de cifrado al guardar.
export async function decryptBackup<T>(envelope: BackupEnvelope, passphrase: string): Promise<T> {
  if (envelope.version !== 1 || envelope.algorithm !== "AES-GCM" || envelope.kdf !== "PBKDF2-SHA256") {
    throw new Error("Formato de respaldo no compatible.");
  }
  const key = await deriveKey(passphrase, base64ToBytes(envelope.salt), envelope.iterations);
  try {
    const plaintext = await crypto.subtle.decrypt(
      { name: "AES-GCM", iv: base64ToBytes(envelope.iv) as BufferSource },
      key,
      base64ToBytes(envelope.ciphertext) as BufferSource,
    );
    return JSON.parse(decoder.decode(plaintext)) as T;
  } catch {
    throw new Error("La contraseña no corresponde a este respaldo o el archivo está dañado.");
  }
}

export async function backupDigest(payload: unknown): Promise<string> {
  const bytes = await crypto.subtle.digest("SHA-256", encoder.encode(JSON.stringify(payload)));
  return Array.from(new Uint8Array(bytes), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(path, {
    credentials: "same-origin",
    ...init,
    headers: { "Content-Type": "application/json", ...(init?.headers ?? {}) },
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(body.error || `Error HTTP ${response.status}`) as Error & { status?: number; body?: unknown };
    error.status = response.status;
    error.body = body;
    throw error;
  }
  return body as T;
}

export async function connectServer(password: string): Promise<ServerSession> {
  return api<ServerSession>("/api/session", {
    method: "POST",
    body: JSON.stringify({ password }),
  });
}

export async function disconnectServer(csrfToken: string): Promise<void> {
  await api("/api/session", { method: "DELETE", headers: { "X-CSRF-Token": csrfToken } });
}

export async function loadServerBackup(): Promise<ServerBackup> {
  const result = await api<{ backup: ServerBackup }>("/api/backups/latest");
  return result.backup;
}

export async function listServerBackups(): Promise<ServerBackupRevision[]> {
  const result = await api<{ revisions: ServerBackupRevision[] }>("/api/backups");
  return result.revisions;
}

export async function loadServerBackupRevision(revision: number): Promise<ServerBackup> {
  const result = await api<{ backup: ServerBackup }>(`/api/backups/${revision}`);
  return result.backup;
}

export async function saveServerBackup(
  payload: unknown,
  digest: string,
  baseRevision: number,
  csrfToken: string,
): Promise<{ revision: number; savedAt: string; unchanged: boolean }> {
  return api("/api/backups", {
    method: "POST",
    headers: { "X-CSRF-Token": csrfToken },
    body: JSON.stringify({ payload, digest, baseRevision }),
  });
}

export async function loadRuntimeCloudConfig(): Promise<RuntimeCloudConfig> {
  try {
    const response = await fetch("/cloud-config.json", { cache: "no-store" });
    if (!response.ok) return {};
    return await response.json() as RuntimeCloudConfig;
  } catch {
    return {};
  }
}

declare global {
  interface Window {
    google?: {
      accounts: {
        oauth2: {
          initTokenClient(options: {
            client_id: string;
            scope: string;
            callback: (response: { access_token?: string; expires_in?: number; error?: string }) => void;
          }): { requestAccessToken(options?: { prompt?: string }): void };
        };
      };
    };
  }
}

async function loadGoogleIdentityServices(): Promise<void> {
  if (window.google?.accounts.oauth2) return;
  await new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>('script[data-codecafe-google="true"]');
    if (existing) {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(new Error("No fue posible cargar Google Identity Services.")), { once: true });
      return;
    }
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.dataset.codecafeGoogle = "true";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("No fue posible cargar Google Identity Services."));
    document.head.appendChild(script);
  });
}

export async function authorizeGoogleDrive(clientId: string): Promise<string> {
  await loadGoogleIdentityServices();
  return new Promise<string>((resolve, reject) => {
    const client = window.google!.accounts.oauth2.initTokenClient({
      client_id: clientId,
      scope: "https://www.googleapis.com/auth/drive.file",
      callback: (response) => {
        if (response.error || !response.access_token) reject(new Error(response.error || "Google no devolvió un token de acceso."));
        else {
          const expiresAt = Date.now() + Math.max(60, response.expires_in ?? 3600) * 1000;
          localStorage.setItem(GOOGLE_TOKEN_KEY, JSON.stringify({ token: response.access_token, expiresAt }));
          localStorage.setItem(GOOGLE_GRANT_KEY, "true");
          resolve(response.access_token);
        }
      },
    });
    // La primera conexión solicita consentimiento. Las siguientes reutilizan
    // la autorización de Google sin exigir credenciales cada vez.
    client.requestAccessToken({ prompt: localStorage.getItem(GOOGLE_GRANT_KEY) ? "" : "consent" });
  });
}

export function loadStoredGoogleToken(): string {
  try {
    const stored = JSON.parse(localStorage.getItem(GOOGLE_TOKEN_KEY) || "null") as { token?: string; expiresAt?: number } | null;
    if (stored?.token && stored.expiresAt && stored.expiresAt > Date.now() + 30_000) return stored.token;
  } catch {
    // Una entrada local dañada se descarta sin afectar los CVs guardados.
  }
  localStorage.removeItem(GOOGLE_TOKEN_KEY);
  return "";
}

async function googleRequest<T>(token: string, url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    ...init,
    headers: { Authorization: `Bearer ${token}`, ...(init?.headers ?? {}) },
  });
  if (!response.ok) {
    if (response.status === 401) localStorage.removeItem(GOOGLE_TOKEN_KEY);
    const detail = await response.text();
    throw new Error(`Google Drive respondió HTTP ${response.status}: ${detail.slice(0, 180)}`);
  }
  return response.json() as Promise<T>;
}

// Escapa valores usados dentro del lenguaje de consultas de Google Drive.
function driveQueryValue(value: string): string {
  return value.replaceAll("\\", "\\\\").replaceAll("'", "\\'");
}

async function findDriveItem(
  token: string,
  name: string,
  parentId?: string,
  mimeType?: string,
): Promise<string | null> {
  const clauses = [
    `name='${driveQueryValue(name)}'`,
    "trashed=false",
    ...(parentId ? [`'${driveQueryValue(parentId)}' in parents`] : []),
    ...(mimeType ? [`mimeType='${driveQueryValue(mimeType)}'`] : []),
  ];
  const query = encodeURIComponent(clauses.join(" and "));
  const result = await googleRequest<{ files?: Array<{ id: string }> }>(
    token,
    `https://www.googleapis.com/drive/v3/files?q=${query}&spaces=drive&fields=files(id,modifiedTime)&orderBy=modifiedTime%20desc&pageSize=1`,
  );
  return result.files?.[0]?.id ?? null;
}

async function createDriveFolder(token: string, name: string, parentId?: string): Promise<string> {
  const existing = await findDriveItem(token, name, parentId, "application/vnd.google-apps.folder");
  if (existing) return existing;
  const created = await googleRequest<{ id: string }>(token, "https://www.googleapis.com/drive/v3/files?fields=id", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      mimeType: "application/vnd.google-apps.folder",
      ...(parentId ? { parents: [parentId] } : {}),
    }),
  });
  return created.id;
}

async function uploadMultipart(
  token: string,
  name: string,
  mimeType: string,
  contentType: string,
  content: string | Blob,
  parentId: string,
  existingId?: string | null,
): Promise<string> {
  const metadata = existingId ? { name } : { name, mimeType, parents: [parentId] };
  const boundary = `codecafe_${crypto.randomUUID().replaceAll("-", "")}`;
  const media = typeof content === "string" ? new Blob([content], { type: contentType }) : content;
  const body = new Blob([
    `--${boundary}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n`,
    JSON.stringify(metadata),
    `\r\n--${boundary}\r\nContent-Type: ${contentType}\r\n\r\n`,
    media,
    `\r\n--${boundary}--`,
  ], { type: `multipart/related; boundary=${boundary}` });
  const url = existingId
    ? `https://www.googleapis.com/upload/drive/v3/files/${existingId}?uploadType=multipart&fields=id`
    : "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id";
  const result = await googleRequest<{ id: string }>(token, url, {
    method: existingId ? "PATCH" : "POST",
    headers: { "Content-Type": `multipart/related; boundary=${boundary}` },
    body,
  });
  return result.id;
}

export async function loadGoogleBackup<T>(token: string): Promise<T | null> {
  const rootId = await findDriveItem(token, GOOGLE_ROOT_FOLDER, undefined, "application/vnd.google-apps.folder");
  if (!rootId) return null;
  const fileId = await findDriveItem(token, GOOGLE_WORKSPACE_NAME, rootId, "application/json");
  if (!fileId) return null;
  return googleRequest<T>(token, `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`);
}

export async function saveGoogleBackup(
  token: string,
  payload: unknown,
  printable: GooglePrintableCV,
): Promise<void> {
  // Drive recibe datos normales: ningún archivo creado aquí está cifrado.
  const rootId = await createDriveFolder(token, GOOGLE_ROOT_FOLDER);
  const collectionId = await createDriveFolder(token, printable.collectionName, rootId);

  const workspaceId = await findDriveItem(token, GOOGLE_WORKSPACE_NAME, rootId, "application/json");
  await uploadMultipart(
    token,
    GOOGLE_WORKSPACE_NAME,
    "application/json",
    "application/json",
    JSON.stringify(payload, null, 2),
    rootId,
    workspaceId,
  );

  // Google convierte el HTML semántico en un documento que puede abrirse e imprimirse desde Drive.
  const documentName = printable.fileBaseName;
  const existingDocument = await findDriveItem(
    token,
    documentName,
    collectionId,
    "application/vnd.google-apps.document",
  );
  const documentId = await uploadMultipart(
    token,
    documentName,
    "application/vnd.google-apps.document",
    "text/html",
    printable.html,
    collectionId,
    existingDocument,
  );

  // Exporta además un PDF ordinario para impresión directa desde el teléfono.
  const pdfResponse = await fetch(
    `https://www.googleapis.com/drive/v3/files/${documentId}/export?mimeType=${encodeURIComponent("application/pdf")}`,
    { headers: { Authorization: `Bearer ${token}` } },
  );
  if (!pdfResponse.ok) throw new Error(`Google Drive no pudo generar el PDF (HTTP ${pdfResponse.status}).`);
  const pdfName = `${printable.fileBaseName}.pdf`;
  const existingPdf = await findDriveItem(token, pdfName, collectionId, "application/pdf");
  await uploadMultipart(
    token,
    pdfName,
    "application/pdf",
    "application/pdf",
    await pdfResponse.blob(),
    collectionId,
    existingPdf,
  );
}
