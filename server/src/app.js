import {config} from 'dotenv';  config();

import express from "express";
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import xss from 'xss-clean';
import cors from 'cors';

import globalErrorMiddleware from './middlewares/globalErrorMiddleware.js';
import AppError from './Error/AppError.js';
import corsOptions from '../config/corsOptions.js';
import limiter from '../config/limiter.js';



import chatRoute from './routes/chatRoute.js';




const app = express();



//_ Parser
app.use(express.json());  
app.use(express.urlencoded({extended: true})) 




//_ Cors
app.use(cors(corsOptions))




//_ Security
app.use(express.json({ limit: '10kb' }));
app.use(helmet());
app.use(rateLimit(limiter));
app.use(xss());






//_ Routes 

app.use('/api/v1', chatRoute);







//_ Not found
app.all('*', (req, res, next) => {
    next(
        new AppError(`Can't find ${req.originalUrl} on the server`, 404)
    );
});




//_ Error middleware 
app.use(globalErrorMiddleware)






export default app;