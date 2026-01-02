import type { NextFunction, Response, Request } from "express";
import type { HttpException } from "../exceptions/root.js";
import { error } from "node:console";

export const errorMiddleware = (err: HttpException, req: Request, res: Response, next: NextFunction ) =>{
    res.status(err.statusCode).json({
        message: err.message,
        errorCode: err.errorCode,
        errors: err.errors
    })
}