#!/usr/bin/env python3
from pathlib import Path

app_path = Path('src/App.tsx')
workspace_path = Path('src/workspace.ts')
migration_path = Path('src/ec2-drive-migration-v154.ts')

app = app_path.read_text(encoding='utf-8')
workspace = workspace_path.read_text(encoding='utf-8')
migration = migration_path.read_text(encoding='utf-8')

# ---------------------------------------------------------------------------
# workspace.ts: only real content/settings edits may change updatedAt.
# ---------------------------------------------------------------------------
old_replace = '''  const normalized = normalizeWorkspace(workspace);\n  const updatedAt = new Date().toISOString();\n  const persistedPrint = persistedPrintSettings(normalized.activeDocumentId);\n  const persistedLibraries = persistedProfessionalLibraries();\n  return {\n    ...normalized,\n    // La biblioteca puede ser editada desde la capa My CVs mientras App conserva\n    // un snapshot anterior en memoria. Se recupera la copia local más reciente\n    // antes de cualquier guardado/sincronización para impedir que se pierda.\n    professionalLibraries: persistedLibraries ?? normalized.professionalLibraries,\n    documents: normalized.documents.map((document) => document.id === normalized.activeDocumentId && document.profileId === normalized.activeProfileId\n      ? {\n        ...document,\n        cv,\n        // Conserva campos opcionales ya asociados al documento y, en particular,\n        // los ajustes de impresión guardados directamente por Print Preview.\n        settings: {\n          ...document.settings,\n          ...settings,\n          ...(persistedPrint ? { print: persistedPrint } : {}),\n        },\n        updatedAt,\n      }\n      : document),\n  };\n}'''
new_replace = '''  const normalized = normalizeWorkspace(workspace);\n  const persistedPrint = persistedPrintSettings(normalized.activeDocumentId);\n  const persistedLibraries = persistedProfessionalLibraries();\n  return {\n    ...normalized,\n    // Professional Library is profile/workspace data. A CV revision must never\n    // replace it with an older/empty snapshot kept by the editor.\n    professionalLibraries: persistedLibraries ?? normalized.professionalLibraries,\n    documents: normalized.documents.map((document) => {\n      if (document.id !== normalized.activeDocumentId || document.profileId !== normalized.activeProfileId) return document;\n      const nextSettings = {\n        ...document.settings,\n        ...settings,\n        ...(persistedPrint ? { print: persistedPrint } : {}),\n      };\n      const changed = JSON.stringify(document.cv) !== JSON.stringify(cv)\n        || JSON.stringify(document.settings) !== JSON.stringify(nextSettings);\n      return changed\n        ? { ...document, cv, settings: nextSettings, updatedAt: new Date().toISOString() }\n        : document;\n    }),\n  };\n}'''
if old_replace not in workspace:
    raise SystemExit('workspace.ts replaceCurrentDocument block not found')
workspace = workspace.replace(old_replace, new_replace, 1)

# Stable semantic signature. Opening a CV, switching profile/document, reconnecting,
# or a timestamp changing is NOT user content and must not create a revision.
anchor = '''export function loadWorkspaceLocal(fallback: CVWorkspace): CVWorkspace {\n  const stored = localStorage.getItem(WORKSPACE_KEY);\n  if (!stored) return fallback;\n  try {\n    const parsed = JSON.parse(stored);\n    if (!isWorkspace(parsed) || parsed.documents.length === 0) return fallback;\n    return normalizeWorkspace(parsed);\n  } catch {\n    return fallback;\n  }\n}\n'''
addition = anchor + '''\nexport function workspaceContentSignature(workspace: CVWorkspace): string {\n  const normalized = normalizeWorkspace(workspace);\n  const stable = {\n    ...normalized,\n    activeDocumentId: "",\n    activeProfileId: "",\n    documents: normalized.documents.map(({ updatedAt: _updatedAt, ...document }) => document),\n    professionalLibraries: (normalized.professionalLibraries ?? []).map((library) => ({\n      ...library,\n      records: library.records.map(({ updatedAt: _updatedAt, ...record }) => record),\n    })),\n  };\n  return JSON.stringify(stable);\n}\n'''
if anchor not in workspace:
    raise SystemExit('workspace.ts loadWorkspaceLocal anchor not found')
workspace = workspace.replace(anchor, addition, 1)

