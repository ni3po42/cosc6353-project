//import Logger from './Logger.js';
//import axios from 'axios';

import { GetProfile } from "../services/ProfileService";
import { GetCurrentAccountId } from '../services/AuthenticationService';

//stubbed data
const quotes = {
  "uuid_a_0001": [],
  "uuid_a_0002": []
};

function CreateQuote(quoteRequest){
    const accountId = GetCurrentAccountId();
    
    if (!(accountId in quotes)){
        quotes[accountId] = [];
    }
    
    const newId = "uuid_q_" + (quotes[accountId].length + 1).toString().padStart(4,"0");
    const newQuote = {suggestedPrice : 100, ...quoteRequest, id: newId};
    quotes[accountId].push(newQuote);
    
    return Promise.resolve(newQuote);
}

function GetQuotes(query){
    
    const {page, ...response} = query;
    
    response.currentPage = query.currentPage || 1;
    response.pageSize = query.pageSize || 20;
    const currentAccountId = GetCurrentAccountId();
    
   if (!(currentAccountId in quotes)){
       return Promise.reject("No quotes for account found.");
   }
   
   return GetProfile()
            .then(profile => {
               const {id, accountId, ...address} = profile
               
               const newPage = quotes[currentAccountId].map(q => ({ ...q, totalAmount : q.suggestedPrice * q.gallonsRequested, deliveryAddress:  address }));
               
               response.pageCount = 1;
               response.page = newPage;
               response.numberOfPages = newPage.length;  
               return response;
            });
}

export {CreateQuote, GetQuotes};