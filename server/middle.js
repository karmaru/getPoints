module.exports = function(req, res, next) {
    console.log('from the middleware',req)

    //check to see if has a user object
    
    //forces function to finish and move to the endpoint
    next()
};