import { authorizeGoogleDrive } from "./cloud";

const NOTICE_ID = "codecafe-drive-access-note";
const GUIDE_ID = "codecafe-drive-access-guide";
const CLIENT_ID_KEY = "codecafe-google-client-id";
const PRODUCTION_ORIGIN = "https://cv.codecafe.io";
const DRIVE_FILE_SCOPE = "https://www.googleapis.com/auth/drive.file";

function language(): "es" | "en" {
  return document.querySelector("main")?.getAttribute("lang") === "en" ? "en" : "es";
}

function storedClientId(): string {
  return localStorage.getItem(CLIENT_ID_KEY)?.trim() || "";
}

function validClientId(value: string): boolean {
  return /^[A-Za-z0-9._-]+\.apps\.googleusercontent\.com$/.test(value.trim());
}

function copy() {
  return language() === "es"
    ? {
        title: "Acceso de Google Drive",
        body: "Cada cliente configura y autoriza Google Drive desde su propio proyecto de Google Cloud. CodeCafe no necesita la contraseña ni el Client Secret de Google.",
        guide: "Configurar Google Drive paso a paso",
        guideTitle: "Configurar tu propio acceso a Google Drive",
        intro: "Esta configuración se realiza una sola vez por navegador. Usa tu propia cuenta y tu propio proyecto de Google Cloud. CV Studio sólo necesita el OAuth Client ID público.",
        steps: [
          "Abre Google Cloud Console con la cuenta de Google que usarás para Drive y crea un proyecto nuevo o selecciona uno propio.",
          "Ve a APIs y servicios > Biblioteca, busca Google Drive API y pulsa Habilitar.",
          "Abre Google Auth Platform > Branding y registra la aplicación. Usa un nombre reconocible y tu correo de soporte.",
          `En Google Auth Platform > Data Access / Acceso a datos, declara el permiso ${DRIVE_FILE_SCOPE}. Es el permiso limitado que usa CV Studio para sus propios archivos.`,
          "En Google Auth Platform > Audience / Público, usa External / Externo. Si el proyecto está en Testing / Pruebas, añade como Test user / Usuario de prueba la misma cuenta de Google que conectarás a CV Studio.",
          "Ve a Google Auth Platform > Clients / Clientes y pulsa Create client / Crear cliente. Selecciona Web application / Aplicación web.",
          `En Authorized JavaScript origins / Orígenes JavaScript autorizados añade exactamente ${PRODUCTION_ORIGIN}. No agregues una ruta. Para este flujo por ventana emergente no necesitas Authorized redirect URI.`,
          "Crea el cliente y copia el Client ID que termina en .apps.googleusercontent.com. No copies ni pegues el Client Secret.",
          "Pega ese Client ID en el campo inferior y pulsa Guardar y conectar. Después elige la misma cuenta de Google y autoriza el acceso.",
        ],
        testing: "Si tu proyecto permanece en modo Testing, la cuenta que usarás debe estar incluida por ti mismo en Test users. No necesitas pedir a CodeCafe que autorice tu dirección de correo.",
        clientIdLabel: "Tu OAuth Client ID",
        clientIdHint: "Termina en .apps.googleusercontent.com · se guarda sólo en este navegador.",
        connect: "Guardar y conectar Google Drive",
        invalid: "El Client ID no parece válido. Copia el OAuth Client ID de tipo Web application; no uses el Client Secret.",
        connecting: "Conectando con Google…",
        failed: "Google no permitió la conexión",
        console: "Abrir Google Cloud Console",
        oauthHelp: "Guía oficial de OAuth para aplicaciones web",
        scopeHelp: "Permiso oficial drive.file",
        close: "Cerrar",
      }
    : {
        title: "Google Drive access",
        body: "Each client configures and authorizes Google Drive from their own Google Cloud project. CodeCafe never needs the Google password or Client Secret.",
        guide: "Set up Google Drive step by step",
        guideTitle: "Configure your own Google Drive access",
        intro: "This is a one-time setup per browser. Use your own Google account and your own Google Cloud project. CV Studio only needs the public OAuth Client ID.",
        steps: [
          "Open Google Cloud Console with the Google account you will use for Drive and create a new project or select one you own.",
          "Go to APIs & Services > Library, find Google Drive API, and click Enable.",
          "Open Google Auth Platform > Branding and register the app. Use a recognizable app name and your support email.",
          `In Google Auth Platform > Data Access, declare the ${DRIVE_FILE_SCOPE} scope. This is the limited permission CV Studio uses for its own files.`,
          "In Google Auth Platform > Audience, choose External. If the project is in Testing, add the same Google account you will connect to CV Studio under Test users.",
          "Go to Google Auth Platform > Clients and click Create client. Choose Web application.",
          `Under Authorized JavaScript origins add exactly ${PRODUCTION_ORIGIN}. Do not add a path. This popup flow does not require an Authorized redirect URI.`,
          "Create the client and copy the Client ID ending in .apps.googleusercontent.com. Do not copy or paste the Client Secret.",
          "Paste that Client ID below and click Save and connect. Then choose the same Google account and authorize access.",
        ],
        testing: "If your project remains in Testing, you must add the account you will use under Test users yourself. You do not need CodeCafe to approve your email address.",
        clientIdLabel: "Your OAuth Client ID",
        clientIdHint: "Ends in .apps.googleusercontent.com · stored only in this browser.",
        connect: "Save and connect Google Drive",
        invalid: "The Client ID does not look valid. Copy the Web application OAuth Client ID; do not use the Client Secret.",
        connecting: "Connecting to Google…",
        failed: "Google did not allow the connection",
        console: "Open Google Cloud Console",
        oauthHelp: "Official OAuth web-app guide",
        scopeHelp: "Official drive.file scope",
        close: "Close",
      };
}

