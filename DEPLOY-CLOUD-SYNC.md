# Despliegue aditivo de sincronización privada

Este procedimiento añade CodeCafe CV Sync sin reemplazar el sitio existente,
Atlas, otros sitios, certificados ni configuraciones ajenas. La versión 1.0.1
permanece disponible mediante Git y el servicio nuevo puede detenerse sin
afectar la interfaz estática.

## Recursos exclusivos

| Recurso | Uso |
|---|---|
| `127.0.0.1:5002` | API privada de CV Sync |
| `codecafe-cv` | Usuario Linux sin inicio de sesión |
| `/opt/codecafe-studio/data/codecafe-cv-studio` | Base cifrada y salt persistente |
| `/etc/codecafe-cv-sync.env` | Hash de contraseña y configuración |
| `/etc/systemd/system/codecafe-cv-sync.service` | Servicio independiente |

Atlas conserva `127.0.0.1:5001` y su directorio actual.

## Google Drive

El conector está implementado, pero permanece desactivado mientras no exista
`cloud-config.json`. El identificador OAuth es público por diseño; nunca se
debe colocar un client secret en el navegador o en ese archivo.

La activación requiere:

1. Crear un proyecto en Google Cloud.
2. Habilitar Google Drive API.
3. Configurar la pantalla de consentimiento OAuth para uso personal.
4. Crear un cliente OAuth de tipo **Aplicación web**.
5. Autorizar los orígenes `https://cv.codecafe.io`.
6. Copiar `deploy/cloud-config.example.json` como `cloud-config.json` y colocar
   únicamente el Client ID.

## Validaciones realizadas antes de publicar

```bash
# Verifica TypeScript y genera los archivos estáticos de producción.
npm run build

# Ejecuta las pruebas de contraseña, versiones, retención y conflictos.
python3 -m unittest discover -s server -p 'test_*.py' -v

# Comprueba la sintaxis del servidor sin iniciarlo.
python3 -m py_compile server/app.py
```

## Instalación desde el repositorio ya existente en EC2

```bash
# Entra al repositorio exclusivo del CV; no entra ni modifica la ruta de Atlas.
cd /opt/codecafe-studio/apps/codecafe-cv-studio-source

# Descarga la versión publicada sin cambiar todavía los archivos del sitio activo.
sudo git fetch origin main

# Selecciona la versión 1.1.0 recién publicada en la rama remota.
# En el bloque entregado junto con la publicación se utiliza su hash inmutable.
sudo git checkout --detach origin/main

# Instala exactamente las dependencias fijadas en package-lock.json.
sudo npm ci

# Comprueba TypeScript y reconstruye dist antes de tocar el sitio activo.
sudo npm run build

# Ejecuta las pruebas del servicio desde la copia que se va a instalar.
sudo python3 -m unittest discover -s server -p 'test_*.py' -v

# Ejecuta el instalador comentado. Pedirá dos veces una contraseña nueva.
sudo bash deploy/install-cloud-sync.sh
```

El instalador conserva el `index.html` anterior, no elimina los assets de
1.0.1, no reemplaza el certificado y revierte el archivo NGINX si `nginx -t`
falla. Debe detenerse ante cualquier salida inesperada.
