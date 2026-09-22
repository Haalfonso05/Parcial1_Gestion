db = db.getSiblingDB("helpdesk_erp")

db.createCollection("usuarios", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["password_hash", "nombre", "fecha_registro"],
      additionalProperties: false,
      properties: {
        _id: { bsonType: "objectId" },
        correo: { bsonType: "string" },
        documento: { bsonType: "string" },
        password_hash: { bsonType: "string", minLength: 20 },
        password_temporal: { bsonType: "bool" },
        nombre: { bsonType: "string", minLength: 3 },
        rol: { enum: ["cliente", "empleado", "admin"] },
        tipo_cliente: { enum: ["natural", "juridico"] },
        empresa: { bsonType: "string" },
        fecha_registro: { bsonType: "date" }
      }
    }
  },
  validationLevel: "strict",
  validationAction: "error"
})

db.createCollection("sesiones", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["usuario_id", "inicio"],
      additionalProperties: false,
      properties: {
        _id: { bsonType: "objectId" },
        usuario_id: { bsonType: "objectId" },
        inicio: { bsonType: "date" },
        fin: { bsonType: ["date", "null"] }
      }
    }
  },
  validationLevel: "strict",
  validationAction: "error"
})

db.createCollection("tickets", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["codigo", "fecha", "tipo_ticket", "tipo_problema", "creado_por", "estado"],
      additionalProperties: false,
      properties: {
        _id: { bsonType: "objectId" },
        codigo: { bsonType: "string", minLength: 3 },
        fecha: { bsonType: "date" },
        tipo_ticket: { bsonType: "string" },
        tipo_problema: { bsonType: "string" },
        descripcion: { bsonType: "string" },
        creado_por: { bsonType: "objectId" },
        asignado_a: { bsonType: ["objectId", "null"] },
        estado: { enum: ["abierto", "en_proceso", "cerrado"] }
      }
    }
  },
  validationLevel: "strict",
  validationAction: "error"
})

db.createCollection("articulos_kb", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["titulo", "contenido", "autor_id", "fecha_creacion"],
      additionalProperties: false,
      properties: {
        _id: { bsonType: "objectId" },
        titulo: { bsonType: "string", minLength: 5 },
        contenido: { bsonType: "string", minLength: 10 },
        autor_id: { bsonType: "objectId" },
        fecha_creacion: { bsonType: "date" }
      }
    }
  },
  validationLevel: "strict",
  validationAction: "error"
})

print("Colecciones creadas:")
printjson(db.getCollectionNames())
