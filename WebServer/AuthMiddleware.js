function Authenticate(req, res, next) {
    
    req.accountId = "12345";
    
    console.log("in auth");
    
    return next();
    //not implemented yet, but soon
    //res.status(400);
    //res.send('Access denied.');
}

module.exports = Authenticate