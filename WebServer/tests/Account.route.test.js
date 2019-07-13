//jest.mock('express', ()=>{Router : jest.fn()});
import express from 'express';

import Authenticate from '../AuthMiddleware';
import route from '../routes/Account';

describe("Account route tests", ()=>{
    
    it('can create an account', ()=>{
        
    });
    
    it('can validate new account info', ()=>{});
    
    it('can get an account', ()=> {
        
    });
    
    it('can deny getting an account', ()=>{
        
    });
    
    it('can authenticate', ()=>{
        
    });
    
    it('can deny authentication', ()=>{
        
    });
});

