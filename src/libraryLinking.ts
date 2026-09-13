import type { CV } from "./App";
import {
  getProfessionalLibrary,
  loadWorkspaceLocal,
  saveWorkspaceLocal,
  type CVDocument,
  type CVWorkspace,
  type ProfessionalRecord,
  type ProfessionalRecordKind,
} from "./workspace";

export type LibraryPlacement =
  | "summary"
  | "experience"
  | "coreSkills"
  | "tools"
  | "projects"
  | "certifications"
  | "skills"
  | "education"
  | "languages"
  | "custom";

export type CVLibraryBinding = {
  id: string;
  recordId: string;
  placement: LibraryPlacement;
  order: number;
  enabled: boolean;
  appliedRevision: number;
  snapshot: string;
  override?: boolean;
};

export type LinkedCVDocument = CVDocument & {
  libraryBindings?: CVLibraryBinding[];
};

export type LibrarySelection = {
  recordId: string;
  placement: LibraryPlacement;
  order: number;
};

type Contribution =
  | { placement: "summary" | "coreSkills" | "tools" | "certifications" | "skills" | "education" | "languages"; text: string }
  | { placement: "experience"; job: CV["jobs"][number] }
  | { placement: "projects"; project: CV["projects"][number] }
  | { placement: "custom"; section: CV["customSections"][number] };

const META_PREFIXES = ["__label__:", "__hidden__:"];
const BASIC_INFO_KEYS = new Set(["name", "email", "phone", "location", "linkedin"]);

function newBindingId(): string {
  return `library-binding-${crypto.randomUUID()}`;
}

function visibleDetails(record: ProfessionalRecord): [string, string][] {
  return Object.entries(record.details).filter(([key, value]) => {
    if (!value.trim()) return false;
    if (META_PREFIXES.some((prefix) => key.startsWith(prefix))) return false;
    return record.details[`__hidden__:${key}`] !== "1";
  });
}

export function detailLabel(record: ProfessionalRecord, key: string): string {
  return record.details[`__label__:${key}`]?.trim() || key;
}

function extraDetailLines(record: ProfessionalRecord, excluded: string[]): string[] {
  return visibleDetails(record)
    .filter(([key]) => !excluded.includes(key))
    .map(([key, value]) => `${detailLabel(record, key)}: ${value}`);
}

function joinContent(content: string, extra: string[]): string {
  return [content.trim(), ...extra].filter(Boolean).join("\n");
}

export function defaultPlacement(kind: ProfessionalRecordKind): LibraryPlacement {
  const placements: Record<ProfessionalRecordKind, LibraryPlacement> = {
    summary: "summary",
    experience: "experience",
    skill: "coreSkills",
    technology: "tools",
    project: "projects",
    education: "education",
    certification: "certifications",
    language: "languages",
    custom: "custom",
  };
  return placements[kind];
}

export function placementsForKind(kind: ProfessionalRecordKind): LibraryPlacement[] {
  switch (kind) {
    case "summary": return ["summary", "custom"];
    case "experience": return ["experience", "custom"];
    case "skill": return ["coreSkills", "skills", "custom"];
    case "technology": return ["tools", "skills", "custom"];
    case "project": return ["projects", "custom"];
    case "education": return ["education", "custom"];
    case "certification": return ["certifications", "custom"];
    case "language": return ["languages", "custom"];
    case "custom": return ["custom"];
  }
}

