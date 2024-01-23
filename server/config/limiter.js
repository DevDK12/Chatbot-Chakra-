
const limiter = {
    max: 50, 
    windowMs: 60 * 60 * 1000,
    message:
        ' Too many req from this IP , please Try  again in an Hour ! ',
};

export default limiter;