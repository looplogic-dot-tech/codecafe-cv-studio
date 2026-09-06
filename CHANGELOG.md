# Historial de versiones

## 1.4.3 — 2026-09-06

- Convierte `[texto](https://dirección)` en un hipervínculo seguro dentro de los campos estructurados.
- Conserva el enlace en la vista previa y en las copias imprimibles/PDF que admitan vínculos.
- Rechaza esquemas ejecutables: sólo reconoce direcciones `http://` y `https://`.

## 1.4.2 — 2026-09-06

- Reconoce líneas completas escritas como `**Encabezado**` y las presenta en negrita.
- Reconoce etiquetas como `**Credencial:** contenido` y limita la negrita a la etiqueta.
- Mantiene también la sintaxis rápida `Encabezado: contenido` de versiones anteriores.

## 1.4.1 — 2026-09-06

- Añade un campo opcional de repositorio a cada proyecto y lo incluye en vista previa, impresión, PDF, Drive y texto ATS.
- Reconoce `Encabezado: contenido` en campos multilínea y presenta el encabezado en negrita sin almacenar HTML.
- Conserva proyectos y textos anteriores aunque no contengan repositorio ni encabezados estructurados.

## 1.4.0 — 2026-09-06

- Presenta `Herramientas y tecnologías` por categorías compactas cuando cada línea usa `Categoría: contenido`.
- Conserva sin modificación el texto plano de los CVs creados con versiones anteriores.
- Permite editar directamente en la vista previa los títulos visibles de nueve secciones.
- Mantiene identificadores internos estables y guarda los títulos personalizados dentro de cada CV.
- Permite restablecer cada título a su valor predeterminado ES/EN con un solo clic.
- Aplica categorías y títulos personalizados a pantalla, impresión, PDF, copia portátil de Drive y exportación ATS.
- Conserva el flujo actual de edición, guardado, biblioteca, sincronización y diseño responsive.

## 1.3.0 — 2026-08-31

- Conserva íntegro el editor, la interfaz móvil y la biblioteca de CVs de v1.2.0.
- Guarda las nuevas revisiones de EC2 como JSON legible, protegido por autenticación pero sin cifrado de contenido.
- Guarda en Google Drive un espacio de trabajo JSON normal, un documento de Google y un PDF imprimible sin cifrar.
- Organiza los documentos y PDFs de Drive dentro de `CodeCafe CV Studio/<colección>`.
- Permite conectar Google Drive sin escribir la contraseña de EC2.
- Reutiliza temporalmente la autorización válida de Google y evita solicitar consentimiento en cada apertura.
- Delega a Google las comprobaciones de seguridad por dispositivo o ubicación inusual.
- Mantiene lectura retrocompatible de las revisiones AES-GCM creadas por versiones anteriores.
- Conserva el límite de 20 revisiones en EC2 y el máximo de 20 CVs en la biblioteca.

## 1.2.0 — 2026-08-30

- Añade una biblioteca visual y adaptable a teléfono para organizar hasta 20 CVs.
- Añade colecciones iniciales para IT, construcción y uso general, además de colecciones personalizadas.
- Permite abrir y editar un CV existente, duplicarlo, renombrarlo, moverlo, archivarlo y restaurarlo.
- Mantiene `Guardar` como revisión del CV actual y ofrece `Guardar actual como nuevo` para crear otro documento.
- Añade secciones personalizadas para adaptar el contenido a empleos no técnicos sin eliminar los campos IT opcionales.
- Activa la revisión ortográfica y gramatical nativa del navegador según el idioma ES/EN.
- Migra automáticamente el único CV local de v1.1.0 a la nueva biblioteca sin borrar sus datos.
- Amplía el respaldo para incluir documentos, colecciones y configuración en un solo archivo.
- Conserva un límite global de 20 respaldos históricos en EC2 y actualiza un solo archivo en Google Drive.
- Añade un selector visible para abrir cualquiera de las revisiones todavía retenidas en EC2.
- Añade un diario técnico y un actualizador aditivo con validación y rollback.
- Corrige la espera inicial de CV Sync para evitar una falsa falla mientras systemd termina de iniciar Python.

## 1.1.0 — 2026-08-30

- Conserva el guardado local de la versión 1.0.1.
- Añade respaldos AES-GCM cifrados en el navegador.
- Añade API privada para EC2 en `127.0.0.1:5002`.
- Conserva las 20 revisiones más recientes en una base SQLite aislada.
- Detecta conflictos antes de sobrescribir una revisión más reciente.
- Añade importación y exportación de respaldos cifrados.
- Añade conector opcional de Google Drive mediante OAuth y `drive.file`.
- No modifica Atlas, sus rutas, su puerto ni su base de datos.

## 1.0.1 — 2026-08-29

- Sustituye el perfil precargado por información demostrativa ficticia.

## 1.0.0 — 2026-08-29

- Primera migración funcional independiente de ChatGPT Sites.
