var express = require('express');
var router = express.Router();

const { ValidateAll } = require("common/validations/core");
const { Validations } = require("common/validations/quoteRequest");

const Authenticate = require('../AuthMiddleware');
const { GetQuoteHistory, CreateQuote } = require('../managers/QuoteManager');

router.get('/', Authenticate, function(req, res) {
  
  const accountId = req.accountId;
  const query = req.body;
  
  GetQuoteHistory(accountId, query)
    .then(quotes=> res.send(quotes))
    .catch(e => {
      res.status(500);
      res.send(e);
    });
});

router.post('/', Authenticate, function(req, res) {
  
  const errorMessages = ValidateAll(req.body, Validations);
  
  if (errorMessages){
    res.status(400);
    res.send(errorMessages);
    return;
  }
  
  const accountId = req.accountId;
  const quoteRequest = req.body;
  
  CreateQuote(accountId, quoteRequest)
    .then(quote=> res.send(quote))
    .catch(e => {
      res.status(500);
      res.send(e);
    });
});


module.exports = router;