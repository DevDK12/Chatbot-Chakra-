import { handleCastErrorDB, handleDuplicateFieldsDB, handleValidationErrorDB } from "../Error/ErrorHandler.js";




const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack,
    });
};




const sendErrorProd = (err, res) => {
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        });
    } 

    else {
        //* 1) Log error
        // console.error('ERROR 💥', err);
        emitError('ERROR 💥', err);

        //* 2) Send generic message
        res.status(500).json({
            status: 'error',
            message: 'Something went very wrong!',
        });
    }
};






const globalErrorMiddleware = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';


    console.log('ERR CAUGHT IN GLOBAL MIDDLEWARE'.red.bold);
    console.log(`ERR ${err}`.brightRed.bgBrightWhite.bold);
    console.log(err.stack);




    if (process.env.NODE_ENV === 'development') {
        sendErrorDev(err, res);
    } 
    else if (process.env.NODE_ENV === 'production') {
        let error = err;

        //_ These errors are invoked by 'Mongoose' && 'Mongodb'
        if (error.name === 'CastError') error = handleCastErrorDB(error);
        if (error.name === 'ValidationError') error = handleValidationErrorDB(error);
        if (error.code === 11000) error = handleDuplicateFieldsDB(error);

        sendErrorProd(error, res);
    }
};


export default globalErrorMiddleware;




/**
 *? How Errors are passed to Global middlewares
 *
 *_ Catched by Global middleware 
 ** This is simply error hence caught by global middleware
 *
 *  export const putSignup = (req, res) => {
 *      throw new AppError('')
 *  }
 * 
 * 
 *_ Rejected promise
 ** But this is rejected promise hence does not goes to global middleware
 ** Instead it need to be handled and from there it could be sent to global middleware
 *
 *  export const putSignup = async (req, res) => {
 *      throw new AppError('')
 *  }
 * 
 * 
 *_ Rejected promise
 ** Even this will also be treated as unhandled rejection / error 
 ** By using throw in catch  we are again throwing rejected promise to global middleware hence leads to error
 *
 *  export const putSignup = async (req, res) => {
 *      try{
 *          throw new AppError('')
 *      }
 *      catch(err){
 *          throw new AppError(err)
 *      }
 *  }
 * 
 * 
 *_ Works fine 
 *  export const putSignup = async (req, res) => {
 *      try{
 *          throw new AppError('')
 *      }
 *      catch(err){
 *          next(new AppError(err.message))
 *      }
 *  }
 * 
 * 
 *  export const putSignup = async (req, res) => {
 *         next(new AppError(err.message))
 *  }
*/





