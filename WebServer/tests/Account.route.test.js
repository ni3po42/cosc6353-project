
import express from 'express';

jest.mock('express', ()=>
{
    const routes = {};
    
    const createTrack = (method)=>{
        return  (...args)=>{
            if (!(args[0] in routes)){
                routes[args[0]] = {};
            }
            routes[args[0]][method] = args;
        }
    }
    
    const _router = {
        "get" : createTrack("get"),
        "post" : createTrack("post"),
        "delete" : createTrack("delete")
    };
    
    return {
    _routes  : (path, method) => routes[path][method],
    Router : ()=> _router
    }
}
);

import Authenticate from '../AuthMiddleware';
import route from '../routes/Account';
const { GetAccount, CreateAccount, LogIn, CreateToken} = require('../managers/AccountManager');

jest.mock('../managers/AccountManager', ()=>({
    
     GetAccount : jest.fn(), 
     CreateAccount : jest.fn(),
     LogIn : jest.fn(),
     CreateToken : jest.fn()
}));

describe("Account route tests", ()=>{
    
    var req;
    var res;
    
    var account = {
        id : "id"
    };
    
    const run = async (r)=> await r[r.length-1](req, res);
    
    beforeEach(()=>{
        req = jest.fn();
        res = {
            send : jest.fn(),
            status : jest.fn(),
            clearCookie : jest.fn(),
            cookie: jest.fn()
        };
        GetAccount.mockClear();
        CreateAccount.mockClear();
        LogIn.mockClear();
        CreateToken.mockClear();
    });
    
    it('can get an account', async ()=> {
       
       var route = express._routes("/","get");
        
        req.accountId = "id";
        
        GetAccount.mockResolvedValue(account);
        
        expect(route[1]).toBe(Authenticate);
    
        await run(route);
        
        expect(GetAccount).toHaveBeenCalledWith(req.accountId);
        expect(res.send).toHaveBeenCalledWith(account);
    });
    
    it('can handle error getting account', async ()=> {
       
       var route = express._routes("/","get");
        
        req.accountId = "id";
        
        GetAccount.mockRejectedValue("error");
        
        await run(route);
        
        expect(res.send).toHaveBeenCalledWith("error");
        expect(res.status).toHaveBeenCalledWith(500);
    });
    
    it('can create an account', async ()=>{
        
        var route = express._routes("/","post");
        
        req.body = {
            email : "test@test.com",
            password : "123456",
            passwordConfirm : "123456"
        };
        var newAccount = {};
        CreateAccount.mockResolvedValue(newAccount);
        
        await run(route);
        
        expect(CreateAccount).toHaveBeenCalledWith(req.body.email, req.body.password);
        expect(res.send).toHaveBeenCalledWith(newAccount);
        
    });
    
    it('can validate new account info', async ()=>{
        var route = express._routes("/","post");
        
        req.body = {
            email : "notanemail",
            password : "123456",
            passwordConfirm : "111111"
        };
        
        await run(route);
        
        expect(CreateAccount).not.toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(400);
    });
    
    it('can deny getting an account', async ()=>{
        var route = express._routes("/","post");
        
        req.body = {
            email : "test@test.com",
            password : "123456",
            passwordConfirm : "123456"
        };
        var newAccount = {};
        CreateAccount.mockRejectedValue("an error");
        
        await run(route);
        
        expect(res.send).toHaveBeenCalledWith("an error");
        expect(res.status).toHaveBeenCalledWith(500);
    });
    
    it('can authenticate', async ()=>{
       
        var route = express._routes("/Token","post");
        
        req.body = {
            email : "email@email.com",
            password : "password"
        };
        
        LogIn.mockResolvedValue(account);
        CreateToken.mockResolvedValue("Token");
        
        await run(route);
        
        expect(res.cookie).toHaveBeenCalled();
        expect(res.cookie.mock.calls[0][0]).toBe("auth");
        expect(res.cookie.mock.calls[0][1]).toBe("Token");
        
        expect(res.cookie.mock.calls[1][0]).toBe("active");
        expect(res.cookie.mock.calls[1][1]).toBe(1);
        
        expect(res.send).toHaveBeenCalled();
        
        expect(LogIn).toHaveBeenCalledWith(req.body.email, req.body.password);
        expect(CreateToken).toHaveBeenCalledWith(account.id);
    });
    
    it('can deny authentication', async ()=>{
        
        var route = express._routes("/Token","post");
        
        req.body = {
            email : "email@email.com",
            password : "password"
        };
        
        LogIn.mockRejectedValue("error");
        
        await run(route);
        
        expect(res.cookie).not.toHaveBeenCalled();
        
        expect(res.send).toHaveBeenCalledWith("error");
        expect(res.status).toHaveBeenCalledWith(403);
        
        expect(CreateToken).not.toHaveBeenCalled();
        
    });
    
    it('can log out', async ()=>{
        var route = express._routes("/Token","delete");
        
        await run(route);
        
        expect(res.clearCookie).toHaveBeenCalledWith("auth");
        expect(res.clearCookie).toHaveBeenCalledWith("active");
        expect(res.send).toHaveBeenCalled();
    });
});

