var profileRepo = require("./ProfileRepo");

//stubbed data
const quotes = {
};

function InsertQuote(accountId, quoteRequest){
    
    if (!(accountId in quotes)){
        quotes[accountId] = [];
    }
    
    const newId = "uuid_q_" + (quotes[accountId].length + 1).toString().padStart(4,"0");
    const newQuote = {...quoteRequest, id: newId};
    quotes[accountId].push(newQuote);
    
    return Promise.resolve(newQuote);
}

function GetQuoteCount(accountId){
    if (!(accountId in quotes)){
       return Promise.resolve(0);
    }
    
    return Promise.resolve(quotes[accountId].length);
}

function GetQuotes(currentAccountId, query){
    
    const {page, ...response} = query;
    
   if (!(currentAccountId in quotes)){
       return Promise.reject("No quotes for account found.");
   }
   
   return profileRepo.GetProfile(currentAccountId)
            .then(profile => {
               const {id, accountId, ...address} = profile
               
               const allQuotes = quotes[currentAccountId].map(q => ({ ...q, totalAmount : q.suggestedPrice * q.gallonsRequested, deliveryAddress:  address }));
               
               response.pageCount = Math.ceil(allQuotes.length / query.pageSize);
               const startIndex = (query.currentPage - 1) * query.pageSize;
               const endIndex = query.currentPage * query.pageSize;
               response.page = allQuotes.slice(startIndex, endIndex);
               return response;
            });
}

module.exports = {InsertQuote, GetQuotes, GetQuoteCount};