db = db.getSiblingDB("helpdesk_erp")

print("=== 1. Todos los usuarios ===")
printjson(db.usuarios.find({}, { nombre: 1, rol: 1, empresa: 1 }).toArray())

print("=== 2. Usuarios sin rol asignado todavia ===")
printjson(db.usuarios.find({ rol: { $exists: false } }, { nombre: 1, correo: 1 }).toArray())

print("=== 3. Tickets abiertos ===")
printjson(db.tickets.find({ estado: "abierto" }, { codigo: 1, tipo_problema: 1, descripcion: 1 }).toArray())

print("=== 4. Tickets sin asignar ===")
printjson(db.tickets.find({ asignado_a: null }, { codigo: 1, tipo_problema: 1 }).toArray())

print("=== 5. Tickets de un cliente especifico ===")
printjson(db.tickets.find({ creado_por: ObjectId("650000000000000000000004") }, { codigo: 1, estado: 1 }).toArray())

print("=== 6. Tickets con el nombre del empleado asignado (lookup) ===")
printjson(
  db.tickets.aggregate([
    { $lookup: { from: "usuarios", localField: "asignado_a", foreignField: "_id", as: "empleado" } },
    { $unwind: { path: "$empleado", preserveNullAndEmptyArrays: true } },
    { $project: { codigo: 1, estado: 1, empleado: "$empleado.nombre" } }
  ]).toArray()
)

print("=== 7. Cuantos tickets tiene cada empleado asignados ===")
printjson(
  db.tickets.aggregate([
    { $match: { asignado_a: { $ne: null } } },
    { $group: { _id: "$asignado_a", total: { $sum: 1 } } },
    { $lookup: { from: "usuarios", localField: "_id", foreignField: "_id", as: "empleado" } },
    { $unwind: "$empleado" },
    { $project: { _id: 0, empleado: "$empleado.nombre", total: 1 } }
  ]).toArray()
)

print("=== 8. Sesiones que siguen abiertas (sin fin) ===")
printjson(db.sesiones.find({ fin: null }).toArray())

print("=== 9. Articulos de la base de conocimiento ===")
printjson(db.articulos_kb.find({}, { titulo: 1, autor_id: 1 }).toArray())
