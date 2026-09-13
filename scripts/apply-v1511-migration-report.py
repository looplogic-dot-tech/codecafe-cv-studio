#!/usr/bin/env python3
from pathlib import Path

path = Path('src/ec2-drive-migration-v154.ts')
text = path.read_text(encoding='utf-8')

old = '''    const ec2Workspace = await readEc2Workspace();
    const localWorkspace = loadWorkspaceLocal(ec2Workspace);
    let merged = mergeWorkspaces(localWorkspace, ec2Workspace);

    const driveBackup = await loadGoogleBackup<BackupDocument>(token);
    if (driveBackup?.schema === 2 && isWorkspace(driveBackup.workspace)) {
      merged = mergeWorkspaces(merged, driveBackup.workspace);
    }

    saveWorkspaceLocal(merged);
'''
new = '''    const ec2Workspace = await readEc2Workspace();
    const localWorkspace = loadWorkspaceLocal(ec2Workspace);

    const driveBackup = await loadGoogleBackup<BackupDocument>(token);
    const driveWorkspace = driveBackup?.schema === 2 && isWorkspace(driveBackup.workspace)
      ? driveBackup.workspace
      : null;

    const driveDocumentIds = new Set((driveWorkspace?.documents ?? []).map((item) => item.id));
    const driveLibraryRecordIds = new Set(
      (driveWorkspace?.professionalLibraries ?? []).flatMap((library) =>
        (library.records ?? []).map((record) => record.id),
      ),
    );

    let merged = mergeWorkspaces(localWorkspace, ec2Workspace);
    if (driveWorkspace) merged = mergeWorkspaces(merged, driveWorkspace);

    const mergedDocumentIds = new Set(merged.documents.map((item) => item.id));
    const mergedLibraryRecordIds = new Set(
      (merged.professionalLibraries ?? []).flatMap((library) =>
        (library.records ?? []).map((record) => record.id),
      ),
    );

    const ec2DocumentIds = ec2Workspace.documents.map((item) => item.id);
    const ec2LibraryRecordIds = (ec2Workspace.professionalLibraries ?? []).flatMap((library) =>
      (library.records ?? []).map((record) => record.id),
    );

    const addedCvs = ec2DocumentIds.filter((id) => !driveDocumentIds.has(id) && mergedDocumentIds.has(id)).length;
    const existingCvs = ec2DocumentIds.filter((id) => driveDocumentIds.has(id)).length;
    const missingCvs = ec2DocumentIds.filter((id) => !mergedDocumentIds.has(id)).length;
    const addedRecords = ec2LibraryRecordIds.filter((id) => !driveLibraryRecordIds.has(id) && mergedLibraryRecordIds.has(id)).length;
    const existingRecords = ec2LibraryRecordIds.filter((id) => driveLibraryRecordIds.has(id)).length;
    const missingRecords = ec2LibraryRecordIds.filter((id) => !mergedLibraryRecordIds.has(id)).length;

    saveWorkspaceLocal(merged);
'''
if old not in text:
    raise SystemExit('Migration merge block not found')
text = text.replace(old, new, 1)

old_done = '''    button.textContent = es ? "✓ EC2 → Drive completado" : "✓ EC2 → Drive complete";
    window.setTimeout(() => { button.textContent = original; button.disabled = false; }, 2600);
'''
new_done = '''    button.textContent = es ? "✓ Migración completada" : "✓ Migration complete";
    const report = es
      ? [
          "Migración EC2 → Google Drive completada",
          `CVs encontrados en EC2: ${ec2DocumentIds.length}`,
          `CVs agregados a Drive: ${addedCvs}`,
          `CVs que ya existían en Drive: ${existingCvs}`,
          `CVs no migrados: ${missingCvs}`,
          `Registros de Biblioteca encontrados: ${ec2LibraryRecordIds.length}`,
          `Registros agregados a Drive: ${addedRecords}`,
          `Registros que ya existían en Drive: ${existingRecords}`,
          `Registros no migrados: ${missingRecords}`,
        ].join("\\n")
      : [
          "EC2 → Google Drive migration complete",
          `CVs found in EC2: ${ec2DocumentIds.length}`,
          `CVs added to Drive: ${addedCvs}`,
          `CVs already in Drive: ${existingCvs}`,
          `CVs not migrated: ${missingCvs}`,
          `Professional Library records found: ${ec2LibraryRecordIds.length}`,
          `Records added to Drive: ${addedRecords}`,
          `Records already in Drive: ${existingRecords}`,
          `Records not migrated: ${missingRecords}`,
        ].join("\\n");
    window.alert(report);
    window.setTimeout(() => { button.textContent = original; button.disabled = false; }, 2600);
'''
if old_done not in text:
    raise SystemExit('Migration completion block not found')
text = text.replace(old_done, new_done, 1)

path.write_text(text, encoding='utf-8')
print('v1.5.11 migration report applied: reports migrated, existing and missing CV/library items.')
