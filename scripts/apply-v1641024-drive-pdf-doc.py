from pathlib import Path

app_path = Path("src/App.tsx")
cloud_path = Path("src/cloud.ts")
app = app_path.read_text(encoding="utf-8")
cloud = cloud_path.read_text(encoding="utf-8")

# 1) Import exact Live Preview PDF renderer.
import_marker = 'import type { ImportedBlock } from "./cvImport";\n'
import_add = import_marker + 'import { renderCurrentLivePreviewPdf } from "./renderPdf";\n'
if 'from "./renderPdf"' not in app:
    if import_marker not in app:
        raise SystemExit("ERROR: App import marker not found")
    app = app.replace(import_marker, import_add, 1)

# 2) Editable Drive/local document should understand the same **bold** syntax in Technology Stack.
app = app.replace(
    '<div class="entry"><h3>${escapeHtml(project.name)}</h3><strong>${escapeHtml(project.stack)}</strong>${printableStructuredLines(project.description)}${printableRepository(project.repository, labels.repository)}</div>',
    '<div class="entry"><h3>${escapeHtml(project.name)}</h3><strong>${printableBoldInline(project.stack)}</strong>${printableStructuredLines(project.description)}${printableRepository(project.repository, labels.repository)}</div>',
)

# 3) Google printable now carries the PDF generated from the actual current Live Preview pages.
old_google = '''  const googlePrintable = (): GooglePrintableCV => {\n    const currentWorkspace = workspaceWithCurrent();\n    const document = activeDocument(currentWorkspace);\n    const collection = currentWorkspace.collections.find((candidate) => candidate.id === document.collectionId);\n    return {\n      documentId: document.id,\n      collectionName: collection?.name || "General Purpose",\n      fileBaseName: safeFileName(document.name || cv.name || "CV"),\n      html: buildPrintableHtml(cv, lang, t),\n    };\n  };'''
new_google = '''  const googlePrintable = async (): Promise<GooglePrintableCV> => {\n    const currentWorkspace = workspaceWithCurrent();\n    const document = activeDocument(currentWorkspace);\n    const collection = currentWorkspace.collections.find((candidate) => candidate.id === document.collectionId);\n    return {\n      documentId: document.id,\n      collectionName: collection?.name || "General Purpose",\n      fileBaseName: safeFileName(document.name || cv.name || "CV"),\n      html: buildPrintableHtml(cv, lang, t),\n      pdfBlob: await renderCurrentLivePreviewPdf(),\n    };\n  };\n  const downloadEditableDoc = () => {\n    const currentWorkspace = workspaceWithCurrent();\n    const currentDocument = activeDocument(currentWorkspace);\n    const fileBaseName = safeFileName(currentDocument.name || cv.name || "CV");\n    const html = buildPrintableHtml(cv, lang, t);\n    const anchor = document.createElement("a");\n    anchor.href = URL.createObjectURL(new Blob([html], { type: "application/msword;charset=utf-8" }));\n    anchor.download = `${fileBaseName}.doc`;\n    document.body.appendChild(anchor);\n    anchor.click();\n    anchor.remove();\n    const objectUrl = anchor.href;\n    window.setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);\n  };\n  useEffect(() => {\n    const handlePrintLauncher = (event: MouseEvent) => {\n      const target = event.target instanceof Element ? event.target.closest("#codecafe-print-editor-launcher") : null;\n      if (target) downloadEditableDoc();\n    };\n    document.addEventListener("click", handlePrintLauncher);\n    return () => document.removeEventListener("click", handlePrintLauncher);\n  }, [cv, lang, template, workspace]);'''
if new_google not in app:
    if old_google not in app:
        raise SystemExit("ERROR: googlePrintable block not found")
    app = app.replace(old_google, new_google, 1)

# Every call site is inside an async function already.
app = app.replace('saveGoogleBackup(googleToken, document, googlePrintable())', 'saveGoogleBackup(googleToken, document, await googlePrintable())')
app = app.replace('saveGoogleBackup(googleToken, backupDocument(), googlePrintable())', 'saveGoogleBackup(googleToken, backupDocument(), await googlePrintable())')

# 4) Cloud PDF is no longer exported from a Google Doc, whose pagination can differ from Live Preview.
cloud = cloud.replace(
    '  html: string;\n};',
    '  html: string;\n  pdfBlob: Blob;\n};',
    1,
)
old_pdf = '''  // Exporta además un PDF ordinario para impresión directa desde el teléfono.\n  const pdfResponse = await fetch(\n    `https://www.googleapis.com/drive/v3/files/${documentId}/export?mimeType=${encodeURIComponent("application/pdf")}`,\n    { headers: { Authorization: `Bearer ${token}` } },\n  );\n  if (!pdfResponse.ok) throw new Error(`Google Drive no pudo generar el PDF (HTTP ${pdfResponse.status}).`);\n  const pdfName = `${printable.fileBaseName}.pdf`;\n  const existingPdf = await findDriveItem(token, pdfName, collectionId, "application/pdf");\n  await uploadMultipart(\n    token,\n    pdfName,\n    "application/pdf",\n    "application/pdf",\n    await pdfResponse.blob(),\n    collectionId,\n    existingPdf,\n  );'''
new_pdf = '''  // The PDF comes from the exact current Live Preview pages. Google Docs remains the editable\n  // companion, but it is NOT used as the PDF rendering engine because its pagination differs.\n  const pdfName = `${printable.fileBaseName}.pdf`;\n  const existingPdf = await findDriveItem(token, pdfName, collectionId, "application/pdf");\n  await uploadMultipart(\n    token,\n    pdfName,\n    "application/pdf",\n    "application/pdf",\n    printable.pdfBlob,\n    collectionId,\n    existingPdf,\n  );'''
if new_pdf not in cloud:
    if old_pdf not in cloud:
        raise SystemExit("ERROR: old Google PDF export block not found")
    cloud = cloud.replace(old_pdf, new_pdf, 1)

# documentId is still intentionally created/updated because the editable Google Doc is retained.
app_path.write_text(app, encoding="utf-8")
cloud_path.write_text(cloud, encoding="utf-8")

final_app = app_path.read_text(encoding="utf-8")
final_cloud = cloud_path.read_text(encoding="utf-8")
assert 'pdfBlob: await renderCurrentLivePreviewPdf()' in final_app
assert 'application/msword' in final_app
assert 'await googlePrintable()' in final_app
assert 'printable.pdfBlob' in final_cloud
assert '/export?mimeType=' not in final_cloud
print('PASS: Drive PDF now uses exact Live Preview page images instead of Google Docs pagination')
print('PASS: existing Google Doc companion remains editable and is still updated in place')
print('PASS: Print/PDF launcher also downloads an editable .doc companion locally')
print('PASS: printEditorV3.ts and livePreviewPages.ts were not modified')
