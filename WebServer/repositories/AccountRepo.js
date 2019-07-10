//stubbed data
//no hashing here
const accounts = {
    "uuid_a_0001":{
        id : "uuid_a_0001",
        userName : "client1@email.com",
        hash : "client1@email.com|123456",
        created : null
    },
    "uuid_a_0002":{
        id : "uuid_a_0002",
        userName : "client2@email.com",
        hash : "client2@email.com|abcdef",
        created : null
    }
}

const hashTable = {
  "client1@email.com|123456"  : "uuid_a_0001",
  "client2@email.com|abcdef" : "uuid_a_0002"
};

function Authenticate(email, password){
    const hash = email + "|" + password;
    
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

function CreateNewAccount(email, password){
    
    for(let id in accounts){
        if (accounts[id].userName.toLowerCase() === email.toLowerCase()){
            return Promise.reject("Account with that email was already registered.");
        }
    }
    
    const hash = email + "|" + password;
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