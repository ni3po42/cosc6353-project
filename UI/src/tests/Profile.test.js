import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';

import { BrowserRouter as Router } from 'react-router-dom';

import { Profile } from '../components/Profile';

import { GetProfile, UpdateProfile } from "../services/ProfileService";

import { ValidateAll } from "common/validations/core";
import { Validations } from "common/validations/profile";

jest.mock('../services/ProfileService.js', () => ({GetProfile: jest.fn(), UpdateProfile : jest.fn()}));
jest.mock("common/validations/core", () => ({ValidateAll: jest.fn()}));

const createComp = (props) => {
    const component = mount(<Router><Profile {...props} /></Router>);
    return component.find(Profile);
}

const swallowCatch = (action) => {
    try
    {
        action && action().catch(()=>{});
    }catch (e)
        {        }
}

describe("Profile Component tests", ()=>{

    beforeEach(() => {
      // Clear all instances and calls to constructor and all methods:
      UpdateProfile.mockClear();
      GetProfile.mockClear();
      
      ValidateAll.mockClear();
    });

    it('renders without crashing', async () => {
        //arrange
        const profileAwait = GetProfile.mockResolvedValue({id: "id", accountId: "accountId", address1 : "1", address2: "2", city: "3", state:"TX", zip:"77001"});
        
        //assert
        const div = document.createElement('div');
        ReactDOM.render(<Router><Profile /></Router>, div);
        
        await profileAwait();
        
        ReactDOM.unmountComponentAtNode(div);
    });
    
    it('marks profile dirty on change', async () => {
        //arrange
        const profileAwait = GetProfile.mockResolvedValue({id: "id", accountId: "accountId", address1 : "1", address2: "2", city: "3", state:"TX", zip:"77001"});
        
        const component = createComp({});
        const instance = component.instance();
        await profileAwait();
        
        jest.spyOn(Validations, "address1");
        
        //act
        
        expect(component.state().profileDirty).toBeFalsy();
        expect(component.state().updated).toBeFalsy();
        
        instance.handleChange({
            preventDefault : jest.fn(),
            target : {
                name : "address1",
                value: "123 fake str."
            }
        });
        
        //assert
        expect(Validations.address1).toHaveBeenCalledWith("123 fake str.");
        expect(component.state().profileDirty).toBeTruthy();
        expect(component.state().updated).toBeFalsy();
        
    });
    
    it('sets error messages for fields', async () => {
        //arrange
        const profileAwait = GetProfile.mockResolvedValue({id: "id", accountId: "accountId", address1 : "1", address2: "2", city: "3", state:"TX", zip:"77001"});
        
        const component = createComp({});
        const instance = component.instance();
        await profileAwait();
        
        jest.spyOn(Validations, "address1").mockImplementation(() => "error!!");
        
        //act
        instance.handleChange({
            preventDefault : jest.fn(),
            target : {
                name : "address1",
                value: "123 fake str."
            }
        });
        
        //assert
        expect(component.state().formErrors.address1).toBe("error!!");
        
    });
    
     it('validates on submit', async () => {
        //arrange
        const profileAwait = GetProfile.mockResolvedValue({id: "id", accountId: "accountId", address1 : "1", address2: "2", city: "3", state:"TX", zip:"77001"});
        const updateProfileAwait = UpdateProfile.mockResolvedValue();
        
        const component = createComp({});
        const instance = component.instance();
        await profileAwait();
        
        
        
        //act
        instance.handleSubmit({
            preventDefault : jest.fn()
        });
        await updateProfileAwait();
        
        //assert
        expect(ValidateAll).toHaveBeenCalled();
        
        const {updated, ...expectedState } = component.state();
        expectedState.updated = false;
        
        expect(ValidateAll.mock.calls[0][0]).toMatchObject(expectedState);
        expect(ValidateAll.mock.calls[0][1]).toBe(Validations);
        expect(updated).toBeTruthy();
    });
    
    
    it('sets form errors on submit', async () => {
        //arrange
        const profileAwait = GetProfile.mockResolvedValue({id: "id", accountId: "accountId", address1 : "1", address2: "2", city: "3", state:"TX", zip:"77001"});
        
        const component = createComp({});
        const instance = component.instance();
        await profileAwait();
        
        ValidateAll.mockReturnValue({ address1 : "error!!"});
        
        //act
        instance.handleSubmit({
            preventDefault : jest.fn()
        });
        
        //assert
        expect(ValidateAll).toHaveBeenCalled();
        
        expect(component.state().formErrors.address1).toBe("error!!");
    });
    
    it('handles error on profile update', async () => {
        //arrange
        const profileAwait = GetProfile.mockResolvedValue({id: "id", accountId: "accountId", address1 : "1", address2: "2", city: "3", state:"TX", zip:"77001"});
        const updateProfileAwait = UpdateProfile.mockRejectedValue("error updating profile");
        
        const component = createComp({});
        const instance = component.instance();
        await profileAwait();
        
        jest.spyOn(instance, 'setState');
        
        ValidateAll.mockReturnValue(false);
        
        //act
        await instance.handleSubmit({
            preventDefault : jest.fn()
        });
        
        swallowCatch(async ()=> await updateProfileAwait());
        
        expect(UpdateProfile).toHaveBeenCalled();
        expect(component.state().updateError).toBe("error updating profile");
        
    });
});