# Historial de versiones

## 1.2.0 — 2026-08-30

- Añade una biblioteca visual y adaptable a teléfono para organizar hasta 20 CVs.
- Añade colecciones iniciales para IT, construcción y uso general, además de colecciones personalizadas.
- Permite abrir y editar un CV existente, duplicarlo, renombrarlo, moverlo, archivarlo y restaurarlo.
- Mantiene `Guardar` como revisión del CV actual y ofrece `Guardar actual como nuevo` para crear otro documento.
- Añade secciones personalizadas para adaptar el contenido a empleos no técnicos sin eliminar los campos IT opcionales.
- Activa la revisión ortográfica y gramatical nativa del navegador según el idioma ES/EN.
- Migra automáticamente el único CV local de v1.1.0 a la nueva biblioteca sin borrar sus datos.
- Amplía el respaldo cifrado para incluir documentos, colecciones y configuración en un solo archivo.
- Conserva un límite global de 20 respaldos históricos en EC2 y actualiza un solo archivo en Google Drive.
- Añade un selector visible para abrir cualquiera de las revisiones todavía retenidas en EC2.
- Añade un diario técnico y un actualizador aditivo con validación y rollback.
- Corrige la espera inicial de CV Sync para evitar una falsa falla mientras systemd termina de iniciar Python.

## 1.1.0 — 2026-08-30

- Conserva el guardado local de la versión 1.0.1.
- Añade respaldos AES-GCM cifrados en el navegador.
- Añade API privada para EC2 en `127.0.0.1:5002`.
- Conserva las 20 revisiones más recientes en una base SQLite aislada.
- Detecta conflictos antes de sobrescribir una revisión más reciente.
- Añade importación y exportación de respaldos cifrados.
- Añade conector opcional de Google Drive mediante OAuth y `drive.file`.
- No modifica Atlas, sus rutas, su puerto ni su base de datos.

## 1.0.1 — 2026-08-29

- Sustituye el perfil precargado por información demostrativa ficticia.

## 1.0.0 — 2026-08-29

- Primera migración funcional independiente de ChatGPT Sites.
