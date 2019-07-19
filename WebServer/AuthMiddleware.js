const { ValidateToken } = require('./managers/AccountManager');

function parseCookies (request) {
    var list = {},
        rc = request.headers.cookie;

    rc && rc.split(';').forEach(function( cookie ) {
        var parts = cookie.split('=');
        list[parts[0].trim()] = decodeURIComponent(parts[1]);
    });

    return list;
}

async function Authenticate(req, res, next) {
    
    if (!req.cookie){
        //if you are here, it means the cookie parse decided to stop working
        //today
        req.cookie = parseCookies(req);
    }
    
    const token = req.cookie.auth;
    
    await ValidateToken(token)
            .then(accountId => req.accountId = accountId)
            .then(() => {
                next();
            })
            .catch((e)=> {
                res.status(403);
                res.send('Access denied.');
            });
}

module.exports = Authenticate