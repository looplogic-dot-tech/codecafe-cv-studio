const GOOGLE_TOKEN_KEY = "codecafe-google-drive-token";

function findLoadDriveButton(): HTMLButtonElement | null {
  return [...document.querySelectorAll<HTMLButtonElement>("button")]
    .find((button) => /^(Cargar desde Drive|Load from Drive)$/i.test((button.textContent || "").trim())) || null;
}

function tokenIsPresent(): boolean {
  try {
    const stored = JSON.parse(localStorage.getItem(GOOGLE_TOKEN_KEY) || "null") as { token?: string; expiresAt?: number } | null;
    return Boolean(stored?.token && stored?.expiresAt && stored.expiresAt > Date.now() + 30_000);
  } catch {
    return false;
  }
}

let lastTokenSnapshot = localStorage.getItem(GOOGLE_TOKEN_KEY) || "";
let pendingAutoLoad = false;

function checkGoogleConnection(): void {
  const snapshot = localStorage.getItem(GOOGLE_TOKEN_KEY) || "";
  const changed = snapshot !== lastTokenSnapshot;
  lastTokenSnapshot = snapshot;

  if (changed && tokenIsPresent()) pendingAutoLoad = true;
  if (!pendingAutoLoad) return;

  const button = findLoadDriveButton();
  if (!button || button.disabled) return;

  pendingAutoLoad = false;
  window.setTimeout(() => button.click(), 120);
}

export function installGoogleDriveAutoLoadV153(): void {
  checkGoogleConnection();

  const observer = new MutationObserver(() => checkGoogleConnection());
  observer.observe(document.documentElement, { childList: true, subtree: true, attributes: true });

  window.addEventListener("storage", (event) => {
    if (event.key === GOOGLE_TOKEN_KEY) checkGoogleConnection();
  });

  window.setInterval(checkGoogleConnection, 400);
}
