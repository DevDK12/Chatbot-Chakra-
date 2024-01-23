import AppError from '../src/Error/AppError.js';

export const allowedOrigins = [
    "http://localhost:3000",
    "http://localhost:5173",
    "http://127.0.0.1:3000", 
    "http://127.0.0.1:5173", 
    "http://localhost:8000", 
    "http://127.0.0.1:8000",
    "https://www.yoursite.com",
    "http://www.thunderclient.com",
    "https://www.google.com",
];




const corsOptions = {
    origin: (origin, callback) => {

        if(allowedOrigins.indexOf(origin) !== -1){
            callback(null, true);
        }
        else{
            callback(new AppError('Not allowed by CORS'));
        }
    }
}


export default corsOptions;