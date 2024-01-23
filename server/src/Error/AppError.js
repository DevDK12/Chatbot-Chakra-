class AppError extends Error {

    constructor(msg, statusCode, isOperational = true, stack = ''){
        super(msg)
        this.statusCode = statusCode,
        this.isOperational = isOperational,
        this.status = `${statusCode}`.startsWith(4) ? `fail` : `error`;

        if(stack){
            this.stack = stack;
        }
        else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export default AppError;