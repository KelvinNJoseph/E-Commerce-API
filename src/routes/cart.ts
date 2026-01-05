import { Router } from "express";
import { errorHandler } from "../error-handler.js";
import authMiddleware from "../middlewares/auth.js";
import { addItemToCart, deleteCartItem, getCart, changeQuantity } from "../controllers/cart.js";

const cartRoutes: Router = Router();

cartRoutes.post("/", authMiddleware, errorHandler(addItemToCart));
cartRoutes.delete("/:id", authMiddleware, errorHandler(deleteCartItem));
cartRoutes.put("/:id", authMiddleware, errorHandler(changeQuantity));
cartRoutes.get("/", authMiddleware, errorHandler(getCart));

export default cartRoutes;