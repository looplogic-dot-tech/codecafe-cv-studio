from pathlib import Path

app_path = Path('src/App.tsx')
cloud_path = Path('src/cloud.ts')
app = app_path.read_text(encoding='utf-8')
cloud = cloud_path.read_text(encoding='utf-8')

# Fix the remaining async Google printable call introduced by 1.6.4.10.2.4.
app = app.replace(
    'saveGoogleBackup(googleToken, protectedDocument, googlePrintable())',
    'saveGoogleBackup(googleToken, protectedDocument, await googlePrintable())',
)

# Migration code predates Live Preview PDF generation. Keep pdfBlob optional so legacy
# EC2 -> Drive migration remains build-compatible and can fall back to Google export.
cloud = cloud.replace(
    '  pdfBlob: Blob;\n};',
    '  pdfBlob?: Blob;\n};',
    1,
)

old = '''  // The PDF comes from the exact current Live Preview pages. Google Docs remains the editable\n  // companion, but it is NOT used as the PDF rendering engine because its pagination differs.\n  const pdfName = `${printable.fileBaseName}.pdf`;\n  const existingPdf = await findDriveItem(token, pdfName, collectionId, "application/pdf");\n  await uploadMultipart(\n    token,\n    pdfName,\n    "application/pdf",\n    "application/pdf",\n    printable.pdfBlob,\n    collectionId,\n    existingPdf,\n  );'''
new = '''  // Normal CV synchronization supplies pdfBlob from the exact current Live Preview pages.\n  // Historical EC2 -> Drive migration may not have a live DOM preview, so only that legacy\n  // path falls back to exporting the editable Google Doc.\n  let pdfBlob = printable.pdfBlob;\n  if (!pdfBlob) {\n    const pdfResponse = await fetch(\n      `https://www.googleapis.com/drive/v3/files/${documentId}/export?mimeType=${encodeURIComponent("application/pdf")}`,\n      { headers: { Authorization: `Bearer ${token}` } },\n    );\n    if (!pdfResponse.ok) throw new Error(`Google Drive no pudo generar el PDF (HTTP ${pdfResponse.status}).`);\n    pdfBlob = await pdfResponse.blob();\n  }\n  const pdfName = `${printable.fileBaseName}.pdf`;\n  const existingPdf = await findDriveItem(token, pdfName, collectionId, "application/pdf");\n  await uploadMultipart(\n    token,\n    pdfName,\n    "application/pdf",\n    "application/pdf",\n    pdfBlob,\n    collectionId,\n    existingPdf,\n  );'''
if old not in cloud:
    raise SystemExit('ERROR: 1.6.4.10.2.4 PDF block not found')
cloud = cloud.replace(old, new, 1)

app_path.write_text(app, encoding='utf-8')
cloud_path.write_text(cloud, encoding='utf-8')

assert 'protectedDocument, await googlePrintable()' in app
assert 'pdfBlob?: Blob' in cloud
assert 'let pdfBlob = printable.pdfBlob' in cloud
print('PASS: remaining async googlePrintable call fixed')
print('PASS: legacy EC2 migration remains compatible without a live preview PDF blob')
print('PASS: normal Drive sync still prefers exact Live Preview PDF blob')
