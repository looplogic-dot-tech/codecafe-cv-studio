"use client";

import { ChangeEvent, useEffect, useMemo, useState } from "react";
import {
  authorizeGoogleDrive,
  backupDigest,
  BackupEnvelope,
  connectServer,
  decryptBackup,
  disconnectServer,
  loadGoogleBackup,
  loadStoredGoogleToken,
  listServerBackups,
  loadRuntimeCloudConfig,
  loadServerBackup,
  loadServerBackupRevision,
  GooglePrintableCV,
  RuntimeCloudConfig,
  saveGoogleBackup,
  saveServerBackup,
  ServerSession,
  ServerBackupRevision,
} from "./cloud";
import CVLibrary from "./CVLibrary";
import {
  activeDocument,
  createInitialWorkspace,
  CVDocument,
  CVWorkspace,
  loadWorkspaceLocal,
  MAX_ACTIVE_CVS,
  newId,
  isWorkspace,
  replaceCurrentDocument,
  saveWorkspaceLocal,
} from "./workspace";

type Job = { role: string; company: string; dates: string; bullets: string };
type Project = { name: string; stack: string; description: string };
type CustomSection = { title: string; content: string };
export type CV = {
  name: string; title: string; email: string; phone: string; location: string; linkedin: string;
  summary: string; skills: string; coreSkills: string; tools: string; certifications: string;
  education: string; languages: string; jobs: Job[]; projects: Project[]; customSections: CustomSection[]; photo: string;
};
export type Lang = "es" | "en";
type LegacyBackupDocument = {
  schema: 1;
  savedAt: string;
  cv: CV;
  settings: { lang: Lang; template: "ats" | "modern"; photoOn: boolean };
};
type WorkspaceBackupDocument = { schema: 2; savedAt: string; workspace: CVWorkspace };
type BackupDocument = LegacyBackupDocument | WorkspaceBackupDocument;
type CloudStatus = "local" | "connecting" | "connected" | "syncing" | "synced" | "error" | "conflict";

const seed: CV = {
  name: "Alex Rivera",
  title: "Especialista en soporte técnico",
  email: "alex.rivera@example.com",
  phone: "+52 000 000 0000",
  location: "México",
  linkedin: "linkedin.com/in/alex-rivera-demo",
  photo: "",
  summary: "Profesional de soporte técnico con experiencia en sistemas, redes y atención a usuarios. Orientado al diagnóstico metódico, la documentación clara y la mejora de procesos operativos.",
  skills: "Soporte técnico · Linux · Windows · Redes TCP/IP · Documentación · Git",
  coreSkills: "Technical Support · Troubleshooting · Network Diagnostics · Customer Service",
  tools: "Linux · Windows · Bash · Git · Sistemas de tickets",
  certifications: "Certificación técnica de ejemplo\nCurso profesional de ejemplo",
  education: "Ingeniería en Sistemas — Universidad de ejemplo, 2025",
  languages: "Español — Nativo\nInglés — Profesional",
  jobs: [
    { role: "Especialista en soporte técnico", company: "Empresa de tecnología", dates: "2024 — Actualidad", bullets: "Atención y seguimiento de incidentes de usuarios.\nDiagnóstico de conectividad, sistemas operativos y equipos de oficina.\nDocumentación de soluciones en la base de conocimiento." },
    { role: "Técnico de sistemas", company: "Servicios profesionales", dates: "2021 — 2024", bullets: "Instalación y mantenimiento de estaciones de trabajo.\nSoporte de redes locales, respaldos y acceso remoto seguro." },
  ],
  projects: [
    { name: "Proyecto demostrativo", stack: "JavaScript · HTML · CSS", description: "Herramienta de ejemplo para organizar información y simplificar un proceso operativo." },
  ],
  customSections: [],
};

const blankCV: CV = {
  name: "", title: "", email: "", phone: "", location: "", linkedin: "", photo: "",
  summary: "", skills: "", coreSkills: "", tools: "", certifications: "", education: "", languages: "",
  jobs: [{ role: "", company: "", dates: "", bullets: "" }],
  projects: [],
  customSections: [],
};

