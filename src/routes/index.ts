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

/* 
    1. user management
        a. list users
        b. get user by id
        c. change user role

    2. order management
        a. list all orders(filter on status)
        b. change order status
        c. list all orders of a given user
    3. products
        a. search api for products (for both users and admins) -> full text search
*/