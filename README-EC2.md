# CodeCafe CV Studio — paquete independiente para EC2

La interfaz continúa siendo estática y NGINX sirve sus archivos directamente.
Desde la versión 1.1.0 existe un servicio de sincronización **opcional**,
separado, que escucha únicamente en `127.0.0.1:5002` y guarda hasta 20 copias
legibles con acceso autenticado. No usa Docker ni modifica la base de datos de Atlas.

## Separación obligatoria

- Ruta nueva: /opt/codecafe-studio/apps/codecafe-cv-studio
- Hostname nuevo: cv.codecafe.io
- Atlas Web permanece en /opt/codecafe-studio/apps/codecafe-atlas-web
- Atlas Web permanece en 127.0.0.1:5001
- CV Sync utiliza exclusivamente 127.0.0.1:5002
- Los datos privados utilizan /opt/codecafe-studio/data/codecafe-cv-studio
- No se modifica, reemplaza ni elimina ningún sitio, contenedor, volumen,
  configuración o certificado existente.

## Contenido para producción

La carpeta dist contiene los únicos archivos que deben copiarse al directorio
nuevo de EC2.

El archivo `deploy/nginx-api-location.conf` contiene solamente la ubicación
`/api/` que debe incluirse dentro del bloque HTTPS existente de
`cv.codecafe.io`. No debe reemplazarse el archivo creado por Certbot.

## Operación segura

La instalación en EC2 debe realizarse en pasos separados:

1. Crear exclusivamente el directorio nuevo.
2. Copiar exclusivamente el contenido de dist.
3. Instalar el servicio nuevo `codecafe-cv-sync` sin iniciarlo todavía.
4. Añadir exclusivamente la ubicación `/api/` al sitio CV existente.
5. Ejecutar `sudo nginx -t`.
6. Sólo si la validación es correcta, recargar NGINX.
7. Probar salud, autenticación, guardado y recuperación.

Los pasos completos y comentados están en `DEPLOY-CLOUD-SYNC.md`.

No se deben usar comandos recursivos contra /opt/codecafe-studio, /etc/nginx,
/var/www ni la raíz de la instancia.
