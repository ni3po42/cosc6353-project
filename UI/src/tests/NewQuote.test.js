import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';

import { BrowserRouter as Router } from 'react-router-dom';
import { withRouter } from 'react-router';

import { NewQuote } from '../components/NewQuote';

import { CreateQuote, GetPrice} from "../services/QuoteService";
import { GetProfile} from "../services/ProfileService";

import { ValidateAll } from "common/validations/core";
import { Validations } from "common/validations/quoteRequest";

jest.mock('../services/QuoteService.js', () => ({CreateQuote: jest.fn(), GetPrice: jest.fn()}));
jest.mock('../services/ProfileService.js', () => ({GetProfile: jest.fn()}));

jest.mock("common/validations/core", () => ({ValidateAll: jest.fn()}));

jest.mock("common/validations/quoteRequest", () => ({
    Validations : {
        field: jest.fn()
    }
    }));

const createComp = (props) => {
    const component = mount(<Router><NewQuote{...props} /></Router>);
    return component.find(NewQuote);
}

describe("NewQuote Component tests", ()=>{

    beforeEach(() => {
      // Clear all instances and calls to constructor and all methods:
      CreateQuote.mockClear();
      GetProfile.mockClear();
      
      ValidateAll.mockClear();
    });

    it('renders without crashing', async () => {
        //arrange
        const profileAwait = GetProfile.mockResolvedValue({address1 : "1", address2: "2", city: "3", state:"TX", zip:"77001"});
        
        
        //assert
        const div = document.createElement('div');
        ReactDOM.render(<Router><NewQuote /></Router>, div);
        
        await profileAwait();
        
        ReactDOM.unmountComponentAtNode(div);
    });
   
    it('load profile address into form', async ()=>{
        //arange
        const address = {address1 : "1", address2: "2", city: "3", state:"TX", zip:"77001"};
        const profileAwait = GetProfile.mockResolvedValue(address);
        
        const component = createComp({ });
        const instance = component.instance();
        
        jest.spyOn(instance, "renderDeliveryAddress");
        
        //act
        component.update();
        await profileAwait();
        
        //assert
        expect(instance.renderDeliveryAddress).toHaveBeenCalled();
        
        expect(instance.renderDeliveryAddress.mock.calls[0][0]).toMatchObject(address);
    });
    
    
    it('validates on whole form', async ()=>{
        //arange
        const address = {address1 : "1", address2: "2", city: "3", state:"TX", zip:"77001"};
        const profileAwait = GetProfile.mockResolvedValue(address);
        
        const component = createComp({ });
        const instance = component.instance();
        
        ValidateAll.mockReturnValue("error");
        
        //act
        component.update();
        await profileAwait();
        
        instance.handleSubmit({preventDefault : jest.fn(), target : { name:"submitQuote"}});
        
        //assert
        expect(ValidateAll).toHaveBeenCalled();
        expect(ValidateAll.mock.calls[0][1]).toMatchObject(Validations);
    });
    
     it('validates single field - is invalid', async ()=>{
        //arange
        const address = {address1 : "1", address2: "2", city: "3", state:"TX", zip:"77001"};
        const profileAwait = GetProfile.mockResolvedValue(address);
        
        const component = createComp({ });
        const instance = component.instance();
        
        Validations.field.mockReturnValue("some error");
        
        //act
        component.update();
        await profileAwait();
        
        instance.handleChange({preventDefault : jest.fn(), target : { name : "field", value: "anything"}});
        
        //assert
        expect(component.state().formErrors['field']).toBeTruthy();
    });
    
     it('validates single field - is valid', async ()=>{
        //arange
        const address = {address1 : "1", address2: "2", city: "3", state:"TX", zip:"77001"};
        const profileAwait = GetProfile.mockResolvedValue(address);
        
        const component = createComp({ });
        const instance = component.instance();
        
        Validations.field.mockReturnValue(false);
        
        //act
        component.update();
        await profileAwait();
        
        instance.handleChange({preventDefault : jest.fn(), target : { name : "field", value: "anything"}});
        
        //assert
        expect(component.state().formErrors['field']).toBeFalsy();
    });
    
    it('creates new quote on valid form', async ()=>{
        //arange
        const address = {address1 : "1", address2: "2", city: "3", state:"TX", zip:"77001"};
        const profileAwait = GetProfile.mockResolvedValue(address);
        
        const quoteAwait = CreateQuote.mockResolvedValue({suggestedPrice: 1234});
        
        const component = createComp({ });
        const instance = component.instance();
        
        ValidateAll.mockReturnValue(undefined);
        
        component.update();
        await profileAwait();
        const request = {gallonsRequested : 20, deliveryDate: "2019-3-31"};
        component.setState(request);
        
        //act
        instance.handleSubmit({preventDefault : jest.fn(), target : { name:"submitQuote"}});
        await quoteAwait();
        
        //assert
        expect(CreateQuote).toHaveBeenCalled();
        expect(CreateQuote.mock.calls[0][0]).toMatchObject(request);
        
    });
    
    it('can get price', async ()=>{
        //arange
        const address = {address1 : "1", address2: "2", city: "3", state:"TX", zip:"77001"};
        const profileAwait = GetProfile.mockResolvedValue(address);
        
        const priceAwait = GetPrice.mockResolvedValue({suggestedPrice: 1234});
        
        const component = createComp({ });
        const instance = component.instance();
        
        ValidateAll.mockReturnValue(undefined);
        
        component.update();
        await profileAwait();
        const request = {gallonsRequested : 20, deliveryDate: "2019-3-31"};
        component.setState(request);
        
        //act
        instance.handleSubmit({preventDefault : jest.fn(), target : { name:"getPrice"}});
        await priceAwait();
        
        //assert
        expect(GetPrice).toHaveBeenCalled();
        expect(GetPrice.mock.calls[0][0]).toMatchObject(request);
        
    });
    
});


