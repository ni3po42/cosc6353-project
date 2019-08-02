import { UpdateProfile, GetProfile } from '../services/ProfileService';

import axios from 'axios';

jest.mock('axios');

describe("Profile service tests", ()=>{

    beforeEach(() => {
      // Clear all instances and calls to constructor and all methods:
      axios.mockClear();
    });
    
    it('can update profile', async ()=>{
       //arrange
       const request = {
           data : "data"
       };
       axios.mockResolvedValue({
           data : "data"
       });
       
       //act
       const result = await UpdateProfile(request).catch(r=>r);
       
       //assert
       expect(axios).toHaveBeenCalled();
       expect(axios.mock.calls[0][0]).toMatchObject({
           method : "POST",
           url : "/api/Profile",
           data : request
       });
       
    });
   
    it('can handle update error', async ()=>{
       //arrange
       const request = {};
       axios.mockRejectedValue({
           response : {
               data : "some error"
           }
       });
       
       //act
       const result = await UpdateProfile(request).catch(r=>r);
       
       //assert
       expect(result).toBe("some error");
    });
    
    it('can get profile', async ()=>{
       //arrange
       
       axios.mockResolvedValue({
           data : "data"
       });
       
       //act
       const result = await GetProfile().catch(r=>r);
       
       //assert
       expect(axios).toHaveBeenCalled();
       expect(axios.mock.calls[0][0]).toMatchObject({
           method : "GET",
           url : "/api/Profile"
       });
    });
    
    it('can handle get error', async ()=>{
       //arrange
       axios.mockRejectedValue({
           response : {
               data : "some error"
           }
       });
       
       //act
       const result = await GetProfile().catch(r=>r);
       
       //assert
       expect(result).toBe("some error");
    });
    
});