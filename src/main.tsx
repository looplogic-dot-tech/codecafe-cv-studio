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

function RootApp() {
  const [revision, setRevision] = useState(0);
  useEffect(() => {
    const reload = () => {
      prepareLinkedWorkspaceFromStorage();
      setRevision((value) => value + 1);
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
