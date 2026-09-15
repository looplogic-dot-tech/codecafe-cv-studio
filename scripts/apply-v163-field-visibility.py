from pathlib import Path

app = Path('src/App.tsx')
s = app.read_text(encoding='utf-8')

# Make configurable-field visibility part of the owning React editor state so
# hiding/restoring a field updates the live CV immediately without deleting data.
state_marker = '  const [inheritBasics, setInheritBasics] = useState(true);\n'
if 'setFieldVisibilityRevision' not in s:
    if state_marker not in s:
        raise SystemExit('ERROR: visibility state insertion point not found')
    s = s.replace(state_marker, state_marker + '  const [, setFieldVisibilityRevision] = useState(0);\n', 1)

helper_marker = '  const t = copy[lang];\n'
if 'const isFieldHidden =' not in s:
    helper = '''  const configurableFieldState = (fieldId: string, label: string): { hidden?: boolean; customLabel?: string } => {\n    const documentId = workspace.activeDocumentId || "default";\n    const stableKey = `codecafe-configurable-field:${documentId}:${fieldId}`;\n    const legacyId = label.trim().toLocaleLowerCase().replace(/[^a-z0-9áéíóúñ]+/gi, "-").replace(/^-|-$/g, "");\n    const legacyKey = `codecafe-configurable-field:${documentId}:${legacyId}`;\n    try {\n      const stable = localStorage.getItem(stableKey);\n      if (stable) return JSON.parse(stable) || {};\n      const legacy = localStorage.getItem(legacyKey);\n      if (legacy) {\n        const parsed = JSON.parse(legacy) || {};\n        localStorage.setItem(stableKey, JSON.stringify(parsed));\n        return parsed;\n      }\n    } catch {}\n    return {};\n  };\n  const isFieldHidden = (fieldId: string, label: string) => Boolean(configurableFieldState(fieldId, label).hidden);\n  const fieldVisibilityChanged = () => setFieldVisibilityRevision((value) => value + 1);\n'''
    if helper_marker not in s:
        raise SystemExit('ERROR: visibility helper insertion point not found')
    s = s.replace(helper_marker, helper_marker + helper, 1)

