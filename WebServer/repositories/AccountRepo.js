const { FindOne, Insert } = require("./dbHelper.js");

function Authenticate(hash){
    
    return FindOne({hash:hash})
        .then(account=>{
            if (!account){
                throw "Username/password not found.";
            }
            return {id : account._id, userName : account.userName};
        });
}


function GetAccount(accountId){
    
    return FindOne({_id:accountId})
        .then(account=>{
            if (!account){
                throw "Account not found.";
            }
            return {id : account._id, userName : account.userName};
        });
}

function CreateNewAccount(email, hash){
    
    const newAccount = {
                userName : email.toLowerCase(),
                hash : hash,
                profile : null,
                quotes : [],
                quoteCount : 0
            };
    
    return FindOne({email:email.toLowerCase()})
        .then(account=>{
            if (account){
                throw "Account with that email was already registered.";
            }
            return newAccount;
        })
        .then(Insert)
        .then(account=>({id : account._id, userName : account.userName}));
}


module.exports = { Authenticate, GetAccount, CreateNewAccount };