# ---------------------------------------------------------------------------
# App.tsx: semantic autosave + remote-preserving writes + Drive merge-load.
# ---------------------------------------------------------------------------
old_import = '''  replaceCurrentDocument,\n  saveWorkspaceLocal,\n} from "./workspace";'''
new_import = '''  replaceCurrentDocument,\n  saveWorkspaceLocal,\n  workspaceContentSignature,\n} from "./workspace";'''
if old_import not in app:
    raise SystemExit('App.tsx workspace import anchor not found')
app = app.replace(old_import, new_import, 1)

# Ignore savedAt when deciding whether a server revision is new.
old_digest = 'backupDigest(document)'
new_digest = 'backupDigest(document.schema === 2 ? document.workspace : document)'
count = app.count(old_digest)
if count != 2:
    raise SystemExit(f'Expected 2 backupDigest(document) calls, found {count}')
app = app.replace(old_digest, new_digest)

ref_anchor = '  const ec2SaveQueueRef = useRef<Promise<void>>(Promise.resolve());\n'
if ref_anchor not in app:
    raise SystemExit('App.tsx EC2 queue ref not found')
app = app.replace(ref_anchor, ref_anchor + '  const lastAutosavedWorkspaceRef = useRef<string | null>(null);\n', 1)

backup_anchor = '''  const workspaceWithCurrent = () => replaceCurrentDocument(workspace, cv, { lang, template, photoOn });\n  const backupDocument = (): BackupDocument => ({ schema: 2, savedAt: new Date().toISOString(), workspace: workspaceWithCurrent() });\n'''
backup_addition = backup_anchor + '''  const preserveRemoteWorkspace = async (document: WorkspaceBackupDocument): Promise<WorkspaceBackupDocument> => {\n    let merged = document.workspace;\n\n    // Before every write, merge the newest EC2 workspace back in. This makes CVs,\n    // profiles and Professional Libraries monotonic: an incomplete browser cannot\n    // erase records already stored on the server.\n    if (serverSession) {\n      try {\n        const existing = await loadServerBackup();\n        const payload = existing?.payload as BackupDocument | undefined;\n        if (payload?.schema === 2 && isWorkspace(payload.workspace)) {\n          merged = mergeWorkspaces(merged, payload.workspace);\n        }\n      } catch {}\n    }\n\n    // Same rule for Google Drive. The Drive workspace is merged, never blindly\n    // replaced by whatever happens to be open in the current browser.\n    if (googleToken) {\n      try {\n        const existing = await loadGoogleBackup<BackupDocument>(googleToken);\n        if (existing?.schema === 2 && isWorkspace(existing.workspace)) {\n          merged = mergeWorkspaces(merged, existing.workspace);\n        }\n      } catch {}\n    }\n\n    return { ...document, workspace: merged };\n  };\n'''
if backup_anchor not in app:
    raise SystemExit('App.tsx backup anchor not found')
app = app.replace(backup_anchor, backup_addition, 1)

