import express from "express";

// Importación de enrutadores
import routerProducts from "./routes/routerProducts.js";
import routerCarts from "./routes/routerCarts.js";

const app = express();
const PORT = 8080;

// Middleware para acceder al contenido de formularios codificados en URL
app.use(express.urlencoded({ extended: true }));
// Middleware para acceder al contenido JSON de las solicitudes
app.use(express.json());

// Declaración de rutas
app.use("/api/products", routerProducts);
app.use("/api/carts", routerCarts);

app.get("/saludo", (req, res) => {
    res.send("hola");
});

app.get("/", (req, res) => {
    res.send("Welcome to the homepage!");
});

// Se levanta el servidor oyendo en el puerto definido
app.listen(PORT, () => {
    console.log(`Ejecutándose en http://localhost:${PORT}`);
});
