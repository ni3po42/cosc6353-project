//stubbed data
//no hashing here
const accounts = {
    
}

const hashTable = {
  
};

function Authenticate(hash){
    if (hash in hashTable){
        const id = hashTable[hash];
        const account = { ...accounts[id] };
        delete account["hash"];
        
        return Promise.resolve(account);    
    }else{
        return Promise.reject("Username/password not found.");
    }
}


function GetAccount(accountId){
    const returnAccount = {...accounts[accountId]};
    delete returnAccount["hash"];
    
    return Promise.resolve(returnAccount);
}

function CreateNewAccount(email, hash){
    
    for(let id in accounts){
        if (accounts[id].userName.toLowerCase() === email.toLowerCase()){
            return Promise.reject("Account with that email was already registered.");
        }
    }
    
    const newId = "uuid_a_" + (Object.keys(accounts).length + 1).toString().padStart(4,"0");
    const newAccount = {
        id : newId,
        userName : email,
        hash : hash,
        created : null
    };
    
    hashTable[hash] = newId;
    accounts[newId] = newAccount;
    
    const reaturnAccount = {...newAccount};
    delete reaturnAccount["hash"];
    return Promise.resolve(reaturnAccount);
}


module.exports = { Authenticate, GetAccount, CreateNewAccount };