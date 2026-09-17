from pathlib import Path

p = Path('src/App.tsx')
s = p.read_text(encoding='utf-8')

old_inline = '''function InlineText({ value }: { value: string }) {\n  const parts: React.ReactNode[] = [];\n  const linkPattern = /\\[([^\\]]+)\\]\\((https?:\\/\\/[^\\s)]+)\\)/gi;\n  let cursor = 0;\n  for (const match of value.matchAll(linkPattern)) {\n    if ((match.index ?? 0) > cursor) parts.push(value.slice(cursor, match.index));\n    parts.push(<a href={match[2]} target="_blank" rel="noreferrer" key={`${match.index}-${match[2]}`}>{match[1]}</a>);\n    cursor = (match.index ?? 0) + match[0].length;\n  }\n  if (cursor < value.length) parts.push(value.slice(cursor));\n  return <>{parts}</>;\n}'''
new_inline = '''function InlineText({ value }: { value: string }) {\n  const parts: React.ReactNode[] = [];\n  const inlinePattern = /\\*\\*([^*]+?)\\*\\*|\\[([^\\]]+)\\]\\((https?:\\/\\/[^\\s)]+)\\)/gi;\n  let cursor = 0;\n  for (const match of value.matchAll(inlinePattern)) {\n    const index = match.index ?? 0;\n    if (index > cursor) parts.push(value.slice(cursor, index));\n    if (match[1] !== undefined) {\n      parts.push(<b key={`b-${index}`}><InlineText value={match[1]} /></b>);\n    } else {\n      parts.push(<a href={match[3]} target="_blank" rel="noreferrer" key={`a-${index}-${match[3]}`}>{match[2]}</a>);\n    }\n    cursor = index + match[0].length;\n  }\n  if (cursor < value.length) parts.push(value.slice(cursor));\n  return <>{parts}</>;\n}'''
if old_inline not in s:
    raise SystemExit('ERROR: InlineText baseline not found')
s = s.replace(old_inline, new_inline, 1)

old_print = '''function printableInlineText(value: string): string {\n  const linkPattern = /\\[([^\\]]+)\\]\\((https?:\\/\\/[^\\s)]+)\\)/gi;\n  let cursor = 0;\n  let html = "";\n  for (const match of value.matchAll(linkPattern)) {\n    html += escapeHtml(value.slice(cursor, match.index));\n    html += `<a href="${escapeHtml(match[2])}">${escapeHtml(match[1])}</a>`;\n    cursor = (match.index ?? 0) + match[0].length;\n  }\n  return html + escapeHtml(value.slice(cursor));\n}'''
new_print = '''function printableInlineText(value: string): string {\n  const inlinePattern = /\\*\\*([^*]+?)\\*\\*|\\[([^\\]]+)\\]\\((https?:\\/\\/[^\\s)]+)\\)/gi;\n  let cursor = 0;\n  let html = "";\n  for (const match of value.matchAll(inlinePattern)) {\n    const index = match.index ?? 0;\n    html += escapeHtml(value.slice(cursor, index));\n    if (match[1] !== undefined) html += `<strong>${printableInlineText(match[1])}</strong>`;\n    else html += `<a href="${escapeHtml(match[3])}">${escapeHtml(match[2])}</a>`;\n    cursor = index + match[0].length;\n  }\n  return html + escapeHtml(value.slice(cursor));\n}'''
if old_print not in s:
    raise SystemExit('ERROR: printableInlineText baseline not found')
s = s.replace(old_print, new_print, 1)

s = s.replace('<b>{line.category}</b><p>{line.content}</p>', '<b>{line.category}</b><p><InlineText value={line.content} /></p>', 1)
s = s.replace('<span>{project.stack}</span>', '<span><InlineText value={project.stack} /></span>', 1)
s = s.replace('<strong>${escapeHtml(project.stack)}</strong>', '${printableInlineText(project.stack)}', 1)

p.write_text(s, encoding='utf-8')
final = p.read_text(encoding='utf-8')
assert 'const inlinePattern = /\\*\\*([^*]+?)\\*\\*|' in final
assert '<InlineText value={project.stack} />' in final
assert '<p><InlineText value={line.content} /></p>' in final
assert '${printableInlineText(project.stack)}' in final
print('PASS: inline **bold** restored without removing hyperlink support')
print('PASS: Technology Stack and tool content use the same inline renderer')
print('PASS: printable editable output uses the same bold/link syntax')