function closeGuide(): void {
  document.getElementById(GUIDE_ID)?.remove();
}

async function authorizeWithClientId(clientId: string, status?: HTMLElement): Promise<void> {
  const text = copy();
  if (!validClientId(clientId)) {
    if (status) status.textContent = text.invalid;
    else window.alert(text.invalid);
    return;
  }
  localStorage.setItem(CLIENT_ID_KEY, clientId.trim());
  if (status) status.textContent = text.connecting;
  try {
    await authorizeGoogleDrive(clientId.trim());
    window.location.reload();
  } catch (error) {
    const message = (error as Error).message;
    if (status) status.textContent = `${text.failed}: ${message}`;
    else window.alert(`${text.failed}: ${message}`);
  }
}

function openGuide(): void {
  closeGuide();
  const text = copy();
  const overlay = document.createElement("div");
  overlay.id = GUIDE_ID;
  overlay.className = "driveGuideOverlay";

  const dialog = document.createElement("section");
  dialog.className = "driveGuideDialog";
  dialog.setAttribute("role", "dialog");
  dialog.setAttribute("aria-modal", "true");

  const head = document.createElement("div");
  head.className = "driveGuideHead";
  const heading = document.createElement("div");
  const eyebrow = document.createElement("span");
  eyebrow.className = "eyebrow";
  eyebrow.textContent = "GOOGLE DRIVE";
  const h2 = document.createElement("h2");
  h2.textContent = text.guideTitle;
  heading.append(eyebrow, h2);
  const x = document.createElement("button");
  x.textContent = "×";
  x.setAttribute("aria-label", text.close);
  x.addEventListener("click", closeGuide);
  head.append(heading, x);

  const intro = document.createElement("p");
  intro.className = "driveGuideIntro";
  intro.textContent = text.intro;

  const steps = document.createElement("ol");
  steps.className = "driveGuideSteps";
  for (const step of text.steps) {
    const item = document.createElement("li");
    item.textContent = step;
    steps.append(item);
  }

  const testing = document.createElement("div");
  testing.className = "driveGuideTesting";
  testing.textContent = text.testing;

  const clientBox = document.createElement("div");
  clientBox.className = "driveClientIdBox";
  const label = document.createElement("label");
  label.textContent = text.clientIdLabel;
  const input = document.createElement("input");
  input.type = "text";
  input.autocomplete = "off";
  input.spellcheck = false;
  input.placeholder = "000000000000-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.apps.googleusercontent.com";
  input.value = storedClientId();
  const hint = document.createElement("small");
  hint.textContent = text.clientIdHint;
  const connect = document.createElement("button");
  connect.className = "primary";
  connect.textContent = text.connect;
  const status = document.createElement("p");
  status.className = "driveClientIdStatus";
  connect.addEventListener("click", () => void authorizeWithClientId(input.value, status));
  label.append(input, hint);
  clientBox.append(label, connect, status);

  const links = document.createElement("div");
  links.className = "driveGuideLinks";
  const consoleLink = document.createElement("a");
  consoleLink.className = "primary";
  consoleLink.href = "https://console.cloud.google.com/";
  consoleLink.target = "_blank";
  consoleLink.rel = "noreferrer";
  consoleLink.textContent = text.console;
  const oauthHelp = document.createElement("a");
  oauthHelp.href = "https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid";
  oauthHelp.target = "_blank";
  oauthHelp.rel = "noreferrer";
  oauthHelp.textContent = text.oauthHelp;
  const scopeHelp = document.createElement("a");
  scopeHelp.href = "https://developers.google.com/workspace/drive/api/guides/api-specific-auth";
  scopeHelp.target = "_blank";
  scopeHelp.rel = "noreferrer";
  scopeHelp.textContent = text.scopeHelp;
  links.append(consoleLink, oauthHelp, scopeHelp);

  const close = document.createElement("button");
  close.className = "driveGuideClose";
  close.textContent = text.close;
  close.addEventListener("click", closeGuide);

  dialog.append(head, intro, steps, testing, clientBox, links, close);
  overlay.append(dialog);
  overlay.addEventListener("mousedown", (event) => { if (event.target === overlay) closeGuide(); });
  document.body.append(overlay);
}

