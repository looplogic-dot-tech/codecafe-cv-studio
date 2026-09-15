from pathlib import Path

p = Path('src/App.tsx')
s = p.read_text(encoding='utf-8')

def replace_between(source: str, start_marker: str, end_marker: str, replacement: str) -> str:
    start = source.find(start_marker)
    if start < 0:
        raise SystemExit(f'ERROR: start marker not found: {start_marker}')
    end = source.find(end_marker, start)
    if end < 0:
        raise SystemExit(f'ERROR: end marker not found: {end_marker}')
    return source[:start] + replacement + '\n\n' + source[end:]

new_printable = r'''function printableInlineText(value: string): string {
  const tokenPattern = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)|\*\*(.+?)\*\*/gi;
  let cursor = 0;
  let html = "";
  for (const match of value.matchAll(tokenPattern)) {
    const index = match.index ?? 0;
    html += escapeHtml(value.slice(cursor, index));
    if (match[1] !== undefined && match[2] !== undefined) {
      html += `<a href="${escapeHtml(match[2])}">${printableInlineText(match[1])}</a>`;
    } else if (match[3] !== undefined) {
      html += `<strong>${printableInlineText(match[3])}</strong>`;
    }
    cursor = index + match[0].length;
  }
  return html + escapeHtml(value.slice(cursor));
}'''

new_inline = r'''function InlineText({ value }: { value: string }) {
  const parts: React.ReactNode[] = [];
  const tokenPattern = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)|\*\*(.+?)\*\*/gi;
  let cursor = 0;
  for (const match of value.matchAll(tokenPattern)) {
    const index = match.index ?? 0;
    if (index > cursor) parts.push(value.slice(cursor, index));
    if (match[1] !== undefined && match[2] !== undefined) {
      parts.push(<a href={match[2]} target="_blank" rel="noreferrer" key={`link-${index}-${match[2]}`}><InlineText value={match[1]} /></a>);
    } else if (match[3] !== undefined) {
      parts.push(<b key={`bold-${index}`}><InlineText value={match[3]} /></b>);
    }
    cursor = index + match[0].length;
  }
  if (cursor < value.length) parts.push(value.slice(cursor));
  return <>{parts}</>;
}'''

s = replace_between(s, 'function printableInlineText(value: string): string', 'function printableRepository', new_printable)
s = replace_between(s, 'function InlineText({ value }: { value: string })', 'function BoldInlineText', new_inline)

s = s.replace('<b>{line.category}</b><p>{line.content}</p>', '<b><InlineText value={line.category} /></b><p><InlineText value={line.content} /></p>')
s = s.replace('<b>{line.category}{line.content ? ":" : ""}</b>', '<b><InlineText value={line.category} />{line.content ? ":" : ""}</b>')
s = s.replace('<div><b>{project.name}</b><span>{project.stack}</span></div>', '<div><b><InlineText value={project.name} /></b><span><InlineText value={project.stack} /></span></div>')
s = s.replace('<strong>${escapeHtml(project.stack)}</strong>', '<strong>${printableInlineText(project.stack)}</strong>')
s = s.replace('content ? `<p>${escapeHtml(content)}</p>` : ""', 'content ? `<p>${printableInlineText(content)}</p>` : ""')
s = s.replace(': `<p>${escapeHtml(content)}</p>`).join("");', ': `<p>${printableInlineText(content)}</p>`).join("");')

p.write_text(s, encoding='utf-8')
final = p.read_text(encoding='utf-8')
assert 'function InlineText({ value }: { value: string }) {' in final
assert 'function BoldInlineText' in final
assert 'key={`bold-${index}`}' in final
assert '<span><InlineText value={project.stack} /></span>' in final
assert '<strong>${printableInlineText(project.stack)}</strong>' in final
assert '} : { value: string }) {' not in final
print('PASS: inline formatter replaced safely using function boundaries')
print('PASS: no malformed TypeScript signature remains')
print('PASS: print subsystem untouched')
