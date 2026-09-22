db = db.getSiblingDB("helpdesk_erp")

db.usuarios.createIndex({ correo: 1 }, { unique: true, sparse: true })
db.usuarios.createIndex({ documento: 1 }, { unique: true, sparse: true })

db.sesiones.createIndex({ usuario_id: 1 })

db.tickets.createIndex({ codigo: 1 }, { unique: true })
db.tickets.createIndex({ creado_por: 1 })
db.tickets.createIndex({ asignado_a: 1 })
db.tickets.createIndex({ estado: 1 })

db.getCollectionNames().sort().forEach(function (c) {
  print(c)
  db[c].getIndexes().forEach(function (i) {
    print("   " + i.name + " " + JSON.stringify(i.key))
  })
})
