from pathlib import Path

p=Path('src/App.tsx')
s=p.read_text(encoding='utf-8')
start=s.find('function InlineText({ value }: { value: string })')
end=s.find('\nfunction BoldInlineText', start)
if start<0 or end<0: raise SystemExit('ERROR: InlineText not found')
s=s[:start]+r'''function InlineText({ value }: { value: string }) {
  const nodes: React.ReactNode[] = [];
  const pattern = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)|(https?:\/\/[^\s<]+)/gi;
  let cursor = 0;
  let key = 0;
  for (const match of value.matchAll(pattern)) {
    const index = match.index ?? 0;
    if (index > cursor) nodes.push(value.slice(cursor, index));
    const label = match[1] || match[3];
    const href = match[2] || match[3];
    nodes.push(<a href={href} target="_blank" rel="noreferrer" key={`link-${key++}`}>{label}</a>);
    cursor = index + match[0].length;
  }
  if (cursor < value.length) nodes.push(value.slice(cursor));
  return <>{nodes}</>;
}
'''+s[end:]
start=s.find('function printableInlineText(value: string): string')
end=s.find('\nfunction printableRepository', start)
if start<0 or end<0: raise SystemExit('ERROR: printableInlineText not found')
s=s[:start]+r'''function printableInlineText(value: string): string {
  const pattern = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)|(https?:\/\/[^\s<]+)/gi;
  let cursor = 0;
  let html = "";
  for (const match of value.matchAll(pattern)) {
    const index = match.index ?? 0;
    html += escapeHtml(value.slice(cursor, index));
    const label = match[1] || match[3];
    const href = match[2] || match[3];
    html += `<a href="${escapeHtml(href)}">${escapeHtml(label)}</a>`;
    cursor = index + match[0].length;
  }
  html += escapeHtml(value.slice(cursor));
  return html;
}
'''+s[end:]
p.write_text(s,encoding='utf-8')
print('v1.6.4 inline hyperlinks applied')
