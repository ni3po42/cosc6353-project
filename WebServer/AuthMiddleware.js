const { ValidateToken, CreateToken} = require('./managers/AccountManager');

async function Authenticate(req, res, next) {
    
    const token = req.cookie.auth;
    
    await ValidateToken(token)
            .then(accountId => req.accountId = accountId)
            .then(CreateToken)
            .then(newToken => {
                res.clearCookie('auth');
                res.cookie('auth',newToken, { maxAge: 10 * 60 * 1000, httpOnly: true });
                next();
            })
            .catch((e)=> {
                res.status(403);
                res.send('Access denied.');
            });
}

module.exports = Authenticate