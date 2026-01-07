import type { Request, Response } from 'express';
import { prismaClient } from '../index.js';
import { BadRequestException } from '../exceptions/bad-request.js';
import { ErrorCodes } from '../exceptions/root.js';

export const createOrder = async (req: Request, res: Response) => {
  const order = await prismaClient.$transaction(async (tx) => {
    // 1. Get cart items
    const cartItems = await tx.cartItem.findMany({
      where: { userId: req.user.id },
      include: { product: true },
    });

    if (cartItems.length === 0) {
      throw new BadRequestException("Cart is empty", ErrorCodes.CART_EMPTY);
    }

    // 2. Calculate total
    const totalAmount = cartItems.reduce(
      (sum, item) => sum + item.quantity * Number(item.product.price),
      0
    );

    // 3. Get shipping address
    if (!req.user.defaultShippingAddressId) {
      throw new BadRequestException(
        "No default shipping address set",
        ErrorCodes.ADDRESS_NOT_FOUND
      );
    }

    const address = await tx.address.findFirstOrThrow({
      where: { id: req.user.defaultShippingAddressId },
    });

    // 4. Create order
    const order = await tx.order.create({
      data: {
        userId: req.user.id,
        netAmount: totalAmount,
        address: address.formattedAddress,
        products: {
          create: cartItems.map((cart) => ({
            productId: cart.productId,
            quantity: cart.quantity,
          })),
        },
      },
    });

    // 5. Create order event
    await tx.orderEvent.create({
      data: { orderId: order.id },
    });

    // 6. Empty cart
    await tx.cartItem.deleteMany({
      where: { userId: req.user.id },
    });

    return order; // ✅ return DATA ONLY
  });

  // ✅ HTTP response outside transaction
  res.json(order);
};

export const listOrders = async(req: Request, res: Response) => {

}
export const cancelOrder = async(req: Request, res: Response) => {

}
export const getOrderById = async(req: Request, res: Response) => {

}