function contribution(record: ProfessionalRecord, placement: LibraryPlacement): Contribution {
  if (placement === "experience") {
    return {
      placement,
      job: {
        role: record.details.role?.trim() || record.title,
        company: record.details.company?.trim() || "",
        dates: record.details.dates?.trim() || "",
        bullets: joinContent(record.content, extraDetailLines(record, ["role", "company", "dates"])),
      },
    };
  }
  if (placement === "projects") {
    return {
      placement,
      project: {
        name: record.title,
        stack: record.details.stack?.trim() || "",
        description: joinContent(record.content, extraDetailLines(record, ["stack", "repository"])),
        repository: record.details.repository?.trim() || "",
      },
    };
  }
  if (placement === "custom") {
    return {
      placement,
      section: {
        title: record.title,
        content: joinContent(record.content, extraDetailLines(record, [])),
      },
    };
  }

  let text = record.title.trim();
  if (placement === "summary") text = record.content.trim() || record.title.trim();
  else if (placement === "tools") {
    const category = record.details.category?.trim();
    text = category ? `${category}: ${record.title.trim()}` : record.title.trim();
  } else if (placement === "education") {
    const institution = record.details.institution?.trim();
    const dates = record.details.dates?.trim();
    text = [record.title.trim(), institution].filter(Boolean).join(" — ");
    if (dates) text += `, ${dates}`;
    if (record.content.trim()) text += `\n${record.content.trim()}`;
  } else if (placement === "certifications") {
    const issuer = record.details.issuer?.trim();
    const date = record.details.date?.trim();
    text = [record.title.trim(), issuer].filter(Boolean).join(" — ");
    if (date) text += `, ${date}`;
    if (record.content.trim()) text += `\n${record.content.trim()}`;
  } else if (placement === "languages") {
    const proficiency = record.details.proficiency?.trim();
    text = proficiency ? `${record.title.trim()} — ${proficiency}` : record.title.trim();
  } else if (record.content.trim() && placement !== "coreSkills" && placement !== "skills") {
    text = `${record.title.trim()}\n${record.content.trim()}`;
  }
  return { placement, text };
}

function serializeContribution(value: Contribution): string {
  return JSON.stringify(value);
}

function parseSnapshot(value: string): Contribution | null {
  try {
    const parsed = JSON.parse(value) as Contribution;
    return parsed && typeof parsed === "object" && "placement" in parsed ? parsed : null;
  } catch {
    return null;
  }
}

function normalizeBlocks(value: string): string[] {
  return value.split(/\n\n+/).map((item) => item.trim()).filter(Boolean);
}

function appendText(existing: string, text: string): string {
  if (!text.trim()) return existing;
  const blocks = normalizeBlocks(existing);
  if (blocks.includes(text.trim())) return existing;
  return [...blocks, text.trim()].join("\n\n");
}

function replaceText(existing: string, oldText: string, newText: string): { value: string; matched: boolean } {
  const blocks = normalizeBlocks(existing);
  const index = blocks.indexOf(oldText.trim());
  if (index < 0) return { value: existing, matched: false };
  if (newText.trim()) blocks[index] = newText.trim();
  else blocks.splice(index, 1);
  return { value: blocks.join("\n\n"), matched: true };
}

function sameObject(left: unknown, right: unknown): boolean {
  return JSON.stringify(left) === JSON.stringify(right);
}

function addContribution(cv: CV, value: Contribution): CV {
  const next = structuredClone(cv);
  switch (value.placement) {
    case "summary":
      next.summary = appendText(next.summary, value.text);
      break;
    case "coreSkills":
      next.coreSkills = appendText(next.coreSkills, value.text);
      break;
    case "tools":
      next.tools = appendText(next.tools, value.text);
      break;
    case "certifications":
      next.certifications = appendText(next.certifications, value.text);
      break;
    case "skills":
      next.skills = appendText(next.skills, value.text);
      break;
    case "education":
      next.education = appendText(next.education, value.text);
      break;
    case "languages":
      next.languages = appendText(next.languages, value.text);
      break;
    case "experience":
      if (!next.jobs.some((job) => sameObject(job, value.job))) next.jobs.push(value.job);
      break;
    case "projects":
      if (!next.projects.some((project) => sameObject(project, value.project))) next.projects.push(value.project);
      break;
    case "custom":
      if (!next.customSections.some((section) => sameObject(section, value.section))) next.customSections.push(value.section);
      break;
  }
  return next;
}