function attachCustomClientConnector(driveProvider: HTMLElement): void {
  const customClientId = storedClientId();
  if (!validClientId(customClientId)) return;
  const connectButton = [...driveProvider.querySelectorAll<HTMLButtonElement>("button")]
    .find((button) => /Conectar Google Drive|Connect Google Drive/i.test(button.textContent || ""));
  if (!connectButton || connectButton.dataset.codecafeCustomClient === "true") return;
  connectButton.dataset.codecafeCustomClient = "true";
  connectButton.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    void authorizeWithClientId(customClientId);
  }, true);
}

function ensureNotice(): void {
  const providers = [...document.querySelectorAll<HTMLElement>(".cloudProvider")];
  const driveProvider = providers.find((provider) => provider.textContent?.includes("Google Drive"));
  if (!driveProvider) return;

  attachCustomClientConnector(driveProvider);

  const lang = language();
  let notice = document.getElementById(NOTICE_ID) as HTMLElement | null;
  if (notice?.dataset.lang === lang) return;

  if (!notice) {
    notice = document.createElement("div");
    notice.id = NOTICE_ID;
    notice.className = "driveAccessNotice";
    driveProvider.insertAdjacentElement("afterend", notice);
  }

  const text = copy();
  notice.dataset.lang = lang;
  notice.replaceChildren();
  const strong = document.createElement("strong");
  strong.textContent = text.title;
  const paragraph = document.createElement("p");
  paragraph.textContent = text.body;
  const guide = document.createElement("button");
  guide.className = "driveAccessGuideButton";
  guide.textContent = text.guide;
  guide.addEventListener("click", openGuide);
  notice.append(strong, paragraph, guide);
}

export function installSyncNotice(): void {
  ensureNotice();
  new MutationObserver(ensureNotice).observe(document.body, { childList: true, subtree: true });
  const main = document.querySelector("main");
  if (main) new MutationObserver(ensureNotice).observe(main, { attributes: true, attributeFilter: ["lang"] });
}