# This string is evaluated AFTER the digest replacement above, so it intentionally
# contains the already-patched digest expression.
old_auto = '''    saveWorkspaceLocal(updatedWorkspace);\n    localStorage.setItem("codecafe-cv", JSON.stringify(cv));\n    localStorage.setItem("codecafe-cv-settings", JSON.stringify({ lang, template, photoOn }));\n    if (!serverSession && !googleToken) return;\n    const timer = window.setTimeout(() => {\n      const document: BackupDocument = { schema: 2, savedAt: new Date().toISOString(), workspace: updatedWorkspace };\n      ec2SaveQueueRef.current = ec2SaveQueueRef.current.then(async () => {\n        setCloudStatus("syncing");\n        if (serverSession) {\n          const digest = await backupDigest(document.schema === 2 ? document.workspace : document);\n          const result = await saveServerBackup(document, digest, serverRevisionRef.current, serverSession.csrfToken);\n          serverRevisionRef.current = result.revision;\n          setServerRevision(result.revision);\n          setSelectedRevision(result.revision);\n          setServerHistory(await listServerBackups());\n        }\n        if (googleToken) await saveGoogleBackup(googleToken, document, googlePrintable());\n        setCloudStatus("synced");\n      }).catch((error: Error & { status?: number }) => {'''
new_auto = '''    saveWorkspaceLocal(updatedWorkspace);\n    localStorage.setItem("codecafe-cv", JSON.stringify(cv));\n    localStorage.setItem("codecafe-cv-settings", JSON.stringify({ lang, template, photoOn }));\n\n    const workspaceSignature = workspaceContentSignature(updatedWorkspace);\n\n    // First observation is a baseline, not an edit. This blocks the empty/default\n    // workspace from being uploaded merely because the app or cloud session opened.\n    if (lastAutosavedWorkspaceRef.current === null) {\n      lastAutosavedWorkspaceRef.current = workspaceSignature;\n      return;\n    }\n    if (lastAutosavedWorkspaceRef.current === workspaceSignature) return;\n    lastAutosavedWorkspaceRef.current = workspaceSignature;\n\n    if (!serverSession && !googleToken) return;\n    const timer = window.setTimeout(() => {\n      const document: WorkspaceBackupDocument = { schema: 2, savedAt: new Date().toISOString(), workspace: updatedWorkspace };\n      ec2SaveQueueRef.current = ec2SaveQueueRef.current.then(async () => {\n        setCloudStatus("syncing");\n        const protectedDocument = await preserveRemoteWorkspace(document);\n        if (serverSession) {\n          const digest = await backupDigest(protectedDocument.workspace);\n          const result = await saveServerBackup(protectedDocument, digest, serverRevisionRef.current, serverSession.csrfToken);\n          serverRevisionRef.current = result.revision;\n          setServerRevision(result.revision);\n          setSelectedRevision(result.revision);\n          setServerHistory(await listServerBackups());\n        }\n        if (googleToken) await saveGoogleBackup(googleToken, protectedDocument, googlePrintable());\n        setCloudStatus("synced");\n      }).catch((error: Error & { status?: number }) => {'''
if old_auto not in app:
    raise SystemExit('App.tsx autosave block not found')
app = app.replace(old_auto, new_auto, 1)

old_sync = '''      if (serverSession) {\n        const document = backupDocument();\n        const digest = await backupDigest(document.schema === 2 ? document.workspace : document);\n        await ec2SaveQueueRef.current;\n        const result = await saveServerBackup(document, digest, serverRevisionRef.current, serverSession.csrfToken);\n        serverRevisionRef.current = result.revision;\n        setServerRevision(result.revision);\n        setSelectedRevision(result.revision);\n        setServerHistory(await listServerBackups());\n      }\n      if (googleToken) await saveGoogleBackup(googleToken, backupDocument(), googlePrintable());'''
new_sync = '''      const base = backupDocument();\n      const document = base.schema === 2 ? await preserveRemoteWorkspace(base) : base;\n      if (serverSession) {\n        const digest = await backupDigest(document.schema === 2 ? document.workspace : document);\n        await ec2SaveQueueRef.current;\n        const result = await saveServerBackup(document, digest, serverRevisionRef.current, serverSession.csrfToken);\n        serverRevisionRef.current = result.revision;\n        setServerRevision(result.revision);\n        setSelectedRevision(result.revision);\n        setServerHistory(await listServerBackups());\n      }\n      if (googleToken) await saveGoogleBackup(googleToken, document, googlePrintable());'''
if old_sync not in app:
    raise SystemExit('App.tsx syncCloud block not found')
app = app.replace(old_sync, new_sync, 1)

# Load from Drive must merge the Drive workspace into the current workspace so a
# Professional Library in Drive is actually loaded and an older local snapshot cannot
# make it disappear.
old_drive = '''      const backup = await loadGoogleBackup<BackupDocument>(googleToken);\n      if (!backup) throw new Error("Google Drive todavía no contiene respaldos.");\n      applyBackup(backup);'''
new_drive = '''      const backup = await loadGoogleBackup<BackupDocument>(googleToken);\n      if (!backup) throw new Error("Google Drive todavía no contiene respaldos.");\n      if (backup.schema === 2 && isWorkspace(backup.workspace)) {\n        const merged = mergeWorkspaces(workspaceWithCurrent(), backup.workspace);\n        applyBackup({ ...backup, workspace: merged });\n      } else {\n        applyBackup(backup);\n      }'''
if old_drive not in app:
    raise SystemExit('App.tsx restoreDrive block not found')
app = app.replace(old_drive, new_drive, 1)

