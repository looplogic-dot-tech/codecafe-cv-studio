from pathlib import Path
import re

app = Path('src/App.tsx')
s = app.read_text(encoding='utf-8')

# Replace the inline renderer with a robust parser that supports:
#   [label](https://example.com/path)
#   bare https://example.com/path
# It deliberately leaves the editor textarea untouched and only renders links
# in Live Preview / printable output.
start = s.find('function InlineText({ value }: { value: string })')
end = s.find('\nfunction BoldInlineText', start)
if start < 0 or end < 0:
    raise SystemExit('ERROR: InlineText renderer not found')

inline = r'''function InlineText({ value }: { value: string }) {
  const nodes: React.ReactNode[] = [];
  const pattern = /\[([^\]]+)\]\((https?:\/\/[^\s]+)\)|(https?:\/\/[^\s<]+)/gi;
  let cursor = 0;
  let key = 0;

  for (const match of value.matchAll(pattern)) {
    const index = match.index ?? 0;
    if (index > cursor) nodes.push(value.slice(cursor, index));

    let label = match[1] || match[3] || '';
    let href = match[2] || match[3] || '';

    // Markdown links end at the final ')' of the token. Bare URLs keep normal URL punctuation.
    if (match[1] && href.endsWith(')')) href = href.slice(0, -1);
    if (!match[1]) {
      const trailing = href.match(/[.,;:!?]+$/)?.[0] || '';
      if (trailing) href = href.slice(0, -trailing.length);
    }

    nodes.push(
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="cvInlineLink"
        key={`cv-link-${key++}`}
        onClick={(event) => event.stopPropagation()}
      >
        {label}
      </a>
    );

    cursor = index + match[0].length;
  }

  if (cursor < value.length) nodes.push(value.slice(cursor));
  return <>{nodes}</>;
}
'''
s = s[:start] + inline + s[end:]

start = s.find('function printableInlineText(value: string): string')
end = s.find('\nfunction printableRepository', start)
if start < 0 or end < 0:
    raise SystemExit('ERROR: printableInlineText renderer not found')

printable = r'''function printableInlineText(value: string): string {
  const pattern = /\[([^\]]+)\]\((https?:\/\/[^\s]+)\)|(https?:\/\/[^\s<]+)/gi;
  let cursor = 0;
  let html = "";

  for (const match of value.matchAll(pattern)) {
    const index = match.index ?? 0;
    html += escapeHtml(value.slice(cursor, index));

    const label = match[1] || match[3] || "";
    let href = match[2] || match[3] || "";
    if (match[1] && href.endsWith(')')) href = href.slice(0, -1);
    if (!match[1]) href = href.replace(/[.,;:!?]+$/, '');

    html += `<a href="${escapeHtml(href)}">${escapeHtml(label)}</a>`;
    cursor = index + match[0].length;
  }

  html += escapeHtml(value.slice(cursor));
  return html;
}
'''
s = s[:start] + printable + s[end:]

# Summary is configurable and previously bypassed InlineText entirely.
s = s.replace(
    '<p>{cv.summary}</p>',
    '<p><InlineText value={cv.summary} /></p>'
)

# Tool categories are configurable too; render their content through InlineText.
s = s.replace(
    '<p>{line.content}</p></div>',
    '<p><InlineText value={line.content} /></p></div>'
)
s = s.replace(
    ': <p className="skillText" key={index}>{line.content}</p>)}</div>;',
    ': <p className="skillText" key={index}><InlineText value={line.content} /></p>)}</div>;'
)

# Printable summary/tools must use the same hyperlink renderer.
s = s.replace(
    'cv.summary ? `<p>${escapeHtml(cv.summary)}</p>` : ""',
    'cv.summary ? `<p>${printableInlineText(cv.summary)}</p>` : ""'
)
s = s.replace(
    '`${content ? `<p>${escapeHtml(content)}</p>` : ""}</div>`',
    '`${content ? `<p>${printableInlineText(content)}</p>` : ""}</div>`'
)
s = s.replace(
    ': `<p>${escapeHtml(content)}</p>`).join("");',
    ': `<p>${printableInlineText(content)}</p>`).join("");'
)

app.write_text(s, encoding='utf-8')

css = Path('src/styles.css')
cs = css.read_text(encoding='utf-8')
marker = '/* codecafe-inline-links-v1642 */'
if marker not in cs:
    cs += '''\n/* codecafe-inline-links-v1642 */\n.paper a.cvInlineLink{color:#1f5fbf;text-decoration:underline;text-underline-offset:2px;cursor:pointer;pointer-events:auto}.paper a.cvInlineLink:hover{text-decoration-thickness:2px}.printEditorFlowContent a.cvInlineLink{color:#1f5fbf;text-decoration:underline;pointer-events:auto}\n'''
css.write_text(cs, encoding='utf-8')

final = app.read_text(encoding='utf-8')
assert 'className="cvInlineLink"' in final
assert '<InlineText value={cv.summary} />' in final
assert 'printableInlineText(cv.summary)' in final
assert 'href={href}' in final
print('v1.6.4.2 hyperlink rendering correction applied')
