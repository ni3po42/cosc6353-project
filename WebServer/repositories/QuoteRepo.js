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

function GetQuotes(currentAccountId, query){
    
    const {page, ...response} = query;
    
   if (!(currentAccountId in quotes)){
       return Promise.reject("No quotes for account found.");
   }
   
   return profileRepo.GetProfile(currentAccountId)
            .then(profile => {
               const {id, accountId, ...address} = profile
               
               const newPage = quotes[currentAccountId].map(q => ({ ...q, totalAmount : q.suggestedPrice * q.gallonsRequested, deliveryAddress:  address }));
               
               response.pageCount = 1;
               response.page = newPage;
               response.numberOfPages = newPage.length;  
               return response;
            });
}

module.exports = {InsertQuote, GetQuotes};