# ---------------------------------------------------------------------------
# Migration helper: merge EC2 HISTORY, not only latest revision, so a library that
# still exists in an older retained revision is carried into Drive permanently.
# ---------------------------------------------------------------------------
old_imports = '''  loadGoogleBackup,\n  loadServerBackup,\n  loadStoredGoogleToken,\n  restoreServerSession,\n  saveGoogleBackup,'''
new_imports = '''  loadGoogleBackup,\n  loadServerBackup,\n  loadServerBackupRevision,\n  listServerBackups,\n  loadStoredGoogleToken,\n  restoreServerSession,\n  saveGoogleBackup,'''
if old_imports not in migration:
    raise SystemExit('migration cloud imports not found')
migration = migration.replace(old_imports, new_imports, 1)

old_reader = '''async function readEc2Workspace(): Promise<CVWorkspace> {\n  await restoreServerSession();\n  const backup = await loadServerBackup();\n  if (!backup) throw new Error("EC2 does not contain a backup yet.");\n  let payload = backup.payload as BackupDocument | BackupEnvelope;\n  if (isEncryptedEnvelope(payload)) {\n    const promptText = language() === "es"\n      ? "Este respaldo histórico de EC2 está cifrado. Escribe la contraseña de EC2 para migrarlo a Drive:"\n      : "This historical EC2 backup is encrypted. Enter the EC2 password to migrate it to Drive:";\n    const password = window.prompt(promptText);\n    if (!password) throw new Error(language() === "es" ? "Migración cancelada." : "Migration cancelled.");\n    payload = await decryptBackup<BackupDocument>(payload, password);\n  }\n  return backupToWorkspace(payload as BackupDocument);\n}\n'''
new_reader = '''async function readEc2Workspace(): Promise<CVWorkspace> {\n  await restoreServerSession();\n  const latest = await loadServerBackup();\n  if (!latest) throw new Error("EC2 does not contain a backup yet.");\n\n  let payload = latest.payload as BackupDocument | BackupEnvelope;\n  if (isEncryptedEnvelope(payload)) {\n    const promptText = language() === "es"\n      ? "Este respaldo histórico de EC2 está cifrado. Escribe la contraseña de EC2 para migrarlo a Drive:"\n      : "This historical EC2 backup is encrypted. Enter the EC2 password to migrate it to Drive:";\n    const password = window.prompt(promptText);\n    if (!password) throw new Error(language() === "es" ? "Migración cancelada." : "Migration cancelled.");\n    payload = await decryptBackup<BackupDocument>(payload, password);\n  }\n\n  let merged = backupToWorkspace(payload as BackupDocument);\n\n  // Historical EC2 revisions may contain CVs/library records missing from the newest\n  // snapshot. Merge every retained plain workspace before moving to Drive.\n  const revisions = await listServerBackups();\n  for (const item of revisions) {\n    if (item.revision === latest.revision) continue;\n    try {\n      const historical = await loadServerBackupRevision(item.revision);\n      const historicalPayload = historical?.payload as BackupDocument | BackupEnvelope | undefined;\n      if (!historicalPayload || isEncryptedEnvelope(historicalPayload)) continue;\n      if (historicalPayload.schema === 2 && isWorkspace(historicalPayload.workspace)) {\n        merged = mergeWorkspaces(merged, historicalPayload.workspace);\n      }\n    } catch {}\n  }\n\n  return merged;\n}\n'''
if old_reader not in migration:
    raise SystemExit('migration readEc2Workspace block not found')
migration = migration.replace(old_reader, new_reader, 1)

# The previous custom event had no React listener. Reload from the just-saved local
# workspace after migration so the user immediately sees the merged CVs/library.
old_event = '    window.dispatchEvent(new CustomEvent("codecafe-workspace-reload", { detail: { reason: "ec2-drive-migration" } }));\n'
new_event = '    window.setTimeout(() => window.location.reload(), 150);\n'
if old_event not in migration:
    raise SystemExit('migration reload event not found')
migration = migration.replace(old_event, new_event, 1)

workspace_path.write_text(workspace, encoding='utf-8')
app_path.write_text(app, encoding='utf-8')
migration_path.write_text(migration, encoding='utf-8')
print('v1.5.8 applied: no phantom saves; cloud writes preserve remote CVs/libraries; Drive load merges library; migration merges retained EC2 history.')
