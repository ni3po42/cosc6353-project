import {InsertQuote, GetQuotes} from "../repositories/QuoteRepo";
import {GetQuoteHistory, CreateQuote} from "../managers/QuoteManager";
const { PredictPrice } = require("../managers/PricingModule");
const {GetProfile} = require("../repositories/ProfileRepo");

jest.mock("../repositories/QuoteRepo" , ()=>({
    InsertQuote : jest.fn(),
    GetQuotes : jest.fn()
}));

jest.mock("../managers/PricingModule" , ()=>({
    PredictPrice : jest.fn()
}));

jest.mock("../repositories/ProfileRepo" , ()=>({
    GetProfile : jest.fn()
}));

describe("Quote manager tests", ()=>{
    
    beforeEach(() => {
      // Clear all instances and calls to constructor and all methods:
      InsertQuote.mockClear();
      GetQuotes.mockClear();
      PredictPrice.mockClear();
      GetProfile.mockClear();
    });
    
    it('can create quote', async ()=>{
       //arrange
       const accountId = "id";
       const request = {
           data : "data"
       };
       
       const  profile = {
           fullName : "myname",
           address1 : "1234",
           address2 : "4321", 
           city : "houston",
           state : "TX",
           zip : "77001"
       };
       
       GetProfile.mockResolvedValue(profile);
       
       const expectedResult = {...request, suggestedPrice : 1000};
       PredictPrice.mockResolvedValue(1000);
       const insertedQuote = {...expectedResult };
       InsertQuote.mockResolvedValue(insertedQuote);
       
       //act
       const result = await CreateQuote(accountId, request).catch(r=>r);
       //assert
       expect(result).toMatchObject(insertedQuote);
       expect(PredictPrice).toHaveBeenCalled();
       expect(PredictPrice.mock.calls[0][0]).toBe(accountId);
       expect(PredictPrice.mock.calls[0][1]).toMatchObject(request);
       
       expect(InsertQuote).toHaveBeenCalled();
       expect(InsertQuote.mock.calls[0][0]).toBe(accountId);
       expect(InsertQuote.mock.calls[0][1]).toMatchObject(expectedResult);
    });
    
    it('can get quotes', async ()=>{
       
       //arrange
       const accountId = "id";
       const query = {
            pageSize :  2,
            currentPage : 1
        };
       
       const response = {
           ...query,
           page : [{},{}],
            pageCount : 200
        };
       
       const  profile = {
           fullName : "myname",
           address1 : "1234",
           address2 : "4321", 
           city : "houston",
           state : "TX",
           zip : "77001"
       };
       
       GetProfile.mockResolvedValue(profile);
       
       GetQuotes.mockResolvedValue({...query, page : response.page, pageCount : response.pageCount});
       
       //act
       const result = await GetQuoteHistory(accountId, query);
       
       //assert
       expect(result).toMatchObject(response);
       expect(GetQuotes).toHaveBeenCalled();
       expect(GetQuotes.mock.calls[0][0]).toBe(accountId);
       expect(GetQuotes.mock.calls[0][1]).toMatchObject(query);
       
    });
    
    it('can default query for get quotes', async ()=>{
       
       //arrange
       const accountId = "id";
       const exptectedQuery = {
            pageSize :  20,
            currentPage : 1
        };
       
       const response = {
           ...exptectedQuery,
           page : [{},{}],
            pageCount : 200
        };
       
       GetQuotes.mockResolvedValue({...exptectedQuery, page : response.page, pageCount : response.pageCount});
       
       //act
       const result = await GetQuoteHistory(accountId, {});
       
       //assert
       expect(result).toMatchObject(response);
       expect(GetQuotes).toHaveBeenCalled();
       expect(GetQuotes.mock.calls[0][0]).toBe(accountId);
       expect(GetQuotes.mock.calls[0][1]).toMatchObject(exptectedQuery);
    });
});