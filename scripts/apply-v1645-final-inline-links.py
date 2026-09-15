from pathlib import Path
import re

app = Path('src/App.tsx')
s = app.read_text(encoding='utf-8')

# Replace InlineText with a single robust renderer used by preview content.
start = s.find('function InlineText({ value }: { value: string })')
end = s.find('\nfunction BoldInlineText', start)
if start < 0 or end < 0:
    raise SystemExit('ERROR: InlineText renderer not found')

inline = r'''function InlineText({ value }: { value: string }) {
  const nodes: React.ReactNode[] = [];
  const pattern = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)|(https?:\/\/[^\s<]+)/gi;
  let cursor = 0;
  let key = 0;

  for (const match of value.matchAll(pattern)) {
    const index = match.index ?? 0;
    if (index > cursor) nodes.push(value.slice(cursor, index));

    const label = match[1] || match[3] || '';
    let href = match[2] || match[3] || '';
    let trailing = '';

    if (!match[1]) {
      const trailingMatch = href.match(/[.,;:!?]+$/);
      trailing = trailingMatch?.[0] || '';
      if (trailing) href = href.slice(0, -trailing.length);
    }

    nodes.push(
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="cvInlineLink"
        data-cv-inline-link="1"
        key={`cv-inline-${key++}`}
        onClick={(event) => event.stopPropagation()}
      >
        {label}
      </a>
    );
    if (trailing) nodes.push(trailing);
    cursor = index + match[0].length;
  }

  if (cursor < value.length) nodes.push(value.slice(cursor));
  return <>{nodes}</>;
}
'''
s = s[:start] + inline + s[end:]

# Replace StructuredLines so every line reaches InlineText without losing URLs.
start = s.find('function StructuredLines({ value }: { value: string })')
end = s.find('\nfunction InlineText', start)
if start < 0 or end < 0:
    raise SystemExit('ERROR: StructuredLines renderer not found')
structured = r'''function StructuredLines({ value }: { value: string }) {
  return <>{value.split("\n").filter((line) => line.trim().length > 0).map((line, index) => (
    <p className="structuredLine" key={index}><InlineText value={line} /></p>
  ))}</>;
}
'''
s = s[:start] + structured + s[end:]

# ToolCategories retains category layout but always renders the content through InlineText.
start = s.find('function ToolCategories({ value }: { value: string })')
end = s.find('\nfunction StructuredLines', start)
if start < 0 or end < 0:
    raise SystemExit('ERROR: ToolCategories renderer not found')
tools = r'''function ToolCategories({ value }: { value: string }) {
  return <div className="toolCategories">{parseToolLines(value).map((line, index) => line.category
    ? <div className="toolCategory" key={`${line.category}-${index}`}><b>{line.category}</b><p><InlineText value={line.content} /></p></div>
    : <p className="skillText" key={index}><InlineText value={line.content} /></p>)}</div>;
}
'''
s = s[:start] + tools + s[end:]

# Summary and job bullets are configurable content too.
s = s.replace('<CVSection title={sectionTitle("profile", t.profileHeading)} defaultTitle={t.profileHeading} onTitleChange={(value) => setSectionTitle("profile", value)} resetLabel={t.resetTitle}><p>{cv.summary}</p></CVSection>',
              '<CVSection title={sectionTitle("profile", t.profileHeading)} defaultTitle={t.profileHeading} onTitleChange={(value) => setSectionTitle("profile", value)} resetLabel={t.resetTitle}><p><InlineText value={cv.summary} /></p></CVSection>')
s = s.replace('<li key={n}>{bullet}</li>', '<li key={n}><InlineText value={bullet} /></li>')

# Printable/PDF renderer: same syntax, same result.
start = s.find('function printableInlineText(value: string): string')
end = s.find('\nfunction printableRepository', start)
if start < 0 or end < 0:
    raise SystemExit('ERROR: printableInlineText renderer not found')
printable = r'''function printableInlineText(value: string): string {
  const pattern = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)|(https?:\/\/[^\s<]+)/gi;
  let cursor = 0;
  let html = "";
  for (const match of value.matchAll(pattern)) {
    const index = match.index ?? 0;
    html += escapeHtml(value.slice(cursor, index));
    const label = match[1] || match[3] || "";
    let href = match[2] || match[3] || "";
    let trailing = "";
    if (!match[1]) {
      const trailingMatch = href.match(/[.,;:!?]+$/);
      trailing = trailingMatch?.[0] || "";
      if (trailing) href = href.slice(0, -trailing.length);
    }
    html += `<a href="${escapeHtml(href)}">${escapeHtml(label)}</a>${escapeHtml(trailing)}`;
    cursor = index + match[0].length;
  }
  return html + escapeHtml(value.slice(cursor));
}
'''
s = s[:start] + printable + s[end:]

# Ensure printable summary, job bullets and tool content use the hyperlink renderer.
s = s.replace('cv.summary ? `<p>${escapeHtml(cv.summary)}</p>` : ""', 'cv.summary ? `<p>${printableInlineText(cv.summary)}</p>` : ""')
s = s.replace('`<li>${escapeHtml(line)}</li>`', '`<li>${printableInlineText(line)}</li>`')
s = s.replace('`${content ? `<p>${escapeHtml(content)}</p>` : ""}</div>`', '`${content ? `<p>${printableInlineText(content)}</p>` : ""}</div>`')
s = s.replace(': `<p>${escapeHtml(content)}</p>`).join("");', ': `<p>${printableInlineText(content)}</p>`).join("");')

app.write_text(s, encoding='utf-8')

css = Path('src/styles.css')
cs = css.read_text(encoding='utf-8')
marker = '/* codecafe-inline-links-v1645 */'
if marker not in cs:
    cs += '''\n/* codecafe-inline-links-v1645 */\n.paper a.cvInlineLink,.printEditorFlowContent a.cvInlineLink{color:#1459c7!important;text-decoration:underline!important;text-underline-offset:2px;cursor:pointer!important;pointer-events:auto!important}.paper a.cvInlineLink:hover,.printEditorFlowContent a.cvInlineLink:hover{text-decoration-thickness:2px!important}\n'''
css.write_text(cs, encoding='utf-8')

final = app.read_text(encoding='utf-8')
assert 'data-cv-inline-link="1"' in final
assert '<StructuredLines value={cv.certifications} />' in final
assert '<InlineText value={cv.summary} />' in final
assert '<li key={n}><InlineText value={bullet} /></li>' in final
assert 'printableInlineText(cv.summary)' in final
print('v1.6.4.5 final inline hyperlink renderer applied')
