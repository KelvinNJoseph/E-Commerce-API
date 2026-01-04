import type { NextFunction, Response, Request, ErrorRequestHandler } from "express";
import type { HttpException } from "../exceptions/root.js";

export const errorMiddleware: ErrorRequestHandler = (err, req, res, next) => {
    // Type guard to ensure err is HttpException
    if (err && typeof err === 'object' && 'statusCode' in err && 'errorCode' in err) {
        const httpException = err as HttpException;
        res.status(httpException.statusCode).json({
            message: httpException.message,
            errorCode: httpException.errorCode,
            errors: httpException.errors
        });
    } else {
        // Fallback for unexpected error types
        res.status(500).json({
            message: 'Internal Server Error',
            errorCode: 'INTERNAL_ERROR',
            errors: null
        });
    }
}