const copy = {
  es: {
    tagline: "Tu experiencia, bien presentada.", save: "Guardar", saved: "✓ Guardado", pdf: "Descargar PDF",
    eyebrow: "EDITOR DE CONTENIDO", title: "Construye tu CV", complete: "completo",
    tabs: ["Perfil", "Experiencia", "IT y proyectos", "Formación", "Diseño"],
    fullName: "Nombre completo", professionalTitle: "Título profesional", email: "Correo", phone: "Teléfono",
    location: "Ubicación", link: "LinkedIn / Portafolio", summary: "Resumen profesional",
    summaryHint: "Consejo: 3–5 líneas con especialidad, experiencia y valor que aportas.",
    experience: "Experiencia", role: "Puesto", company: "Empresa", period: "Periodo",
    achievements: "Logros y responsabilidades", remove: "Eliminar", addExperience: "＋ Añadir experiencia",
    core: "Core Skills / Competencias centrales", coreHint: "Competencias que te definen profesionalmente. Sepáralas con ·",
    tools: "Herramientas y tecnologías", certifications: "Certificaciones y cursos",
    projects: "Proyectos", project: "Proyecto", projectName: "Nombre del proyecto", stack: "Tecnologías",
    description: "Descripción y resultado", addProject: "＋ Añadir proyecto",
    keywords: "Habilidades y palabras clave", keywordsHint: "Usa términos presentes en la vacante, siempre que correspondan a tu experiencia real.",
    education: "Educación", languages: "Idiomas", template: "Plantilla", ats: "ATS esencial",
    atsDesc: "Máxima compatibilidad con filtros", modern: "Moderno", modernDesc: "Más personalidad visual",
    includePhoto: "Incluir fotografía", photoHint: "Úsala sólo cuando sea adecuada para la vacante.",
    choosePhoto: "Seleccionar fotografía", txt: "Descargar versión de texto ATS", preview: "VISTA PREVIA",
    profileHeading: "Perfil profesional", experienceHeading: "Experiencia profesional", skillsHeading: "Competencias",
    coreHeading: "Core Skills", toolsHeading: "Herramientas y tecnologías", projectsHeading: "Proyectos seleccionados",
    certificationsHeading: "Certificaciones", educationHeading: "Educación", languagesHeading: "Idiomas",
    atsGood: "Lectura ATS optimizada", atsDetail: "Encabezados estándar · Texto seleccionable · Sin tablas complejas",
    docLanguage: "Idioma del CV", optional: "Opcional: las secciones vacías no se imprimen",
    cloud: "Copias en la nube", cloudTitle: "Sincronización en la nube", cloudIntro: "Tu copia local siempre se conserva. EC2 mantiene su historial protegido; Google Drive recibe archivos normales y legibles.",
    syncPassword: "Contraseña de EC2", connectEc2: "Conectar EC2", disconnect: "Desconectar",
    loadEc2: "Cargar desde EC2", connectDrive: "Conectar Google Drive", loadDrive: "Cargar desde Drive",
    exportBackup: "Descargar respaldo", importBackup: "Abrir respaldo", close: "Cerrar",
    localOnly: "Guardado local", connecting: "Conectando…", connected: "EC2 conectado", syncing: "Sincronizando…",
    synced: "Destinos conectados actualizados", syncError: "Error de sincronización", conflict: "Existe una versión más reciente",
    driveReady: "Google Drive conectado", driveAvailable: "Listo para conectar", driveUnavailable: "Google Drive aún no está configurado",
    passwordWarning: "Esta contraseña se utiliza solamente para el historial privado de EC2; Google Drive no la necesita.",
    driveFiles: "Guarda el espacio de trabajo, un documento y un PDF sin cifrar en la carpeta correspondiente.",
    cloudLoaded: "La copia seleccionada fue cargada. Pulsa Guardar para conservarla localmente.",
    myCvs: "Mis CVs", writingActive: "Asistencia de escritura activa",
    writingDetail: "El navegador revisa ortografía y gramática según el idioma ES/EN, sin enviar el CV a otro servicio.",
    history: "Historial", loadRevision: "Cargar revisión",
    customSections: "Secciones personalizadas", customSection: "Sección personalizada", sectionTitle: "Título de la sección",
    sectionContent: "Contenido", addCustomSection: "＋ Añadir sección personalizada",
  },
  en: {
    tagline: "Your experience, clearly presented.", save: "Save", saved: "✓ Saved", pdf: "Download PDF",
    eyebrow: "CONTENT EDITOR", title: "Build your résumé", complete: "complete",
    tabs: ["Profile", "Experience", "IT & Projects", "Education", "Design"],
    fullName: "Full name", professionalTitle: "Professional title", email: "Email", phone: "Phone",
    location: "Location", link: "LinkedIn / Portfolio", summary: "Professional summary",
    summaryHint: "Tip: use 3–5 lines to state your specialty, experience and value.",
    experience: "Experience", role: "Position", company: "Company", period: "Dates",
    achievements: "Achievements and responsibilities", remove: "Remove", addExperience: "＋ Add experience",
    core: "Core Skills", coreHint: "The capabilities that define your professional profile. Separate them with ·",
    tools: "Tools & technologies", certifications: "Certifications & coursework",
    projects: "Projects", project: "Project", projectName: "Project name", stack: "Technology stack",
    description: "Description and outcome", addProject: "＋ Add project",
    keywords: "Skills and keywords", keywordsHint: "Use terms from the job posting when they truthfully match your experience.",
    education: "Education", languages: "Languages", template: "Template", ats: "ATS Essential",
    atsDesc: "Maximum screening-system compatibility", modern: "Modern", modernDesc: "More visual personality",
    includePhoto: "Include photograph", photoHint: "Use it only when appropriate for the application.",
    choosePhoto: "Choose photograph", txt: "Download ATS text version", preview: "LIVE PREVIEW",
    profileHeading: "Professional Summary", experienceHeading: "Professional Experience", skillsHeading: "Skills",
    coreHeading: "Core Skills", toolsHeading: "Tools & Technologies", projectsHeading: "Selected Projects",
    certificationsHeading: "Certifications", educationHeading: "Education", languagesHeading: "Languages",
    atsGood: "ATS-friendly structure", atsDetail: "Standard headings · Selectable text · No complex tables",
    docLanguage: "Résumé language", optional: "Optional: empty sections are not printed",
    cloud: "Cloud copies", cloudTitle: "Cloud synchronization", cloudIntro: "Your local copy is always preserved. EC2 keeps its protected history; Google Drive receives normal, readable files.",
    syncPassword: "EC2 password", connectEc2: "Connect EC2", disconnect: "Disconnect",
    loadEc2: "Load from EC2", connectDrive: "Connect Google Drive", loadDrive: "Load from Drive",
    exportBackup: "Download backup", importBackup: "Open backup", close: "Close",
    localOnly: "Saved locally", connecting: "Connecting…", connected: "EC2 connected", syncing: "Syncing…",
    synced: "Connected destinations updated", syncError: "Synchronization error", conflict: "A newer version exists",
    driveReady: "Google Drive connected", driveAvailable: "Ready to connect", driveUnavailable: "Google Drive is not configured yet",
    passwordWarning: "This password is used only for the private EC2 history; Google Drive does not need it.",
    driveFiles: "Saves the workspace, a document and an unencrypted PDF inside the matching folder.",
    cloudLoaded: "The selected copy was loaded. Press Save to keep it locally.",
    myCvs: "My CVs", writingActive: "Writing assistance active",
    writingDetail: "Your browser checks spelling and grammar for the selected ES/EN language without sending the CV to another service.",
    history: "History", loadRevision: "Load revision",
    customSections: "Custom sections", customSection: "Custom section", sectionTitle: "Section title",
    sectionContent: "Content", addCustomSection: "＋ Add custom section",
  },
} as const;

function isEncryptedEnvelope(value: unknown): value is BackupEnvelope {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<BackupEnvelope>;
  return candidate.version === 1 && candidate.algorithm === "AES-GCM" && typeof candidate.ciphertext === "string";
}

