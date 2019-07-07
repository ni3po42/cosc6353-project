import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router';

import { LogOff } from '../components/LogOff.js';
import { LogOff as mockLogOff } from '../services/AuthenticationService.js';

jest.mock('../services/AuthenticationService.js', () => ({LogOff: jest.fn()}));

const createLoginComp = (props) => {
    const component = mount(<Router><LogOff {...props} /></Router>);
    return component.find(LogOff);
}

describe("LogOff Component tests", ()=>{

    beforeEach(() => {
      // Clear all instances and calls to constructor and all methods:
      mockLogOff.mockClear();
    });


    it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(<Router><LogOff /></Router>, div);
      ReactDOM.unmountComponentAtNode(div);
    });
    
    it('calls log off on render', async ()=>{
        //arrange
        const component = createLoginComp({ });
        
        component.setState({ email: "user@mail.org", password : "password" });
        //act
       
        //assert
        expect(mockLogOff).toHaveBeenCalled();
    });
    
});


