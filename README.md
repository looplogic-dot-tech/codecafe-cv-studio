# CodeCafe CV Studio

Editor bilingüe de currículum desarrollado por Jaime Sánchez Sáenz. Permite
organizar el contenido sin depender del formato de Word o LibreOffice y generar
una presentación moderna y compatible con sistemas ATS.

El contenido precargado es enteramente demostrativo. No representa a una
persona real y debe reemplazarse con la información de cada usuario.

## Funciones conservadas

- Interfaz y encabezados en español e inglés.
- Plantillas **ATS esencial** y **Moderno**.
- Fotografía opcional.
- Experiencias laborales ilimitadas.
- Core Skills, herramientas, certificaciones y proyectos opcionales.
- Guardado local en el navegador.
- Copias cifradas y versionadas en EC2, sin sustituir el guardado local.
- Respaldo cifrado importable y exportable.
- Conector opcional de Google Drive con permiso limitado `drive.file`.
- Impresión o exportación a PDF en tamaño A4.
- Exportación de texto compatible con ATS.

## Una sola base funcional

La aplicación React de este repositorio es la fuente común para las ediciones
web y de escritorio. La edición web se compila como archivos estáticos en
`dist/`. La edición de escritorio se añadirá posteriormente como envoltorio de
esta misma base, sin reconstruir las funciones.

## Compilación web

```bash
# Descarga exactamente las dependencias registradas en package-lock.json.
npm ci

# Comprueba TypeScript y genera la aplicación estática dentro de dist/.
npm run build
```

## Publicación

- Dirección: `https://cv.codecafe.io`
- Servidor: EC2 con NGINX.
- Ruta aislada: `/opt/codecafe-studio/apps/codecafe-cv-studio`
- Interfaz: archivos estáticos servidos directamente por NGINX.
- Sincronización opcional: API Python aislada en `127.0.0.1:5002`.
- Datos: SQLite cifrado desde el navegador, separado de Atlas.

La API utiliza únicamente la biblioteca estándar de Python. El CV se cifra en
el navegador mediante AES-GCM antes de salir del dispositivo. La contraseña no
se guarda en el navegador ni se publica en GitHub.

Consulta [MIGRATION_POLICY.md](MIGRATION_POLICY.md) antes de modificar el
proyecto y [DEPLOY-CLOUD-SYNC.md](DEPLOY-CLOUD-SYNC.md) antes de instalar la
sincronización en EC2.

## Autor

Jaime Sánchez Sáenz — [CodeCafe.io](https://codecafe.io)