function safeFileName(value: string): string {
  return value.replace(/[\\/:*?"<>|]/g, "-").replace(/\s+/g, " ").trim().slice(0, 100) || "CV";
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  }[character] || character));
}

function htmlLines(value: string): string {
  return value.split("\n").filter(Boolean).map((line) => `<p>${escapeHtml(line)}</p>`).join("");
}

// Genera únicamente la copia portátil para Drive; la interfaz React funcional no se reconstruye.
function buildPrintableHtml(cv: CV, lang: Lang, labels: (typeof copy)[Lang]): string {
  const section = (title: string, body: string) => body ? `<section><h2>${escapeHtml(title)}</h2>${body}</section>` : "";
  const jobs = cv.jobs.filter((job) => job.role || job.company || job.bullets).map((job) => `
    <div class="entry"><h3>${escapeHtml(job.role)} — ${escapeHtml(job.company)}</h3><time>${escapeHtml(job.dates)}</time>
    <ul>${job.bullets.split("\n").filter(Boolean).map((line) => `<li>${escapeHtml(line)}</li>`).join("")}</ul></div>`).join("");
  const projects = cv.projects.filter((project) => project.name || project.description).map((project) => `
    <div class="entry"><h3>${escapeHtml(project.name)}</h3><strong>${escapeHtml(project.stack)}</strong><p>${escapeHtml(project.description)}</p></div>`).join("");
  const custom = cv.customSections.filter((item) => item.title || item.content)
    .map((item) => section(item.title || labels.customSection, htmlLines(item.content))).join("");
  return `<!doctype html><html lang="${lang}"><head><meta charset="utf-8"><title>${escapeHtml(cv.name || "CV")}</title>
  <style>@page{size:A4;margin:18mm}body{font-family:Arial,sans-serif;color:#172033;font-size:10.5pt;line-height:1.42;max-width:178mm;margin:auto}header{border-bottom:3px solid #3157a4;padding-bottom:10px}h1{font-size:25pt;margin:0;color:#193467}header h2{border:0;margin:3px 0;font-size:14pt}header p{margin:3px 0}section{margin-top:14px}section h2{font-size:11pt;letter-spacing:.08em;text-transform:uppercase;color:#3157a4;border-bottom:1px solid #cbd5e1;padding-bottom:3px}p{margin:4px 0}.entry{break-inside:avoid;margin:8px 0}.entry h3{font-size:10.5pt;margin:0}.entry time{color:#526071}ul{margin:4px 0 0 18px;padding:0}li{margin:2px 0}</style></head><body>
  <header><h1>${escapeHtml(cv.name)}</h1><h2>${escapeHtml(cv.title)}</h2><p>${[cv.email, cv.phone, cv.location].filter(Boolean).map(escapeHtml).join(" · ")}</p>${cv.linkedin ? `<p>${escapeHtml(cv.linkedin)}</p>` : ""}</header>
  ${section(labels.profileHeading, cv.summary ? `<p>${escapeHtml(cv.summary)}</p>` : "")}
  ${section(labels.experienceHeading, jobs)}
  ${section(labels.coreHeading, cv.coreSkills ? `<p>${escapeHtml(cv.coreSkills)}</p>` : "")}
  ${section(labels.toolsHeading, cv.tools ? `<p>${escapeHtml(cv.tools)}</p>` : "")}
  ${section(labels.projectsHeading, projects)}
  ${section(labels.certificationsHeading, htmlLines(cv.certifications))}${custom}
  ${section(labels.skillsHeading, cv.skills ? `<p>${escapeHtml(cv.skills)}</p>` : "")}
  ${section(labels.educationHeading, htmlLines(cv.education))}
  ${section(labels.languagesHeading, htmlLines(cv.languages))}
  </body></html>`;
}

const inputClass = "inputField";

