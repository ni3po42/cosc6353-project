import Logger from './Logger.js';
import axios from 'axios';

//stubbed data
const quotes = {
  "uuid_a_0001": [],
  "uuid_a_0002": []
};

function CreateQuote(accountId, quoteRequest){
    
    if (!(accountId in quotes)){
        quotes[accountId] = [];
    }
    
    const newId = "uuid_q_" + (quotes[accountId].length + 1).toString().padStart(4,"0");
    const newQuote = {suggestedPrice : 100, ...quoteRequest, id: newId};
    quotes[accountId].push(newQuote);
    
    return Promise.resolve(newQuote);
}

function GetQuotes(accountId){
   
   if (!(accountId in quotes)){
       return Promise.reject("No quotes for account found.");
   }
   
   return Promise.resolve(quotes[accountId].map(q => ({ ...q, totalAmount : q.suggestedPrice * q.gallonsRequested })));
}

export {CreateQuote, GetQuotes};