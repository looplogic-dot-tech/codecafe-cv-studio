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
  payload: BackupEnvelope;
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
const BACKUP_NAME = "CodeCafe-CV-Studio.backup.json";

function bytesToBase64(bytes: Uint8Array): string {
  let binary = "";
  bytes.forEach((byte) => { binary += String.fromCharCode(byte); });
  return btoa(binary);
}

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

export async function encryptBackup(data: unknown, passphrase: string, saltBase64?: string): Promise<BackupEnvelope> {
  const iterations = 250_000;
  const salt = saltBase64 ? base64ToBytes(saltBase64) : crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const key = await deriveKey(passphrase, salt, iterations);
  const ciphertext = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv: iv as BufferSource },
    key,
    encoder.encode(JSON.stringify(data)),
  );
  return {
    version: 1,
    algorithm: "AES-GCM",
    kdf: "PBKDF2-SHA256",
    iterations,
    salt: bytesToBase64(salt),
    iv: bytesToBase64(iv),
    ciphertext: bytesToBase64(new Uint8Array(ciphertext)),
  };
}

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

export async function backupDigest(envelope: BackupEnvelope): Promise<string> {
  const bytes = await crypto.subtle.digest("SHA-256", encoder.encode(JSON.stringify(envelope)));
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
  payload: BackupEnvelope,
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
            callback: (response: { access_token?: string; error?: string }) => void;
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
        else resolve(response.access_token);
      },
    });
    client.requestAccessToken({ prompt: "consent" });
  });
}

async function googleRequest<T>(token: string, url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    ...init,
    headers: { Authorization: `Bearer ${token}`, ...(init?.headers ?? {}) },
  });
  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Google Drive respondió HTTP ${response.status}: ${detail.slice(0, 180)}`);
  }
  return response.json() as Promise<T>;
}

async function findGoogleBackup(token: string): Promise<string | null> {
  const query = encodeURIComponent(`name='${BACKUP_NAME}' and trashed=false`);
  const result = await googleRequest<{ files?: Array<{ id: string }> }>(
    token,
    `https://www.googleapis.com/drive/v3/files?q=${query}&spaces=drive&fields=files(id,modifiedTime)&orderBy=modifiedTime%20desc&pageSize=1`,
  );
  return result.files?.[0]?.id ?? null;
}

export async function loadGoogleBackup(token: string): Promise<BackupEnvelope | null> {
  const fileId = await findGoogleBackup(token);
  if (!fileId) return null;
  return googleRequest<BackupEnvelope>(token, `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`);
}

export async function saveGoogleBackup(token: string, payload: BackupEnvelope): Promise<void> {
  const fileId = await findGoogleBackup(token);
  const boundary = `codecafe_${crypto.randomUUID().replaceAll("-", "")}`;
  const metadata = JSON.stringify({ name: BACKUP_NAME, description: "Copia cifrada de CodeCafe CV Studio" });
  const body = [
    `--${boundary}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n${metadata}\r\n`,
    `--${boundary}\r\nContent-Type: application/json\r\n\r\n${JSON.stringify(payload)}\r\n`,
    `--${boundary}--`,
  ].join("");
  const url = fileId
    ? `https://www.googleapis.com/upload/drive/v3/files/${fileId}?uploadType=multipart`
    : "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart";
  await googleRequest(token, url, {
    method: fileId ? "PATCH" : "POST",
    headers: { "Content-Type": `multipart/related; boundary=${boundary}` },
    body,
  });
}