export default function Home() {
  const [cv, setCV] = useState<CV>(seed);
  const [tab, setTab] = useState("perfil");
  const [lang, setLang] = useState<Lang>("es");
  const [template, setTemplate] = useState<"ats" | "modern">("ats");
  const [photoOn, setPhotoOn] = useState(false);
  const [saved, setSaved] = useState(false);
  const [cloudOpen, setCloudOpen] = useState(false);
  const [cloudStatus, setCloudStatus] = useState<CloudStatus>("local");
  const [cloudMessage, setCloudMessage] = useState("");
  const [syncPassword, setSyncPassword] = useState("");
  const [serverSession, setServerSession] = useState<ServerSession | null>(null);
  const [serverRevision, setServerRevision] = useState(0);
  const [serverHistory, setServerHistory] = useState<ServerBackupRevision[]>([]);
  const [selectedRevision, setSelectedRevision] = useState(0);
  const [googleToken, setGoogleToken] = useState("");
  const [cloudConfig, setCloudConfig] = useState<RuntimeCloudConfig>({});
  const [workspace, setWorkspace] = useState<CVWorkspace>(() => createInitialWorkspace(seed, { lang: "es", template: "ats", photoOn: false }));
  const [libraryOpen, setLibraryOpen] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState("all");
  const [showArchived, setShowArchived] = useState(false);
  const [creationMode, setCreationMode] = useState<"blank" | "copy" | null>(null);
  const [draftName, setDraftName] = useState("");
  const [draftCollection, setDraftCollection] = useState("general");
  const t = copy[lang];

  useEffect(() => {
    const stored = localStorage.getItem("codecafe-cv");
    const settings = localStorage.getItem("codecafe-cv-settings");
    let migratedCV = seed;
    let migratedLang: Lang = "es";
    let migratedTemplate: "ats" | "modern" = "ats";
    let migratedPhotoOn = false;
    if (stored) {
      try {
        const old = JSON.parse(stored);
        migratedCV = { ...seed, ...old, projects: old.projects ?? seed.projects };
      } catch {}
    }
    if (settings) {
      try {
        const s = JSON.parse(settings);
        if (s.lang === "es" || s.lang === "en") migratedLang = s.lang;
        if (s.template === "ats" || s.template === "modern") migratedTemplate = s.template;
        migratedPhotoOn = Boolean(s.photoOn);
      } catch {}
    }
    const loadedWorkspace = loadWorkspaceLocal(createInitialWorkspace(migratedCV, {
      lang: migratedLang,
      template: migratedTemplate,
      photoOn: migratedPhotoOn,
    }));
    const document = activeDocument(loadedWorkspace);
    setWorkspace(loadedWorkspace);
    setCV({ ...seed, ...document.cv, projects: document.cv.projects ?? [], customSections: document.cv.customSections ?? [] });
    setLang(document.settings.lang);
    setTemplate(document.settings.template);
    setPhotoOn(document.settings.photoOn);
    saveWorkspaceLocal(loadedWorkspace);
  }, []);

  useEffect(() => {
    loadRuntimeCloudConfig().then(setCloudConfig);
    setGoogleToken(loadStoredGoogleToken());
  }, []);

  const score = useMemo(() => {
    const required = [cv.name, cv.title, cv.email, cv.phone, cv.location, cv.summary, cv.skills, cv.education];
    return Math.round((required.filter(Boolean).length / required.length) * 100);
  }, [cv]);

  const set = (key: keyof CV, value: string) => setCV((v) => ({ ...v, [key]: value }));
  const setJob = (i: number, key: keyof Job, value: string) => setCV((v) => ({ ...v, jobs: v.jobs.map((j, n) => n === i ? { ...j, [key]: value } : j) }));
  const setProject = (i: number, key: keyof Project, value: string) => setCV((v) => ({ ...v, projects: v.projects.map((p, n) => n === i ? { ...p, [key]: value } : p) }));
  const setCustomSection = (i: number, key: keyof CustomSection, value: string) => setCV((v) => ({ ...v, customSections: v.customSections.map((section, n) => n === i ? { ...section, [key]: value } : section) }));
  const workspaceWithCurrent = () => replaceCurrentDocument(workspace, cv, { lang, template, photoOn });
  const backupDocument = (): BackupDocument => ({ schema: 2, savedAt: new Date().toISOString(), workspace: workspaceWithCurrent() });
  const googlePrintable = (): GooglePrintableCV => {
    const currentWorkspace = workspaceWithCurrent();
    const document = activeDocument(currentWorkspace);
    const collection = currentWorkspace.collections.find((candidate) => candidate.id === document.collectionId);
    return {
      documentId: document.id,
      collectionName: collection?.name || "General Purpose",
      fileBaseName: safeFileName(document.name || cv.name || "CV"),
      html: buildPrintableHtml(cv, lang, t),
    };
  };
  const saveLocal = () => {
    const updatedWorkspace = workspaceWithCurrent();
    setWorkspace(updatedWorkspace);
    saveWorkspaceLocal(updatedWorkspace);
    localStorage.setItem("codecafe-cv", JSON.stringify(cv));
    localStorage.setItem("codecafe-cv-settings", JSON.stringify({ lang, template, photoOn }));
    setSaved(true);
    setTimeout(() => setSaved(false), 1400);
  };
  const applyBackup = (backup: BackupDocument) => {
    let restoredWorkspace: CVWorkspace;
    if (backup.schema === 2) {
      if (!isWorkspace(backup.workspace)) throw new Error("El respaldo contiene una biblioteca de CVs inválida.");
      restoredWorkspace = backup.workspace;
    } else if (backup.schema === 1 && backup.cv && backup.settings) {
      restoredWorkspace = createInitialWorkspace(backup.cv, backup.settings);
    } else {
      throw new Error("El respaldo no corresponde a CodeCafe CV Studio.");
    }
    const document = activeDocument(restoredWorkspace);
    setWorkspace(restoredWorkspace);
    saveWorkspaceLocal(restoredWorkspace);
    setCV({ ...seed, ...document.cv, projects: document.cv.projects ?? [], customSections: document.cv.customSections ?? [] });
    setLang(document.settings.lang);
    setTemplate(document.settings.template);
    setPhotoOn(document.settings.photoOn);
    setCloudMessage(t.cloudLoaded);
  };
  const syncCloud = async () => {
    if ((!serverSession && !googleToken) || (serverSession && !syncPassword)) return;
    setCloudStatus("syncing");
    setCloudMessage("");
    try {
      if (serverSession) {
        const document = backupDocument();
        const digest = await backupDigest(document);
        const result = await saveServerBackup(document, digest, serverRevision, serverSession.csrfToken);
        setServerRevision(result.revision);
        setSelectedRevision(result.revision);
        setServerHistory(await listServerBackups());
      }
      if (googleToken) await saveGoogleBackup(googleToken, backupDocument(), googlePrintable());
      setCloudStatus("synced");
    } catch (error) {
      const failure = error as Error & { status?: number };
      setCloudStatus(failure.status === 409 ? "conflict" : "error");
      setCloudMessage(failure.message);
    }
  };
  const save = async () => {
    saveLocal();
    await syncCloud();
  };
  const connectEc2 = async () => {
    if (!syncPassword) return;
    setCloudStatus("connecting");
    setCloudMessage("");
    try {
      const session = await connectServer(syncPassword);
      setServerSession(session);
      setServerRevision(session.currentRevision);
      setSelectedRevision(session.currentRevision);
      setServerHistory(await listServerBackups());
      setCloudStatus("connected");
    } catch (error) {
      setCloudStatus("error");
      setCloudMessage((error as Error).message);
    }
  };
  const disconnectEc2 = async () => {
    if (serverSession) await disconnectServer(serverSession.csrfToken).catch(() => undefined);
    setServerSession(null);
    setServerRevision(0);
    setSelectedRevision(0);
    setServerHistory([]);
    setCloudStatus("local");
  };
  const restoreEc2 = async () => {
    if (!serverSession || !syncPassword) return;
    try {
      const backup = await loadServerBackup();
      if (!backup) throw new Error("EC2 todavía no contiene respaldos.");
      const document = isEncryptedEnvelope(backup.payload)
        ? await decryptBackup<BackupDocument>(backup.payload, syncPassword)
        : backup.payload as BackupDocument;
      applyBackup(document);
      setServerRevision(backup.revision);
      setCloudStatus("connected");
    } catch (error) {
      setCloudStatus("error");
      setCloudMessage((error as Error).message);
    }
  };
  const restoreEc2Revision = async () => {
    if (!serverSession || !syncPassword || !selectedRevision) return;
    try {
      const backup = await loadServerBackupRevision(selectedRevision);
      if (!backup) throw new Error("La revisión seleccionada ya no existe.");
      const document = isEncryptedEnvelope(backup.payload)
        ? await decryptBackup<BackupDocument>(backup.payload, syncPassword)
        : backup.payload as BackupDocument;
      applyBackup(document);
      setCloudStatus("connected");
    } catch (error) {
      setCloudStatus("error");
      setCloudMessage((error as Error).message);
    }
  };
  const connectDrive = async () => {
    if (!cloudConfig.googleClientId) return;
    try {
      setGoogleToken(await authorizeGoogleDrive(cloudConfig.googleClientId));
      setCloudMessage(t.driveReady);
    } catch (error) {
      setCloudStatus("error");
      setCloudMessage((error as Error).message);
    }
  };
  const restoreDrive = async () => {
    if (!googleToken) return;
    try {
      const backup = await loadGoogleBackup<BackupDocument>(googleToken);
      if (!backup) throw new Error("Google Drive todavía no contiene respaldos.");
      applyBackup(backup);
    } catch (error) {
      setCloudStatus("error");
      setCloudMessage((error as Error).message);
    }
  };
  const exportBackup = () => {
    const anchor = document.createElement("a");
    anchor.href = URL.createObjectURL(new Blob([JSON.stringify(backupDocument(), null, 2)], { type: "application/json" }));
    anchor.download = `CodeCafe-CV-${new Date().toISOString().slice(0, 10)}.backup.json`;
    anchor.click();
    URL.revokeObjectURL(anchor.href);
  };
  const importBackup = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const value = JSON.parse(await file.text()) as BackupDocument | BackupEnvelope;
      const document = isEncryptedEnvelope(value)
        ? await decryptBackup<BackupDocument>(value, syncPassword)
        : value;
      applyBackup(document);
    } catch (error) {
      setCloudStatus("error");
      setCloudMessage((error as Error).message);
    } finally {
      event.target.value = "";
    }
  };
  const cloudStatusText = {
    local: t.localOnly, connecting: t.connecting, connected: t.connected, syncing: t.syncing,
    synced: t.synced, error: t.syncError, conflict: t.conflict,
  }[cloudStatus];
  const loadDocumentIntoEditor = (document: CVDocument) => {
    setCV({ ...seed, ...document.cv, projects: document.cv.projects ?? [], customSections: document.cv.customSections ?? [] });
    setLang(document.settings.lang);
    setTemplate(document.settings.template);
    setPhotoOn(document.settings.photoOn);
  };
  const openDocument = (id: string) => {
    const preserved = workspaceWithCurrent();
    const document = preserved.documents.find((candidate) => candidate.id === id);
    if (!document) return;
    const updated = { ...preserved, activeDocumentId: id };
    setWorkspace(updated);
    saveWorkspaceLocal(updated);
    loadDocumentIntoEditor(document);
    setLibraryOpen(false);
    setCloudStatus("local");
  };
  const createDocument = () => {
    if (!draftName.trim() || workspace.documents.length >= MAX_ACTIVE_CVS) return;
    const preserved = workspaceWithCurrent();
    const current = activeDocument(preserved);
    const now = new Date().toISOString();
    const document: CVDocument = {
      id: newId("cv"),
      name: draftName.trim(),
      collectionId: draftCollection,
      cv: creationMode === "copy" ? structuredClone(current.cv) : structuredClone(blankCV),
      settings: creationMode === "copy" ? { ...current.settings } : { lang, template: "ats", photoOn: false },
      createdAt: now,
      updatedAt: now,
      archived: false,
    };
    const updated = { ...preserved, documents: [...preserved.documents, document], activeDocumentId: document.id };
    setWorkspace(updated);
    saveWorkspaceLocal(updated);
    loadDocumentIntoEditor(document);
    setCreationMode(null);
    setDraftName("");
    setLibraryOpen(false);
    setCloudStatus("local");
  };
  const duplicateDocument = (id: string) => {
    const preserved = workspaceWithCurrent();
    const source = preserved.documents.find((document) => document.id === id);
    if (!source || preserved.documents.length >= MAX_ACTIVE_CVS) return;
    const now = new Date().toISOString();
    const duplicate: CVDocument = {
      ...structuredClone(source), id: newId("cv"), name: `${source.name} — Copy`, createdAt: now, updatedAt: now, archived: false,
    };
    const updated = { ...preserved, documents: [...preserved.documents, duplicate] };
    setWorkspace(updated);
    saveWorkspaceLocal(updated);
  };
  const archiveDocument = (id: string, archived: boolean) => {
    const preserved = workspaceWithCurrent();
    const activeDocuments = preserved.documents.filter((document) => !document.archived);
    if (archived && activeDocuments.length <= 1) return;
    const documents = preserved.documents.map((document) => document.id === id ? { ...document, archived, updatedAt: new Date().toISOString() } : document);
    let activeDocumentId = preserved.activeDocumentId;
    if (archived && id === activeDocumentId) {
      const replacement = documents.find((document) => !document.archived && document.id !== id);
      if (replacement) {
        activeDocumentId = replacement.id;
        loadDocumentIntoEditor(replacement);
      }
    }
    const updated = { ...preserved, documents, activeDocumentId };
    setWorkspace(updated);
    saveWorkspaceLocal(updated);
  };
  const deleteDocument = (id: string) => {
    const document = workspace.documents.find((candidate) => candidate.id === id);
    if (!document?.archived) return;
    const question = lang === "es" ? `¿Eliminar definitivamente “${document.name}”?` : `Permanently delete “${document.name}”?`;
    if (!window.confirm(question)) return;
    const updated = { ...workspace, documents: workspace.documents.filter((candidate) => candidate.id !== id) };
    setWorkspace(updated);
    saveWorkspaceLocal(updated);
  };
  const createCollection = () => {
    const label = lang === "es" ? "Nombre de la nueva colección:" : "New collection name:";
    const name = window.prompt(label)?.trim();
    if (!name) return;
    const updated = {
      ...workspace,
      collections: [...workspace.collections, { id: newId("collection"), name, order: workspace.collections.length }],
    };
    setWorkspace(updated);
    saveWorkspaceLocal(updated);
  };
  const renameDocument = (id: string) => {
    const document = workspace.documents.find((candidate) => candidate.id === id);
    if (!document) return;
    const label = lang === "es" ? "Nuevo nombre del CV:" : "New CV name:";
    const name = window.prompt(label, document.name)?.trim();
    if (!name || name === document.name) return;
    const preserved = workspaceWithCurrent();
    const updated = {
      ...preserved,
      documents: preserved.documents.map((candidate) => candidate.id === id
        ? { ...candidate, name, updatedAt: new Date().toISOString() }
        : candidate),
    };
    setWorkspace(updated);
    saveWorkspaceLocal(updated);
    setCloudStatus("local");
  };
  const moveDocument = (id: string, collectionId: string) => {
    if (!workspace.collections.some((collection) => collection.id === collectionId)) return;
    const preserved = workspaceWithCurrent();
    const updated = {
      ...preserved,
      documents: preserved.documents.map((document) => document.id === id
        ? { ...document, collectionId, updatedAt: new Date().toISOString() }
        : document),
    };
    setWorkspace(updated);
    saveWorkspaceLocal(updated);
    setCloudStatus("local");
  };
  const loadPhoto = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => set("photo", String(reader.result));
    reader.readAsDataURL(file);
  };
  const lines = (value: string) => value.split("\n").filter(Boolean);
  const exportTxt = () => {
    const sections = [
      `${cv.name}\n${cv.title}\n${cv.email} | ${cv.phone} | ${cv.location}\n${cv.linkedin}`,
      `${t.profileHeading.toUpperCase()}\n${cv.summary}`,
      `${t.experienceHeading.toUpperCase()}\n${cv.jobs.map((j) => `${j.role} — ${j.company} (${j.dates})\n${j.bullets}`).join("\n\n")}`,
      cv.coreSkills && `${t.coreHeading.toUpperCase()}\n${cv.coreSkills}`,
      cv.tools && `${t.toolsHeading.toUpperCase()}\n${cv.tools}`,
      cv.projects.some((p) => p.name || p.description) && `${t.projectsHeading.toUpperCase()}\n${cv.projects.map((p) => `${p.name} | ${p.stack}\n${p.description}`).join("\n\n")}`,
      cv.certifications && `${t.certificationsHeading.toUpperCase()}\n${cv.certifications}`,
      ...cv.customSections.filter((section) => section.title || section.content).map((section) => `${section.title.toUpperCase()}\n${section.content}`),
      `${t.educationHeading.toUpperCase()}\n${cv.education}`,
      `${t.languagesHeading.toUpperCase()}\n${cv.languages}`,
    ].filter(Boolean).join("\n\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([sections], { type: "text/plain" }));
    a.download = `CV-${cv.name || "candidate"}-${lang.toUpperCase()}-ATS.txt`;
    a.click();
  };

  return (
    <main lang={lang} spellCheck={true}>
      <header className="topbar">
        <div className="brand"><span className="brandMark">C</span><div><strong>CodeCafe CV</strong><small>{t.tagline}</small></div></div>
        <div className="topActions">
          <div className="langSwitch" aria-label={t.docLanguage}><button className={lang === "es" ? "selected" : ""} onClick={() => setLang("es")}>ES</button><button className={lang === "en" ? "selected" : ""} onClick={() => setLang("en")}>EN</button></div>
          <button className="libraryButton" onClick={() => setLibraryOpen(true)} title={`${t.myCvs}: ${activeDocument(workspace).name}`}>▤ <span>{t.myCvs}</span></button>
          <button className={`cloudButton ${cloudStatus}`} onClick={() => setCloudOpen(true)} title={t.cloud}>☁ <span>{cloudStatusText}</span></button>
          <button className="ghost" onClick={save}>{saved ? t.saved : t.save}</button>
          <button className="primary" onClick={() => window.print()}>{t.pdf}</button>
        </div>
      </header>

      <section className="workspace">
        <aside className="editor">
          <div className="editorHead"><div><span className="eyebrow">{t.eyebrow}</span><h1>{t.title}</h1></div><div className="score"><b>{score}%</b><span>{t.complete}</span></div></div>
          <nav className="tabs">
            {["perfil", "experiencia", "it", "formacion", "diseno"].map((id, i) => <button key={id} className={tab === id ? "active" : ""} onClick={() => setTab(id)}><span>{i + 1}</span>{t.tabs[i]}</button>)}
          </nav>

          {tab === "perfil" && <div className="formGrid">
            <Field label={t.fullName} wide><input className={inputClass} value={cv.name} onChange={(e) => set("name", e.target.value)} /></Field>
            <Field label={t.professionalTitle} wide><input className={inputClass} value={cv.title} onChange={(e) => set("title", e.target.value)} /></Field>
            <Field label={t.email}><input className={inputClass} value={cv.email} onChange={(e) => set("email", e.target.value)} /></Field>
            <Field label={t.phone}><input className={inputClass} value={cv.phone} onChange={(e) => set("phone", e.target.value)} /></Field>
            <Field label={t.location} wide><input className={inputClass} value={cv.location} onChange={(e) => set("location", e.target.value)} /></Field>
            <Field label={t.link} wide><input className={inputClass} value={cv.linkedin} onChange={(e) => set("linkedin", e.target.value)} /></Field>
            <Field label={t.summary} wide><textarea className={inputClass} rows={6} value={cv.summary} onChange={(e) => set("summary", e.target.value)} /><small className="hint">{t.summaryHint}</small></Field>
          </div>}

          {tab === "experiencia" && <div className="stack">
            {cv.jobs.map((job, i) => <div className="jobCard" key={i}>
              <div className="cardTitle"><b>{t.experience} {i + 1}</b><button onClick={() => setCV((v) => ({ ...v, jobs: v.jobs.filter((_, n) => n !== i) }))}>{t.remove}</button></div>
              <Field label={t.role}><input className={inputClass} value={job.role} onChange={(e) => setJob(i, "role", e.target.value)} /></Field>
              <Field label={t.company}><input className={inputClass} value={job.company} onChange={(e) => setJob(i, "company", e.target.value)} /></Field>
              <Field label={t.period}><input className={inputClass} value={job.dates} onChange={(e) => setJob(i, "dates", e.target.value)} /></Field>
              <Field label={t.achievements}><textarea className={inputClass} rows={5} value={job.bullets} onChange={(e) => setJob(i, "bullets", e.target.value)} /></Field>
            </div>)}
            <button className="add" onClick={() => setCV((v) => ({ ...v, jobs: [...v.jobs, { role: "", company: "", dates: "", bullets: "" }] }))}>{t.addExperience}</button>
          </div>}

          {tab === "it" && <div className="stack">
            <div className="optionalNote">{t.optional}</div>
            <Field label={t.core}><textarea className={inputClass} rows={4} value={cv.coreSkills} onChange={(e) => set("coreSkills", e.target.value)} /><small className="hint">{t.coreHint}</small></Field>
            <Field label={t.tools}><textarea className={inputClass} rows={4} value={cv.tools} onChange={(e) => set("tools", e.target.value)} /></Field>
            <Field label={t.certifications}><textarea className={inputClass} rows={4} value={cv.certifications} onChange={(e) => set("certifications", e.target.value)} /></Field>
            <div className="subhead">{t.projects}</div>
            {cv.projects.map((project, i) => <div className="jobCard" key={i}>
              <div className="cardTitle"><b>{t.project} {i + 1}</b><button onClick={() => setCV((v) => ({ ...v, projects: v.projects.filter((_, n) => n !== i) }))}>{t.remove}</button></div>
              <Field label={t.projectName}><input className={inputClass} value={project.name} onChange={(e) => setProject(i, "name", e.target.value)} /></Field>
              <Field label={t.stack}><input className={inputClass} value={project.stack} onChange={(e) => setProject(i, "stack", e.target.value)} /></Field>
              <Field label={t.description}><textarea className={inputClass} rows={4} value={project.description} onChange={(e) => setProject(i, "description", e.target.value)} /></Field>
            </div>)}
            <button className="add" onClick={() => setCV((v) => ({ ...v, projects: [...v.projects, { name: "", stack: "", description: "" }] }))}>{t.addProject}</button>
            <div className="subhead">{t.customSections}</div>
            {cv.customSections.map((section, i) => <div className="jobCard" key={i}>
              <div className="cardTitle"><b>{t.customSection} {i + 1}</b><button onClick={() => setCV((v) => ({ ...v, customSections: v.customSections.filter((_, n) => n !== i) }))}>{t.remove}</button></div>
              <Field label={t.sectionTitle}><input className={inputClass} value={section.title} onChange={(event) => setCustomSection(i, "title", event.target.value)} /></Field>
              <Field label={t.sectionContent}><textarea className={inputClass} rows={5} value={section.content} onChange={(event) => setCustomSection(i, "content", event.target.value)} /></Field>
            </div>)}
            <button className="add" onClick={() => setCV((v) => ({ ...v, customSections: [...v.customSections, { title: "", content: "" }] }))}>{t.addCustomSection}</button>
          </div>}

          {tab === "formacion" && <div className="formGrid">
            <Field label={t.keywords} wide><textarea className={inputClass} rows={5} value={cv.skills} onChange={(e) => set("skills", e.target.value)} /><small className="hint">{t.keywordsHint}</small></Field>
            <Field label={t.education} wide><textarea className={inputClass} rows={5} value={cv.education} onChange={(e) => set("education", e.target.value)} /></Field>
            <Field label={t.languages} wide><textarea className={inputClass} rows={4} value={cv.languages} onChange={(e) => set("languages", e.target.value)} /></Field>
          </div>}

          {tab === "diseno" && <div className="designPanel">
            <h3>{t.template}</h3>
            <div className="templateChoices"><button className={template === "ats" ? "selected" : ""} onClick={() => setTemplate("ats")}><b>{t.ats}</b><span>{t.atsDesc}</span></button><button className={template === "modern" ? "selected" : ""} onClick={() => setTemplate("modern")}><b>{t.modern}</b><span>{t.modernDesc}</span></button></div>
            <div className="toggleRow"><div><b>{t.includePhoto}</b><span>{t.photoHint}</span></div><button aria-label={t.includePhoto} aria-pressed={photoOn} className={`toggle ${photoOn ? "on" : ""}`} onClick={() => setPhotoOn(!photoOn)}><i /></button></div>
            {photoOn && <label className="upload">{t.choosePhoto}<input type="file" accept="image/*" onChange={loadPhoto} /></label>}
            <button className="atsExport" onClick={exportTxt}>{t.txt}</button>
            <div className="writingStatus"><b>✓ {t.writingActive}</b><span>{t.writingDetail}</span></div>
          </div>}
        </aside>

        <section className="previewPane">
          <div className="previewTop"><div><span className="liveDot" />{t.preview}</div><div className="zoom">A4 · 100%</div></div>
          <article className={`paper ${template}`}>
            <div className="cvHeader">{photoOn && cv.photo && <img className="portrait" src={cv.photo} alt={t.includePhoto} />}<div><h2>{cv.name || t.fullName}</h2><h3>{cv.title || t.professionalTitle}</h3><p>{[cv.email, cv.phone, cv.location].filter(Boolean).join("  ·  ")}</p>{cv.linkedin && <p>{cv.linkedin}</p>}</div></div>
            <CVSection title={t.profileHeading}><p>{cv.summary}</p></CVSection>
            <CVSection title={t.experienceHeading}>{cv.jobs.map((job, i) => <div className="cvJob" key={i}><div className="jobHeading"><div><b>{job.role}</b><span>{job.company}</span></div><time>{job.dates}</time></div><ul>{lines(job.bullets).map((bullet, n) => <li key={n}>{bullet}</li>)}</ul></div>)}</CVSection>
            {cv.coreSkills && <CVSection title={t.coreHeading}><p className="skillText">{cv.coreSkills}</p></CVSection>}
            {cv.tools && <CVSection title={t.toolsHeading}><p className="skillText">{cv.tools}</p></CVSection>}
            {cv.projects.some((p) => p.name || p.description) && <CVSection title={t.projectsHeading}>{cv.projects.filter((p) => p.name || p.description).map((project, i) => <div className="cvProject" key={i}><div><b>{project.name}</b><span>{project.stack}</span></div><p>{project.description}</p></div>)}</CVSection>}
            {cv.certifications && <CVSection title={t.certificationsHeading}>{lines(cv.certifications).map((line, i) => <p key={i}>{line}</p>)}</CVSection>}
            {cv.customSections.filter((section) => section.title || section.content).map((section, index) => <CVSection title={section.title || t.customSection} key={`${section.title}-${index}`}>{lines(section.content).map((line, i) => <p key={i}>{line}</p>)}</CVSection>)}
            <CVSection title={t.skillsHeading}><p className="skillText">{cv.skills}</p></CVSection>
            <div className="twoCols"><CVSection title={t.educationHeading}>{lines(cv.education).map((line, i) => <p key={i}>{line}</p>)}</CVSection><CVSection title={t.languagesHeading}>{lines(cv.languages).map((line, i) => <p key={i}>{line}</p>)}</CVSection></div>
          </article>
          <div className="atsCheck"><b><span>✓</span>{t.atsGood}</b><p>{t.atsDetail}</p></div>
        </section>
      </section>
      {libraryOpen && <CVLibrary
        lang={lang}
        workspace={workspace}
        selectedCollection={selectedCollection}
        showArchived={showArchived}
        draftName={draftName}
        draftCollection={draftCollection}
        creationMode={creationMode}
        onSelectCollection={setSelectedCollection}
        onShowArchived={setShowArchived}
        onDraftName={setDraftName}
        onDraftCollection={setDraftCollection}
        onStartCreate={(mode) => { const preserved = workspaceWithCurrent(); const current = activeDocument(preserved); setWorkspace(preserved); setCreationMode(mode); setDraftName(mode === "copy" ? `${current.name} — Copy` : ""); setDraftCollection(current.collectionId); }}
        onCancelCreate={() => { setCreationMode(null); setDraftName(""); }}
        onCreate={createDocument}
        onOpen={openDocument}
        onDuplicate={duplicateDocument}
        onRename={renameDocument}
        onMove={moveDocument}
        onArchive={archiveDocument}
        onDelete={deleteDocument}
        onCreateCollection={createCollection}
        onClose={() => setLibraryOpen(false)}
      />}
      {cloudOpen && <div className="cloudOverlay" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setCloudOpen(false); }}>
        <section className="cloudPanel" role="dialog" aria-modal="true" aria-labelledby="cloud-title">
          <div className="cloudHead"><div><span className="eyebrow">CODECAFE CLOUD</span><h2 id="cloud-title">{t.cloudTitle}</h2></div><button onClick={() => setCloudOpen(false)} aria-label={t.close}>×</button></div>
          <p className="cloudIntro">{t.cloudIntro}</p>
          <label>{t.syncPassword}<input className={inputClass} type="password" autoComplete="current-password" value={syncPassword} onChange={(event) => setSyncPassword(event.target.value)} /><small className="hint">{t.passwordWarning}</small></label>
          <div className="cloudProvider">
            <div><b>Amazon EC2</b><span>{serverSession ? `${t.connected} · revisión ${serverRevision}` : t.localOnly}</span></div>
            <div className="cloudActions">{serverSession
              ? <><button onClick={restoreEc2}>{t.loadEc2}</button><button onClick={disconnectEc2}>{t.disconnect}</button></>
              : <button className="primary" disabled={!syncPassword} onClick={connectEc2}>{t.connectEc2}</button>}
            </div>
          </div>
          {serverSession && serverHistory.length > 0 && <div className="revisionPicker">
            <label>{t.history}<select className={inputClass} value={selectedRevision} onChange={(event) => setSelectedRevision(Number(event.target.value))}>{serverHistory.map((revision) => <option value={revision.revision} key={revision.revision}>#{revision.revision} · {new Date(revision.savedAt).toLocaleString(lang)}</option>)}</select></label>
            <button onClick={restoreEc2Revision}>{t.loadRevision}</button>
          </div>}
          <div className="cloudProvider">
            <div><b>Google Drive</b><span>{googleToken ? t.driveReady : cloudConfig.googleClientId ? t.driveAvailable : t.driveUnavailable}</span><small className="hint">{t.driveFiles}</small></div>
            <div className="cloudActions">{googleToken
              ? <button onClick={restoreDrive}>{t.loadDrive}</button>
              : <button disabled={!cloudConfig.googleClientId} onClick={connectDrive}>{t.connectDrive}</button>}
            </div>
          </div>
          <div className="cloudPortable"><button onClick={exportBackup}>{t.exportBackup}</button><label>{t.importBackup}<input type="file" accept="application/json,.json" onChange={importBackup} /></label></div>
          <div className={`cloudNotice ${cloudStatus}`}>{cloudStatusText}{cloudMessage && <small>{cloudMessage}</small>}</div>
          <button className="cloudClose" onClick={() => setCloudOpen(false)}>{t.close}</button>
        </section>
      </div>}
    </main>
  );
}

function Field({ label, wide, children }: { label: string; wide?: boolean; children: React.ReactNode }) {
  return <label className={wide ? "wide" : ""}>{label}{children}</label>;
}
function CVSection({ title, children }: { title: string; children: React.ReactNode }) {
  return <section className="cvSection"><h4>{title}</h4>{children}</section>;
}
