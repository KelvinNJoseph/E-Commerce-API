import type { Request, Response } from "express";
import { AddressSchema, UpdateUserSchema } from "../schemas/users.js";
import { prismaClient } from "../index.js";
import { NotFoundException } from "../exceptions/not-found.js";
import { ErrorCodes } from "../exceptions/root.js";
import type { Address, Prisma } from "../generated/prisma/index.js";

export const addAddress = async (req: Request, res: Response) => {
  AddressSchema.parse(req.body);

  const address = await prismaClient.address.create({
    data: {
      ...req.body,
      userId: req.user.id,
    },
  });
  res.json(address);
};
export const deleteAddress = async (req: Request, res: Response) => {
  try {
    await prismaClient.address.delete({
      where: {
        id: Number(req.params.id),
      },
    });
    res.json("Address deleted successfully");
  } catch (error) {
    throw new NotFoundException(
      "Address not found",
      ErrorCodes.ADDRESS_NOT_FOUND
    );
  }
};
export const listAddress = async (req: Request, res: Response) => {
  const addresses = await prismaClient.address.findMany({
    where: {
      userId: req.user.id,
    },
  });
  res.json(addresses);
};

export const updateUser = async (req: Request, res: Response) => {
  const validatedData = UpdateUserSchema.parse(req.body);
  let shippingAddressId: Address;
  let billingAddressId: Address;
  if (validatedData.defaultShippingAddressId) {
    try {
      shippingAddressId = await prismaClient.address.findFirstOrThrow({
        where: {
          id: Number(validatedData.defaultShippingAddressId),
        },
      });
     
    } catch (error) {
      throw new NotFoundException(
        "Shipping address not found",
        ErrorCodes.ADDRESS_NOT_FOUND
      );
    }
     if (shippingAddressId.userId !== req.user.id) {
       throw new NotFoundException(
         "Shipping address not found",
         ErrorCodes.ADDRESS_DOES_NOT_BELONG_TO_USER
       );
     }
  }
  if (validatedData.defaultBillingAddressId) {
    try {
      billingAddressId = await prismaClient.address.findFirstOrThrow({
        where: {
          id: Number(validatedData.defaultBillingAddressId),
        },
      });
    } catch (error) {
      throw new NotFoundException(
        "Billing address not found",
        ErrorCodes.ADDRESS_NOT_FOUND
      );
    }
     if (billingAddressId.userId !== req.user.id) {
       throw new NotFoundException(
         "Billing address not found",
         ErrorCodes.ADDRESS_DOES_NOT_BELONG_TO_USER
       );
     }
  }

  const data: Prisma.UserUpdateInput = {};

  if (validatedData.name !== undefined) {
    data.name = validatedData.name;
  }

  if (validatedData.defaultShippingAddressId !== undefined) {
    data.defaultShippingAddressId = validatedData.defaultShippingAddressId;
  }

  if (validatedData.defaultBillingAddressId !== undefined) {
    data.defaultBillingAddressId = validatedData.defaultBillingAddressId;
  }

  const updatedUser = await prismaClient.user.update({
    where: {
      id: req.user.id,
    },
    data,
  });

  res.json(updatedUser);
};