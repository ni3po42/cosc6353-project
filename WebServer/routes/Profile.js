const express = require('express');
const router = express.Router();

const Authenticate = require('../AuthMiddleware');

//create profile manager, export the get and update methods; use them here

//Get profile
router.get('/', Authenticate, function(req, res) {
  //assume this is here, will be added via the auth middle ware
  var accountId = req.accountId;  
  
  res.send({message : "this is an example:" + accountId});
});

//Update profile
router.post('/', Authenticate, function(req, res) {
  //assume this is here, will be added via the auth middle ware
  var accountId = req.accountId;  
  
  res.send({message : "this is an example"});
});


module.exports = router;