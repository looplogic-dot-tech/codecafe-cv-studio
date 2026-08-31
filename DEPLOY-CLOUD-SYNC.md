# Despliegue aditivo de sincronización

Este procedimiento añade CodeCafe CV Sync sin reemplazar el sitio existente,
Atlas, otros sitios, certificados ni configuraciones ajenas. Las versiones anteriores
permanece disponible mediante Git y el servicio nuevo puede detenerse sin
afectar la interfaz estática.

## Recursos exclusivos

| Recurso | Uso |
|---|---|
| `127.0.0.1:5002` | API privada de CV Sync |
| `codecafe-cv` | Usuario Linux sin inicio de sesión |
| `/opt/codecafe-studio/data/codecafe-cv-studio` | Base privada con máximo de 20 revisiones |
| `/etc/codecafe-cv-sync.env` | Hash de contraseña y configuración |
| `/etc/systemd/system/codecafe-cv-sync.service` | Servicio independiente |

Atlas conserva `127.0.0.1:5001` y su directorio actual.

## Google Drive

El conector está implementado, pero permanece desactivado mientras no exista
`cloud-config.json`. El identificador OAuth es público por diseño; nunca se
debe colocar un client secret en el navegador o en ese archivo.

Google Drive recibe archivos sin cifrar: un JSON para recuperar el editor, un
documento de Google y un PDF imprimible. Se organizan dentro de la carpeta
`CodeCafe CV Studio` y una subcarpeta con el nombre de la colección del CV.

La activación requiere:

1. Crear un proyecto en Google Cloud.
2. Habilitar Google Drive API.
3. Configurar la pantalla de consentimiento OAuth para uso personal.
4. Crear un cliente OAuth de tipo **Aplicación web**.
5. Autorizar los orígenes `https://cv.codecafe.io`.
6. Copiar `deploy/cloud-config.example.json` como `cloud-config.json` y colocar
   únicamente el Client ID.

Después de obtener el Client ID, el archivo puede configurarse sin editar JSON
manualmente:

```bash
# Entra solamente al repositorio del CV que ya contiene el configurador comentado.
cd /opt/codecafe-studio/apps/codecafe-cv-studio-source

# Solicita el Client ID público, valida su formato y conserva la configuración anterior.
# Nunca solicita la contraseña de Google ni un Client Secret.
sudo bash deploy/configure-google-drive.sh
```

## Validaciones realizadas antes de publicar

```bash
# Verifica TypeScript y genera los archivos estáticos de producción.
npm run build

# Ejecuta las pruebas de acceso, versiones, retención y conflictos.
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

# No reconstruye dist en EC2: Node 18.19.1 no satisface el requisito de Vite 8.
# La compilación publicada ya fue generada y validada con una versión compatible.

# Ejecuta las pruebas del servicio desde la copia que se va a instalar.
sudo python3 -m unittest discover -s server -p 'test_*.py' -v

# En una instalación nueva, ejecuta el instalador comentado.
# Pedirá dos veces una contraseña de sincronización sólo si aún no existe.
sudo bash deploy/install-cloud-sync.sh

# En un servidor donde v1.1.0 ya funciona, usa únicamente el actualizador web.
# No cambia NGINX, certificados, contraseña, Atlas ni otros sitios.
# Reinicia solamente CV Sync para cargar la consulta nueva de historial.
sudo bash deploy/update-v1.3.0.sh
```

El instalador conserva el `index.html` anterior, no elimina los assets de
anteriores, no reemplaza el certificado y revierte el archivo NGINX si `nginx -t`
falla. Debe detenerse ante cualquier salida inesperada.
