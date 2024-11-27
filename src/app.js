import express from "express";
import {config as configHandleBars} from "./config/handlebars.config.js"
import {config as configWebsocket} from "./config/websocket.config.js";

// Importación de enrutadores
import routerProducts from "./routes/routerProducts.js";
import routerCarts from "./routes/routerCarts.js";
import routerViewHome from "./routes/home.view.router.js";

const app = express();
const PORT = 8080;

// Declaración de archivos estáticos desde la carpeta 'public'
// en la ruta 'http://localhost:8080/api/public'
app.use("/api/public", express.static("./src/public"));


// Middleware para acceder al contenido de formularios codificados en URL
app.use(express.urlencoded({ extended: true }));
// Middleware para acceder al contenido JSON de las solicitudes
app.use(express.json());

//Motor de plantillas
configHandleBars(app);

// Declaración de rutas
app.use("/api/products", routerProducts);
app.use("/api/carts", routerCarts);
app.use("/", routerViewHome);

app.get("/saludo", (req, res) => {
    res.send("hola");
});

app.get("/", (req, res) => {
    res.send("Welcome to the homepage!");
});


// Control de rutas inexistentes
app.use("*", (req, res) => {
    res.status(404).render("error404", { title: "Error 404" });
});

// Se levanta el servidor oyendo en el puerto definido
const httpServer = app.listen(PORT, () => {
    console.log(`Ejecutándose en http://localhost:${PORT}`);
});

// Configuración del servidor de websocket
configWebsocket(httpServer);