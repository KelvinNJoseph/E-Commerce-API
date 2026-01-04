import type { NextFunction, Request, Response, RequestHandler } from "express"
import { ErrorCodes, HttpException } from "./exceptions/root.js"
import { InternalException } from "./exceptions/internal-exception.js"

// Handler type that accepts our extended Request (with user property)
type AsyncRequestHandler = (
    req: Request,
    res: Response,
    next: NextFunction
) => Promise<void> | void;

export const errorHandler = (method: AsyncRequestHandler): RequestHandler => {
    return (async(req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await method(req, res, next)
        } catch (error: any) {
            let exception: HttpException;
           if(error instanceof HttpException) {
                exception = error;
           }else{
                exception = new InternalException("Something went wrong", error, ErrorCodes.INTERNAL_EXCEPTION)
           }
                next(exception);
        }
    }) as RequestHandler;
}