import { useCallback, useEffect, useState } from "react";
import { loadGoogleBackup, loadServerBackup } from "./cloud";
import { isWorkspace, type CVWorkspace } from "./workspace";

type Provider = "ec2" | "drive";

type Props = {
  provider: Provider;
  connected: boolean;
  googleToken?: string;
  lang: "es" | "en";
  refreshKey?: string | number;
};

type WorkspaceBackup = {
  schema?: number;
  workspace?: unknown;
};

const copy = {
  es: {
    storage: "Contenido almacenado",
    professionalLibrary: "Biblioteca Profesional",
    records: "registros",
    cvs: "CVs almacenados",
    archived: "Archivado",
    empty: "Este almacenamiento todavía no contiene un workspace válido.",
    refresh: "Actualizar",
    loading: "Leyendo almacenamiento…",
    ec2Limit: "EC2: máximo 20 CVs",
    driveLimit: "Google Drive: sin límite artificial de CodeCafe",
  },
  en: {
    storage: "Stored content",
    professionalLibrary: "Professional Library",
    records: "records",
    cvs: "Stored CVs",
    archived: "Archived",
    empty: "This storage does not contain a valid workspace yet.",
    refresh: "Refresh",
    loading: "Reading storage…",
    ec2Limit: "EC2: maximum 20 CVs",
    driveLimit: "Google Drive: no artificial CodeCafe limit",
  },
} as const;

function libraryRecordCount(workspace: CVWorkspace): number {
  return (workspace.professionalLibraries ?? []).reduce(
    (total, library) => total + (Array.isArray(library.records) ? library.records.length : 0),
    0,
  );
}

export default function CloudStorageBrowser({ provider, connected, googleToken = "", lang, refreshKey }: Props) {
  const t = copy[lang];
  const [workspace, setWorkspace] = useState<CVWorkspace | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const refresh = useCallback(async () => {
    if (!connected) {
      setWorkspace(null);
      setError("");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const raw: WorkspaceBackup | null = provider === "ec2"
        ? ((await loadServerBackup())?.payload as WorkspaceBackup | undefined) ?? null
        : await loadGoogleBackup<WorkspaceBackup>(googleToken);
      if (!raw || raw.schema !== 2 || !isWorkspace(raw.workspace)) {
        setWorkspace(null);
        return;
      }
      setWorkspace(raw.workspace);
    } catch (failure) {
      setWorkspace(null);
      setError((failure as Error).message);
    } finally {
      setLoading(false);
    }
  }, [connected, googleToken, provider]);

  useEffect(() => {
    void refresh();
  }, [refresh, refreshKey]);

  if (!connected) return null;

  const records = workspace ? libraryRecordCount(workspace) : 0;
  const collections = workspace ? new Map(workspace.collections.map((item) => [item.id, item.name])) : new Map<string, string>();

  return (
    <section style={{ marginTop: 10, padding: 10, border: "1px solid var(--border, #d7d7d7)", borderRadius: 10 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
        <div>
          <strong>{t.storage}</strong>
          <div style={{ fontSize: 12, opacity: 0.72 }}>{provider === "ec2" ? t.ec2Limit : t.driveLimit}</div>
        </div>
        <button type="button" onClick={() => void refresh()} disabled={loading}>{t.refresh}</button>
      </div>

      {loading && <p style={{ margin: "8px 0 0", fontSize: 13 }}>{t.loading}</p>}
      {error && <p style={{ margin: "8px 0 0", fontSize: 13 }}>{error}</p>}
      {!loading && !error && !workspace && <p style={{ margin: "8px 0 0", fontSize: 13 }}>{t.empty}</p>}

      {workspace && <div style={{ display: "grid", gap: 8, marginTop: 10 }}>
        <div style={{ padding: "8px 10px", border: "1px solid var(--border, #d7d7d7)", borderRadius: 8 }}>
          <strong>{t.professionalLibrary}</strong>
          <div style={{ fontSize: 12, opacity: 0.72 }}>{records} {t.records}</div>
        </div>

        <div>
          <strong>{t.cvs} ({workspace.documents.length}{provider === "ec2" ? "/20" : ""})</strong>
          <div style={{ display: "grid", gap: 6, marginTop: 6, maxHeight: 220, overflow: "auto" }}>
            {workspace.documents.map((document) => (
              <div key={document.id} style={{ padding: "7px 9px", border: "1px solid var(--border, #d7d7d7)", borderRadius: 8 }}>
                <div style={{ fontWeight: 600 }}>{document.name}</div>
                <div style={{ fontSize: 12, opacity: 0.72 }}>
                  {collections.get(document.collectionId) || "General"}
                  {document.archived ? ` · ${t.archived}` : ""}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>}
    </section>
  );
}
