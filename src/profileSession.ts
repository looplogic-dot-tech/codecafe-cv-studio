const CREDENTIALS_KEY = "codecafe-v2-profile-credentials";
const ACTIVE_PROFILE_SESSION_KEY = "codecafe-v2-active-profile-session";
const GOOGLE_TOKEN_PREFIX = "codecafe-v2-google-token:";
const GOOGLE_GRANT_PREFIX = "codecafe-v2-google-grant:";
const PBKDF2_ITERATIONS = 210_000;

type StoredCredential = {
  profileId: string;
  salt: string;
  verifier: string;
  iterations: number;
  createdAt: string;
  updatedAt: string;
  role: "owner" | "user";
};

type CredentialMap = Record<string, StoredCredential>;

type ProfileSession = {
  profileId: string;
  unlockedAt: string;
};

function bytesToBase64(bytes: Uint8Array): string {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary);
}

function base64ToBytes(value: string): Uint8Array {
  const binary = atob(value);
  return Uint8Array.from(binary, (character) => character.charCodeAt(0));
}

function loadCredentialMap(): CredentialMap {
  try {
    const parsed = JSON.parse(localStorage.getItem(CREDENTIALS_KEY) || "{}");
    return parsed && typeof parsed === "object" ? parsed as CredentialMap : {};
  } catch {
    return {};
  }
}

function saveCredentialMap(value: CredentialMap): void {
  localStorage.setItem(CREDENTIALS_KEY, JSON.stringify(value));
}

async function deriveVerifier(secret: string, salt: Uint8Array, iterations: number): Promise<string> {
  const encoder = new TextEncoder();
  const material = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    "PBKDF2",
    false,
    ["deriveBits"],
  );
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", hash: "SHA-256", salt: salt as BufferSource, iterations },
    material,
    256,
  );
  return bytesToBase64(new Uint8Array(bits));
}

export function hasProfileCredential(profileId: string): boolean {
  return Boolean(loadCredentialMap()[profileId]);
}

export function profileRole(profileId: string): "owner" | "user" {
  return loadCredentialMap()[profileId]?.role === "owner" ? "owner" : "user";
}

export async function createProfileCredential(
  profileId: string,
  secret: string,
  role: "owner" | "user" = "user",
): Promise<void> {
  if (!profileId.trim()) throw new Error("Profile ID is required.");
  if (secret.length < 4) throw new Error("Use at least 4 characters for the profile password/PIN.");
  const credentials = loadCredentialMap();
  if (credentials[profileId]) throw new Error("This profile already has a credential.");
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const now = new Date().toISOString();
  credentials[profileId] = {
    profileId,
    salt: bytesToBase64(salt),
    verifier: await deriveVerifier(secret, salt, PBKDF2_ITERATIONS),
    iterations: PBKDF2_ITERATIONS,
    createdAt: now,
    updatedAt: now,
    role,
  };
  saveCredentialMap(credentials);
}

export async function changeProfileCredential(profileId: string, currentSecret: string, nextSecret: string): Promise<void> {
  if (!(await verifyProfileCredential(profileId, currentSecret))) throw new Error("Current password/PIN is incorrect.");
  if (nextSecret.length < 4) throw new Error("Use at least 4 characters for the profile password/PIN.");
  const credentials = loadCredentialMap();
  const existing = credentials[profileId];
  if (!existing) throw new Error("Profile credential not found.");
  const salt = crypto.getRandomValues(new Uint8Array(16));
  credentials[profileId] = {
    ...existing,
    salt: bytesToBase64(salt),
    verifier: await deriveVerifier(nextSecret, salt, PBKDF2_ITERATIONS),
    iterations: PBKDF2_ITERATIONS,
    updatedAt: new Date().toISOString(),
  };
  saveCredentialMap(credentials);
}

export async function verifyProfileCredential(profileId: string, secret: string): Promise<boolean> {
  const credential = loadCredentialMap()[profileId];
  if (!credential) return false;
  const actual = await deriveVerifier(secret, base64ToBytes(credential.salt), credential.iterations);
  return actual === credential.verifier;
}

export function activeProfileSession(): ProfileSession | null {
  try {
    const parsed = JSON.parse(sessionStorage.getItem(ACTIVE_PROFILE_SESSION_KEY) || "null") as ProfileSession | null;
    return parsed?.profileId ? parsed : null;
  } catch {
    return null;
  }
}

export function unlockProfileSession(profileId: string): void {
  sessionStorage.setItem(ACTIVE_PROFILE_SESSION_KEY, JSON.stringify({
    profileId,
    unlockedAt: new Date().toISOString(),
  } satisfies ProfileSession));
}

export function lockProfileSession(): void {
  sessionStorage.removeItem(ACTIVE_PROFILE_SESSION_KEY);
}

export function isProfileUnlocked(profileId: string): boolean {
  return activeProfileSession()?.profileId === profileId;
}

export function profileGoogleTokenKey(profileId: string): string {
  return `${GOOGLE_TOKEN_PREFIX}${profileId}`;
}

export function profileGoogleGrantKey(profileId: string): string {
  return `${GOOGLE_GRANT_PREFIX}${profileId}`;
}

export function storeProfileGoogleToken(profileId: string, token: string, expiresAt: number): void {
  localStorage.setItem(profileGoogleTokenKey(profileId), JSON.stringify({ token, expiresAt }));
}

export function loadProfileGoogleToken(profileId: string): string {
  try {
    const stored = JSON.parse(localStorage.getItem(profileGoogleTokenKey(profileId)) || "null") as { token?: string; expiresAt?: number } | null;
    if (stored?.token && stored.expiresAt && stored.expiresAt > Date.now() + 30_000) return stored.token;
  } catch {
    // Invalid token entries are discarded for this profile only.
  }
  localStorage.removeItem(profileGoogleTokenKey(profileId));
  return "";
}

export function clearProfileGoogleConnection(profileId: string): void {
  localStorage.removeItem(profileGoogleTokenKey(profileId));
  localStorage.removeItem(profileGoogleGrantKey(profileId));
}

export function markProfileGoogleGrantKnown(profileId: string): void {
  localStorage.setItem(profileGoogleGrantKey(profileId), "true");
}

export function isProfileGoogleGrantKnown(profileId: string): boolean {
  return localStorage.getItem(profileGoogleGrantKey(profileId)) === "true";
}
