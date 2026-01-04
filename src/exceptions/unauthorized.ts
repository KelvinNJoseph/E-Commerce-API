import { ErrorCodes, HttpException } from "./root.js";

export class UnauthorizedException extends HttpException {
    constructor(message: string, errorCode: ErrorCodes){
        super(message, errorCode, 401, null);
    }
}
