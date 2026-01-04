import type { Request, Response } from "express";
import { prismaClient } from "../index.js";
import { hashSync, compareSync } from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secrets.js";
import { BadRequestException } from "../exceptions/bad-request.js";
import { ErrorCodes } from "../exceptions/root.js";
import { UnprocessableEntity } from "../exceptions/validation.js";
import { SignUpSchema } from "../schemas/users.js";
import { NotFoundException } from "../exceptions/not-found.js";

export const signup = async (req: Request, res:Response ) => {
    SignUpSchema.parse(req.body);
    const { email, password, name } = req.body;
    let user = await prismaClient.user.findFirst({ where: { email } });
    if (user) {
     throw new BadRequestException("User already exists!", ErrorCodes.USER_ALREADY_EXISTS);
    }
    user = await prismaClient.user.create({
      data: {
        name,
        email,
        password: hashSync(password, 10),
      },
    });
    res.json({ user });
};
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  let user = await prismaClient.user.findFirst({ where: { email } });
  if (!user) {
    throw new NotFoundException("user not found!", ErrorCodes.USER_NOT_FOUND)
  }
  if (!compareSync(password, user.password)) {
    throw new BadRequestException("Invalid password!", ErrorCodes.INVALID_PASSWORD);
  }
  const { sign } = jwt;
  const token = sign({ id: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: "8h",
  });
  res.json({ user, token });
};

export const me = async (req: Request, res: Response) => {
  res.json(req.user);
};

