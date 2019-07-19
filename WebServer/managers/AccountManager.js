const repo = require("../repositories/AccountRepo");

const crypto = require('crypto');

const tokenSecret = "NeverGonnaGiveYouUp;NeverGonnaLetYouDown;NeverGonnaRunaroundAndDessertYou";


function GetAccount(accountId){
    return repo.GetAccount(accountId);
}

function CreateAccount(email, password){
    email = email.toUpperCase();
    const hash = crypto.createHash('sha256');
    hash.update(email +"|"+ password);
    return repo.CreateNewAccount(email, hash.digest('hex'));
}

function LogIn(email, password){
    const hash = crypto.createHash('sha256');
    hash.update(email.toUpperCase() +"|"+ password);
    return repo.Authenticate(hash.digest('hex'));
}

function CreateToken(accountId){
    
    const cipher = crypto.createCipher('aes192', tokenSecret);
    const payLoad = JSON.stringify({
        accountId : accountId,
        nounce : Math.floor(Math.random() * Number.MAX_VALUE) 
    });
    let encrypted = cipher.update(payLoad, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    const t = Buffer.from(encrypted).toString('base64');
    return Promise.resolve(t);
}

function ValidateToken(token){
    let decrypted = null;
    try{
        const decipher = crypto.createDecipher('aes192', tokenSecret);
        let plainText = decipher.update(Buffer.from(token, 'base64').toString(), 'hex', 'utf8');
        
        plainText += decipher.final("utf8");
        decrypted = JSON.parse(plainText);
        return Promise.resolve(decrypted.accountId);
    }catch(e){
        return Promise.reject("invalid token");
    }
}

module.exports = { GetAccount, CreateAccount, LogIn, CreateToken, ValidateToken};