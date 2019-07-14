import {InsertQuote, GetQuotes} from "../repositories/QuoteRepo";
import {GetQuoteHistory, CreateQuote} from "../managers/QuoteManager";
const { PredictPrice } = require("../managers/PricingModule");

jest.mock("../repositories/QuoteRepo" , ()=>({
    InsertQuote : jest.fn(),
    GetQuotes : jest.fn()
}));

jest.mock("../managers/PricingModule" , ()=>({
    PredictPrice : jest.fn()
}));

describe("Quote manager tests", ()=>{
    
    beforeEach(() => {
      // Clear all instances and calls to constructor and all methods:
      InsertQuote.mockClear();
      GetQuotes.mockClear();
      PredictPrice.mockClear();
    });
    
    it('can create quote', async ()=>{
       //arrange
       const accountId = "id";
       const request = {
           data : "data"
       };
       
       const expectedResult = {...request, suggestedPrice : 1000};
       PredictPrice.mockResolvedValue(1000);
       const insertedQuote = {...expectedResult, id : "1234" };
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
       
       GetQuotes.mockResolvedValue({page : response.page, count : response.pageCount});
       
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
       
       GetQuotes.mockResolvedValue({page : response.page, count : response.pageCount});
       
       //act
       const result = await GetQuoteHistory(accountId, {});
       
       //assert
       expect(result).toMatchObject(response);
       expect(GetQuotes).toHaveBeenCalled();
       expect(GetQuotes.mock.calls[0][0]).toBe(accountId);
       expect(GetQuotes.mock.calls[0][1]).toMatchObject(exptectedQuery);
    });
});