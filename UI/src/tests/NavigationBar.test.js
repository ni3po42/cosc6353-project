import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router';

import { LinkContainer } from "react-router-bootstrap";

import { NavigationBar } from '../components/NavigationBar.js';
import { IsAuthenticated, RegisterListener, UnregisterListener } from '../services/AuthenticationService.js';


jest.mock('../services/AuthenticationService.js', () => ({IsAuthenticated: jest.fn(), RegisterListener: jest.fn(), UnregisterListener:jest.fn()}));

const createComp = (props) => {
    const component = mount(<Router><NavigationBar{...props} /></Router>);
    return component.find(NavigationBar);
}

describe("NavigationBar Component tests", ()=>{

    beforeEach(() => {
      // Clear all instances and calls to constructor and all methods:
      IsAuthenticated.mockClear();
    });

    it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(<Router><NavigationBar /></Router>, div);
      ReactDOM.unmountComponentAtNode(div);
    });
   
    it('hides correct links when not authenticated', async ()=>{
        //arrange
        IsAuthenticated.mockReturnValue(false);
        const component = createComp({ });
        const instance = component.instance();
        
        jest.spyOn(instance, "renderProtectedLinks");
        jest.spyOn(instance, "renderPublicLinks");
        //act
        instance.authStateChange();
        
        //assert
        expect(instance.renderProtectedLinks).not.toHaveBeenCalled();
        expect(instance.renderPublicLinks).toHaveBeenCalled();
    });
    
    
    it('shows correct links when authenticated', ()=>{
        //arrange
        IsAuthenticated.mockReturnValue(true);
        const component = createComp({ });
        const instance = component.instance();
        
        jest.spyOn(instance, "renderProtectedLinks");
        jest.spyOn(instance, "renderPublicLinks");
        
        //act
        instance.authStateChange();
        
        //assert
        expect(instance.renderProtectedLinks).toHaveBeenCalled();
        expect(instance.renderPublicLinks).not.toHaveBeenCalled();
        
    });
    
   
});


