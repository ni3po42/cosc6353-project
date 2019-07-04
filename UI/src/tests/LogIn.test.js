import React from 'react';
import ReactDOM from 'react-dom';
import { LogIn } from '../components/LogIn.js';
import AuthenticationService from '../services/AuthenticationService.js';
import { mount } from 'enzyme';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router';

jest.mock('../services/AuthenticationService.js', () => ({Authenticate: jest.fn()}));

const createSpyObj = (baseName, methodNames) => {
    return methodNames.reduce((acc,k)=> {
        acc[k] = jest.fn();
        return acc;
    }, {});
};

const createLoginComp = (props) => {
    const component = mount(<Router><LogIn {...props} /></Router>);
    return component.find(LogIn);
}

describe("Login Component tests", ()=>{

    beforeEach(() => {
      // Clear all instances and calls to constructor and all methods:
      AuthenticationService.Authenticate.mockClear();
    });


    it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(<Router><LogIn /></Router>, div);
      ReactDOM.unmountComponentAtNode(div);
    });
    
    it('calls authentication service on submit', async ()=>{
        //arrange
        
        let history = createSpyObj('history', ['push']);
        
        const component = createLoginComp({ history});
        const instance = component.instance();
        
        const asyncMock = AuthenticationService.Authenticate.mockResolvedValue({});
        
        jest.spyOn(instance, 'goHome');
        jest.spyOn(instance, 'loginDenied');
        
        component.setState({ email: "user@mail.org", password : "password" });
        
        //act
        component
            .find("button")
            .simulate('click');
        
        //assert
        await asyncMock();
        expect(AuthenticationService.Authenticate).toHaveBeenCalledWith("user@mail.org", "password");
        expect(instance.goHome).toHaveBeenCalled();
        expect(history.push).toHaveBeenCalledWith('/');
        expect(instance.loginDenied).not.toHaveBeenCalled();
    });
    
    it('can deny login', async ()=>{
        
        //arrange
        let history = createSpyObj('history', ['push']);
        const component = createLoginComp({ history });
        const instance = component.instance();
        
        const asyncMock = AuthenticationService.Authenticate.mockRejectedValue({ error : "error message"});
        
        jest.spyOn(instance, 'goHome');
        jest.spyOn(instance, 'loginDenied');

        component.setState({ email: "user@mail.org", password : "nope" });
        
        //act
        component
            .find("button")
            .simulate('click');
        
        //assert
        try
        {
        await asyncMock();
        }
        catch (e)
        {        }
        
        expect(AuthenticationService.Authenticate).toHaveBeenCalledWith("user@mail.org", "nope");
        expect(instance.goHome).not.toHaveBeenCalled();
        expect(history.push).not.toHaveBeenCalledWith('/');
        expect(instance.loginDenied).toHaveBeenCalledWith("error message");
        expect(component.state().errorMessage).toBe('error message');
    });
    
});


