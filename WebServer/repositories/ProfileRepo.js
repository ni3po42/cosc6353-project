//stubbed data
const profiles = {
};

const hashTable = {
};

function GetProfile(accountId){
    const profileId = hashTable[accountId];
    
    if (!profileId){
        return Promise.reject("Profile not found for account.");
    }
    else if (profileId in profiles){
        return Promise.resolve(profiles[profileId]);
    }else{
        return Promise.reject("Profile not found");
    }
}

function UpdateProfile(accountId, profile){
    
    if (!(accountId in hashTable)){//new account
        
        const newId = "uuid" + (Object.keys(profiles).length + 1).toString().padStart(4,"0");
        profile.id = newId;
        profile.accountId = accountId;
        profiles[newId] = profile;
        hashTable[accountId] = newId;
        
        return Promise.resolve(profile);
        
    }else{
        const profileId = hashTable[accountId];
        profile.id = profileId;
        profiles[profile.id] = profile;
        return Promise.resolve(profile);
    }
}

module.exports = {GetProfile, UpdateProfile};