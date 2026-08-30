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

La instalación final en EC2 debe ejecutarse por etapas y detenerse ante
cualquier salida inesperada. No se incluye un reemplazo automático del archivo
NGINX porque Certbot ya administra el bloque HTTPS existente.
