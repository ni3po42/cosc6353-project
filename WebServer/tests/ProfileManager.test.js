import repo from "../repositories/ProfileRepo";
import {GetProfile, CreateProfile} from "../managers/ProfileManager";

jest.mock("../repositories/ProfileRepo" , ()=>({
    GetProfile : jest.fn(),
    UpdateProfile : jest.fn()
}));

describe("Profile manager tests", ()=>{
    
    beforeEach(() => {
      // Clear all instances and calls to constructor and all methods:
      repo.GetProfile.mockClear();
      repo.UpdateProfile.mockClear();
    });
    
    it("can get profile", async ()=> {
        await GetProfile();
        expect(repo.GetProfile).toHaveBeenCalled();
    });
    
     it("can udpate profile", async ()=> {
        await CreateProfile();
        expect(repo.UpdateProfile).toHaveBeenCalled();
    });
    
});