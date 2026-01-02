//message, status code, error codes

export enum ErrorCodes{
    USER_NOT_FOUND = 1001,
    USER_ALREADY_EXISTS = 1002,
    INVALID_PASSWORD = 1003,
}
export class HttpException extends Error {
    message: string;
    errorCode: any;
    statusCode: number;
    errors: ErrorCodes

    constructor(message: string, errorCode: ErrorCodes, statusCode: number, error: any){
        super(message);
        this.message = message;
        this.errorCode = errorCode;
        this.statusCode = statusCode;
        this.errors = error;
    }
}
