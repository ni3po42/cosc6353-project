const {FindOne, Update, ObjectID} = require("./dbHelper.js");

function GetProfile(accountId){
    
    return FindOne({_id:ObjectID(accountId)})
        .then(account=>{
            if (!account || !account.profile){
                throw "Profile not found for account.";
            }
            return account.profile;
        });
}

function UpdateProfile(accountId, profile){

    return Update({_id: ObjectID(accountId)},{$set:{profile : profile}})
            .then(account=> account.profile);
}

module.exports = {GetProfile, UpdateProfile};