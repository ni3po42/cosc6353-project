import {Authenticate as mockAuth, GetAccount as mockGetAccount, CreateNewAccount as mockCreatAccount} from "../repositories/AccountRepo";
import {GetAccount, CreateAccount, LogIn, CreateToken, ValidateToken} from "../managers/AccountManager";

jest.mock("../repositories/AccountRepo" , ()=>({
    Authenticate : jest.fn(),
    GetAccount : jest.fn(),
    CreateNewAccount : jest.fn()
}));

describe("Account manager tests", ()=>{
    
    beforeEach(() => {
      // Clear all instances and calls to constructor and all methods:
      mockAuth.mockClear();
      mockGetAccount.mockClear();
      mockCreatAccount.mockClear();
    });
    
    it('can create an account', async ()=>{
       //arrange
       const account = {
           id : "accountId"
       };
       mockCreatAccount.mockResolvedValue(account);
       
       //act
       const result = await CreateAccount("email", "password");
       
       //assert
       expect(mockCreatAccount).toHaveBeenCalledWith("EMAIL", "e0119b00ff8250dd507d793390ede91f6f784b054ba1a47c5e1c705a82524f5b");
    });
    
    it('can get an account', async ()=> {
        //arrange
       const account = {
           id : "accountId"
       };
       mockGetAccount.mockResolvedValue(account);
       
       //act
       const result = await GetAccount("accountId");
       
       //assert
       expect(mockGetAccount).toHaveBeenCalledWith("accountId");
       
    });
    
    it('can authenticate', async ()=>{
        //arrange
       const hash = "e0119b00ff8250dd507d793390ede91f6f784b054ba1a47c5e1c705a82524f5b";
       const account = {
         id : "accountId"  
       };
       
       mockAuth.mockResolvedValue(account);
       
       //act
       const result = await LogIn("email", "password");
       
       //assert
       expect(mockAuth).toHaveBeenCalledWith(hash);
    });
    
    it('can deny authentication', async ()=>{
       //arrange
       const hash = "BADBEEF";
       
       mockAuth.mockRejectedValue("no account found");
       
       //act
       const result = await LogIn("email", "password").catch(r=>r);
       
       //assert
       expect(result).toBe("no account found");
    });
    
    it('can generate and verify token', async ()=>{
        //arrange
       const accountId = "id";
       
       //act
       const token = await CreateToken(accountId).catch(r=>r);
       expect(token).toBeDefined();
       
       const id = await ValidateToken(token).catch(r=>r);
       expect(id).toBe(accountId);
    });
    
    it('can reject invalid token', async ()=>{
       //act
       const result = await ValidateToken("not valid what so ever").catch(r=>r);
       expect(result).toBe("invalid token");
    });
    
    it('can reject invalid token', async ()=>{
       //act
       const result = await ValidateToken("not valid what so ever").catch(r=>r);
       expect(result).toBe("invalid token");
    });
    
});