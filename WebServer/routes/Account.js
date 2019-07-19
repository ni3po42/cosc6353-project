const express = require('express');
const router = express.Router();
const Authenticate = require('../AuthMiddleware');
const { ValidateAll } = require("common/validations/core");
const { Validations } = require("common/validations/register");
const { GetAccount, CreateAccount, LogIn, CreateToken} = require('../managers/AccountManager');

//get account
router.get('/', Authenticate, function(req, res) {
  const accountId = req.accountId;
  
  GetAccount(accountId)
    .then((account)=> {
      res.send(account);  
    })
    .catch(errorMessage=>{
      res.status(500);
      res.send(errorMessage);
    });
});

//create account
router.post('/', function(req, res) {
  
  const errorMessages = ValidateAll(req.body, Validations);
  
  if (errorMessages){
    res.status(400);
    res.send(errorMessages);
    return;
  }
  
  const email = req.body.email;
  const password = req.body.password;
  
  CreateAccount(email, password)
    .then((newAccount)=> {
      res.send(newAccount);
    })
    .catch(errorMessage => {
      res.status(500);
      res.send(errorMessage);
    });
});

//authenticate
router.post('/Token', function(req, res) {
  
  const email = req.body.email;
  const password = req.body.password;
  LogIn(email, password)
    .then(account => CreateToken(account.id))
    .then(token=> {
        res.cookie('auth', token, { maxAge: 10 * 60 * 1000, httpOnly: true });
        res.cookie('active', 1, { maxAge: 10 * 60 * 1000, httpOnly: false });
        res.send({});
      })
    .catch(errorMessage=> {
      console.log(errorMessage);
      res.status(403);
      res.send(errorMessage);  
    });
  
});

//log out
router.delete('/Token', function(req, res) {
  res.clearCookie('auth');
  res.clearCookie('active');
  res.send({});
});

module.exports = router;