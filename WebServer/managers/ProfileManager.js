//Profile Module
const repo = require("../repositories/ProfileRepo");

async function GetProfile(accountId){
    return await repo.GetProfile(accountId);
}

async function CreateProfile(accountId, profile){
    return await repo.UpdateProfile(accountId, profile);
}

module.exports = { GetProfile, CreateProfile };