const express = require('express');
const router = express.Router();

const { ValidateAll } = require("common/validations/core");
const { Validations } = require("common/validations/profile");

const Authenticate = require('../AuthMiddleware');

const { GetProfile, CreateProfile } = require('../managers/ProfileManager');

//Get profile
router.get('/', Authenticate, async function(req, res) {
  
  const accountId = req.accountId;
  
  await GetProfile(accountId)
    .then( profile=> res.send(profile))
    .catch(e => {
      res.status(500);
      res.send(e);
    });
});

//Update profile
router.post('/', Authenticate, async function(req, res) {
  const errorMessages = ValidateAll(req.body, Validations);
  
  if (errorMessages){
    res.status(400);
    res.send(errorMessages);
    return;
  }
  
  const accountId = req.accountId;
  const profile = req.body;
  
  await CreateProfile(accountId, profile)
    .then(updatedProfile=> res.send(updatedProfile))
    .catch(e => {
      res.status(500);
      res.send(e);
    });
});


module.exports = router;