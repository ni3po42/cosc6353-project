import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';

import { BrowserRouter as Router } from 'react-router-dom';

import { Register } from '../components/Register';

import { CreateNewAccount } from '../services/AuthenticationService.js';

import { ValidateAll } from "common/validations/core";
import { Validations } from "common/validations/register";

jest.mock('../services/AuthenticationService.js', () => ({CreateNewAccount: jest.fn()}));

jest.mock("common/validations/core", () => ({ValidateAll: jest.fn()}));

jest.mock("common/validations/register", () => ({
    Validations : {
        field: jest.fn()
    }
    }));

const createComp = (props) => {
    const component = mount(<Router><Register {...props} /></Router>);
    return component.find(Register);
}

describe("Register Component tests", ()=>{

    beforeEach(() => {
      // Clear all instances and calls to constructor and all methods:
      CreateNewAccount.mockClear();
      ValidateAll.mockClear();
    });

    it('renders without crashing', async () => {
        const div = document.createElement('div');
        ReactDOM.render(<Router><Register /></Router>, div);
        ReactDOM.unmountComponentAtNode(div);
    });
    
    it('shows login link after register', async () => {
       
    });
    
    it('validates on submit', async () => {
       //arange
        const component = createComp({ });
        const instance = component.instance();
        
        ValidateAll.mockReturnValue("error");
        
        //act
        instance.handleSubmit({preventDefault : jest.fn()});
        
        //assert
        expect(ValidateAll).toHaveBeenCalled();
        expect(ValidateAll.mock.calls[0][1]).toMatchObject(Validations);
    });
    
    it('validates single field - is invalid', async ()=>{
        //arange
        const component = createComp({ });
        const instance = component.instance();
        
        Validations.field.mockReturnValue("some error");
        
        //act
        instance.handleChange({preventDefault : jest.fn(), target : { name : "field", value: "anything"}});
        
        //assert
        expect(component.state().formErrors['field']).toBeTruthy();
    });
    
     it('validates single field - is valid', async ()=>{
        //arange
        const component = createComp({ });
        const instance = component.instance();
        
        Validations.field.mockReturnValue(false);
        
        //act
        instance.handleChange({preventDefault : jest.fn(), target : { name : "field", value: "anything"}});
        
        //assert
        expect(component.state().formErrors['field']).toBeFalsy();
    });
    
    it('can create an account', async () => {
       //arange
        const component = createComp({ });
        const instance = component.instance();
        
        ValidateAll.mockReturnValue(false);
        
        const updateAwait = CreateNewAccount.mockResolvedValue({});
        
        //act
        await updateAwait();
        await instance.handleSubmit({preventDefault : jest.fn()});
        
        //assert
        expect(component.state().registered).toBeTruthy();
        expect(component.state().errorMessage).toBeFalsy();
    });
    
    it('displays error if account not created', async () => {
       //arange
        const component = createComp({ });
        const instance = component.instance();
        
        ValidateAll.mockReturnValue(false);
        
        const updateAwait = CreateNewAccount.mockRejectedValue("error");
        
        //act
        await updateAwait().catch(()=>{});
        await instance.handleSubmit({preventDefault : jest.fn()});
        
        //assert
        expect(component.state().registered).toBeFalsy();
        expect(component.state().errorMessage).toBeTruthy();
    });
});