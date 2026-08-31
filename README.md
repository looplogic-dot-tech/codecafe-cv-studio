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
- Copias legibles y versionadas en EC2, sin sustituir el guardado local.
- Respaldo JSON importable y exportable.
- Conector opcional de Google Drive con permiso limitado `drive.file`.
- Impresión o exportación a PDF en tamaño A4.
- Exportación de texto compatible con ATS.
- Biblioteca visual adaptable a teléfono con un máximo de 20 CVs en total.
- Colecciones para separar CVs de IT, construcción, uso general u otras categorías.
- Edición, duplicación, renombrado, movimiento, archivado y restauración.
- Secciones personalizadas para necesidades profesionales no cubiertas por los campos predefinidos.
- Revisión ortográfica y gramatical nativa ES/EN, sin enviar el texto a un servicio externo.

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
- Datos: SQLite privado con autenticación y 20 revisiones, separado de Atlas.

La API utiliza únicamente la biblioteca estándar de Python; no usa Flask ni
otro framework web. La contraseña controla el acceso a la API de EC2, pero los
nuevos respaldos permanecen legibles. Google Drive recibe un JSON de trabajo,
un documento y un PDF normales para poder abrirlos e imprimirlos desde el teléfono.

Consulta [MIGRATION_POLICY.md](MIGRATION_POLICY.md) antes de modificar el
proyecto y [DEPLOY-CLOUD-SYNC.md](DEPLOY-CLOUD-SYNC.md) antes de instalar la
sincronización en EC2.

El registro permanente de decisiones, comandos y validaciones de v1.2.0 está
en [docs/IMPLEMENTATION-JOURNAL-v1.2.0.md](docs/IMPLEMENTATION-JOURNAL-v1.2.0.md).
La transición a copias legibles y Google Drive está documentada en
[docs/IMPLEMENTATION-JOURNAL-v1.3.0.md](docs/IMPLEMENTATION-JOURNAL-v1.3.0.md).

## Autor

Jaime Sánchez Sáenz — [CodeCafe.io](https://codecafe.io)
