//Quote Module
const { GetQuotes, InsertQuote } = require("../repositories/QuoteRepo");
const { PredictPrice } = require("./PricingModule");

async function GetQuoteHistory(accountId, query){
    //do additional work. For this example, just pass to the repo
    
    const updatedQuery = {...query};
    
    //default some query params if not available
    updatedQuery.currentPage = updatedQuery.currentPage || 1;
    updatedQuery.pageSize = updatedQuery.pageSize || 20;
    
    return await GetQuotes(accountId, updatedQuery);
}

async function CreateQuote(accountId, quoteRequest){
    
    const price = await PredictPrice(accountId, quoteRequest);
    
    const updatedRequest = {...quoteRequest};
    updatedRequest.suggestedPrice = price;
    
    return await InsertQuote(accountId, updatedRequest);
}

module.exports = { GetQuoteHistory, CreateQuote };