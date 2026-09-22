db = db.getSiblingDB("helpdesk_erp")

function generarCorreo(nombre, apellido) {
  return (nombre[0] + apellido).toLowerCase() + "@sistemasintegrados.com"
}

db.usuarios.insertOne({
  correo: generarCorreo("Andrea", "Ramirez"),
  password_hash: "x".repeat(25),
  nombre: "Andrea Ramirez",
  rol: "empleado",
  empresa: "Sistemas Integrados S.A.",
  fecha_registro: new Date()
})
