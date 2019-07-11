//Quote Module
const { GetQuotes } = require("../QuoteRepo");

function GetQuoteHistory(accountId, query){
    //do additional work. For this example, just pass to the repo
    return GetQuotes(accountId, query);
}

module.exports = { GetQuoteHistory };