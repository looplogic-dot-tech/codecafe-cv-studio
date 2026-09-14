#!/usr/bin/env python3
from pathlib import Path

path = Path('src/ec2-drive-migration-v154.ts')
text = path.read_text(encoding='utf-8')

# v1.5.8/v1.5.8b temporarily expanded the EC2→Drive migration helper to walk
# retained server history. v1.6.2 has exactly one EC2 workspace, so that history
# API no longer exists. Keep the migration button/functionality, but make it read
# the single current workspace only.
text = text.replace('  loadServerBackupRevision,\n', '')
text = text.replace('  listServerBackups,\n', '')

start = text.find('async function readEc2Workspace(): Promise<CVWorkspace> {')
end = text.find('\nasync function migrateEc2ToDrive(', start)
if start == -1 or end == -1:
    raise SystemExit('v1.6.2 migration helper: readEc2Workspace boundary not found')

replacement = '''async function readEc2Workspace(): Promise<CVWorkspace> {\n  await restoreServerSession();\n  const backup = await loadServerBackup();\n  if (!backup) throw new Error("EC2 does not contain a workspace yet.");\n  let payload = backup.payload as BackupDocument | BackupEnvelope;\n  if (isEncryptedEnvelope(payload)) {\n    const promptText = language() === "es"\n      ? "Esta copia histórica de EC2 está cifrada. Escribe la contraseña de EC2 para migrarla a Drive:"\n      : "This historical EC2 copy is encrypted. Enter the EC2 password to migrate it to Drive:";\n    const password = window.prompt(promptText);\n    if (!password) throw new Error(language() === "es" ? "Migración cancelada." : "Migration cancelled.");\n    payload = await decryptBackup<BackupDocument>(payload, password);\n  }\n  return backupToWorkspace(payload as BackupDocument);\n}\n'''

text = text[:start] + replacement + text[end:]

# Guard against accidentally reintroducing the retired multi-copy server API.
for forbidden in ('loadServerBackupRevision', 'listServerBackups', '.revision'):
    if forbidden in text:
        raise SystemExit(f'v1.6.2 migration helper still contains retired server-history API: {forbidden}')

path.write_text(text, encoding='utf-8')
print('v1.6.2 migration helper fixed: EC2→Drive reads the single current workspace and preserves migration functionality.')
