//message, status code, error codes

export enum ErrorCodes {
  USER_NOT_FOUND = 1001,
  USER_ALREADY_EXISTS = 1002,
  INVALID_PASSWORD = 1003,
  UNPROCESSABLE_ENTITY = 1004,
  INTERNAL_EXCEPTION = 1005,
  UNAUTHORIZED_EXCEPTION = 1006,
  PRODUCT_NOT_FOUND = 2001,
  ADDRESS_NOT_FOUND = 3001,
  ADDRESS_DOES_NOT_BELONG_TO_USER=3002,
  CART_EMPTY=4001,
  ORDER_NOT_FOUND=5001
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
