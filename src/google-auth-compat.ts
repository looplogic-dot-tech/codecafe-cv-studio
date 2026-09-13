const GOOGLE_TOKEN_KEY = "codecafe-google-drive-token";
const PATCH_FLAG = "__codecafeGoogleOauthPatched";
const LAST_ERROR_KEY = "codecafe-google-oauth-last-error";

type OAuthError = { type?: string; message?: string };

function reportOauthError(error: OAuthError): void {
  const type = error?.type || "unknown_error";
  const message = error?.message || "Google did not return an access token.";
  const detail = `${type}: ${message}`;
  localStorage.removeItem(GOOGLE_TOKEN_KEY);
  sessionStorage.setItem(LAST_ERROR_KEY, detail);
  console.error("CodeCafe Google OAuth error:", error);
  window.dispatchEvent(new CustomEvent("codecafe-google-oauth-error", { detail: { type, message } }));
  window.alert(`Google Drive authorization failed\n\n${detail}`);
}

function patchGoogleOauth(): boolean {
  const oauth2 = (window as any).google?.accounts?.oauth2;
  if (!oauth2?.initTokenClient) return false;
  if ((oauth2 as any)[PATCH_FLAG]) return true;

  const originalInitTokenClient = oauth2.initTokenClient.bind(oauth2);
  oauth2.initTokenClient = (options: any) => {
    const originalErrorCallback = options?.error_callback;
    const client = originalInitTokenClient({
      ...options,
      error_callback: (error: OAuthError) => {
        try { originalErrorCallback?.(error); } finally { reportOauthError(error); }
      },
    });

    const originalRequestAccessToken = client.requestAccessToken.bind(client);
    client.requestAccessToken = (requestOptions?: { prompt?: string }) => {
      // An empty prompt is useful only for silent renewal. In the explicit
      // Connect Google Drive action it can strand GIS on its generic error page.
      // Calling without prompt reuses the existing grant and lets Google select
      // the already-authorized account without asking for Drive consent again.
      if (requestOptions?.prompt === "") originalRequestAccessToken();
      else originalRequestAccessToken(requestOptions);
    };
    return client;
  };

  (oauth2 as any)[PATCH_FLAG] = true;
  return true;
}

export function installGoogleAuthCompat(): void {
  if (patchGoogleOauth()) return;

  const observer = new MutationObserver(() => {
    if (patchGoogleOauth()) observer.disconnect();
  });
  observer.observe(document.documentElement, { childList: true, subtree: true });

  let attempts = 0;
  const timer = window.setInterval(() => {
    attempts += 1;
    if (patchGoogleOauth() || attempts >= 80) {
      window.clearInterval(timer);
      observer.disconnect();
    }
  }, 250);
}
