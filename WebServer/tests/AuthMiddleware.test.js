const { ValidateToken, CreateToken} = require('../managers/AccountManager');
import Authenticate from "../AuthMiddleware";

jest.mock("../managers/AccountManager" , ()=>({
    ValidateToken : jest.fn(),
    CreateToken : jest.fn()
}));

describe("Authmiddleware tests", ()=>{
    
    beforeEach(() => {
      // Clear all instances and calls to constructor and all methods:
      ValidateToken.mockClear();
      CreateToken.mockClear();
    });
    
    it('can handles valid token', async ()=>{
        //arrange
        const accountId = "id";
        const token = "token";
        const newToken = "newToken";
        
        
        const req = {
            cookie : {auth: token}
        };
        
        const res = {
            send : jest.fn(),
            status : jest.fn(),
            cookie : jest.fn(),
            clearCookie : jest.fn()
        };
        
        const next = jest.fn();
        
        ValidateToken.mockResolvedValue(accountId);
        CreateToken.mockResolvedValue(newToken);
        expect(req.accountId).not.toBeDefined();
        
        //act
        await Authenticate(req,res,next);
        
        //assert
        expect(ValidateToken).toBeCalledWith(token);
        expect(req.accountId).toBe(accountId);
        expect(CreateToken).toBeCalledWith(accountId);
        
        expect(res.send).not.toHaveBeenCalled();
        expect(res.status).not.toHaveBeenCalled();
        
        expect(res.clearCookie).toBeCalledWith("auth");
        expect(res.cookie).toHaveBeenCalled();
        expect(res.cookie.mock.calls[0][0]).toBe("auth");
        expect(res.cookie.mock.calls[0][1]).toBe(newToken);
        expect(res.cookie.mock.calls[0][2]).toMatchObject({ maxAge: 10 * 60 * 1000, httpOnly: true });
        
        expect(next).toHaveBeenCalled();
    });
    
    it('can handles invalid token', async ()=>{
           //arrange
        const accountId = "id";
        const token = "token";
        const newToken = "newToken";
        
        
        const req = {
            cookie : {auth: token}
        };
        
        const res = {
            send : jest.fn(),
            status : jest.fn(),
            cookie : jest.fn(),
            clearCookie : jest.fn()
        };
        
        const next = jest.fn();
        
        ValidateToken.mockRejectedValue("invalid token");
        expect(req.accountId).not.toBeDefined();
        
        //act
        await Authenticate(req,res,next);
        
        //assert
        expect(ValidateToken).toBeCalledWith(token);
        
        expect(req.accountId).not.toBeDefined();
        
        expect(CreateToken).not.toHaveBeenCalled();
        
        expect(res.send).toHaveBeenCalledWith("Access denied.");
        expect(res.status).toHaveBeenCalledWith(403);
        
        expect(res.clearCookie).not.toHaveBeenCalled();
        expect(res.cookie).not.toHaveBeenCalled();
        
        expect(next).not.toHaveBeenCalled();
    });
});