function replaceContribution(cv: CV, oldValue: Contribution, newValue: Contribution | null): { cv: CV; matched: boolean } {
  const next = structuredClone(cv);
  if (oldValue.placement !== newValue?.placement && newValue) {
    const removed = replaceContribution(next, oldValue, null);
    return removed.matched ? { cv: addContribution(removed.cv, newValue), matched: true } : removed;
  }

  if ("text" in oldValue) {
    const key = oldValue.placement;
    const result = replaceText(next[key], oldValue.text, newValue && "text" in newValue ? newValue.text : "");
    next[key] = result.value;
    return { cv: next, matched: result.matched };
  }

  if (oldValue.placement === "experience") {
    const index = next.jobs.findIndex((item) => sameObject(item, oldValue.job));
    if (index < 0) return { cv, matched: false };
    if (newValue?.placement === "experience") next.jobs[index] = newValue.job;
    else next.jobs.splice(index, 1);
    return { cv: next, matched: true };
  }
  if (oldValue.placement === "projects") {
    const index = next.projects.findIndex((item) => sameObject(item, oldValue.project));
    if (index < 0) return { cv, matched: false };
    if (newValue?.placement === "projects") next.projects[index] = newValue.project;
    else next.projects.splice(index, 1);
    return { cv: next, matched: true };
  }
  const index = next.customSections.findIndex((item) => sameObject(item, oldValue.section));
  if (index < 0) return { cv, matched: false };
  if (newValue?.placement === "custom") next.customSections[index] = newValue.section;
  else next.customSections.splice(index, 1);
  return { cv: next, matched: true };
}

function findRecord(workspace: CVWorkspace, document: CVDocument, recordId: string): ProfessionalRecord | undefined {
  const library = getProfessionalLibrary(workspace, document.profileId);
  return library.records.find((record) => record.id === recordId && record.status !== "archived");
}

export function synchronizeLinkedDocument(workspace: CVWorkspace, document: LinkedCVDocument): LinkedCVDocument {
  let cv = structuredClone(document.cv);
  const bindings = (document.libraryBindings ?? []).map((binding) => ({ ...binding }));
  let changed = false;

  for (const binding of bindings) {
    if (!binding.enabled || binding.override) continue;
    const record = findRecord(workspace, document, binding.recordId);
    if (!record || record.revision <= binding.appliedRevision) continue;
    const oldValue = parseSnapshot(binding.snapshot);
    const newValue = contribution(record, binding.placement);
    if (!oldValue) {
      binding.override = true;
      changed = true;
      continue;
    }
    const replaced = replaceContribution(cv, oldValue, newValue);
    if (!replaced.matched) {
      // El usuario cambió esa copia en este CV. Se conserva como override.
      binding.override = true;
      binding.appliedRevision = record.revision;
      changed = true;
      continue;
    }
    cv = replaced.cv;
    binding.snapshot = serializeContribution(newValue);
    binding.appliedRevision = record.revision;
    changed = true;
  }

  return changed ? { ...document, cv, libraryBindings: bindings, updatedAt: new Date().toISOString() } : document;
}

export function synchronizeLinkedWorkspace(workspace: CVWorkspace): CVWorkspace {
  let changed = false;
  const documents = workspace.documents.map((document) => {
    const synced = synchronizeLinkedDocument(workspace, document as LinkedCVDocument);
    if (synced !== document) changed = true;
    return synced;
  });
  return changed ? { ...workspace, documents } : workspace;
}

export function prepareLinkedWorkspaceFromStorage(): void {
  try {
    const raw = localStorage.getItem("codecafe-cv-workspace-v2");
    if (!raw) return;
    const parsed = JSON.parse(raw) as CVWorkspace;
    const synced = synchronizeLinkedWorkspace(parsed);
    if (synced !== parsed) saveWorkspaceLocal(synced);
  } catch {
    // Una copia inválida será tratada por loadWorkspaceLocal dentro de App.
  }
}

