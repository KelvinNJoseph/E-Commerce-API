import { Router } from 'express';
import { errorHandler } from "../error-handler.js";
import authMiddleware from "../middlewares/auth.js";
import { createOrder, listOrders, cancelOrder, getOrderById } from '../controllers/orders.js';

const orderRoutes: Router = Router();

orderRoutes.post('/', authMiddleware, errorHandler(createOrder));
orderRoutes.get('/', authMiddleware, errorHandler(listOrders));
orderRoutes.put('/:id', authMiddleware, errorHandler(cancelOrder));
orderRoutes.get('/:id', authMiddleware, errorHandler(getOrderById));

export default orderRoutes;