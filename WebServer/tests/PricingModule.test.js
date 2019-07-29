import {PredictPrice} from "../managers/PricingModule"
import {GetQuoteCount} from "../repositories/QuoteRepo";
import {GetProfile} from "../repositories/ProfileRepo";

jest.mock("../repositories/QuoteRepo" , ()=>({
    GetQuoteCount : jest.fn()
}));

jest.mock("../repositories/ProfileRepo" , ()=>({
    GetProfile : jest.fn()
}));

describe("PricingModule tests", ()=>{
    
    var accountId = "314159";
    var request = null;
    var factors = null;
    
    function getExpectedPrice(){
        var margin = factors.currentPrice * (factors.location - factors.rateHistory + factors.gallonsRequested + factors.companyProfit + factors.rateFluctuation);
        return factors.currentPrice + margin;
        
    };
    
    beforeEach(() => {
        // Clear all instances and calls to constructor and all methods:
        factors = {
            currentPrice : 1.5,
            location : .02,
            rateHistory : 0.0,
            gallonsRequested : .03,
            companyProfit : .1,
            rateFluctuation : .03
        };
        GetQuoteCount.mockClear();
        GetProfile.mockClear();
        
    });
    
    it('can load pricing module', ()=>{
        expect(PredictPrice).toBeDefined();
    });
    
    describe("with history", ()=>{
        
        beforeEach(() => {
          request = {
               gallonsRequested: 500, 
               deliveryDate: "03-14-2020",
          };
          
          GetQuoteCount.mockResolvedValue(10);
          
          GetProfile.mockResolvedValue({
               address1: "",
               address2: "",
               city :"",
               state : "TX",
               zip : "77001"
          });
          
        });
        
        it('can get price with rate history requests', async ()=>{
            factors.rateHistory = .01;
            
            var price = await PredictPrice(accountId, request);
            expect(price).toBe(getExpectedPrice());
        });
    });
    
    describe("with different locations", ()=>{
        
         beforeEach(() => {
          request = {
               gallonsRequested: 500, 
               deliveryDate: "03-14-2020",
          };
          
          GetQuoteCount.mockResolvedValue(0);
        });
        
         it('can get price for texas', async ()=>{
            
              GetProfile.mockResolvedValue({
                   address1: "",
                   address2: "",
                   city :"",
                   state : "TX",
                   zip : "77001"
              });
            
            var price = await PredictPrice(accountId, request);
            expect(price).toBe(getExpectedPrice());
        });
        
        it('can get price for out of state', async ()=>{
            
          GetProfile.mockResolvedValue({
               address1: "",
               address2: "",
               city :"",
               state : "AL",
               zip : "99999"
          });
            factors.location = .04;
            
            var price = await PredictPrice(accountId, request);
            expect(price).toBe(getExpectedPrice());
        });
        
    });
    
    describe("without history", ()=>{
        
        beforeEach(() => {
          request = {
               gallonsRequested: 500, 
               deliveryDate: "03-14-2020",
          };
          
          GetQuoteCount.mockResolvedValue(0);
          GetProfile.mockResolvedValue({
               address1: "",
               address2: "",
               city :"",
               state : "TX",
               zip : "77001"
          });
        });
        
        it('can get price with more than 1000 gallons', async ()=>{
            request.gallonsRequested = 1001
            factors.gallonsRequested = 0.02
            
            var price = await PredictPrice(accountId, request);
            expect(price).toBe(getExpectedPrice());
        });
        
        it('can get price with lessthen 1000 gallons', async ()=>{
             request.gallonsRequested = 800
            factors.gallonsRequested = 0.03
            
            var price = await PredictPrice(accountId, request);
            expect(price).toBe(getExpectedPrice());
        });
        
        it('can get price with exactly 1000 gallons', async ()=>{
             request.gallonsRequested = 1000
             factors.gallonsRequested = 0.03
            
            var price = await PredictPrice(accountId, request);
            expect(price).toBe(getExpectedPrice());
        });
        
        it('can get price for summer deliveries', async ()=>{
            
            for(var i of [6,7,8]){
                request.deliveryDate = i + "-1-2020";
                factors.rateFluctuation = .04;
                
                var price = await PredictPrice(accountId, request);
                expect(price).toBe(getExpectedPrice());    
            }
            
        });
        
        it('can get price for non-summer deliveries', async ()=>{
            for(var i of [1,2,3,4,5,9,10,11,12]){
                request.deliveryDate = i + "-1-2020";
                factors.rateFluctuation = .03;
                
                var price = await PredictPrice(accountId, request);
                expect(price).toBe(getExpectedPrice());    
            }
        });
    });
    
});