import type { Request, Response } from "express";
import { changeQuantitySchema, CreateCartSchema } from "../schemas/cart.js";
import { NotFoundException } from "../exceptions/not-found.js";
import { ErrorCodes } from "../exceptions/root.js";
import type { Product } from "../generated/prisma/index.js";
import { prismaClient } from "../index.js";

export const addItemToCart = async(req: Request, res: Response) => {
    //check if product exists and just alter the quantity as required
    const validatedData = CreateCartSchema.parse(req.body);
    let product: Product;
    try {
        product = await prismaClient.product.findUniqueOrThrow({
            where: {
                id: validatedData.productId 
            }
        });
    } catch (error) {
        throw new NotFoundException("product not found", ErrorCodes.PRODUCT_NOT_FOUND)
    }
    const cart = await prismaClient.cartItem.create({
        data: {
            userId: req.user.id,
            productId: validatedData.productId,
            quantity: validatedData.quantity
        }
    });
    res.json(cart);
}
export const deleteCartItem = async(req: Request, res: Response) => {
    //check if cart item belongs to logged in user
    try {
        await prismaClient.cartItem.delete({
            where: {
                id: Number(req.params.id),
            }
        });
        res.json("Cart item deleted successfully");
        
    } catch (error) {
        throw new NotFoundException(
          "product not found",
          ErrorCodes.PRODUCT_NOT_FOUND
        );
    }
}
export const changeQuantity = async(req: Request, res: Response) => {
    //check if cart item belongs to logged in user
    const validatedData = changeQuantitySchema.parse(req.body);
    const updatedCart = await prismaClient.cartItem.update({
        where: {
            id: Number(req.params.id)
        },
        data: {
            quantity: validatedData.quantity
        }
    })
    res.json(updatedCart)
}
export const getCart = async(req: Request, res: Response) => {
    const cart = await prismaClient.cartItem.findMany({
        where: {
            userId: req.user.id
        },
        include: {
            product: true
        }
    })
    res.json(cart)

}