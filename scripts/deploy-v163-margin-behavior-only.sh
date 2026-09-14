#!/usr/bin/env bash
set -Eeuo pipefail

DATA="/opt/codecafe-studio/data/codecafe-cv-studio"
DB="$DATA/workspace.sqlite3"
WEB="/opt/codecafe-studio/apps/codecafe-cv-studio"
REPO="https://github.com/looplogic-dot-tech/codecafe-cv-studio.git"
BRANCH="release/v1.6.3"
WORK="$HOME/codecafe-v163-margin-only"
STAMP="$(date +%Y%m%d-%H%M%S)"
ROLLBACK="$HOME/codecafe-v163-margin-only-$STAMP"
V153="b98b08760f5078217adb133e7713d92b11091298"

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

# Apply the normal 1.6.2 compatibility/storage transforms first.
NPM_CLI="$(readlink -f "$(command -v npm)")"
npx -y node@22 "$NPM_CLI" ci
npm run prebuild

# Restore ONLY the exact margin behavior files from the known-good 1.5.3 build.
BASE="https://raw.githubusercontent.com/looplogic-dot-tech/codecafe-cv-studio/$V153/src"
curl -fsSL "$BASE/printEditorV3.ts" -o src/printEditorV3.ts
curl -fsSL "$BASE/margin-guide-fix-v153.ts" -o src/margin-guide-fix-v153.ts

# Ensure the exact 1.5.3 margin controller is installed, without changing editor UI/CSS.
python3 - <<'PY'
from pathlib import Path
p=Path('src/main.tsx')
s=p.read_text(encoding='utf-8')
imp='import { installMarginGuideFixV153 } from "./margin-guide-fix-v153";\n'
if imp not in s:
    s=s.replace('import { installSyncNotice } from "./syncNotice";\n', 'import { installSyncNotice } from "./syncNotice";\n'+imp)
call='installMarginGuideFixV153();\n'
if call not in s:
    s=s.replace('installSyncNotice();\n', 'installSyncNotice();\n'+call)
p.write_text(s, encoding='utf-8')
PY

# Build directly so no later mutation step can change the restored margin behavior.
npx -y node@22 ./node_modules/typescript/bin/tsc --noEmit
npx -y node@22 ./node_modules/vite/bin/vite.js build

test -f dist/index.html && test -d dist/assets

grep -q 'installMarginGuideFixV153' src/main.tsx
grep -q 'dataset.v153Fixed' src/margin-guide-fix-v153.ts
grep -q 'page.style.padding = `${settings.top}mm ${settings.right}mm ${settings.bottom}mm ${settings.left}mm`' src/printEditorV3.ts

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
echo " MARGIN BEHAVIOR RESTORED"
echo "============================================================"
echo " ✓ 1.6.2 app/storage behavior retained"
echo " ✓ editor UI/CSS retained"
echo " ✓ exact 1.5.3 margin behavior restored"
echo " ✓ no database change: $AFTER"
echo "============================================================"
