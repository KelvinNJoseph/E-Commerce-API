import { Router } from "express";
import authRoutes from "./auth.js";
import productsRoutes from "./products.js"
import userRoutes from "./users.js";
import cartRoutes from "./cart.js";
import orderRoutes from "./orders.js";

const rootRouter: Router = Router();

rootRouter.use('/auth', authRoutes);
rootRouter.use('/products', productsRoutes);
rootRouter.use('/users', userRoutes);
rootRouter.use('/carts', cartRoutes);
rootRouter.use('/orders', orderRoutes);

export default rootRouter;