import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles.css";
import "./print-preview.css";
import "./sync-notice.css";
import "./professional-library.css";
import "./library-composer.css";
import { prepareLinkedWorkspaceFromStorage } from "./libraryLinking";
import { installPrintPreview } from "./printPreview";
import { installPrintSettingsSync } from "./printSettingsSync";
import { installSyncNotice } from "./syncNotice";

function reopenMyCvsAfterRender(): void {
  window.requestAnimationFrame(() => window.requestAnimationFrame(() => {
    const button = [...document.querySelectorAll<HTMLButtonElement>(".topActionButton")]
      .find((candidate) => /My CVs|Mis CVs/i.test(candidate.textContent || ""));
    button?.click();
  }));
}

function RootApp() {
  const [revision, setRevision] = useState(0);
  useEffect(() => {
    const reload = (event: Event) => {
      const detail = (event as CustomEvent<{ reason?: string }>).detail;
      prepareLinkedWorkspaceFromStorage();
      setRevision((value) => value + 1);
      if (detail?.reason === "cv-removed") reopenMyCvsAfterRender();
    };
    window.addEventListener("codecafe-workspace-reload", reload);
    return () => window.removeEventListener("codecafe-workspace-reload", reload);
  }, []);
  return <App key={revision} />;
}

prepareLinkedWorkspaceFromStorage();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RootApp />
  </StrictMode>,
);

installPrintSettingsSync();
installPrintPreview();
installSyncNotice();
