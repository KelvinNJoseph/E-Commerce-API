import type { NextFunction, Request, Response } from "express";
import { prismaClient } from "../index.js";
import { hashSync, compareSync } from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secrets.js";
import { BadRequestException } from "../exceptions/bad-request.js";
import { ErrorCodes } from "../exceptions/root.js";

export const signup = async (req: Request, res:Response , next: NextFunction) => {
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
    throw new BadRequestException("user not found!", ErrorCodes.USER_NOT_FOUND)
  }
  if (!compareSync(password, user.password)) {
    throw Error("Invalid password!");
  }
  const { sign } = jwt;
  const token = sign({ id: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: "8h",
  });
  res.json({ user, token });
};
