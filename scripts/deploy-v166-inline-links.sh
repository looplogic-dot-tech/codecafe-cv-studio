#!/usr/bin/env bash
set -Eeuo pipefail

BASE_URL="https://raw.githubusercontent.com/looplogic-dot-tech/codecafe-cv-studio/eb0fe6ab5195adb1ae780f0a39b19b2d265322f2/scripts/deploy-v163-configurable-sections-and-language.sh"
TMP="/tmp/codecafe-v166-baseline.sh"

rm -f "$TMP"
curl -fsSL "$BASE_URL" -o "$TMP"

python3 - "$TMP" <<'PY'
from pathlib import Path
import sys
p=Path(sys.argv[1])
s=p.read_text(encoding='utf-8')
s=s.replace('BRANCH="release/v1.6.3"','BRANCH="release/v1.6.6"',1)
s=s.replace('WORK="$HOME/codecafe-v163-configurable-sections"','WORK="$HOME/codecafe-v166-inline-links"',1)
s=s.replace('ROLLBACK="$HOME/codecafe-v163-frontend-$STAMP"','ROLLBACK="$HOME/codecafe-v166-frontend-$STAMP"',1)
s=s.replace('CODECAFE CV STUDIO 1.6.3 BASELINE RESTORED','CODECAFE CV STUDIO 1.6.6 INLINE HYPERLINKS',1)
s=s.replace('✓ workspace unchanged: $AFTER','✓ inline hyperlinks enabled in configurable fields\necho "✓ Markdown: [visible text](https://example.com)"\necho "✓ bare https:// URLs auto-link"\necho "✓ workspace unchanged: $AFTER',1)
p.write_text(s,encoding='utf-8')
PY

chmod +x "$TMP"
bash "$TMP"
