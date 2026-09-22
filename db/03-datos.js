db = db.getSiblingDB("helpdesk_erp")

db.usuarios.deleteMany({})
db.sesiones.deleteMany({})
db.tickets.deleteMany({})
db.articulos_kb.deleteMany({})

var USR_ADMIN = ObjectId("650000000000000000000001")
var USR_EMPLEADO_1 = ObjectId("650000000000000000000002")
var USR_EMPLEADO_2 = ObjectId("650000000000000000000003")
var USR_CLIENTE_1 = ObjectId("650000000000000000000004")
var USR_CLIENTE_2 = ObjectId("650000000000000000000005")
var USR_NUEVO_SIN_ROL = ObjectId("650000000000000000000006")

var HASH = "$2b$10$KjX9pQwErTyUiOpAsDfGhZxCvBnMqWeRtYuIoPaSdFgHjKlZxCvB"

db.usuarios.insertMany([
  {
    _id: USR_ADMIN,
    correo: "admin@sistemasintegrados.com",
    password_hash: HASH,
    password_temporal: false,
    nombre: "Laura Gamboa Pena",
    rol: "admin",
    empresa: "Sistemas Integrados S.A.",
    fecha_registro: new Date("2026-02-01")
  },
  {
    _id: USR_EMPLEADO_1,
    correo: "jperez@sistemasintegrados.com",
    password_hash: HASH,
    password_temporal: false,
    nombre: "Julian Perez Ortega",
    rol: "empleado",
    empresa: "Sistemas Integrados S.A.",
    fecha_registro: new Date("2026-03-10")
  },
  {
    _id: USR_EMPLEADO_2,
    correo: "mrodriguez@sistemasintegrados.com",
    password_hash: HASH,
    password_temporal: false,
    nombre: "Marcela Rodriguez Silva",
    rol: "empleado",
    empresa: "Sistemas Integrados S.A.",
    fecha_registro: new Date("2026-04-05")
  },
  {
    _id: USR_CLIENTE_1,
    correo: "compras@eltornillo.com.co",
    password_hash: HASH,
    password_temporal: true,
    nombre: "Andres Sepulveda Mora",
    rol: "cliente",
    fecha_registro: new Date("2026-08-15")
  },
  {
    _id: USR_CLIENTE_2,
    documento: "60445566",
    password_hash: HASH,
    password_temporal: true,
    nombre: "Nubia Ramirez Prada",
    rol: "cliente",
    fecha_registro: new Date("2026-08-20")
  },
  {
    _id: USR_NUEVO_SIN_ROL,
    correo: "nuevoempleado@sistemasintegrados.com",
    password_hash: HASH,
    password_temporal: true,
    nombre: "Camila Torres Diaz",
    empresa: "Sistemas Integrados S.A.",
    fecha_registro: new Date("2026-09-20")
  }
])

db.sesiones.insertMany([
  { usuario_id: USR_CLIENTE_1, inicio: new Date("2026-09-21T08:00:00Z"), fin: new Date("2026-09-21T08:35:00Z") },
  { usuario_id: USR_EMPLEADO_1, inicio: new Date("2026-09-21T07:45:00Z"), fin: null },
  { usuario_id: USR_ADMIN, inicio: new Date("2026-09-20T09:00:00Z"), fin: new Date("2026-09-20T17:30:00Z") }
])

db.tickets.insertMany([
  {
    codigo: "TK-0001",
    fecha: new Date("2026-09-08T08:00:00Z"),
    tipo_ticket: "problematica",
    tipo_problema: "pago",
    descripcion: "Los clientes no pueden pagar con PSE desde el carrito.",
    creado_por: USR_CLIENTE_1,
    asignado_a: USR_EMPLEADO_1,
    estado: "cerrado"
  },
  {
    codigo: "TK-0002",
    fecha: new Date("2026-09-14T08:10:00Z"),
    tipo_ticket: "problematica",
    tipo_problema: "inventario",
    descripcion: "El inventario no cuadra despues del traslado entre bodegas.",
    creado_por: USR_CLIENTE_2,
    asignado_a: USR_EMPLEADO_2,
    estado: "en_proceso"
  },
  {
    codigo: "TK-0003",
    fecha: new Date("2026-09-19T09:00:00Z"),
    tipo_ticket: "acierto",
    tipo_problema: "sugerencia",
    descripcion: "Mostrar el stock disponible en la ficha del producto.",
    creado_por: USR_CLIENTE_1,
    asignado_a: null,
    estado: "abierto"
  }
])

db.articulos_kb.insertMany([
  {
    titulo: "Error al confirmar el pago con PSE",
    contenido: "El token de la transaccion expira a los 15 minutos. Se regenera desde el panel de integraciones.",
    autor_id: USR_EMPLEADO_1,
    fecha_creacion: new Date("2026-03-30")
  },
  {
    titulo: "Descuadre de inventario tras un traslado",
    contenido: "Si un traslado queda en borrador, la bodega destino no recibe la mercancia. Hay que confirmarlo.",
    autor_id: USR_EMPLEADO_2,
    fecha_creacion: new Date("2026-05-02")
  }
])

db.getCollectionNames().sort().forEach(function (c) {
  print(c + ": " + db[c].countDocuments())
})
