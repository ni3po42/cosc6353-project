var express = require('express');
var router = express.Router();

const Authenticate = require('../AuthMiddleware');
const { GetQuoteHistory } = require('../managers/QuoteManager');

router.get('/', Authenticate, function(req, res) {
  
  const accountId = req.accountId;
  const query = req.body;
  
  GetQuoteHistory(accountId, query)
    .then(quotes=> res.send(quotes));
});

router.post('/', function(req, res) {
  //this will be the 'new' quote call to add quotes
  //it will interact with the pricing module in the next iteration
});


module.exports = router;