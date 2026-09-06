import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles.css";
import "./print-preview.css";
import "./sync-notice.css";
import "./professional-library.css";
import { installPrintPreview } from "./printPreview";
import { installPrintSettingsSync } from "./printSettingsSync";
import { installSyncNotice } from "./syncNotice";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

installPrintSettingsSync();
installPrintPreview();
installSyncNotice();
