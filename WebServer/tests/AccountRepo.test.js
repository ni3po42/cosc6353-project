const { FindOne, Insert } = require("../repositories/dbHelper.js");

const { Authenticate, GetAccount, CreateNewAccount } = require("../repositories/AccountRepo");

jest.mock("../repositories/dbHelper.js" , ()=>({
    FindOne : jest.fn(),
    Insert : jest.fn()
}));

describe("Account Repo tests", ()=>{
    
    var account = {
        id : "id",
        userName : "userName"
    };
    
    var expectedAccount = {
      userName : "userName"  
    };
    
    beforeEach(()=>{
        FindOne.mockClear();
        Insert.mockClear();
    });
    
    it("can authenticate", async ()=>{
        FindOne.mockResolvedValue(account);
        var result = await Authenticate("hash").catch(r=>r);
        expect(FindOne).toHaveBeenCalled();
        expect(result).toMatchObject(expectedAccount);
    });
    
    it("can handle bad authenticate", async ()=>{
        FindOne.mockResolvedValue(null);
        var result = await Authenticate("hash").catch(r=>r);
        expect(FindOne).toHaveBeenCalled();
        expect(result).toBe("Username/password not found.");
    });
    
    it("can get account", async ()=>{
        FindOne.mockResolvedValue(account);
        var result = await GetAccount("id").catch(r=>r);
        expect(FindOne).toHaveBeenCalled();
        expect(result).toMatchObject(expectedAccount);    
    });
    
    it("can handle get account error", async ()=>{
        FindOne.mockResolvedValue(null);
        var result = await GetAccount("id").catch(r=>r);
        expect(FindOne).toHaveBeenCalled();
        expect(result).toBe("Account not found.");    
    });
    
    it("can create new account", async ()=>{
        
        FindOne.mockResolvedValue(null);
        Insert.mockResolvedValue({_id : account.id, userName : account.userName});
        
        var result = await CreateNewAccount("email", "hash").catch(r=>r);
        
        expect(FindOne).toHaveBeenCalled();
        expect(Insert).toHaveBeenCalled();
        expect(result).toMatchObject(expectedAccount);
    });
    
    it("can handle account already exists", async ()=>{
        
        FindOne.mockResolvedValue(account);
        
        var result = await CreateNewAccount("email", "hash").catch(r=>r);
        
        expect(FindOne).toHaveBeenCalled();
        expect(Insert).not.toHaveBeenCalled();
        expect(result).toBe("Account with that email was already registered.");
    });
    
});