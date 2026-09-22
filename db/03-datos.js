db = db.getSiblingDB("helpdesk_erp")

db.usuarios.deleteMany({})
db.sesiones.deleteMany({})
db.tickets.deleteMany({})
db.articulos_kb.deleteMany({})

var USR_ADMIN = ObjectId("650000000000000000000001")
var USR_EMPLEADO_1 = ObjectId("650000000000000000000002")
var USR_EMPLEADO_2 = ObjectId("650000000000000000000003")
var USR_EMPLEADO_3 = ObjectId("650000000000000000000007")
var USR_EMPLEADO_4 = ObjectId("650000000000000000000008")
var USR_CLIENTE_1 = ObjectId("650000000000000000000004")
var USR_CLIENTE_2 = ObjectId("650000000000000000000005")
var USR_CLIENTE_3 = ObjectId("650000000000000000000009")
var USR_CLIENTE_4 = ObjectId("650000000000000000000010")
var USR_CLIENTE_5 = ObjectId("650000000000000000000011")
var USR_CLIENTE_6 = ObjectId("650000000000000000000012")
var USR_CLIENTE_7 = ObjectId("650000000000000000000013")
var USR_CLIENTE_8 = ObjectId("650000000000000000000014")
var USR_NUEVO_SIN_ROL = ObjectId("650000000000000000000006")

var HASH = "$2b$10$KjX9pQwErTyUiOpAsDfGhZxCvBnMqWeRtYuIoPaSdFgHjKlZxCvB"

db.usuarios.insertMany([
  { _id: USR_ADMIN, correo: "admin@sistemasintegrados.com", password_hash: HASH, password_temporal: false, nombre: "Laura Gamboa Pena", rol: "admin", empresa: "Sistemas Integrados S.A.", fecha_registro: new Date("2026-02-01") },
  { _id: USR_EMPLEADO_1, correo: "jperez@sistemasintegrados.com", password_hash: HASH, password_temporal: false, nombre: "Julian Perez Ortega", rol: "empleado", empresa: "Sistemas Integrados S.A.", fecha_registro: new Date("2026-03-10") },
  { _id: USR_EMPLEADO_2, correo: "mrodriguez@sistemasintegrados.com", password_hash: HASH, password_temporal: false, nombre: "Marcela Rodriguez Silva", rol: "empleado", empresa: "Sistemas Integrados S.A.", fecha_registro: new Date("2026-04-05") },
  { _id: USR_EMPLEADO_3, correo: "dcastro@sistemasintegrados.com", password_hash: HASH, password_temporal: false, nombre: "Diego Castro Nino", rol: "empleado", empresa: "Sistemas Integrados S.A.", fecha_registro: new Date("2026-05-12") },
  { _id: USR_EMPLEADO_4, correo: "vlopez@sistemasintegrados.com", password_hash: HASH, password_temporal: false, nombre: "Valentina Lopez Duarte", rol: "empleado", empresa: "Sistemas Integrados S.A.", fecha_registro: new Date("2026-06-18") },
  { _id: USR_CLIENTE_1, correo: "compras@eltornillo.com.co", password_hash: HASH, password_temporal: true, nombre: "Andres Sepulveda Mora", rol: "cliente", tipo_cliente: "juridico", fecha_registro: new Date("2026-08-15") },
  { _id: USR_CLIENTE_2, documento: "60445566", password_hash: HASH, password_temporal: true, nombre: "Nubia Ramirez Prada", rol: "cliente", tipo_cliente: "natural", fecha_registro: new Date("2026-08-20") },
  { _id: USR_CLIENTE_3, correo: "pedidos@ferreteriacentral.com", password_hash: HASH, password_temporal: true, nombre: "Camilo Vega Rojas", rol: "cliente", tipo_cliente: "juridico", fecha_registro: new Date("2026-08-22") },
  { _id: USR_CLIENTE_4, documento: "88221144", password_hash: HASH, password_temporal: true, nombre: "Diana Osorio Leon", rol: "cliente", tipo_cliente: "natural", fecha_registro: new Date("2026-08-25") },
  { _id: USR_CLIENTE_5, correo: "contacto@modaurbana.co", password_hash: HASH, password_temporal: true, nombre: "Sergio Nino Bautista", rol: "cliente", tipo_cliente: "juridico", fecha_registro: new Date("2026-08-28") },
  { _id: USR_CLIENTE_6, documento: "13398765", password_hash: HASH, password_temporal: true, nombre: "Paola Contreras Amaya", rol: "cliente", tipo_cliente: "natural", fecha_registro: new Date("2026-09-01") },
  { _id: USR_CLIENTE_7, correo: "admin@electrohogar.com.co", password_hash: HASH, password_temporal: true, nombre: "Ricardo Pabon Quintero", rol: "cliente", tipo_cliente: "juridico", fecha_registro: new Date("2026-09-03") },
  { _id: USR_CLIENTE_8, documento: "45509921", password_hash: HASH, password_temporal: true, nombre: "Lorena Suarez Jaimes", rol: "cliente", tipo_cliente: "natural", fecha_registro: new Date("2026-09-05") },
  { _id: USR_NUEVO_SIN_ROL, correo: "nuevoempleado@sistemasintegrados.com", password_hash: HASH, password_temporal: true, nombre: "Camila Torres Diaz", empresa: "Sistemas Integrados S.A.", fecha_registro: new Date("2026-09-20") }
])

