import axios from 'axios';

function CreateQuote(quoteRequest){
    
    return axios({
        method : "POST",
        url : "/api/Quote",
        data : quoteRequest
    }).then(response=> {
        return response.data;
    })
    .catch(e => {
       return Promise.reject(e.response.data); 
    });
}

function GetPrice(quoteRequest){
    
    return axios({
        method : "POST",
        url : "/api/Quote/NewPrice",
        data : quoteRequest
    }).then(response=> {
        return response.data;
    })
    .catch(e => {
       return Promise.reject(e.response.data); 
    });
}

function GetQuotes(query){
    
    return axios({
        method : "GET",
        url : "/api/Quote",
        params : query
    }).then(response=> {
        return response.data;
    })
    .catch(e => {
       return Promise.reject(e.response.data); 
    });
}

export {CreateQuote, GetQuotes, GetPrice};