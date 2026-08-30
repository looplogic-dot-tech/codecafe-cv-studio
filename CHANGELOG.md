# Historial de versiones

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
