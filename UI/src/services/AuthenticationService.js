//import Logger from './Logger.js';
//import axios from 'axios';

const listeners = new Set();

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

function RegisterListener(callback){
    listeners.add(callback);
}

function UnregisterListener(callback){
    listeners.delete(callback);
}

function Authenticate(email, password){
    const hash = email + "|" + password;
    
    if (hash in hashTable){
        const id = hashTable[hash];
        const account = { ...accounts[id] };
        delete account["hash"];
        
        localStorage.setItem("accountId", id);
        
        listeners.forEach(callback => callback(true));
        
        return Promise.resolve(account);    
    }else{
        return Promise.reject("Username/password not found.");
    }
}

// getCookieValue(a) {
//     let b = document.cookie.match('(^|[^;]+)\\s*' + a + '\\s*=\\s*([^;]+)');
//     return b ? b.pop() : '';
// }

function IsAuthenticated(){
    //temp
    return !!localStorage.getItem("accountId");
}

function GetAccount(){
    const returnAccount = {...accounts[localStorage.getItem("accountId")]};
    delete returnAccount["hash"];
    
    return Promise.resolve(returnAccount);
}

function GetCurrentAccountId(){
    return localStorage.getItem("accountId");
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

function LogOff(){
    localStorage.removeItem("accountId");
    listeners.forEach(callback => callback(true));
}

export { Authenticate, IsAuthenticated, LogOff, RegisterListener, UnregisterListener, GetAccount, CreateNewAccount, GetCurrentAccountId };