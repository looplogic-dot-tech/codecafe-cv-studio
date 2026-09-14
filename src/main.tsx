import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles.css";
import "./print-editor-v2.css";
import "./print-editor-v15.css";
import "./popup-radius-v151.css";
import "./sync-notice.css";
import "./professional-library.css";
import "./library-composer.css";
import { prepareLinkedWorkspaceFromStorage } from "./libraryLinking";
import { installPrintEditorV3 } from "./printEditorV3";
import { installSyncNotice } from "./syncNotice";
import { installMarginGuideFixV153 } from "./margin-guide-fix-v153";
import { installGoogleDriveAutoLoadV153 } from "./google-drive-autoload-v153";
import { installEc2DriveMigrationV154 } from "./ec2-drive-migration-v154";
import { installDisconnectControlsV155 } from "./disconnect-controls-v155";
import { removeAlexRiveraDemoData } from "./startupCleanup";

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

removeAlexRiveraDemoData();
prepareLinkedWorkspaceFromStorage();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RootApp />
  </StrictMode>,
);

installPrintEditorV3();
installSyncNotice();
installMarginGuideFixV153();
installGoogleDriveAutoLoadV153();
installEc2DriveMigrationV154();
installDisconnectControlsV155();
