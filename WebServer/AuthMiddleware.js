const { ValidateToken, CreateToken} = require('./managers/AccountManager');

async function Authenticate(req, res, next) {
    
    const token = req.cookie.auth;
    
    await ValidateToken(token)
            .then(accountId => {
                req.accountId = accountId;
                return CreateToken(accountId)
            })
            .then(newToken => {
                res.clearCookie('auth');
                res.cookie('auth',newToken, { maxAge: 10 * 60 * 1000, httpOnly: true });
                next();
            })
            .catch(()=> {
                res.status(403);
                res.send('Access denied.');
            });
}

module.exports = Authenticate