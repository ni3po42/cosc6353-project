import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import { BrowserRouter as Router,  Route, Redirect } from 'react-router-dom';

import { ProtectedRoute } from '../components/ProtectedRoute.js';
import { IsAuthenticated } from '../services/AuthenticationService.js';



jest.mock('../services/AuthenticationService.js', () => ({IsAuthenticated: jest.fn()}));

const createComp = (props) => {
    const component = mount(<Router><ProtectedRoute {...props} /></Router>);
    return component.find(ProtectedRoute);
}

describe("ProtectedRoute Component tests", ()=>{

    beforeEach(() => {
      // Clear all instances and calls to constructor and all methods:
      IsAuthenticated.mockClear();
    });

    it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(<Router><ProtectedRoute redirectTo="/Path" /></Router>, div);
      ReactDOM.unmountComponentAtNode(div);
    });
   
    it('redirects when not authenticated', async ()=>{
        //arrange
        IsAuthenticated.mockReturnValue(false);
        const component = createComp({ redirectTo : "/Path", passThrough : true });
        
        //act
        
        
        //assert
        expect(component.exists(Redirect)).toBeTruthy();
    });
    
    
    it('shows route when authenticated', ()=>{
        //arrange
        IsAuthenticated.mockReturnValue(true);
        const component = createComp({ redirectTo : "/Path", passThrough : true  });
        
        //act
        
        //assert
        expect(component.exists(Route)).toBeTruthy();
        
    });
    
   
});


