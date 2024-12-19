import { Router } from "express";
import CartManager from "../managers/CartManager.js";
//import ProductsManager from "../managers/ProductsManager.js";

const router = Router();
const cartManager = new CartManager();
//const productsManager = new ProductsManager();


//* Ruta para obtener el carrito
/*
router.get("/", async (req, res) => {
    try {
        const carts = await cartManager.getAll(req.query);
        res.status(200).json({ status: "success", payload: carts });
    } catch (error) {
        res.status(error.code).json({ status: "error", message: error.message });
    }
});*/

//* Ruta para obtener un cart en específico por su ID
router.get("/:id", async (req, res) => {
    try {
        const cart = await cartManager.getOneById(req.params.id) ;
        res.status(200).json({ status: "success", payload: cart });
    } catch (error) {
        res.status(error.code).json({ status: "error", message: error.message });
    }
});

// ruta para crear un nuevo cart
router.post("/", async (req, res) => {
    try {
        const cart = await cartManager.insertOne(req.body);
        res.status(201).json({ status: "success", payload: cart });
    } catch (error) {
        res.status(error.code).json({ status: "error", message: error.message });
    }
});

// ruta para agregar un nuevo producto al carrito
router.put("/:cid/products/:pid", async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const cart = await cartManager.addOneProduct(cid, pid);
        res.status(200).json({ status: "success", payload: cart });
    } catch (error) {
        res.status(error.code || 500).json({ status: "error", message: error.message });
    }
});

// ruta para borrar un carrito por id
router.delete("/:id", async (req, res) => {
    try {
        const cartDeleted = await cartManager.deleteOneById(req.params.id);
        res.status(200).json({ status: true, payload: cartDeleted });
    } catch (error) {
        errorHandler(res, error.message);
    }
});

// ruta para borrar un producto por id
router.delete("/:id/products/:pid", async (req, res) => {
    try {
        const { id, pid: productId } = req.params;
        const cartDeleted = await cartManager.deleteOneProduct(id, productId);
        res.status(200).json({ status: true, payload: cartDeleted });
    } catch (error) {
        errorHandler(res, error.message);
    }
});
router.get("/", async (req, res) => {
    try {
        res.render("cart", { title: "Carrito" });
    } catch (error) {
        res.status(500).send(`<h1>Error</h1><h3>${error.message}</h3>`);
    }
});

export default router;