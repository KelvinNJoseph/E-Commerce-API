import type { NextFunction, Request, Response, RequestHandler } from "express";
import { UnauthorizedException } from "../exceptions/unauthorized.js";
import { ErrorCodes } from "../exceptions/root.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secrets.js";
import { prismaClient } from "../index.js";

const adminMiddlerware: RequestHandler = async (
  req,
  res,
  next
) => {
  const user = req.user;
  if (user.role === "ADMIN") {
    next();
  } else {
    next(
      new UnauthorizedException(
        "Unauthorized",
        ErrorCodes.UNAUTHORIZED_EXCEPTION
      )
    );
  }
};

export default adminMiddlerware;