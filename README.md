# DesarrolloAvanzadoDeBackend
 
ls = show databases / show collections
cd / create collection if nonexistant(but it needs at least one collection) = use name

open collection of name = db.name.find()

db.name.insertOne({ age:25, name:"Leandro", surname:"Hernandez" })

to delete get into a colletion and write: db.dropDatabase()

db.estudiantes.find({$or:[{sexo:"M"},{edad:25}]})

db.estudiantes.find({edad:{$in[18,24,25]}})

db.estudiantes.find({sexo:"f"}).sort({edad:1}),limit(2)
***
[

{

"id": 1,

"name": "Juan",

"surname": "García",

"age": 20,

"email": "juan@gmail.com",

"phone": 2615800045

},

{

"id": 2,

"name": "Lorena",

"surname": "Medina",

"age": 30,

"email": "lore@hotmail.com",

"phone": 3516112244

},

{

"id": 3,

"name": "Maria",

"surname": "Torres",

"age": 25,

"email": "mary2024@yahoo.com",

"phone": 1157742122

},

{

"id": 4,

"name": "Mario",

"surname": "Flores",

"age": 22,

"email": "mar1980@gmail.com",

"phone": 2645887711

},

{

"id": 5,

"name": "Pablo",

"surname": "García",

"age": 18,

"email": "pablito@hotmail.com",

"phone": 2665417258

},

{

"id": 6,

"name": "Joel",

"surname": "Bianchi",

"age": 35,

"email": "joel2024@gmail.com",

"phone": 2665109944

},

{

"id": 7,

"name": "Maria",

"surname": "Torres",

"age": 18,

"email": "mar.arg@gmail.com",

"phone": 2615770011

},

{

"id": 8,

"name": "Fernando",

"surname": "Flores",

"age": 50,

"email": "fer.flores@hotmail.com",

"phone": 3515112244

},

{

"id": 9,

"name": "Paula",

"surname": "García",

"age": 24,

"email": "pau2000@yahoo.com",

"phone": 2616778855

},

{

"id": 10,

"name": "Gerardo",

"surname": "Medina",

"age": 21,

"email": "gera@gmail.com",

"phone": 2645410001

}

]
***