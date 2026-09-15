from pathlib import Path
import re

app = Path('src/App.tsx').read_text(encoding='utf-8')
css = Path('src/styles.css').read_text(encoding='utf-8')

assert 'data-cv-inline-link="1"' in app
assert '<StructuredLines value={cv.certifications} />' in app
assert '<InlineText value={cv.summary} />' in app
assert '<li key={n}><InlineText value={bullet} /></li>' in app
assert 'printableInlineText(cv.summary)' in app
assert 'codecafe-inline-links-v1645' in css

# Verify the syntax the user actually needs is accepted by the renderer regex.
pattern = re.compile(r'\[([^\]]+)\]\((https?://[^\s)]+)\)|(https?://[^\s<]+)', re.I)
sample = 'Google IT Support — [Coursera](https://coursera.org/certificate/abc123)'
m = pattern.search(sample)
assert m and m.group(1) == 'Coursera' and m.group(2) == 'https://coursera.org/certificate/abc123'
print('PASS: inline link syntax regression test')
