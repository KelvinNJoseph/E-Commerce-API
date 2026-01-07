import { Router } from "express";
import { errorHandler } from "../error-handler.js";
import authMiddleware from "../middlewares/auth.js";
import adminMiddlerware from "../middlewares/admin.js";
import {
  addAddress,
  changeUserRole,
  deleteAddress,
  getUserById,
  listAddress,
  listUsers,
  updateUser,
} from "../controllers/users.js";

const userRoutes: Router = Router();

userRoutes.post("/address", authMiddleware, errorHandler(addAddress));
userRoutes.delete("/address/:id", authMiddleware, errorHandler(deleteAddress));
userRoutes.get("/address", authMiddleware, errorHandler(listAddress));
userRoutes.put("/", authMiddleware, errorHandler(updateUser));
userRoutes.put(
  "/:id/role",
  authMiddleware,
  adminMiddlerware,
  errorHandler(changeUserRole)
);
userRoutes.get("/", authMiddleware, adminMiddlerware, errorHandler(listUsers));
userRoutes.get(
  "/:id",
  authMiddleware,
  adminMiddlerware,
  errorHandler(getUserById)
);

export default userRoutes;
