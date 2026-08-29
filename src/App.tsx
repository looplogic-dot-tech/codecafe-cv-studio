"use client";

import { ChangeEvent, useEffect, useMemo, useState } from "react";

type Job = { role: string; company: string; dates: string; bullets: string };
type Project = { name: string; stack: string; description: string };
type CV = {
  name: string; title: string; email: string; phone: string; location: string; linkedin: string;
  summary: string; skills: string; coreSkills: string; tools: string; certifications: string;
  education: string; languages: string; jobs: Job[]; projects: Project[]; photo: string;
};
type Lang = "es" | "en";

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
  },
} as const;

const inputClass = "inputField";

export default function Home() {
  const [cv, setCV] = useState<CV>(seed);
  const [tab, setTab] = useState("perfil");
  const [lang, setLang] = useState<Lang>("es");
  const [template, setTemplate] = useState<"ats" | "modern">("ats");
  const [photoOn, setPhotoOn] = useState(false);
  const [saved, setSaved] = useState(false);
  const t = copy[lang];

  useEffect(() => {
    const stored = localStorage.getItem("codecafe-cv");
    const settings = localStorage.getItem("codecafe-cv-settings");
    if (stored) {
      try {
        const old = JSON.parse(stored);
        setCV({ ...seed, ...old, projects: old.projects ?? seed.projects });
      } catch {}
    }
    if (settings) {
      try {
        const s = JSON.parse(settings);
        if (s.lang === "es" || s.lang === "en") setLang(s.lang);
        if (s.template === "ats" || s.template === "modern") setTemplate(s.template);
        setPhotoOn(Boolean(s.photoOn));
      } catch {}
    }
  }, []);

  const score = useMemo(() => {
    const required = [cv.name, cv.title, cv.email, cv.phone, cv.location, cv.summary, cv.skills, cv.education];
    return Math.round((required.filter(Boolean).length / required.length) * 100);
  }, [cv]);

  const set = (key: keyof CV, value: string) => setCV((v) => ({ ...v, [key]: value }));
  const setJob = (i: number, key: keyof Job, value: string) => setCV((v) => ({ ...v, jobs: v.jobs.map((j, n) => n === i ? { ...j, [key]: value } : j) }));
  const setProject = (i: number, key: keyof Project, value: string) => setCV((v) => ({ ...v, projects: v.projects.map((p, n) => n === i ? { ...p, [key]: value } : p) }));
  const save = () => {
    localStorage.setItem("codecafe-cv", JSON.stringify(cv));
    localStorage.setItem("codecafe-cv-settings", JSON.stringify({ lang, template, photoOn }));
    setSaved(true);
    setTimeout(() => setSaved(false), 1400);
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
      `${t.educationHeading.toUpperCase()}\n${cv.education}`,
      `${t.languagesHeading.toUpperCase()}\n${cv.languages}`,
    ].filter(Boolean).join("\n\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([sections], { type: "text/plain" }));
    a.download = `CV-${cv.name || "candidate"}-${lang.toUpperCase()}-ATS.txt`;
    a.click();
  };

  return (
    <main>
      <header className="topbar">
        <div className="brand"><span className="brandMark">C</span><div><strong>CodeCafe CV</strong><small>{t.tagline}</small></div></div>
        <div className="topActions">
          <div className="langSwitch" aria-label={t.docLanguage}><button className={lang === "es" ? "selected" : ""} onClick={() => setLang("es")}>ES</button><button className={lang === "en" ? "selected" : ""} onClick={() => setLang("en")}>EN</button></div>
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
            <CVSection title={t.skillsHeading}><p className="skillText">{cv.skills}</p></CVSection>
            <div className="twoCols"><CVSection title={t.educationHeading}>{lines(cv.education).map((line, i) => <p key={i}>{line}</p>)}</CVSection><CVSection title={t.languagesHeading}>{lines(cv.languages).map((line, i) => <p key={i}>{line}</p>)}</CVSection></div>
          </article>
          <div className="atsCheck"><b><span>✓</span>{t.atsGood}</b><p>{t.atsDetail}</p></div>
        </section>
      </section>
    </main>
  );
}

function Field({ label, wide, children }: { label: string; wide?: boolean; children: React.ReactNode }) {
  return <label className={wide ? "wide" : ""}>{label}{children}</label>;
}
function CVSection({ title, children }: { title: string; children: React.ReactNode }) {
  return <section className="cvSection"><h4>{title}</h4>{children}</section>;
}
