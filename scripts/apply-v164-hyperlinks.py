from pathlib import Path

app = Path("src/App.tsx")
s = app.read_text(encoding="utf-8")

# 1) Make browser preview hyperlink-aware in every reusable/configurable text area.
old_tool = '''function ToolCategories({ value }: { value: string }) {
  return <div className="toolCategories">{parseToolLines(value).map((line, index) => line.category
    ? <div className="toolCategory" key={`${line.category}-${index}`}><b>{line.category}</b><p>{line.content}</p></div>
    : <p className="skillText" key={index}>{line.content}</p>)}</div>;
}'''
new_tool = '''function ToolCategories({ value }: { value: string }) {
  return <div className="toolCategories">{parseToolLines(value).map((line, index) => line.category
    ? <div className="toolCategory" key={`${line.category}-${index}`}><b>{line.category}</b><p><InlineText value={line.content} /></p></div>
    : <p className="skillText" key={index}><InlineText value={line.content} /></p>)}</div>;
}'''
if old_tool in s:
    s = s.replace(old_tool, new_tool, 1)

old_summary = '<CVSection title={sectionTitle("profile", t.profileHeading)} defaultTitle={t.profileHeading} onTitleChange={(value) => setSectionTitle("profile", value)} resetLabel={t.resetTitle}><p>{cv.summary}</p></CVSection>'
new_summary = '<CVSection title={sectionTitle("profile", t.profileHeading)} defaultTitle={t.profileHeading} onTitleChange={(value) => setSectionTitle("profile", value)} resetLabel={t.resetTitle}><p><InlineText value={cv.summary} /></p></CVSection>'
if old_summary in s:
    s = s.replace(old_summary, new_summary, 1)

# 2) Extend InlineText: support both Markdown [label](https://...) and bare https:// URLs.
start = s.find('function InlineText({ value }: { value: string }) {')
end = s.find('\nfunction BoldInlineText', start)
if start < 0 or end < 0:
    raise SystemExit('ERROR: InlineText function not found')
new_inline = r'''function InlineText({ value }: { value: string }) {
  const parts: React.ReactNode[] = [];
  const tokenPattern = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)|(https?:\/\/[^\s<]+)/gi;
  let cursor = 0;
  for (const match of value.matchAll(tokenPattern)) {
    const index = match.index ?? 0;
    if (index > cursor) parts.push(value.slice(cursor, index));
    const href = match[2] || match[3];
    const label = match[1] || href;
    parts.push(<a href={href} target="_blank" rel="noreferrer" key={`${index}-${href}`}>{label}</a>);
    cursor = index + match[0].length;
  }
  if (cursor < value.length) parts.push(value.slice(cursor));
  return <>{parts}</>;
}
'''
s = s[:start] + new_inline + s[end:]

# 3) Printable/Drive HTML must preserve those same hyperlinks.
start = s.find('function printableInlineText(value: string): string {')
end = s.find('\nfunction printableRepository', start)
if start < 0 or end < 0:
    raise SystemExit('ERROR: printableInlineText function not found')
new_printable_inline = r'''function printableInlineText(value: string): string {
  const tokenPattern = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)|(https?:\/\/[^\s<]+)/gi;
  let cursor = 0;
  let html = "";
  for (const match of value.matchAll(tokenPattern)) {
    const index = match.index ?? 0;
    html += escapeHtml(value.slice(cursor, index));
    const href = match[2] || match[3];
    const label = match[1] || href;
    html += `<a href="${escapeHtml(href)}">${escapeHtml(label)}</a>`;
    cursor = index + match[0].length;
  }
  return html + escapeHtml(value.slice(cursor));
}
'''
s = s[:start] + new_printable_inline + s[end:]

old_printable_tools = '''function printableTools(value: string): string {
  return parseToolLines(value).map(({ category, content }) => category
    ? `<div class="tool-category"><strong>${escapeHtml(category)}</strong>${content ? `<p>${escapeHtml(content)}</p>` : ""}</div>`
    : `<p>${escapeHtml(content)}</p>`).join("");
}'''
new_printable_tools = '''function printableTools(value: string): string {
  return parseToolLines(value).map(({ category, content }) => category
    ? `<div class="tool-category"><strong>${escapeHtml(category)}</strong>${content ? `<p>${printableInlineText(content)}</p>` : ""}</div>`
    : `<p>${printableInlineText(content)}</p>`).join("");
}'''
if old_printable_tools in s:
    s = s.replace(old_printable_tools, new_printable_tools, 1)

old_printable_summary = '${section(title("profile", labels.profileHeading), cv.summary ? `<p>${escapeHtml(cv.summary)}</p>` : "")}'
new_printable_summary = '${section(title("profile", labels.profileHeading), cv.summary ? `<p>${printableInlineText(cv.summary)}</p>` : "")}'
if old_printable_summary in s:
    s = s.replace(old_printable_summary, new_printable_summary, 1)

# 4) Add a concise editing hint for configurable text fields without changing fixed identity fields.
for lang_marker, old, new in [
    ('es', 'optional: "Opcional: las secciones vacías no se imprimen",', 'optional: "Opcional: las secciones vacías no se imprimen", linkHint: "Enlaces: pega https://... o usa [texto](https://...)",'),
    ('en', 'optional: "Optional: empty sections are not printed",', 'optional: "Optional: empty sections are not printed", linkHint: "Links: paste https://... or use [text](https://...)",'),
]:
    if old in s and 'linkHint:' not in s[s.find(old)-400:s.find(old)+400]:
        s = s.replace(old, new, 1)

# Put the hyperlink hint where users are currently editing certifications/coursework.
old_cert = '<Field label={t.certifications}><textarea className={inputClass} rows={4} value={cv.certifications} onChange={(e) => set("certifications", e.target.value)} /></Field>'
new_cert = '<Field label={t.certifications}><textarea className={inputClass} rows={4} value={cv.certifications} onChange={(e) => set("certifications", e.target.value)} /><small className="hint">{t.linkHint}</small></Field>'
if old_cert in s:
    s = s.replace(old_cert, new_cert, 1)

app.write_text(s, encoding="utf-8")
print("v1.6.4 hyperlink support applied: Markdown links + bare URLs in configurable CV content and printable output.")
