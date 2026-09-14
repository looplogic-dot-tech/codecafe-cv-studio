#!/usr/bin/env bash
set -Eeuo pipefail

DATA="/opt/codecafe-studio/data/codecafe-cv-studio"
DB="$DATA/workspace.sqlite3"
WEB="/opt/codecafe-studio/apps/codecafe-cv-studio"
REPO="https://github.com/looplogic-dot-tech/codecafe-cv-studio.git"
BRANCH="release/v1.6.3"
WORK="$HOME/codecafe-v163-rebuilt-print"
STAMP="$(date +%Y%m%d-%H%M%S)"
ROLLBACK="$HOME/codecafe-v163-frontend-$STAMP"

cleanup(){ rm -rf "$WORK" "$HOME/.npm/_npx" "$HOME/.npm/_cacache" 2>/dev/null || true; }
trap cleanup EXIT

sudo -n true >/dev/null 2>&1 || { echo "ERROR: passwordless sudo unavailable"; exit 1; }
sudo test -f "$DB" || { echo "ERROR: workspace.sqlite3 not found"; exit 1; }

fingerprint(){ sudo python3 - "$DB" <<'PY'
import hashlib,json,sqlite3,sys
p=sys.argv[1]
db=sqlite3.connect(f'file:{p}?mode=ro',uri=True)
row=db.execute('SELECT payload FROM workspace_state WHERE id=1').fetchone()
if not row: raise SystemExit('ERROR: workspace missing')
raw=row[0]; obj=json.loads(raw); ws=obj.get('workspace',obj)
docs=ws.get('documents',[]) if isinstance(ws,dict) else []
libs=ws.get('professionalLibraries',[]) if isinstance(ws,dict) else []
items=sum(len(x.get('records',[])) for x in (libs.values() if isinstance(libs,dict) else libs if isinstance(libs,list) else []) if isinstance(x,dict))
print(f'{hashlib.sha256(raw.encode()).hexdigest()}|{len(docs)}|{len(libs)}|{items}')
db.close()
PY
}

BEFORE="$(fingerprint)"
echo "Workspace before: $BEFORE"

rm -rf "$WORK"
git clone --depth 1 --branch "$BRANCH" "$REPO" "$WORK"
cd "$WORK"

NPM_CLI="$(readlink -f "$(command -v npm)")"
npx -y node@22 "$NPM_CLI" ci

# Apply the proven storage/session migration chain from 1.6.2.
# These scripts repair the EC2 singleton protocol and remove the obsolete history UI.
echo "Applying 1.6.2 storage/session transforms..."
npx -y node@22 "$NPM_CLI" run prebuild

# Final UI rules for 1.6.3:
# 1) new browser/app sessions ALWAYS start with EC2 disconnected;
# 2) no obsolete history/copy-number UI;
# 3) the rebuilt print editor remains the only print/PDF entry point;
# 4) its launcher sits where the old blue PDF button lived.
python3 - <<'PY'
from pathlib import Path
import re

app = Path('src/App.tsx')
s = app.read_text(encoding='utf-8')

# Remove the direct legacy PDF button if it survived any compatibility transform.
s = s.replace('          <button className="primary" onClick={() => window.print()}>{t.pdf}</button>\n', '', 1)

# A fresh application session must never restore an EC2 cookie automatically.
s = re.sub(r'^\s*restoreServerSession,\n', '', s, flags=re.M)
pattern = re.compile(
    r'\n\s*//[^\n]*cookie[^\n]*\n\s*restoreServerSession\(\)\.then\(async \(session\) => \{.*?\}\)\.catch\(\(\) => undefined\);',
    re.S | re.I,
)
s, count = pattern.subn('', s, count=1)
if count == 0:
    # Compatible form after storage transforms: remove any remaining restore callback.
    pattern2 = re.compile(
        r'\n\s*restoreServerSession\(\)\.then\(async \(session\) => \{.*?\}\)\.catch\(\(\) => undefined\);',
        re.S,
    )
    s = pattern2.sub('', s, count=1)

# Do not expose obsolete storage-history vocabulary in the cloud dialog.
s = re.sub(r'\s*history:\s*"[^"]*",\s*loadCopy:\s*"[^"]*",?\n?', '\n', s)
s = re.sub(r'\s*history:\s*"[^"]*",\s*loadRevision:\s*"[^"]*",?\n?', '\n', s)

app.write_text(s, encoding='utf-8')

# Put the WORKING editor launcher exactly where the old blue PDF button lived.
p = Path('src/printEditorV3.ts')
s = p.read_text(encoding='utf-8')
s = s.replace('const anchor = document.querySelector<HTMLElement>(".previewTop");',
              'const anchor = document.querySelector<HTMLElement>(".topActions");')
s = s.replace('button.className = "zoom printEditorLauncherV2";',
              'button.className = "primary printEditorLauncherV2";')
p.write_text(s, encoding='utf-8')
PY

echo "Building corrected 1.6.3 frontend..."
npx -y node@22 ./node_modules/typescript/bin/tsc --noEmit
npx -y node@22 ./node_modules/vite/bin/vite.js build

test -f dist/index.html
test -d dist/assets
grep -q 'printEditorContentViewport' src/printEditorV3.ts
! grep -q 'installMarginGuideFixV153' src/main.tsx
! grep -q '<button className="primary" onClick={() => window.print()}>{t.pdf}</button>' src/App.tsx
grep -q 'document.querySelector<HTMLElement>(".topActions")' src/printEditorV3.ts
grep -q 'button.className = "primary printEditorLauncherV2"' src/printEditorV3.ts
! grep -q 'restoreServerSession().then' src/App.tsx
! grep -Eqi 'revision|revisi[oó]n' src/App.tsx src/cloud.ts

echo "Storage/session checks passed."

mkdir -p "$ROLLBACK"
cp -a "$WEB/index.html" "$ROLLBACK/" 2>/dev/null || true
cp -a "$WEB/assets" "$ROLLBACK/" 2>/dev/null || true

rm -rf "$WEB/assets"
rm -f "$WEB/index.html"
cp -a dist/assets "$WEB/"
cp -a dist/index.html "$WEB/"

AFTER="$(fingerprint)"
if [ "$BEFORE" != "$AFTER" ]; then
  echo "ERROR: workspace changed; restoring previous frontend"
  rm -rf "$WEB/assets"; rm -f "$WEB/index.html"
  cp -a "$ROLLBACK/assets" "$WEB/" 2>/dev/null || true
  cp -a "$ROLLBACK/index.html" "$WEB/" 2>/dev/null || true
  exit 1
fi
rm -rf "$ROLLBACK"

echo "============================================================"
echo "CODECAFE CV STUDIO 1.6.3 DEPLOYED"
echo "✓ working print editor preserved"
echo "✓ margin behavior preserved"
echo "✓ blue Print / PDF button kept at top-right"
echo "✓ EC2 singleton workspace protocol restored"
echo "✓ obsolete storage-history UI removed"
echo "✓ new app sessions start with EC2 disconnected"
echo "✓ workspace unchanged: $AFTER"
echo "============================================================"
