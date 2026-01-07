import { Router } from "express";
import { createProduct, deleteProduct, getProductById, listProducts, searchProducts, updateProduct } from "../controllers/products.js";
import { errorHandler } from "../error-handler.js";
import authMiddleware from "../middlewares/auth.js";
import adminMiddlerware from "../middlewares/admin.js";

const productsRoutes: Router = Router();

productsRoutes.post("/",authMiddleware, adminMiddlerware, errorHandler(createProduct));
productsRoutes.get("/", authMiddleware, adminMiddlerware, errorHandler(listProducts));
productsRoutes.get("/search", authMiddleware, errorHandler(searchProducts))
productsRoutes.put("/:id", authMiddleware, adminMiddlerware, errorHandler(updateProduct));
productsRoutes.delete("/:id", authMiddleware, adminMiddlerware, errorHandler(deleteProduct));
productsRoutes.get("/:id", authMiddleware, adminMiddlerware, errorHandler(getProductById));

export default productsRoutes;