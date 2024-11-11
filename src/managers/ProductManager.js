import paths from "../utils/paths.js";
import { readJsonFile, writeJsonFile } from "../utils/fileHandler.js";
import { generateId } from "../utils/collectionHandler.js";
import ErrorManager from "./ErrorManager.js";

export default class ProductManager {
    #jsonFilename;
    #products;

    constructor() {
        this.#jsonFilename = "productos.json";
    }

    // Inserta un producto
    async insertOne(data) {
        try {
            const {
                title,
                description,
                code,
                price,
                stock,
                category,
                thumbnails,
            } = data;

            if (
                !title ||
                !description ||
                !code ||
                !price ||
                !stock ||
                !category
            ) {
                throw new ErrorManager("Faltan datos obligatorios", 400);
            }

            const product = {
                id: generateId(await this.getAll()),
                title,
                description,
                code,
                price: Number(price),
                status: true, //boolean //True por defecto
                stock: Number(stock),
                category,
                thumbnails, //string dijo el profe
            };

            this.#products.push(product);
            await writeJsonFile(
                paths.files,
                this.#jsonFilename,
                this.#products
            );

            return product;
        } catch (error) {
            throw new ErrorManager(error.message, error.code);
        }
    }

    // Obtiene una lista de productos
    async getAll() {
        try {
            this.#products = await readJsonFile(
                paths.files,
                this.#jsonFilename
            );
            return this.#products;
        } catch (error) {
            throw new ErrorManager(error.message, error.code);
        }
    }

    // Busca un producto por su ID
    async #findOneById(id) {
        this.#products = await this.getAll();
        const productFound = this.#products.find(
            (item) => item.id === Number(id)
        );

        if (!productFound) {
            throw new ErrorManager("ID no encontrado", 404);
        }

        return productFound;
    }

    // Obtiene un producto específico por su ID
    async getOneById(id) {
        try {
            const productFound = await this.#findOneById(id);
            return productFound;
        } catch (error) {
            throw new ErrorManager(error.message, error.code);
        }
    }

    // Actualiza un producto en específico
    async updateOneById(id, data) {
        try {
            const {
                title,
                description,
                code,
                price,
                status,
                stock,
                category,
                thumbnails,
            } = data;
            const productFound = await this.#findOneById(id);

            const user = {
                id: productFound.id, //? Number(id) : productFound.id,
                title: title || productFound.title,
                description: description || productFound.description,
                code: code || productFound.code,
                price: price ? Number(price) : productFound.price,
                status: status ? Boolean(status) : productFound.status,
                stock: stock ? Number(stock) : productFound.stock,
                category: category || productFound.category,
                thumbnails: thumbnails || productFound.thumbnails, //String
            };

            const index = this.#products.findIndex(
                (item) => item.id === Number(id)
            );
            this.#products[index] = user;
            await writeJsonFile(
                paths.files,
                this.#jsonFilename,
                this.#products
            );

            return user;
        } catch (error) {
            throw new ErrorManager(error.message, error.code);
        }
    }

    // Elimina un producto en específico
    async deleteOneById(id) {
        try {
            await this.#findOneById(id);

            const index = this.#products.findIndex(
                (item) => item.id === Number(id)
            );
            this.#products.splice(index, 1);
            await writeJsonFile(
                paths.files,
                this.#jsonFilename,
                this.#products
            );
        } catch (error) {
            throw new ErrorManager(error.message, error.code);
        }
    }
}
