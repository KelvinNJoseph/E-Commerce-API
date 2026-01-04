import type { NextFunction, Request, Response, RequestHandler } from "express";
import { UnauthorizedException } from "../exceptions/unauthorized.js";
import { ErrorCodes } from "../exceptions/root.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secrets.js";
import { prismaClient } from "../index.js";

// Extend Express Request to include user
declare global {
  namespace Express {
    interface Request {
      user?: any; // Replace `any` with your User type if you have one
    }
  }
}

// Standard Express middleware
const authMiddleware: RequestHandler = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return next(
      new UnauthorizedException(
        "Unauthorized",
        ErrorCodes.UNAUTHORIZED_EXCEPTION
      )
    );
  }

  try {
    // Verify token
    const payload = jwt.verify(authHeader, JWT_SECRET) as any;
    // Fetch user from DB
    const user = await prismaClient.user.findFirst({
      where: { id: payload.id },
    });

    if (!user) {
      return next(
        new UnauthorizedException(
          "Unauthorized",
          ErrorCodes.UNAUTHORIZED_EXCEPTION
        )
      );
    }

    // Attach user to request
    req.user = user;

    next(); // pass control to the next handler
  } catch (err) {
    return next(
      new UnauthorizedException(
        "Unauthorized",
        ErrorCodes.UNAUTHORIZED_EXCEPTION
      )
    );
  }
};

export default authMiddleware;
