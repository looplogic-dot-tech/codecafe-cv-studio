from pathlib import Path

p = Path('src/App.tsx')
s = p.read_text(encoding='utf-8')

# Replace functions by explicit neighboring function boundaries. Do NOT parse braces:
# TS/JS parameter destructuring and template literals make brace-count patches fragile.
def replace_between(source: str, start_sig: str, next_sig: str, replacement: str) -> str:
    start = source.find(start_sig)
    if start < 0:
        raise SystemExit(f'ERROR: start marker not found: {start_sig}')
    end = source.find(next_sig, start)
    if end < 0:
        raise SystemExit(f'ERROR: end marker not found: {next_sig}')
    return source[:start] + replacement.rstrip() + '\n\n' + source[end:]

# Portable/editable HTML renderer: hyperlinks and **bold** may appear anywhere in a field,
# including bold text inside a hyperlink label. Text remains escaped.
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

s = replace_between(
    s,
    'function printableInlineText(value: string): string {',
    'function printableRepository(',
    new_printable,
)

# Live React renderer. Locate it after StructuredLines and before BoldInlineText.
# This preserves links and restores inline **bold** without touching layout/print code.
new_inline = r'''function InlineText({ value }: { value: string }) {
  const parts: React.ReactNode[] = [];
  const tokenPattern = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)|\*\*(.+?)\*\*/gi;
  let cursor = 0;
  for (const match of value.matchAll(tokenPattern)) {
    const index = match.index ?? 0;
    if (index > cursor) parts.push(value.slice(cursor, index));
    if (match[1] !== undefined && match[2] !== undefined) {
      parts.push(
        <a href={match[2]} target="_blank" rel="noreferrer" key={`link-${index}-${match[2]}`}>
          <InlineText value={match[1]} />
        </a>,
      );
    } else if (match[3] !== undefined) {
      parts.push(<b key={`bold-${index}`}><InlineText value={match[3]} /></b>);
    }
    cursor = index + match[0].length;
  }
  if (cursor < value.length) parts.push(value.slice(cursor));
  return <>{parts}</>;
}'''

# InlineText is injected by the existing hyperlink patches during prebuild.
if 'function InlineText({ value }: { value: string }) {' not in s:
    raise SystemExit('ERROR: InlineText renderer missing before isolated bold fix')
s = replace_between(
    s,
    'function InlineText({ value }: { value: string }) {',
    'function BoldInlineText(',
    new_inline,
)

# Project stack already routes through BoldInlineText from 1.6.4.10.2.3.
# Make its printable companion use the same general inline renderer so **...** is stripped/rendered.
s = s.replace(
    '<strong>${printableBoldInline(project.stack)}</strong>',
    '<strong>${printableInlineText(project.stack)}</strong>',
)
s = s.replace(
    '<strong>${escapeHtml(project.stack)}</strong>',
    '<strong>${printableInlineText(project.stack)}</strong>',
)

p.write_text(s, encoding='utf-8')
final = p.read_text(encoding='utf-8')

# Focused regression guards. These fail before build/deploy if any protected behavior disappears.
checks = {
    'live inline bold': 'key={`bold-${index}`}',
    'live hyperlinks': 'target="_blank" rel="noreferrer"',
    'portable inline bold': '<strong>${printableInlineText(match[3])}</strong>',
    'portable hyperlinks': '<a href="${escapeHtml(match[2])}">${printableInlineText(match[1])}</a>',
    'technology stack live renderer': '<BoldInlineText value={project.stack} />',
    'technology stack portable renderer': '<strong>${printableInlineText(project.stack)}</strong>',
    'canonical CV deletion': 'const latest = loadWorkspaceLocal(workspace);',
    'Drive live-preview PDF': 'pdfBlob: await renderCurrentLivePreviewPdf()',
    'local editable DOC': 'application/msword',
}
for name, marker in checks.items():
    if marker not in final:
        raise SystemExit(f'ERROR: regression guard failed: {name}')

print('PASS: **inline bold** restored in Live Preview')
print('PASS: hyperlinks retained')
print('PASS: Technology Stack bold retained without literal asterisks')
print('PASS: Drive Live Preview PDF path retained')
print('PASS: local editable DOC retained')
print('PASS: canonical CV deletion retained')
print('PASS: printEditorV3.ts and livePreviewPages.ts untouched')
