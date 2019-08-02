
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
import route from '../routes/Profile';
const { GetProfile, CreateProfile } = require('../managers/ProfileManager');

jest.mock('../managers/ProfileManager', ()=>({
    
     GetProfile : jest.fn(), 
     CreateProfile : jest.fn()
}));

describe("Profile route tests", ()=>{
    
    var req;
    var res;
    
    var profile = {
        
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
        GetProfile.mockClear();
        CreateProfile.mockClear();
    });
    
    it('can get a profile', async ()=> {
       
       var route = express._routes("/","get");
        
        req.accountId = "id";
        
        GetProfile.mockResolvedValue(profile);
        
        expect(route[1]).toBe(Authenticate);
    
        await run(route);
        
        expect(GetProfile).toHaveBeenCalledWith(req.accountId);
        expect(res.send).toHaveBeenCalledWith(profile);
    });
    
    it('can handle getting profile with error', async ()=> {
       
       var route = express._routes("/","get");
        
        req.accountId = "id";
        
        GetProfile.mockRejectedValue("error");
        
        await run(route);
        
        expect(res.send).toHaveBeenCalledWith("error");
        expect(res.status).toHaveBeenCalledWith(500);
    });
    
    
    it('can update a profile', async ()=> {
       
       var route = express._routes("/","post");
        
        req.accountId = "id";
        req.body = {
            fullName : "name",
            address1 : "add",
            address2 : "add2",
            city : "city",
            state : "TX",
            zip : "77001"
        };
        
        CreateProfile.mockResolvedValue(profile);
        
        expect(route[1]).toBe(Authenticate);
    
        await run(route);
        
        expect(CreateProfile).toHaveBeenCalledWith(req.accountId, req.body);
        expect(res.send).toHaveBeenCalledWith(profile);
    });
    
    it('can handle update error', async ()=> {
       
       var route = express._routes("/","post");
        
        req.accountId = "id";
        req.body = {
            fullName : "name",
            address1 : "add",
            address2 : "add2",
            city : "city",
            state : "TX",
            zip : "77001"
        };
        
        CreateProfile.mockRejectedValue("error");
        
        await run(route);
        
        expect(res.send).toHaveBeenCalledWith("error");
        expect(res.status).toHaveBeenCalledWith(500);
    });
    
    it('can handle update error', async ()=> {
       
       var route = express._routes("/","post");
        
        req.accountId = "id";
        req.body = {
            fullName : "name",
            address1 : "add",
            address2 : "add2",
            city : "city",
            state : "TX",
            zip : ""//bad zip
        };
        
        await run(route);
        
        expect(CreateProfile).not.toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(400);
    });
    
});

