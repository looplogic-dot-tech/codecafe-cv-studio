#!/usr/bin/env python3
from pathlib import Path

app = Path('src/App.tsx')
text = app.read_text(encoding='utf-8')

# Storage is presented as loadable content, not as revision history.
text = text.replace(',\n  listServerBackups,', '')
text = text.replace(',\n  loadServerBackupRevision,', '')
text = text.replace(',\n  ServerBackupRevision,', '')
text = text.replace('  const [serverHistory, setServerHistory] = useState<ServerBackupRevision[]>([]);\n', '')
text = text.replace('  const [selectedRevision, setSelectedRevision] = useState(0);\n', '')
text = text.replace('      setSelectedRevision(session.currentRevision);\n      setServerHistory(await listServerBackups());\n', '')
text = text.replace('          setSelectedRevision(result.revision);\n          setServerHistory(await listServerBackups());\n', '')
text = text.replace('        setSelectedRevision(result.revision);\n        setServerHistory(await listServerBackups());\n', '')
text = text.replace('      setSelectedRevision(session.currentRevision);\n      setServerHistory(await listServerBackups());\n', '')
text = text.replace('    setSelectedRevision(0);\n    setServerHistory([]);\n', '')

start = text.find('  const restoreEc2Revision = async () => {')
if start != -1:
    end = text.find('  const connectDrive = async () => {', start)
    if end == -1:
        raise SystemExit('Could not find end of restoreEc2Revision block')
    text = text[:start] + text[end:]

# Remove revision picker if present.
marker = '          {serverSession && serverHistory.length > 0 && <div className="revisionPicker">'
start = text.find(marker)
if start != -1:
    end_marker = '          <div className="cloudProvider">\n            <div><b>Google Drive</b>'
    end = text.find(end_marker, start)
    if end == -1:
        raise SystemExit('Could not find Google Drive provider after revision picker')
    text = text[:start] + '          <div className="cloudProvider">\n            <div><b>Google Drive</b>' + text[end + len(end_marker):]

# Remove storage browser import and renderers; the Load buttons are the entry point.
text = text.replace('import CloudStorageBrowser from "./CloudStorageBrowser";\n', '')
import re
text = re.sub(r'\n\s*<CloudStorageBrowser[^;]*?/>', '', text)

# Connection label should not expose internal revision numbers.
text = re.sub(r'EC2 connected[^<\\n]*revision[^<\\n]*', 'EC2 connected', text, flags=re.I)
text = text.replace('EC2 conectado · revisión ${serverRevision}', 'EC2 conectado')
text = text.replace('EC2 connected · revision ${serverRevision}', 'EC2 connected')

# Clear status message after load with an explicit content-loaded message.
text = text.replace('      applyBackup(document);\n      setServerRevision(backup.revision);', '      applyBackup(document);\n      setCloudMessage(lang === "es" ? "Contenido de EC2 cargado. Ya puedes editarlo o eliminarlo desde Mis CVs y Biblioteca Profesional." : "EC2 contents loaded. You can now edit or delete them from My CVs and Professional Library.");\n      setServerRevision(backup.revision);')
text = text.replace('      applyBackup(backup);\n', '      applyBackup(backup);\n      setCloudMessage(lang === "es" ? "Contenido de Google Drive cargado. Ya puedes editarlo o eliminarlo desde Mis CVs y Biblioteca Profesional." : "Google Drive contents loaded. You can now edit or delete them from My CVs and Professional Library.");\n', 1)

app.write_text(text, encoding='utf-8')
print('v1.5.11 storage UI applied: no revision menu; load actions report success only.')
