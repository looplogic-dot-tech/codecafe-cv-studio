const GOOGLE_TOKEN_KEY = "codecafe-google-drive-token";
const GOOGLE_GRANT_KEY = "codecafe-google-drive-grant-known";
const DRIVE_BUTTON_ID = "codecafe-disconnect-google-v155";

function language(): "es" | "en" {
  return document.querySelector("main")?.getAttribute("lang") === "en" ? "en" : "es";
}

function providerByName(name: string): HTMLElement | null {
  return [...document.querySelectorAll<HTMLElement>(".cloudProvider")]
    .find((provider) => provider.textContent?.includes(name)) ?? null;
}

function clearEc2Password(): void {
  const input = document.querySelector<HTMLInputElement>('input[type="password"]');
  if (!input) return;
  const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")?.set;
  setter?.call(input, "");
  input.dispatchEvent(new Event("input", { bubbles: true }));
  input.dispatchEvent(new Event("change", { bubbles: true }));
}

function improveEc2Disconnect(): void {
  const provider = providerByName("Amazon EC2");
  if (!provider) return;
  const actions = provider.querySelector(".cloudActions");
  if (!actions) return;
  const es = language() === "es";
  const button = [...actions.querySelectorAll<HTMLButtonElement>("button")]
    .find((candidate) => /^(Desconectar|Disconnect)$/i.test((candidate.textContent || "").trim()));
  if (!button) return;
  button.textContent = es ? "Desconectar EC2" : "Disconnect EC2";
  button.title = es
    ? "Cierra la sesión de EC2 en este navegador. No elimina ningún CV ni respaldo."
    : "Ends the EC2 session in this browser. It does not delete any CV or backup.";
  if (button.dataset.codecafeDisconnectV155 === "1") return;
  button.dataset.codecafeDisconnectV155 = "1";
  button.addEventListener("click", () => window.setTimeout(clearEc2Password, 0));
}

function storedGoogleToken(): string {
  try {
    const value = JSON.parse(localStorage.getItem(GOOGLE_TOKEN_KEY) || "null") as { token?: string } | null;
    return value?.token || "";
  } catch {
    return "";
  }
}

function clearGoogleLocalState(): void {
  localStorage.removeItem(GOOGLE_TOKEN_KEY);
  localStorage.removeItem(GOOGLE_GRANT_KEY);
}

function disconnectGoogleDrive(button: HTMLButtonElement): void {
  const es = language() === "es";
  const token = storedGoogleToken();
  button.disabled = true;
  button.textContent = es ? "Desconectando…" : "Disconnecting…";

  const finish = () => {
    clearGoogleLocalState();
    // Reload so React forgets the in-memory token too. Local CV/library data remains untouched.
    window.location.reload();
  };

  const revoke = (window as any).google?.accounts?.oauth2?.revoke;
  if (token && typeof revoke === "function") {
    try {
      revoke(token, () => finish());
      window.setTimeout(finish, 1800);
      return;
    } catch {
      // Local disconnect is still completed if Google's revoke helper is unavailable/fails.
    }
  }
  finish();
}

function installGoogleDisconnect(): void {
  const provider = providerByName("Google Drive");
  if (!provider) return;
  const actions = provider.querySelector<HTMLElement>(".cloudActions");
  if (!actions) return;

  const token = storedGoogleToken();
  const existing = document.getElementById(DRIVE_BUTTON_ID) as HTMLButtonElement | null;
  if (!token) {
    existing?.remove();
    return;
  }
  if (existing) return;

  const es = language() === "es";
  const button = document.createElement("button");
  button.id = DRIVE_BUTTON_ID;
  button.type = "button";
  button.textContent = es ? "Desconectar Google Drive" : "Disconnect Google Drive";
  button.title = es
    ? "Cierra Google Drive en este navegador y revoca el token actual. No borra archivos de Drive."
    : "Disconnects Google Drive in this browser and revokes the current token. It does not delete Drive files.";
  button.addEventListener("click", () => disconnectGoogleDrive(button));
  actions.append(button);
}

function install(): void {
  improveEc2Disconnect();
  installGoogleDisconnect();
}

export function installDisconnectControlsV155(): void {
  install();
  const observer = new MutationObserver(() => install());
  observer.observe(document.body, { childList: true, subtree: true });
}
