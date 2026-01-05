import { Router } from "express";
import { errorHandler } from "../error-handler.js";
import authMiddleware from "../middlewares/auth.js";
import adminMiddlerware from "../middlewares/admin.js";
import { addAddress, deleteAddress, listAddress } from "../controllers/users.js";

const userRoutes: Router = Router();

userRoutes.post("/address", authMiddleware, errorHandler(addAddress))
userRoutes.delete("/address/:id", authMiddleware, errorHandler(deleteAddress))
userRoutes.get("/address", authMiddleware, errorHandler(listAddress))

export default userRoutes;