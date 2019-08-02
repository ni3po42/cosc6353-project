//Quote Module
const { GetQuotes, InsertQuote } = require("../repositories/QuoteRepo");
const { PredictPrice } = require("./PricingModule");

const {GetProfile} = require("../repositories/ProfileRepo");

async function GetQuoteHistory(accountId, query){
    //do additional work. For this example, just pass to the repo
    
    const updatedQuery = {...query};
    
    //default some query params if not available
    updatedQuery.currentPage = updatedQuery.currentPage || 1;
    updatedQuery.pageSize = updatedQuery.pageSize || 20;
    
    return await GetQuotes(accountId, updatedQuery);
}

async function CreateQuote(accountId, quoteRequest){
    
    const profile = await GetProfile(accountId);
    const price = await PredictPrice(accountId, quoteRequest);
    
    const updatedRequest = {...quoteRequest};
    delete profile.fullName;
    
    updatedRequest.suggestedPrice = price;
    updatedRequest.deliveryAddress = profile;
    
    return await InsertQuote(accountId, updatedRequest);
}

module.exports = { GetQuoteHistory, CreateQuote };