export function applyLibrarySelection(
  workspace: CVWorkspace,
  documentId: string,
  selections: LibrarySelection[],
): CVWorkspace {
  const prepared = synchronizeLinkedWorkspace(workspace);
  const document = prepared.documents.find((item) => item.id === documentId) as LinkedCVDocument | undefined;
  if (!document) return prepared;

  const selectedByRecord = new Map(selections.map((selection) => [selection.recordId, selection]));
  let cv = structuredClone(document.cv);
  const nextBindings: CVLibraryBinding[] = [];

  for (const binding of document.libraryBindings ?? []) {
    const selection = selectedByRecord.get(binding.recordId);
    const oldValue = parseSnapshot(binding.snapshot);
    if (!selection) {
      if (oldValue) {
        const removed = replaceContribution(cv, oldValue, null);
        if (removed.matched) cv = removed.cv;
      }
      continue;
    }

    const record = findRecord(prepared, document, binding.recordId);
    if (!record) continue;
    const placementChanged = binding.placement !== selection.placement;
    if (placementChanged && oldValue && !binding.override) {
      const moved = replaceContribution(cv, oldValue, contribution(record, selection.placement));
      if (moved.matched) {
        cv = moved.cv;
        nextBindings.push({
          ...binding,
          placement: selection.placement,
          order: selection.order,
          snapshot: serializeContribution(contribution(record, selection.placement)),
          appliedRevision: record.revision,
          override: false,
        });
        selectedByRecord.delete(binding.recordId);
        continue;
      }
    }
    nextBindings.push({ ...binding, order: selection.order });
    selectedByRecord.delete(binding.recordId);
  }

  for (const selection of selectedByRecord.values()) {
    const record = findRecord(prepared, document, selection.recordId);
    if (!record || BASIC_INFO_KEYS.has(selection.placement)) continue;
    const value = contribution(record, selection.placement);
    cv = addContribution(cv, value);
    nextBindings.push({
      id: newBindingId(),
      recordId: record.id,
      placement: selection.placement,
      order: selection.order,
      enabled: true,
      appliedRevision: record.revision,
      snapshot: serializeContribution(value),
      override: false,
    });
  }

  const documents = prepared.documents.map((item) => item.id === document.id
    ? {
      ...item,
      // Phase 2 nunca escribe name/email/phone/location/linkedin desde la biblioteca.
      cv: {
        ...cv,
        name: document.cv.name,
        email: document.cv.email,
        phone: document.cv.phone,
        location: document.cv.location,
        linkedin: document.cv.linkedin,
      },
      libraryBindings: nextBindings.sort((a, b) => a.order - b.order),
      updatedAt: new Date().toISOString(),
    }
    : item);
  return { ...prepared, documents };
}

export function resetBindingOverride(workspace: CVWorkspace, documentId: string, bindingId: string): CVWorkspace {
  const document = workspace.documents.find((item) => item.id === documentId) as LinkedCVDocument | undefined;
  if (!document) return workspace;
  const binding = document.libraryBindings?.find((item) => item.id === bindingId);
  if (!binding) return workspace;
  const record = findRecord(workspace, document, binding.recordId);
  if (!record) return workspace;
  const oldValue = parseSnapshot(binding.snapshot);
  let cv = structuredClone(document.cv);
  const newValue = contribution(record, binding.placement);
  if (oldValue) {
    const replaced = replaceContribution(cv, oldValue, newValue);
    if (replaced.matched) cv = replaced.cv;
    else cv = addContribution(cv, newValue);
  } else cv = addContribution(cv, newValue);
  const bindings = (document.libraryBindings ?? []).map((item) => item.id === bindingId
    ? { ...item, override: false, appliedRevision: record.revision, snapshot: serializeContribution(newValue) }
    : item);
  return {
    ...workspace,
    documents: workspace.documents.map((item) => item.id === documentId ? { ...item, cv, libraryBindings: bindings, updatedAt: new Date().toISOString() } : item),
  };
}

export function currentBindings(document: CVDocument): CVLibraryBinding[] {
  return [...(((document as LinkedCVDocument).libraryBindings) ?? [])].sort((a, b) => a.order - b.order);
}

export function suggestionScore(record: ProfessionalRecord, document: CVDocument, collectionName = ""): number {
  const target = `${document.name} ${document.cv.title} ${collectionName}`.toLocaleLowerCase();
  const tokens = new Set(target.split(/[^\p{L}\p{N}+#.-]+/u).map((token) => token.trim()).filter((token) => token.length > 2));
  const searchable = [record.title, ...record.tags, ...visibleDetails(record).map(([, value]) => value)].join(" ").toLocaleLowerCase();
  let score = 0;
  for (const token of tokens) if (searchable.includes(token)) score += 1;
  return score;
}

export function persistLibrarySelection(documentId: string, selections: LibrarySelection[]): CVWorkspace | null {
  try {
    const fallback = JSON.parse(localStorage.getItem("codecafe-cv-workspace-v2") || "null") as CVWorkspace | null;
    if (!fallback) return null;
    const latest = loadWorkspaceLocal(fallback);
    const updated = applyLibrarySelection(latest, documentId, selections);
    saveWorkspaceLocal(updated);
    return updated;
  } catch {
    return null;
  }
}
