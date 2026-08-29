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

## Publicación prevista

- Dirección: `https://cv.codecafe.io`
- Servidor: EC2 con NGINX.
- Ruta aislada: `/opt/codecafe-studio/apps/codecafe-cv-studio`
- Tipo: sitio estático, sin Docker, base de datos o puerto interno.

Consulta [MIGRATION_POLICY.md](MIGRATION_POLICY.md) antes de modificar el
proyecto y [README-EC2.md](README-EC2.md) antes de instalarlo en EC2.

## Autor

Jaime Sánchez Sáenz — [CodeCafe.io](https://codecafe.io)
