//import Logger from './Logger.js';
import axios from 'axios';
import Cookies from 'js-cookie';

const listeners = new Set();

function RegisterListener(callback){
    listeners.add(callback);
}

function UnregisterListener(callback){
    listeners.delete(callback);
}

function Authenticate(email, password){
    
    return axios({
        method:'POST',
        url: "/api/Account/Token",
        data: {email, password}
    })
    .then(response=> {
        Cookies.set('active', '1');
        listeners.forEach(callback => callback(true));
        return response.data
    })
    .catch(e=> {
        return Promise.reject(e.response.data);
    });
}

function IsAuthenticated(){
    var cookie = Cookies.get("active");
    
    return !!cookie;
}

function GetAccount(){
    return axios({
        method:'GET',
        url: "/api/Account"
    })
    .then(response=> {
        return response.data;
    })
    .catch(e => {
       return Promise.reject(e.response.data); 
    });
}

function CreateNewAccount(email, password, passwordConfirm){
    
    return axios({
        method:'POST',
        url: "/api/Account",
        data: {email, password, passwordConfirm}
    })
    .then(response=> {
        return response.data
    })
    .catch(e=>{
        return Promise.reject(e.response.data);
    });
    
}

function LogOff(){
    
    return axios({
        method:'DELETE',
        url: "/api/Account/Token"
    })
    .then(()=> {
        Cookies.remove('active');
        listeners.forEach(callback => callback(false));
    });
    
    
}

export { Authenticate, IsAuthenticated, LogOff, RegisterListener, UnregisterListener, GetAccount, CreateNewAccount };