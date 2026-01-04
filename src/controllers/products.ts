import type { Request, Response } from "express";
import { prismaClient } from "../index.js";
import { NotFoundException } from "../exceptions/not-found.js";
import { ErrorCodes } from "../exceptions/root.js";

export const createProduct = async (req: Request, res: Response) => {

    //create a validator for this request body 
    const product = await prismaClient.product.create({
        data: {
            ...req.body,
            tags: req.body.tags.join(',')
        }
    })
    res.json({ product})
}

export const updateProduct = async (req: Request, res: Response) => {
    try {
        const product = req.body;
        if (product.tags){
            product.tags = product.tags.join(',')
        }
        const updateProduct = await prismaClient.product.update({
            where: { id: Number(req.params.id)},
            data: product
        })
        res.json({ updateProduct});
    } catch (error) {
        throw new NotFoundException("Product not found", ErrorCodes.PRODUCT_NOT_FOUND)
    }
}
export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const deletedProduct = await prismaClient.product.delete({
            where: { id: Number(req.params.id)}
        })
        res.json(deletedProduct);
    }catch(error){
        throw new NotFoundException(
          "Product not found",
          ErrorCodes.PRODUCT_NOT_FOUND
        );
    }
}
export const listProducts = async (req: Request, res: Response) => {
    const total = await prismaClient.product.count();
    const products = await prismaClient.product.findMany({
        skip: req.query.page ? Number(req.query.page) : 0,
        take: req.query.pageSize ? Number(req.query.pageSize) : 10, 
    })
    res.json({
        total,
        data: products
    })
}
export const getProductById = async (req: Request, res: Response) => {
    try {
        const product = await prismaClient.product.findFirstOrThrow({
            where: {id: Number(req.params.id)}
        })
        res.json(product)
    } catch (error) {
          throw new NotFoundException(
            "Product not found",
            ErrorCodes.PRODUCT_NOT_FOUND
          );
    }
}