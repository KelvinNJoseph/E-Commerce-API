import type { Request, Response } from 'express';
import { prismaClient } from '../index.js';
import { BadRequestException } from '../exceptions/bad-request.js';
import { ErrorCodes } from '../exceptions/root.js';
import { NotFoundException } from '../exceptions/not-found.js';

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
  const orders = await prismaClient.order.findMany({
    where: {
      userId: req.user.id
    }
  })
  res.json(orders)
}
export const cancelOrder = async(req: Request, res: Response) => {
  //TODO: wrap it inside transaction, check if the user is cancelin it on order
   try {
     const order = await prismaClient.order.update({
       where: {
         id: Number(req.params.id),
       },
       data: {
        status: 'CANCELLED'
       }
     });
     await prismaClient.orderEvent.create({
      data: {
        orderId: order.id,
        status: 'CANCELLED'
      }
     })
     res.json(order);
   } catch (error) {
     throw new NotFoundException("Order not found", ErrorCodes.ORDER_NOT_FOUND);
   }
}
export const getOrderById = async(req: Request, res: Response) => {
  try {
    const order = await prismaClient.order.findFirstOrThrow({
      where: {
        id: Number(req.params.id),
      },
      include: {
        products: true,
        events: true
      }
    });
    res.json(order);
  } catch (error) {
    throw new NotFoundException("Order not found", ErrorCodes.ORDER_NOT_FOUND)
  }
}

export const listAllOrders = async(req:Request, res:Response) =>{
  let whereClause = {}
  const status = req.query.status
  if(status){
    whereClause = {
      status
    }
  }
  const orders = await prismaClient.order.findMany({
    where: whereClause,
    skip: req.query.page ? Number(req.query.page) : 0,
    take: req.query.pageSize ? Number(req.query.pageSize) : 10, 
  })
  res.json(orders)
}
export const changeOrderStatus = async(req:Request, res:Response) =>{
  //TODO wrap it inside a transaction
  try {
     const order = await prismaClient.order.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        status: req.body.status
      }
    })
    await prismaClient.orderEvent.create({
      data: {
        orderId: order.id,
        status: req.body.status
      }
    })
    res.json(order)
    
  } catch (error) {
    throw new NotFoundException("Order not found", ErrorCodes.ORDER_NOT_FOUND);
  }
}

export const listUserOrders = async(req:Request, res:Response) =>{
  let whereClause = {
    userId: Number(req.params.id)
  }
  const status = req.params.status
  if(status){
    whereClause = {
      ...whereClause
    }
  }
  const orders = await prismaClient.order.findMany({
    where: whereClause,
    skip: req.query.page ? Number(req.query.page) : 0,
    take: req.query.pageSize ? Number(req.query.pageSize) : 10, 
  })
  res.json(orders)
}
