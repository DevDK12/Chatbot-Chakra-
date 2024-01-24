
const limiter = {
    max: 3, 
    windowMs: 1 * 60 * 1000,
    message:
        'Too many req from this IP , please Try again in 1 minute !',
};

export default limiter;