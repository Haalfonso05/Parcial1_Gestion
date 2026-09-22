db = db.getSiblingDB("helpdesk_erp")

var ok = 0
var mal = 0

function probar(descripcion, debeFallar, fn) {
  var error = null
  try { fn() } catch (e) { error = e }
  var fallo = error !== null
  var correcto = fallo === debeFallar
  if (correcto) { ok++ } else { mal++ }
  print((correcto ? "[OK]   " : "[MAL]  ") + descripcion)
  print("       esperado: " + (debeFallar ? "RECHAZADO" : "ACEPTADO") + " | real: " + (fallo ? "RECHAZADO" : "ACEPTADO"))
  if (fallo) { print("       motivo: " + String(error.message || error).split("\n")[0].substring(0, 120)) }
}

print("=== USUARIOS ===")

probar("1. Falta el campo obligatorio nombre", true, function () {
  db.usuarios.insertOne({ correo: "sin_nombre@correo.com", password_hash: "x".repeat(25), fecha_registro: new Date() })
})

probar("2. Rol que no existe en el enum", true, function () {
  db.usuarios.insertOne({ correo: "prueba@correo.com", password_hash: "x".repeat(25), nombre: "Prueba", rol: "gerente", fecha_registro: new Date() })
})

probar("3. Campo inventado que no esta declarado", true, function () {
  db.usuarios.insertOne({ correo: "otro@correo.com", password_hash: "x".repeat(25), nombre: "Prueba", edad: 20, fecha_registro: new Date() })
})

probar("4. Correo duplicado", true, function () {
  db.usuarios.insertOne({ correo: "admin@sistemasintegrados.com", password_hash: "x".repeat(25), nombre: "Clon", fecha_registro: new Date() })
})

probar("5. Usuario sin rol (valido, se asigna despues)", false, function () {
  db.usuarios.insertOne({ correo: "prueba_valida@correo.com", password_hash: "x".repeat(25), nombre: "Prueba Valida", fecha_registro: new Date() })
})

probar("6. Cliente sin tipo_cliente (natural/juridico)", true, function () {
  db.usuarios.insertOne({ correo: "cliente_sin_tipo@correo.com", password_hash: "x".repeat(25), nombre: "Cliente Sin Tipo", rol: "cliente", fecha_registro: new Date() })
})

probar("7. Cliente con tipo_cliente valido", false, function () {
  db.usuarios.insertOne({ correo: "cliente_con_tipo@correo.com", password_hash: "x".repeat(25), nombre: "Cliente Con Tipo", rol: "cliente", tipo_cliente: "natural", fecha_registro: new Date() })
})

print("=== TICKETS ===")

probar("8. Estado que no existe en el enum", true, function () {
  db.tickets.insertOne({
    codigo: "TK-9001", fecha: new Date(), tipo_ticket: "problematica", tipo_problema: "prueba",
    creado_por: ObjectId("650000000000000000000004"), estado: "pendiente"
  })
})

probar("9. Codigo de ticket duplicado", true, function () {
  db.tickets.insertOne({
    codigo: "TK-0001", fecha: new Date(), tipo_ticket: "problematica", tipo_problema: "prueba",
    creado_por: ObjectId("650000000000000000000004"), estado: "abierto"
  })
})

probar("10. Ticket valido", false, function () {
  db.tickets.insertOne({
    codigo: "TK-9002", fecha: new Date(), tipo_ticket: "problematica", tipo_problema: "prueba",
    creado_por: ObjectId("650000000000000000000004"), estado: "abierto"
  })
})

var borrados = db.tickets.deleteMany({ codigo: /^TK-90/ }).deletedCount
var borradosUsr = db.usuarios.deleteMany({ correo: { $in: ["prueba_valida@correo.com", "cliente_sin_tipo@correo.com", "cliente_con_tipo@correo.com"] } }).deletedCount
print("Limpieza: se borraron " + borrados + " ticket(s) y " + borradosUsr + " usuario(s) de prueba")
print("RESULTADO: " + ok + " correctas, " + mal + " inesperadas")
