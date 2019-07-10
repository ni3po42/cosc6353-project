//stubbed data
const profiles = {
  
  "uuid0001": {
      id : "uuid0001",
      accountId : "uuid_a_0001",
      fullName : "Client 1",
      address1 : "123 Fake st.",
      address2 : null,
      city : "Houston",
      state: "TX",
      zip: "77001",
  },
  "uuid0002": {
      id : "uuid0002",
      accountId : "uuid_a_0002",
      fullName : "Client 1",
      address1 : "123 Fake st.",
      address2 : null,
      city : "Houston",
      state: "TX",
      zip: "77001",
  }
    
};

const hashTable = {
  
  "uuid_a_0001" : "uuid0001",
  "uuid_a_0002" : "uuid0002"
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