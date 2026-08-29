# Política obligatoria de migración

La versión funcional existente de CodeCafe CV Studio es la fuente de verdad.
Migrar significa trasladar íntegramente esa aplicación a otro entorno; no
significa reconstruirla, reinterpretarla ni reemplazarla.

## Reglas

1. Conservar la interfaz clara, colores, contenido y comportamiento existentes.
2. Mantener todas las funciones enumeradas en `README.md`.
3. Realizar solamente las adaptaciones indispensables para el alojamiento.
4. No mezclar la migración con rediseños, mejoras o refactorizaciones.
5. Derivar las versiones web y desktop de la misma base funcional.
6. Trabajar mediante pasos aditivos, pequeños y verificables.
7. Detener el proceso si una validación falla.
8. Comentar y explicar cada bloque de comandos utilizado.
9. Conservar versiones funcionales anteriores y el historial de Git.

## Exclusiones de EC2

La instalación de CodeCafe CV Studio no autoriza modificar, mover, reemplazar,
detener ni eliminar:

- CodeCafe Atlas Web.
- Los otros sitios alojados en la instancia.
- Contenedores o volúmenes existentes.
- Bases de datos o archivos de usuarios.
- Certificados o registros DNS de otros dominios.
- Rutas, puertos o bloques NGINX que ya estén ocupados.

El despliegue debe utilizar exclusivamente recursos nuevos destinados a
`cv.codecafe.io` y detenerse si alguno de esos recursos ya existe.
