import { Authenticate, IsAuthenticated, LogOff, RegisterListener, UnregisterListener, GetAccount, CreateNewAccount } from '../services/AuthenticationService';

import axios from 'axios';
import Cookies from 'js-cookie';

jest.mock('axios');
jest.mock('js-cookie', ()=> ({
    "get" : jest.fn(), 
    "set" : jest.fn(),
    "remove" : jest.fn()
}));

describe("AuthenticationService tests", ()=>{

    beforeEach(() => {
      // Clear all instances and calls to constructor and all methods:
      axios.mockClear();
      Cookies.get.mockClear();
      Cookies.set.mockClear();
      Cookies.remove.mockClear();
    });
    
    it('can authenticate', async ()=>{
        //arrange
        const listener = jest.fn();
        RegisterListener(listener);
        
        axios.mockResolvedValue({
            data : "something"
        });
        
        //act
        const result = await Authenticate("email", "password");
        
        //assert
        expect(axios).toHaveBeenCalled();
        expect(axios.mock.calls[0][0]).toMatchObject({
            method:'POST',
            url: "/api/Account/Token",
            data: {email:"email", password:"password"}
        });
        expect(result).toBe("something");
        expect(listener).toHaveBeenCalledWith(true);
        
        UnregisterListener(listener);
    });

    it('can deny authenticate', async ()=>{
        //arrange
        axios.mockRejectedValue({response : { data:"something"}});
        
        //act
        const result = await Authenticate("email", "wrong-password")
                                .catch(r=> r);
        
        //assert
        expect(result).toBe("something");
    });

    it('can confirm if user is authenticated', ()=>{
        //arrange
        Cookies.get.mockReturnValue("value");
        
        //act
        const result = IsAuthenticated();
        
        //assert
        expect(Cookies.get).toHaveBeenCalled();
        expect(result).toBeTruthy();
    });

    it('can confirm if user is not authenticated', ()=>{
        //arrange
        Cookies.get.mockReturnValue(undefined);
        
        //act
        const result = IsAuthenticated();
        
        //assert
        expect(Cookies.get).toHaveBeenCalled();
        expect(result).toBeFalsy();
    });

    it('can logoff', async ()=>{
        
        //arrange
        const listener = jest.fn();
        RegisterListener(listener);
        
        axios.mockResolvedValue(null);
        
        //act
        await LogOff();
        
        //assert
        expect(axios).toHaveBeenCalled();
        expect(axios.mock.calls[0][0]).toMatchObject({
            method:'DELETE',
            url: "/api/Account/Token"
        });
    
        expect(listener).toHaveBeenCalledWith(false);
        UnregisterListener(listener);
    });

    it('can get an account', async ()=>{
        //arrange
        const account = {
            id : "accountId"
        };
        
        axios.mockResolvedValue({
            data : account
        });
        
        //act
        const result = await GetAccount();
        
        //assert
        expect(axios).toHaveBeenCalled();
        expect(axios.mock.calls[0][0]).toMatchObject({
            method:'GET',
            url: "/api/Account"
        });
        
        expect(result).toMatchObject(account);
    });

    it('can get deny an account', async ()=>{
        //arrange
        axios.mockRejectedValue({
            response : {data : "nope"}
        });
        
        //act
        const result = await GetAccount().catch(r=>r);
        
        //assert
        expect(result).toBe("nope");
    });

    it('can create an account', async ()=>{
        //arrange
        const accountRequest = {
            email : "email",
            password: "password", 
            passwordConfirm : "password"
        };
        
        axios.mockResolvedValue({
            data : {
                id : "a_id"
            }
        });
        
        //act
        const result = await CreateNewAccount("email", "password", "password");
        
        //assert
        expect(axios).toHaveBeenCalled();
        expect(axios.mock.calls[0][0]).toMatchObject({
            method:'POST',
            url: "/api/Account",
            data: accountRequest
        });
        expect(result.id).toBe("a_id");
    });

    it('can deny create an account', async ()=>{
        //arrange
        const accountRequest = {
            email : "email",
            password: "password"
        };
        
        axios.mockRejectedValue({response : { data : "some dumb reason"}});
        
        //act
        const result = await CreateNewAccount("email", "password").catch(r=>r);
        
        //assert
        expect(result).toBe("some dumb reason");
    });
    
});