const { FindOne, Update, ObjectID } = require("../repositories/dbHelper.js");

const { GetProfile, UpdateProfile } = require("../repositories/ProfileRepo");

jest.mock("../repositories/dbHelper.js" , ()=>({
    FindOne : jest.fn(),
    Update : jest.fn(), 
    ObjectID : (id)=> id
}));

describe("profile Repo tests", ()=>{
    
    var accountId = "id";
    var account = {
        profile : {
            
        }
    };
    
    
    
    beforeEach(()=>{
        FindOne.mockClear();
        Update.mockClear();
    });
    
    it("can get profile", async ()=>{
        
        FindOne.mockResolvedValue(account);
        
        var result = await GetProfile(accountId).catch(r=>r);
        
        expect(FindOne).toHaveBeenCalled();
        expect(result).toBe(account.profile);
    });
    
    it("can handle missing profile", async ()=>{
        
        FindOne.mockResolvedValue({profile : null});
        
        var result = await GetProfile(accountId).catch(r=>r);
        
        expect(FindOne).toHaveBeenCalled();
        expect(result).toBe("Profile not found for account.");
    });
    
    
    it("can update profile", async ()=>{
        
        var updatedProfile = { blah : 1};
        
        Update.mockResolvedValue({ profile : updatedProfile});
        
        var result = await UpdateProfile(accountId, updatedProfile).catch(r=>r);
        
        expect(Update).toHaveBeenCalled();
        expect(Update.mock.calls[0][0]).toMatchObject({_id : accountId});
        expect(Update.mock.calls[0][1]).toMatchObject({$set : {profile : updatedProfile}});
        expect(result).toMatchObject(updatedProfile);
    });
    
});
    