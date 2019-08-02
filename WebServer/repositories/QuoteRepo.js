const {Update, FindOne, ObjectID} = require("./dbHelper.js");

function InsertQuote(accountId, quoteRequest){
    quoteRequest.created = new Date();
    return Update({_id: ObjectID(accountId)},{$push:{quotes : quoteRequest}, $inc:{quoteCount : 1}})
            .then(()=> quoteRequest);
}

function GetQuoteCount(accountId){
    
    return FindOne({_id:ObjectID(accountId)})
            .then(account=>{
                if (!account){
                    throw "Account not found.";
                }
                return account.quoteCount;
            });
}

function GetQuotes(currentAccountId, query){
    
    const {page, ...origResp} = query;
    const response = {...origResp};
    const startIndex = (query.currentPage - 1) * query.pageSize;
    const n = query.pageSize;
    
    return FindOne({_id:ObjectID(currentAccountId)}, {projection : { quotes : { $slice : [ startIndex, n ] }, quoteCount : 1, profile : 1  }})
            .then(account=>{
                if (!account){
                    throw "Account not found.";
                }
                
                if (account.quotes && account.quotes.length){
                    const page = account.quotes.map(q => ({ ...q, totalAmount : q.suggestedPrice * q.gallonsRequested, deliveryAddress: q.deliveryAddress }));
                   
                   response.pageCount = Math.ceil(account.quoteCount / query.pageSize);
                   response.page = page;
                   return response;
                    
                }else{
                    throw "No quotes for account found.";
                }
            });
}

module.exports = {InsertQuote, GetQuotes, GetQuoteCount};