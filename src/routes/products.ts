import { Router } from "express";
import { createProduct } from "../controllers/products.js";
import { errorHandler } from "../error-handler.js";
import authMiddleware from "../middlewares/auth.js";
import adminMiddlerware from "../middlewares/admin.js";

const productsRoutes: Router = Router();

productsRoutes.post("/",authMiddleware, adminMiddlerware, errorHandler(createProduct))

export default productsRoutes;