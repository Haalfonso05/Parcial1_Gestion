db = db.getSiblingDB("helpdesk_erp")

print("Se van a eliminar: " + db.getCollectionNames().join(", "))

db.dropDatabase()

print("Base de datos helpdesk_erp eliminada. Ahora corre 01, 02 y 03 en orden.")
