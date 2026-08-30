# Diario de implementación — CodeCafe CV Studio v1.2.0

Fecha: 2026-08-30

Este documento es el registro permanente de la modificación. Su propósito es
permitir estudiar el trabajo sin depender del historial del chat.

## Restricciones respetadas

- La versión funcional v1.1.0 quedó congelada antes de comenzar.
- No se reconstruyó el editor ni se cambió su aspecto impreso.
- No se modificaron Atlas, otros sitios, certificados, DNS ni puertos.
- El máximo es de 20 CVs en total; archivar no evita el límite.
- EC2 conserva como máximo 20 revisiones históricas globales.
- Google Drive usa un solo archivo cifrado que se actualiza, no una colección ilimitada.
- Los datos se cifran en el navegador antes de salir del dispositivo.

## Cambios por archivo

| Archivo | Motivo |
|---|---|
| `src/workspace.ts` | Modelo compatible de biblioteca, documentos, colecciones y límite de 20. |
| `src/CVLibrary.tsx` | Interfaz móvil para crear, abrir, duplicar, renombrar, mover, archivar y borrar CVs. |
| `src/App.tsx` | Migración desde v1.1, edición del documento activo, secciones personalizadas y respaldo esquema 2. |
| `src/styles.css` | Presentación adaptable de la biblioteca sin modificar la hoja A4. |
| `src/cloud.ts` | Consulta la lista de revisiones y carga una revisión cifrada específica. |
| `server/app.py` | Expone metadatos y recuperación autenticada de las revisiones retenidas. |
| `server/test_frontend_contract.py` | Garantías automatizadas de compatibilidad, privacidad y límite. |
| `deploy/update-v1.2.0.sh` | Actualización aditiva del sitio con respaldo y rollback. |
| `deploy/configure-google-drive.sh` | Activa OAuth con el Client ID público sin solicitar secretos. |
| `deploy/install-cloud-sync.sh` | Espera controlada para evitar la carrera observada al iniciar systemd. |
| `CHANGELOG.md` | Historial legible de la versión. |

## Modelo de guardado

- `Guardar` actualiza el CV abierto. Al sincronizar con EC2, esa acción crea una
  revisión recuperable del respaldo completo.
- El selector `Historial` permite abrir cualquiera de las 20 revisiones todavía
  retenidas. Abrir no sobrescribe; hay que pulsar `Guardar` para crear una revisión nueva.
- `Guardar actual como nuevo` crea un documento distinto.
- `Duplicar` crea un documento distinto conservando contenido y colección.
- La copia local anterior (`codecafe-cv`) se conserva por compatibilidad.
- La biblioteca nueva se guarda además en `codecafe-cv-workspace-v2`.
- El respaldo cifrado usa `schema: 2`; un respaldo `schema: 1` todavía puede abrirse.

## Asistencia de escritura

La versión 1.2 activa `spellCheck` y el atributo `lang` en el editor. El navegador
o teléfono decide qué diccionario ES/EN usar. Esta primera capa no transmite el
contenido a una API de inteligencia artificial o a un corrector externo.

## Python y la API: aclaración

CodeCafe CV Sync no usa Flask. `server/app.py` utiliza `http.server`, `sqlite3`,
`hashlib`, `hmac` y otros módulos incluidos con Python. Por eso no se ejecutó
`pip install`, no se creó un entorno virtual y no se añadió otro framework.

`systemd` mantiene ese programa en ejecución en `127.0.0.1:5002`. NGINX publica
solamente `/api/` para `cv.codecafe.io`. Atlas continúa en `127.0.0.1:5001`.

## Comandos de validación ejecutados

```bash
# Comprueba los tipos sin generar archivos JavaScript.
./node_modules/.bin/tsc --noEmit

# Genera la compilación estática utilizando las dependencias ya instaladas.
./node_modules/.bin/vite build

# Ejecuta todas las pruebas Python del backend, NGINX y contrato del frontend.
python3 -m unittest discover -s server -p 'test_*.py' -v

# Comprueba que los dos programas Python pueden analizarse sin errores de sintaxis.
python3 -m py_compile server/app.py deploy/enable-nginx-api.py

# Comprueba la sintaxis Bash sin ejecutar ni modificar el servidor.
bash -n deploy/install-cloud-sync.sh deploy/update-v1.2.0.sh
```

Resultado: compilación correcta y 10 pruebas aprobadas.

## Procedimiento de actualización en EC2

El hash inmutable del commit se registra al publicar. El bloque entregado al
usuario debe reemplazar `COMMIT_PUBLICADO` por ese hash exacto.

```bash
# Entra únicamente al repositorio de CodeCafe CV Studio.
cd /opt/codecafe-studio/apps/codecafe-cv-studio-source

# Descarga referencias nuevas de GitHub sin tocar todavía el sitio activo.
sudo git fetch origin main

# Selecciona exactamente la versión probada; no sigue cambios futuros de main.
sudo git checkout --detach COMMIT_PUBLICADO

# Ejecuta las pruebas incluidas antes de modificar el sitio publicado.
sudo python3 -m unittest discover -s server -p 'test_*.py' -v

# Ejecuta el actualizador aditivo, que conserva index.html para rollback.
sudo bash deploy/update-v1.2.0.sh
```

No se ejecuta `npm ci` ni `npm run build` en EC2 porque actualmente tiene Node
18.19.1 y Vite 8 requiere Node 20.19+ o 22.12+. La compilación `dist` se genera y
valida antes de publicarla. Tampoco se ejecuta `npm audit fix --force`.

## Rollback

El actualizador imprime una ruta similar a:

`/opt/codecafe-studio/apps/codecafe-cv-studio/index.html.before-v1.2.0-FECHA`

Los assets anteriores no se borran. Para regresar la interfaz, se copia ese
archivo sobre `index.html`; no hace falta modificar NGINX, Atlas ni certificados.

El actualizador reinicia únicamente `codecafe-cv-sync.service` para cargar los
endpoints del historial. Antes crea `server/app.py.before-v1.2.0-FECHA`; si la
API no responde, restaura ese programa y vuelve a iniciar solamente CV Sync.

### Corrección de la verificación HTML

La primera ejecución aprobó las 10 pruebas y `nginx -t`, pero activó rollback
durante `curl | grep --quiet`. Con `set -o pipefail`, `grep` puede terminar al
encontrar el título y cerrar la tubería mientras `curl` todavía escribe; curl
entonces devuelve un error de escritura aunque el HTML sea correcto. La versión
corregida captura primero todo el HTML y después compara el título, tanto por
HTTP local como por HTTPS. Así conserva `pipefail` sin generar ese falso fallo.

La segunda ejecución confirmó que HTTP local respondía pero no contenía el
título. Esto es compatible con la redirección HTTP→HTTPS administrada por
Certbot: una respuesta 301/302 es correcta, pero su cuerpo no es el CV. La
validación definitiva ahora acepta 200 o una redirección HTTP estándar y
comprueba contenido y certificado exclusivamente mediante HTTPS.

## Google Drive pendiente de configuración externa

El conector está implementado con Google Identity Services y el permiso
`drive.file`. Para activarlo todavía se necesita un Client ID público de tipo
“Web application” con `https://cv.codecafe.io` como origen JavaScript autorizado.
No se necesita ni debe publicarse un Client Secret.
