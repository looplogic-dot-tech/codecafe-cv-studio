#!/usr/bin/env python3
from pathlib import Path

path = Path('src/App.tsx')
text = path.read_text(encoding='utf-8')

import_anchor = 'import CVImporter from "./CVImporter";\n'
if 'import CloudStorageBrowser from "./CloudStorageBrowser";' not in text:
    if import_anchor not in text:
        raise SystemExit('v1.5.10: App.tsx import anchor not found')
    text = text.replace(import_anchor, import_anchor + 'import CloudStorageBrowser from "./CloudStorageBrowser";\n', 1)

old_revision = '''          {serverSession && serverHistory.length > 0 && <div className="revisionPicker">\n            <label>{t.history}<select className={inputClass} value={selectedRevision} onChange={(event) => setSelectedRevision(Number(event.target.value))}>{serverHistory.map((revision) => <option value={revision.revision} key={revision.revision}>#{revision.revision} · {new Date(revision.savedAt).toLocaleString(lang)}</option>)}</select></label>\n            <button onClick={restoreEc2Revision}>{t.loadRevision}</button>\n          </div>}\n'''
new_revision = '''          <CloudStorageBrowser\n            provider="ec2"\n            connected={Boolean(serverSession)}\n            lang={lang}\n            refreshKey={serverRevision}\n          />\n'''
if old_revision not in text:
    raise SystemExit('v1.5.10: revision picker block not found')
text = text.replace(old_revision, new_revision, 1)

drive_anchor = '''          <div className="cloudProvider">\n            <div><b>Google Drive</b><span>{googleToken ? t.driveReady : cloudConfig.googleClientId ? t.driveAvailable : t.driveUnavailable}</span><small className="hint">{t.driveFiles}</small></div>\n            <div className="cloudActions">{googleToken\n              ? <button onClick={restoreDrive}>{t.loadDrive}</button>\n              : <button disabled={!cloudConfig.googleClientId} onClick={connectDrive}>{t.connectDrive}</button>}\n            </div>\n          </div>\n'''
drive_new = drive_anchor + '''          <CloudStorageBrowser\n            provider="drive"\n            connected={Boolean(googleToken)}\n            googleToken={googleToken}\n            lang={lang}\n            refreshKey={googleToken}\n          />\n'''
if drive_anchor not in text:
    raise SystemExit('v1.5.10: Google Drive provider block not found')
text = text.replace(drive_anchor, drive_new, 1)

# Wording must describe storage, not a revision-history product model.
text = text.replace('passwordWarning: "Esta contraseña se utiliza solamente para el historial privado de EC2; Google Drive no la necesita."',
                    'passwordWarning: "Esta contraseña protege tu almacenamiento privado de EC2; Google Drive no la necesita."')
text = text.replace('passwordWarning: "This password is used only for the private EC2 history; Google Drive does not need it."',
                    'passwordWarning: "This password protects your private EC2 storage; Google Drive does not need it."')

path.write_text(text, encoding='utf-8')
print('v1.5.10 applied: revision picker removed; EC2 and Drive now show stored CVs and Professional Library.')
