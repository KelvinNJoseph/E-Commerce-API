import type { Request, Response } from "express";
import { prismaClient } from "../index.js";
import { hashSync, compareSync } from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secrets.js";

export const signup = async (req: Request, res: Response) => {
  const { email, password, name } = req.body;
  let user = await prismaClient.user.findFirst({ where: { email } });
  if (user) {
    throw Error("User already exists!");
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
    throw Error("User does not exist!");
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