old_field = '''function Field({ label, wide, configurable = false, children }: { label: string; wide?: boolean; configurable?: boolean; children: React.ReactNode }) {\n  const documentId = (() => { try { const ws = JSON.parse(localStorage.getItem("codecafe-cv-workspace-v2") || "null"); return ws?.activeDocumentId || "default"; } catch { return "default"; } })();\n  const key = label.trim().toLocaleLowerCase().replace(/[^a-z0-9áéíóúñ]+/gi, "-").replace(/^-|-$/g, "");\n  const storageKey = `codecafe-configurable-field:${documentId}:${key}`;\n  const [fieldState, setFieldState] = useState<{hidden:boolean;customLabel?:string}>(() => {\n    try { return JSON.parse(localStorage.getItem(storageKey) || "null") || { hidden:false }; } catch { return { hidden:false }; }\n  });\n  const save = (next:{hidden:boolean;customLabel?:string}) => { setFieldState(next); localStorage.setItem(storageKey, JSON.stringify(next)); };\n  if (configurable && fieldState.hidden) return <div className={wide ? "wide editorFieldRestore" : "editorFieldRestore"}><button type="button" onClick={() => save({ ...fieldState, hidden:false })}>＋ {fieldState.customLabel || label}</button></div>;\n  return <label className={`${wide ? "wide " : ""}${configurable ? "editorManagedField" : ""}`}>\n    {configurable ? <span className="editorFieldHead"><span>{fieldState.customLabel || label}</span><span className="editorFieldActions"><button type="button" title="Edit field title" aria-label="Edit field title" onClick={(event) => { event.preventDefault(); const next = window.prompt("Field title:", fieldState.customLabel || label)?.trim(); if (next) save({ ...fieldState, customLabel:next }); }}>✎</button><button type="button" title="Remove field" aria-label="Remove field" onClick={(event) => { event.preventDefault(); save({ ...fieldState, hidden:true }); }}>×</button></span></span> : label}\n    {children}\n  </label>;\n}'''
new_field = '''function Field({ label, wide, configurable = false, fieldId, onVisibilityChange, children }: { label: string; wide?: boolean; configurable?: boolean; fieldId?: string; onVisibilityChange?: () => void; children: React.ReactNode }) {\n  const documentId = (() => { try { const ws = JSON.parse(localStorage.getItem("codecafe-cv-workspace-v2") || "null"); return ws?.activeDocumentId || "default"; } catch { return "default"; } })();\n  const legacyId = label.trim().toLocaleLowerCase().replace(/[^a-z0-9áéíóúñ]+/gi, "-").replace(/^-|-$/g, "");\n  const stableId = fieldId || legacyId;\n  const storageKey = `codecafe-configurable-field:${documentId}:${stableId}`;\n  const legacyKey = `codecafe-configurable-field:${documentId}:${legacyId}`;\n  const [fieldState, setFieldState] = useState<{hidden:boolean;customLabel?:string}>(() => {\n    try {\n      const stable = localStorage.getItem(storageKey);\n      if (stable) return JSON.parse(stable) || { hidden:false };\n      const legacy = localStorage.getItem(legacyKey);\n      if (legacy) { const parsed = JSON.parse(legacy) || { hidden:false }; localStorage.setItem(storageKey, JSON.stringify(parsed)); return parsed; }\n      return { hidden:false };\n    } catch { return { hidden:false }; }\n  });\n  const save = (next:{hidden:boolean;customLabel?:string}) => { setFieldState(next); localStorage.setItem(storageKey, JSON.stringify(next)); onVisibilityChange?.(); };\n  if (configurable && fieldState.hidden) return <div className={wide ? "wide editorFieldRestore" : "editorFieldRestore"}><button type="button" onClick={() => save({ ...fieldState, hidden:false })}>＋ {fieldState.customLabel || label}</button></div>;\n  return <label className={`${wide ? "wide " : ""}${configurable ? "editorManagedField" : ""}`}>\n    {configurable ? <span className="editorFieldHead"><span>{fieldState.customLabel || label}</span><span className="editorFieldActions"><button type="button" title="Edit field title" aria-label="Edit field title" onClick={(event) => { event.preventDefault(); const next = window.prompt("Field title:", fieldState.customLabel || label)?.trim(); if (next) save({ ...fieldState, customLabel:next }); }}>✎</button><button type="button" title="Remove field" aria-label="Remove field" onClick={(event) => { event.preventDefault(); save({ ...fieldState, hidden:true }); }}>×</button></span></span> : label}\n    {children}\n  </label>;\n}'''
if old_field in s:
    s = s.replace(old_field, new_field, 1)
elif 'fieldId?: string' not in s:
    raise SystemExit('ERROR: configurable Field implementation not found')

field_replacements = {
    '<Field label={t.summary} wide configurable>':'<Field label={t.summary} wide configurable fieldId="profile" onVisibilityChange={fieldVisibilityChanged}>',
    '<Field label={t.core} configurable>':'<Field label={t.core} configurable fieldId="core_skills" onVisibilityChange={fieldVisibilityChanged}>',
    '<Field label={t.tools} configurable>':'<Field label={t.tools} configurable fieldId="tools" onVisibilityChange={fieldVisibilityChanged}>',
    '<Field label={t.certifications} configurable>':'<Field label={t.certifications} configurable fieldId="certifications" onVisibilityChange={fieldVisibilityChanged}>',
    '<Field label={t.keywords} wide configurable>':'<Field label={t.keywords} wide configurable fieldId="skills" onVisibilityChange={fieldVisibilityChanged}>',
    '<Field label={t.education} wide configurable>':'<Field label={t.education} wide configurable fieldId="education" onVisibilityChange={fieldVisibilityChanged}>',
    '<Field label={t.languages} wide configurable>':'<Field label={t.languages} wide configurable fieldId="languages" onVisibilityChange={fieldVisibilityChanged}>',
}
for old, new in field_replacements.items():
    if old in s:
        s = s.replace(old, new, 1)

