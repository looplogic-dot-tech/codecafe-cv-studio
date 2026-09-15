from pathlib import Path

app = Path('src/App.tsx')
s = app.read_text(encoding='utf-8')

old = '''export function parseToolLines(value: string): ToolLine[] {
  return value.split("\\n").map((line) => line.trim()).filter(Boolean).map((line) => {
    const markdownBold = line.match(/^\\*\\*(.+?)\\*\\*(.*)$/);
    if (markdownBold) {
      const category = markdownBold[1].trim().replace(/:$/, "");
      const content = markdownBold[2].trim();
      return { category, content };
    }
    const separator = line.indexOf(":");
    if (separator <= 0) return { category: "", content: line };
    const category = line.slice(0, separator).trim();
    const content = line.slice(separator + 1).trim();
    return category ? { category, content } : { category: "", content: line };
  });
}
'''

new = '''export function parseToolLines(value: string): ToolLine[] {
  return value.split("\\n").map((line) => line.trim()).filter(Boolean).map((line) => {
    const markdownBold = line.match(/^\\*\\*(.+?)\\*\\*(.*)$/);
    if (markdownBold) {
      const category = markdownBold[1].trim().replace(/:$/, "");
      const content = markdownBold[2].trim();
      return { category, content };
    }

    // A colon is a category separator only when it occurs before a URL.
    // This prevents Markdown links such as [Certificate](https://example.com)
    // and bare URLs from being split at the `https:` colon before InlineText
    // gets a chance to render them as hyperlinks.
    const separator = line.indexOf(":");
    const httpIndex = line.search(/https?:\\/\\//i);
    if (separator <= 0 || (httpIndex >= 0 && separator >= httpIndex)) {
      return { category: "", content: line };
    }

    const category = line.slice(0, separator).trim();
    const content = line.slice(separator + 1).trim();
    return category ? { category, content } : { category: "", content: line };
  });
}
'''

if old not in s:
    if 'const httpIndex = line.search(/https?:\\/\\//i);' in s:
        print('v1.6.4.4 URL-safe structured-line parsing already applied')
    else:
        raise SystemExit('ERROR: parseToolLines block not found')
else:
    s = s.replace(old, new, 1)
    app.write_text(s, encoding='utf-8')
    print('v1.6.4.4 URL-safe structured-line parsing applied')

final = app.read_text(encoding='utf-8')
assert 'const httpIndex = line.search(/https?:\\/\\//i);' in final
assert 'separator >= httpIndex' in final
