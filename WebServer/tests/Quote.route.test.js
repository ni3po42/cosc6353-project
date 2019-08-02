
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
import route from '../routes/Quote';
const { GetQuoteHistory, CreateQuote } = require('../managers/QuoteManager');
const { PredictPrice } = require('../managers/PricingModule');

jest.mock('../managers/QuoteManager', ()=>({
    
     GetQuoteHistory : jest.fn(), 
     CreateQuote : jest.fn()
}));

jest.mock('../managers/PricingModule', ()=>({
    
     PredictPrice : jest.fn()
}));

describe("Quote route tests", ()=>{
    
    var req;
    var res;
    
    const run = async (r)=> await r[r.length-1](req, res);
    
    beforeEach(()=>{
        req = jest.fn();
        res = {
            send : jest.fn(),
            status : jest.fn(),
            clearCookie : jest.fn(),
            cookie: jest.fn()
        };
        GetQuoteHistory.mockClear();
        CreateQuote.mockClear();
        PredictPrice.mockClear();
    });
    
    it('can add quote', async ()=> {
       
       var route = express._routes("/","post");
        
        req.accountId = "id";
        req.body = {
            gallonsRequested : 500,
            deliveryDate : "2019-5-2"
        };
        
        var newQuote = {};
        
        CreateQuote.mockResolvedValue(newQuote);
        
        expect(route[1]).toBe(Authenticate);
    
        await run(route);
        
        expect(CreateQuote).toHaveBeenCalledWith(req.accountId, req.body);
        expect(res.send).toHaveBeenCalledWith(newQuote);
    });
    
    it('can handle add quote error', async ()=> {
       
       var route = express._routes("/","post");
        
        req.accountId = "id";
        req.body = {
            gallonsRequested : 500,
            deliveryDate : "2019-5-2"
        };
        
        var newQuote = {};
        
        CreateQuote.mockRejectedValue("error");
        
        await run(route);
        
        expect(res.send).toHaveBeenCalledWith("error");
        expect(res.status).toHaveBeenCalledWith(500);
    });
    
    it('can handle validation add quote error', async ()=> {
       
       var route = express._routes("/","post");
        
        req.accountId = "id";
        req.body = {
            gallonsRequested : "notAnInt",
            deliveryDate : "moo"
        };
        
        var newQuote = {};
        
        CreateQuote.mockRejectedValue("error");
        
        await run(route);
        
        expect(CreateQuote).not.toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(400);
    });
    
    
    it('can get quotes', async ()=> {
       
       var route = express._routes("/","get");
        
        req.accountId = "id";
        req.query = {
            currentPage : "1",
            pageSize : "3"
        };
        
        var results = {
            page : [{},{},{}],
            currentPage : 1,
            pageSize : 3,
            pageCount : 5
        };
        
        GetQuoteHistory.mockResolvedValue(results);
        
        expect(route[1]).toBe(Authenticate);
    
        await run(route);
        
        expect(GetQuoteHistory).toHaveBeenCalled();
        expect(GetQuoteHistory.mock.calls[0][0]).toBe(req.accountId);
        expect(GetQuoteHistory.mock.calls[0][1]).toMatchObject({pageSize : +req.query.pageSize, currentPage : +req.query.currentPage});
        
        expect(res.send).toHaveBeenCalledWith(results);
    });
    
    
    it('can handle get quotes error', async ()=> {
       
       var route = express._routes("/","get");
        
        req.accountId = "id";
        req.query = {
            currentPage : "1",
            pageSize : "3"
        };
        
        var results = {
            page : [{},{},{}],
            currentPage : 1,
            pageSize : 3,
            pageCount : 5
        };
        
        GetQuoteHistory.mockRejectedValue("error");
        
        await run(route);
        
        expect(res.send).toHaveBeenCalledWith("error");
        expect(res.status).toHaveBeenCalledWith(500);
    });
    
    
    it('can create new price quote', async ()=> {
       
       var route = express._routes("/NewPrice","post");
        
        req.accountId = "id";
        req.body = {
            gallonsRequested : 500,
            deliveryDate : "2019-5-2"
        };
        
        
        PredictPrice.mockResolvedValue(400);
        
        expect(route[1]).toBe(Authenticate);
    
        await run(route);
        
        expect(PredictPrice).toHaveBeenCalledWith(req.accountId, req.body);
        expect(res.send).toHaveBeenCalled();
        expect(res.send.mock.calls[0][0]).toMatchObject({suggestedPrice : 400});
    });
    
    it('can handle create new price quote error', async ()=> {
       
       var route = express._routes("/NewPrice","post");
        
        req.accountId = "id";
        req.body = {
            gallonsRequested : 500,
            deliveryDate : "2019-5-2"
        };
        
        
        PredictPrice.mockRejectedValue("error");
        
        await run(route);
        
        expect(res.send).toHaveBeenCalledWith("error");
        expect(res.status).toHaveBeenCalledWith(500);
        
    });
    
    it('can handle create new price quote validation error', async ()=> {
       
       var route = express._routes("/NewPrice","post");
        
        req.accountId = "id";
        req.body = {
            gallonsRequested : "not a number",
            deliveryDate : "moo"
        };
        
        
        PredictPrice.mockRejectedValue("error");
        
        await run(route);
        
        expect(PredictPrice).not.toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(400);
        
    });
});

