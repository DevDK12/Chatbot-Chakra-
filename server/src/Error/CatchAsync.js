const CatchAsync = (fn) => {

    return (req, res, next) => {
        Promise.resolve(fn(req, res, next))
        .catch((err) => next(err));
    };

}



export default CatchAsync;


//_ Wrapper function 
//* It's just wrapper function that is meant to handle error for all 
//* fn's used to reduce code duplicacy