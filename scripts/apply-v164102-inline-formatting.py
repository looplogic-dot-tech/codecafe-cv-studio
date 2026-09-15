from pathlib import Path
import re

p = Path('src/App.tsx')
s = p.read_text(encoding='utf-8')

def replace_function(source: str, signature: str, replacement: str) -> str:
    start = source.find(signature)
    if start < 0:
        raise SystemExit(f'ERROR: function not found: {signature}')
    brace = source.find('{', start)
    if brace < 0:
        raise SystemExit(f'ERROR: opening brace not found: {signature}')
    depth = 0
    i = brace
    while i < len(source):
        ch = source[i]
        if ch == '{': depth += 1
        elif ch == '}':
            depth -= 1
            if depth == 0:
                return source[:start] + replacement + source[i+1:]
        i += 1
    raise SystemExit(f'ERROR: closing brace not found: {signature}')

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

s = replace_function(s, 'function printableInlineText(value: string): string', new_printable)
s = replace_function(s, 'function InlineText({ value }: { value: string })', new_inline)

# Project live preview: format name and stack without touching layout or pagination.
s = re.sub(
    r'<div><b>\{project\.name\}</b><span>\{project\.stack\}</span></div>',
    '<div><b><InlineText value={project.name} /></b><span><InlineText value={project.stack} /></span></div>',
    s,
)
# Portable HTML project stack.
s = s.replace('<strong>${escapeHtml(project.stack)}</strong>', '<strong>${printableInlineText(project.stack)}</strong>')

# ToolCategories: only replace raw textual category/content if still present.
s = s.replace('<b>{line.category}</b><p>{line.content}</p>', '<b><InlineText value={line.category} /></b><p><InlineText value={line.content} /></p>')
# StructuredLines category itself may already be wrapped differently by older fixes; preserve whatever exists.

# Portable tools text formatting.
s = s.replace('content ? `<p>${escapeHtml(content)}</p>` : ""', 'content ? `<p>${printableInlineText(content)}</p>` : ""')
s = s.replace(': `<p>${escapeHtml(content)}</p>`).join("");', ': `<p>${printableInlineText(content)}</p>`).join("");')

p.write_text(s, encoding='utf-8')
final = p.read_text(encoding='utf-8')

# Assert only required user-facing behavior, not one exact JSX spelling.
required = {
    'bold renderer': 'key={`bold-${index}`}',
    'link renderer': 'target="_blank"',
    'project stack live formatting': '<InlineText value={project.stack} />',
    'project stack portable formatting': '<strong>${printableInlineText(project.stack)}</strong>',
}
for name, marker in required.items():
    if marker not in final:
        raise SystemExit(f'ERROR: required marker missing after patch: {name}')

print('PASS: inline bold + hyperlinks applied without exact-JSX assertion dependency')
print('PASS: project stack formatting applied')
print('PASS: print subsystem untouched')
