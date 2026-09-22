# Helpdesk — Base de datos MongoDB

Proyecto de aula · Bases de Datos No Relacionales · UFPS Ocaña

Base de datos `helpdesk_erp` con 4 colecciones: usuarios, sesiones, tickets
y base de conocimiento.

## Cómo levantarla

Con MongoDB instalado local:

```bash
mongosh --file db/01-colecciones.js
mongosh --file db/02-indices.js
mongosh --file db/03-datos.js
```

En Compass:

1. Conectate a tu Mongo local.
2. Abajo en la ventana esta la pestana `_MONGOSH` (la shell integrada), la abres.
3. Ahi pegas el contenido completo de `01-colecciones.js`, Enter. Despues el de
   `02-indices.js`, Enter. Despues el de `03-datos.js`, Enter.
4. En el panel de la izquierda ya aparece `helpdesk_erp` con sus colecciones
   para explorar y consultar.

## Los archivos de `db/`

| Archivo | Qué hace |
|---|---|
| `00-reset.js` | Borra la BD entera (solo si quieres empezar de cero) |
| `01-colecciones.js` | Crea las 4 colecciones con validación `$jsonSchema` |
| `02-indices.js` | Crea los índices |
| `03-datos.js` | Carga datos de ejemplo |
| `06-pruebas.js` | Inserta documentos malos a propósito para probar la validación |

Los 01, 02 y 03 se pueden correr varias veces sin romper nada (borran y vuelven a cargar).

## Las 4 colecciones

- **`usuarios`** — clientes y empleados juntos. Se registran con correo o
  documento y una clave aleatoria. El rol (`cliente`, `empleado`, `admin`) no
  es obligatorio al crearse: se asigna después.
- **`sesiones`** — cuándo entra y sale cada usuario (`inicio` / `fin`).
- **`tickets`** — el cliente lo crea con fecha, tipo de ticket y tipo de
  problema; el admin lo asigna a un empleado (`asignado_a`).
- **`articulos_kb`** — la base de conocimiento.

## Errores comunes

| Síntoma | Causa | Arreglo |
|---|---|---|
| `Document failed validation` | Falta un campo obligatorio o el valor no está en el enum | Revisar contra el esquema en `01-colecciones.js` |
| `Document failed validation` y el documento se ve bien | Tiene un campo no declarado (`additionalProperties: false`) | Quitar ese campo o agregarlo al esquema |
| `E11000 duplicate key error` | Correo, documento o código de ticket repetido | Cada uno es único |
