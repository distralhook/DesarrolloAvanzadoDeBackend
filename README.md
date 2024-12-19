# DesarrolloAvanzadoDeBackend
 
ls = show databases / show collections
cd / create collection if nonexistant(but it needs at least one collection) = use name

open collection of name = db.name.find()

db.name.insertOne({ age:25, name:"Leandro", surname:"Hernandez" })

to delete get into a colletion and write: db.dropDatabase()

db.estudiantes.find({$or:[{sexo:"M"},{edad:25}]})

db.estudiantes.find({edad:{$in[18,24,25]}})

db.estudiantes.find({sexo:"f"}).sort({edad:1}),limit(2)