var EMPLEADOS = [USR_EMPLEADO_1, USR_EMPLEADO_2, USR_EMPLEADO_3, USR_EMPLEADO_4]
var CLIENTES = [USR_CLIENTE_1, USR_CLIENTE_2, USR_CLIENTE_3, USR_CLIENTE_4, USR_CLIENTE_5, USR_CLIENTE_6, USR_CLIENTE_7, USR_CLIENTE_8]
var TODOS_LOS_USUARIOS = [USR_ADMIN].concat(EMPLEADOS, CLIENTES, [USR_NUEVO_SIN_ROL])

var sesiones = []
for (var s = 0; s < 20; s++) {
  var usuario = TODOS_LOS_USUARIOS[s % TODOS_LOS_USUARIOS.length]
  var dia = 1 + (s % 20)
  var inicio = new Date(Date.UTC(2026, 8, dia, 7 + (s % 10), 0, 0))
  var fin = (s % 4 === 0) ? null : new Date(inicio.getTime() + (30 + s) * 60000)
  sesiones.push({ usuario_id: usuario, inicio: inicio, fin: fin })
}
db.sesiones.insertMany(sesiones)

var TIPOS_TICKET = ["problematica", "acierto"]
var TIPOS_PROBLEMA = ["pago", "inventario", "envio", "cuenta", "facturacion", "soporte_tecnico", "garantia", "sugerencia"]
var ESTADOS = ["abierto", "en_proceso", "cerrado"]

var ticketsBase = [
  { codigo: "TK-0001", fecha: new Date("2026-09-08T08:00:00Z"), tipo_ticket: "problematica", tipo_problema: "pago", descripcion: "Los clientes no pueden pagar con PSE desde el carrito.", creado_por: USR_CLIENTE_1, asignado_a: USR_EMPLEADO_1, estado: "cerrado" },
  { codigo: "TK-0002", fecha: new Date("2026-09-14T08:10:00Z"), tipo_ticket: "problematica", tipo_problema: "inventario", descripcion: "El inventario no cuadra despues del traslado entre bodegas.", creado_por: USR_CLIENTE_2, asignado_a: USR_EMPLEADO_2, estado: "en_proceso" },
  { codigo: "TK-0003", fecha: new Date("2026-09-19T09:00:00Z"), tipo_ticket: "acierto", tipo_problema: "sugerencia", descripcion: "Mostrar el stock disponible en la ficha del producto.", creado_por: USR_CLIENTE_1, asignado_a: null, estado: "abierto" }
]

var ticketsExtra = []
for (var t = 4; t <= 30; t++) {
  var n = t - 4
  var estado = ESTADOS[n % ESTADOS.length]
  ticketsExtra.push({
    codigo: "TK-" + String(t).padStart(4, "0"),
    fecha: new Date(Date.UTC(2026, 8, 1 + (n % 28), 8, 0, 0)),
    tipo_ticket: TIPOS_TICKET[n % TIPOS_TICKET.length],
    tipo_problema: TIPOS_PROBLEMA[n % TIPOS_PROBLEMA.length],
    descripcion: "Ticket de prueba numero " + t,
    creado_por: CLIENTES[n % CLIENTES.length],
    asignado_a: estado === "abierto" ? null : EMPLEADOS[n % EMPLEADOS.length],
    estado: estado
  })
}
db.tickets.insertMany(ticketsBase.concat(ticketsExtra))

db.articulos_kb.insertMany([
  { titulo: "Error al confirmar el pago con PSE", contenido: "El token de la transaccion expira a los 15 minutos. Se regenera desde el panel de integraciones.", autor_id: USR_EMPLEADO_1, fecha_creacion: new Date("2026-03-30") },
  { titulo: "Descuadre de inventario tras un traslado", contenido: "Si un traslado queda en borrador, la bodega destino no recibe la mercancia. Hay que confirmarlo.", autor_id: USR_EMPLEADO_2, fecha_creacion: new Date("2026-05-02") },
  { titulo: "Como responder un ticket de envio demorado", contenido: "Verificar el numero de guia con la transportadora antes de responder al cliente.", autor_id: USR_EMPLEADO_3, fecha_creacion: new Date("2026-06-10") },
  { titulo: "Politica de garantias", contenido: "Las garantias aplican durante los primeros 30 dias desde la entrega, con factura.", autor_id: USR_EMPLEADO_4, fecha_creacion: new Date("2026-07-01") },
  { titulo: "Pasos para restablecer una contrasena temporal", contenido: "El usuario debe cambiarla en el primer inicio de sesion, el sistema lo obliga.", autor_id: USR_ADMIN, fecha_creacion: new Date("2026-07-15") },
  { titulo: "Errores comunes de facturacion electronica", contenido: "Revisar que el NIT del cliente este bien escrito antes de emitir la factura.", autor_id: USR_EMPLEADO_1, fecha_creacion: new Date("2026-08-02") }
])

db.getCollectionNames().sort().forEach(function (c) {
  print(c + ": " + db[c].countDocuments())
})
