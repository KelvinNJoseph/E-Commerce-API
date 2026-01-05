import { Router } from "express";
import authRoutes from "./auth.js";
import productsRoutes from "./products.js"
import userRoutes from "./users.js";
import cartRoutes from "./cart.js";

const rootRouter: Router = Router();

rootRouter.use('/auth', authRoutes);
rootRouter.use('/products', productsRoutes);
rootRouter.use('/users', userRoutes);
rootRouter.use('/carts', cartRoutes);

export default rootRouter;