preview_replacements = {
    '<CVSection title={sectionTitle("profile", t.profileHeading)} defaultTitle={t.profileHeading} onTitleChange={(value) => setSectionTitle("profile", value)} resetLabel={t.resetTitle}><p>{cv.summary}</p></CVSection>':
    '{!isFieldHidden("profile", t.summary) && <CVSection title={sectionTitle("profile", t.profileHeading)} defaultTitle={t.profileHeading} onTitleChange={(value) => setSectionTitle("profile", value)} resetLabel={t.resetTitle}><p>{cv.summary}</p></CVSection>}',
    '{cv.coreSkills && <CVSection title={sectionTitle("core_skills", t.coreHeading)}':
    '{cv.coreSkills && !isFieldHidden("core_skills", t.core) && <CVSection title={sectionTitle("core_skills", t.coreHeading)}',
    '{cv.tools && <CVSection title={sectionTitle("tools", t.toolsHeading)}':
    '{cv.tools && !isFieldHidden("tools", t.tools) && <CVSection title={sectionTitle("tools", t.toolsHeading)}',
    '{cv.certifications && <CVSection title={sectionTitle("certifications", t.certificationsHeading)}':
    '{cv.certifications && !isFieldHidden("certifications", t.certifications) && <CVSection title={sectionTitle("certifications", t.certificationsHeading)}',
    '<CVSection title={sectionTitle("skills", t.skillsHeading)} defaultTitle={t.skillsHeading} onTitleChange={(value) => setSectionTitle("skills", value)} resetLabel={t.resetTitle}><StructuredLines value={cv.skills} /></CVSection>':
    '{!isFieldHidden("skills", t.keywords) && <CVSection title={sectionTitle("skills", t.skillsHeading)} defaultTitle={t.skillsHeading} onTitleChange={(value) => setSectionTitle("skills", value)} resetLabel={t.resetTitle}><StructuredLines value={cv.skills} /></CVSection>}',
}
for old, new in preview_replacements.items():
    if old in s:
        s = s.replace(old, new, 1)

old_two = '<div className="twoCols"><CVSection title={sectionTitle("education", t.educationHeading)} defaultTitle={t.educationHeading} onTitleChange={(value) => setSectionTitle("education", value)} resetLabel={t.resetTitle}><StructuredLines value={cv.education} /></CVSection><CVSection title={sectionTitle("languages", t.languagesHeading)} defaultTitle={t.languagesHeading} onTitleChange={(value) => setSectionTitle("languages", value)} resetLabel={t.resetTitle}><StructuredLines value={cv.languages} /></CVSection></div>'
new_two = '{(!isFieldHidden("education", t.education) || !isFieldHidden("languages", t.languages)) && <div className="twoCols">{!isFieldHidden("education", t.education) && <CVSection title={sectionTitle("education", t.educationHeading)} defaultTitle={t.educationHeading} onTitleChange={(value) => setSectionTitle("education", value)} resetLabel={t.resetTitle}><StructuredLines value={cv.education} /></CVSection>}{!isFieldHidden("languages", t.languages) && <CVSection title={sectionTitle("languages", t.languagesHeading)} defaultTitle={t.languagesHeading} onTitleChange={(value) => setSectionTitle("languages", value)} resetLabel={t.resetTitle}><StructuredLines value={cv.languages} /></CVSection>}</div>}'
if old_two in s:
    s = s.replace(old_two, new_two, 1)

app.write_text(s, encoding='utf-8')

final = app.read_text(encoding='utf-8')
assert 'fieldId="skills"' in final
assert 'fieldId="education"' in final
assert '!isFieldHidden("skills", t.keywords)' in final
assert '!isFieldHidden("education", t.education)' in final
assert 'onVisibilityChange?.()' in final
print('v1.6.3 configurable-field live preview visibility restored')
