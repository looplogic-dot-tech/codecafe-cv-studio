const NOTICE_ID = "codecafe-drive-access-note";

function language(): "es" | "en" {
  return document.querySelector("main")?.getAttribute("lang") === "en" ? "en" : "es";
}

function noticeText(): { title: string; body: string } {
  return language() === "es"
    ? {
        title: "Acceso de Google Drive",
        body: "La sincronización con Google Drive requiere autorización adicional del lado de cada usuario. Por las políticas de acceso de Google Drive, cada persona debe autorizar su propia cuenta de Google y, mientras CodeCafe CV Studio permanezca en modo de pruebas de Google, esa cuenta también debe estar aprobada como usuario de prueba.",
      }
    : {
        title: "Google Drive access",
        body: "Google Drive synchronization requires additional authorization on each user's side. Because of Google Drive access controls, each person must authorize their own Google account and, while CodeCafe CV Studio remains in Google's Testing mode, that account must also be approved as a test user.",
      };
}

function ensureNotice(): void {
  const providers = [...document.querySelectorAll<HTMLElement>(".cloudProvider")];
  const driveProvider = providers.find((provider) => provider.textContent?.includes("Google Drive"));
  if (!driveProvider) return;

  let notice = document.getElementById(NOTICE_ID);
  if (!notice) {
    notice = document.createElement("div");
    notice.id = NOTICE_ID;
    notice.className = "driveAccessNotice";
    driveProvider.insertAdjacentElement("afterend", notice);
  }

  const text = noticeText();
  notice.replaceChildren();
  const strong = document.createElement("strong");
  strong.textContent = text.title;
  const paragraph = document.createElement("p");
  paragraph.textContent = text.body;
  notice.append(strong, paragraph);
}

export function installSyncNotice(): void {
  ensureNotice();
  new MutationObserver(ensureNotice).observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ["lang"] });
}
