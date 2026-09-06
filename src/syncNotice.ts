const NOTICE_ID = "codecafe-drive-access-note";
const GUIDE_ID = "codecafe-drive-access-guide";

function language(): "es" | "en" {
  return document.querySelector("main")?.getAttribute("lang") === "en" ? "en" : "es";
}

function copy() {
  return language() === "es"
    ? {
        title: "Acceso de Google Drive",
        body: "Google Drive requiere autorización adicional de cada usuario por las políticas de acceso de Google.",
        guide: "Cómo habilitar Google Drive",
        guideTitle: "Habilitar Google Drive",
        intro: "Cada persona conecta y autoriza su propia cuenta de Google. CodeCafe CV Studio nunca necesita la contraseña de Google.",
        steps: [
          "En Sincronizar, pulsa Conectar Google Drive.",
          "Elige la cuenta de Google que quieres usar y revisa los permisos solicitados.",
          "Autoriza el acceso. CV Studio usará esa cuenta para sus propios archivos de sincronización.",
          "Si Google muestra Access blocked / Error 403 porque la aplicación sigue en modo de pruebas, envía a CodeCafe la dirección de Google que quieres autorizar.",
          "Cuando CodeCafe confirme el acceso, vuelve a CV Studio y pulsa Conectar Google Drive otra vez.",
        ],
        testing: "Mientras la aplicación permanezca en modo Testing de Google, sólo las cuentas aprobadas por el desarrollador pueden completar la autorización.",
        email: "Solicitar autorización a CodeCafe",
        googleHelp: "Ayuda de Google sobre acceso de aplicaciones",
        errorHelp: "Ayuda de Google para Error 403",
        close: "Cerrar",
      }
    : {
        title: "Google Drive access",
        body: "Google Drive requires additional authorization from each user because of Google's access policies.",
        guide: "How to enable Google Drive",
        guideTitle: "Enable Google Drive",
        intro: "Each person connects and authorizes their own Google account. CodeCafe CV Studio never needs the Google password.",
        steps: [
          "In Sync, click Connect Google Drive.",
          "Choose the Google account you want to use and review the requested permissions.",
          "Authorize access. CV Studio will use that account for its own synchronization files.",
          "If Google shows Access blocked / Error 403 because the app is still in Testing mode, send CodeCafe the Google address you want authorized.",
          "After CodeCafe confirms access, return to CV Studio and click Connect Google Drive again.",
        ],
        testing: "While the app remains in Google's Testing mode, only accounts approved by the developer can complete authorization.",
        email: "Request access from CodeCafe",
        googleHelp: "Google help about app access",
        errorHelp: "Google help for Error 403",
        close: "Close",
      };
}

function closeGuide(): void {
  document.getElementById(GUIDE_ID)?.remove();
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

  const links = document.createElement("div");
  links.className = "driveGuideLinks";
  const email = document.createElement("a");
  email.className = "primary";
  email.href = "mailto:contacto@codecafe.io?subject=Google%20Drive%20access%20for%20CodeCafe%20CV%20Studio";
  email.textContent = text.email;
  const googleHelp = document.createElement("a");
  googleHelp.href = "https://support.google.com/accounts/answer/14012355";
  googleHelp.target = "_blank";
  googleHelp.rel = "noreferrer";
  googleHelp.textContent = text.googleHelp;
  const errorHelp = document.createElement("a");
  errorHelp.href = "https://support.google.com/accounts/answer/16668185";
  errorHelp.target = "_blank";
  errorHelp.rel = "noreferrer";
  errorHelp.textContent = text.errorHelp;
  links.append(email, googleHelp, errorHelp);

  const close = document.createElement("button");
  close.className = "driveGuideClose";
  close.textContent = text.close;
  close.addEventListener("click", closeGuide);

  dialog.append(head, intro, steps, testing, links, close);
  overlay.append(dialog);
  overlay.addEventListener("mousedown", (event) => { if (event.target === overlay) closeGuide(); });
  document.body.append(overlay);
}

function ensureNotice(): void {
  const providers = [...document.querySelectorAll<HTMLElement>(".cloudProvider")];
  const driveProvider = providers.find((provider) => provider.textContent?.includes("Google Drive"));
  if (!driveProvider) return;

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
