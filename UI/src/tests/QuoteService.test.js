import { CreateQuote, GetQuotes, GetPrice } from '../services/QuoteService';

import axios from 'axios';

jest.mock('axios');

describe("Quote service tests", ()=>{

    beforeEach(() => {
      // Clear all instances and calls to constructor and all methods:
      axios.mockClear();
    });
    
    it('can create quote', async ()=>{
       //arrange
       const request = {
           data : "data"
       };
       axios.mockResolvedValue({
           data : "data"
       });
       
       //act
       const result = await CreateQuote(request).catch(r=>r);
       
       //assert
       expect(axios).toHaveBeenCalled();
       expect(axios.mock.calls[0][0]).toMatchObject({
           method : "POST",
           url : "/api/Quote",
           data : request
       });
       
    });
   
    it('can handle quote error', async ()=>{
       //arrange
       const request = {};
       axios.mockRejectedValue({
           response : {
               data : "some error"
           }
       });
       
       //act
       const result = await CreateQuote(request).catch(r=>r);
       
       //assert
       expect(result).toBe("some error");
    });
    
    it('can get historical quote', async ()=>{
       //arrange
       const query = {
           filter : "filter"
       };
       axios.mockResolvedValue({
           data : "data"
       });
       
       //act
       const result = await GetQuotes(query).catch(r=>r);
       
       //assert
       expect(axios).toHaveBeenCalled();
       expect(axios.mock.calls[0][0]).toMatchObject({
           method : "GET",
           url : "/api/Quote",
           params : query
       });
    });
    
    
    it('can handle error getting historical quotes', async ()=>{
       //arrange
       const query = {
           filter : "filter"
       };
       axios.mockRejectedValue({
           response : {
               data : "some error"
           }
       });
       
       //act
       const result = await GetQuotes(query).catch(r=>r);
       
       //assert
       expect(result).toBe("some error");
    });
    
    
     it('can get price prediction', async ()=>{
       //arrange
       const data = {
           data : "filter"
       };
       axios.mockResolvedValue({
           data : "data"
       });
       
       //act
       const result = await GetPrice(data).catch(r=>r);
       
       //assert
       expect(axios).toHaveBeenCalled();
       expect(axios.mock.calls[0][0]).toMatchObject({
           method : "POST",
           url : "/api/Quote/NewPrice",
           data : data
       });
    });
    
     it('can handle price error', async ()=>{
       //arrange
       const data = {
           data : "data"
       };
       axios.mockRejectedValue({
           response : {
               data : "some error"
           }
       });
       
       //act
       const result = await GetPrice(data).catch(r=>r);
       
       //assert
       expect(result).toBe("some error");
    });
    
});