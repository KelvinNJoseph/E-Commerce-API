import type { Request, Response } from "express";
import { AddressSchema } from "../schemas/users.js";
import { prismaClient } from "../index.js";
import { NotFoundException } from "../exceptions/not-found.js";
import { ErrorCodes } from "../exceptions/root.js";

export const addAddress =  async (req: Request, res: Response) => {
    AddressSchema.parse(req.body);
   

    const address = await prismaClient.address.create({
        data: {
            ...req.body,
            userId: req.user.id
        }
    })
    res.json(address);
}
export const deleteAddress =  async (req: Request, res: Response) => {
    try {
        await prismaClient.address.delete({
            where: {
                id: Number(req.params.id)
            }
        })
        res.json("Address deleted successfully")
    } catch (error) {
        throw new NotFoundException("Address not found", ErrorCodes.ADDRESS_NOT_FOUND)
    }
}
export const listAddress =  async (req: Request, res: Response) => {
    const addresses = await prismaClient.address.findMany({
        where: {
            userId: req.user.id
        }
    })
    res.json(addresses);
}