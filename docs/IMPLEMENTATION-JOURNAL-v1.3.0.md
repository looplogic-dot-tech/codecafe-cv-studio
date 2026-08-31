# Diario de implementación — CodeCafe CV Studio v1.3.0

Fecha: 31 de agosto de 2026

## Decisión funcional

La versión funcional v1.2.0 permanece como fuente de verdad. No se reconstruyó
el editor, la vista móvil, las plantillas, la biblioteca ni el guardado local.
La modificación se limita a la capa de sincronización:

- Las nuevas revisiones de EC2 se guardan como JSON legible.
- La contraseña de EC2 continúa protegiendo el acceso a la API, pero no cifra el CV.
- Google Drive recibe JSON, documento de Google y PDF normales.
- Los documentos de Drive se agrupan por la colección seleccionada en CV Studio.
- Las copias históricas AES-GCM se pueden seguir abriendo; no se crean copias cifradas nuevas.
- Google conserva la responsabilidad de verificar dispositivos o ubicaciones inusuales.

## Validación local ejecutada

```bash
# Comprueba los tipos de TypeScript sin modificar archivos de producción.
node_modules/.bin/tsc --noEmit

# Genera la compilación estática que se publicará en EC2.
node_modules/.bin/vite build

# Ejecuta las pruebas del servidor, retención, interfaz y NGINX auxiliar.
python3 -m unittest discover -s server -v

# Comprueba que el programa del servicio tenga sintaxis Python válida.
python3 -m py_compile server/app.py

# Comprueba la sintaxis de los scripts antes de entregarlos al servidor.
bash -n deploy/update-v1.2.0.sh deploy/update-v1.3.0.sh deploy/configure-google-drive.sh
```

Resultado: compilación aprobada y 11 pruebas aprobadas.

## Procedimiento aditivo de EC2

El despliegue no ejecuta `npm` en EC2, porque la compilación validada ya está
incluida en Git. El actualizador sólo reinicia `codecafe-cv-sync.service` y
copia nuevos assets con nombres únicos. No reinicia NGINX, Docker ni Atlas.

```bash
# Entra solamente al repositorio de CodeCafe CV Studio.
cd /opt/codecafe-studio/apps/codecafe-cv-studio-source

# Descarga el historial nuevo sin cambiar todavía el sitio publicado.
sudo git fetch origin main

# Selecciona exactamente la revisión publicada de la rama principal.
sudo git checkout --detach origin/main

# Ejecuta las pruebas antes de copiar cualquier archivo al sitio activo.
sudo python3 -m unittest discover -s server -v

# Aplica la actualización aditiva, validada y con rollback automático.
sudo bash deploy/update-v1.3.0.sh
```

La configuración OAuth se realiza por separado después de crear el Client ID.
El configurador solicita únicamente el identificador público; nunca solicita
la contraseña de Google ni un Client Secret.
