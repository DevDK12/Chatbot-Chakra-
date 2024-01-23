import colors from 'colors'




process.on('uncaughtException', (error) => {
    console.log(' Uncaught Exception => shutting down..... ');
    console.log(error.name, error.message);
    process.exit(1); 
})







import app from './src/app.js';








const port = process.env.PORT || 8000
const domain = process.env.DOMAIN || 'http://localhost'
const api = process.env.API || 'api/v1'


const server = app.listen(port, ()=>{
    console.log(`Running on ${domain}:${port}/${api}`.yellow.bold);
})








process.on('unhandledRejection', (error) => {
    console.log(' Unhandled Rejection => shutting down..... ');
    console.log(error.name, error.message);

    server.close(() => {
        process.exit(1); 
    });
});


