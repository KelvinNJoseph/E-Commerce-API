import { Router } from 'express';
import { errorHandler } from "../error-handler.js";
import authMiddleware from "../middlewares/auth.js";
import { createOrder, listOrders, cancelOrder, getOrderById, listAllOrders, changeOrderStatus, listUserOrders } from '../controllers/orders.js';
import adminMiddlerware from '../middlewares/admin.js';

const orderRoutes: Router = Router();

orderRoutes.post("/", authMiddleware, errorHandler(createOrder));
orderRoutes.get("/", authMiddleware, errorHandler(listOrders));

orderRoutes.get(
  "/admin",
  authMiddleware,
  adminMiddlerware,
  errorHandler(listAllOrders)
);
orderRoutes.get(
  "/users/:id",
  authMiddleware,
  adminMiddlerware,
  errorHandler(listUserOrders)
);

orderRoutes.get("/:id", authMiddleware, errorHandler(getOrderById));
orderRoutes.put("/:id/cancel", authMiddleware, errorHandler(cancelOrder));
orderRoutes.put(
  "/:id/status",
  authMiddleware,
  adminMiddlerware,
  errorHandler(changeOrderStatus)
);


export default orderRoutes;