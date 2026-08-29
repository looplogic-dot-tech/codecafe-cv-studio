# CodeCafe CV Studio — paquete independiente para EC2

Esta aplicación es estática. No usa Docker, base de datos, servicio permanente
ni puerto interno. NGINX sirve los archivos directamente.

## Separación obligatoria

- Ruta nueva: /opt/codecafe-studio/apps/codecafe-cv-studio
- Hostname nuevo: cv.codecafe.io
- Atlas Web permanece en /opt/codecafe-studio/apps/codecafe-atlas-web
- Atlas Web permanece en 127.0.0.1:5001
- No se modifica, reemplaza ni elimina ningún sitio, contenedor, volumen,
  configuración o certificado existente.

## Contenido para producción

La carpeta dist contiene los únicos archivos que deben copiarse al directorio
nuevo de EC2.

El archivo deploy/cv.codecafe.io.nginx es un bloque NGINX nuevo. Debe revisarse
junto con la configuración existente antes de habilitarse.

## Operación segura

La instalación en EC2 debe realizarse en pasos separados:

1. Crear exclusivamente el directorio nuevo.
2. Copiar exclusivamente el contenido de dist.
3. Crear un archivo NGINX nuevo para cv.codecafe.io.
4. Ejecutar sudo nginx -t.
5. Sólo si la validación es correcta, recargar NGINX.
6. Crear el registro DNS de cv.codecafe.io.
7. Emitir un certificado HTTPS únicamente para cv.codecafe.io.

No se deben usar comandos recursivos contra /opt/codecafe-studio, /etc/nginx,
/var/www ni la raíz de la instancia.
