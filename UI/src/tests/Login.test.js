import React from 'react';
import ReactDOM from 'react-dom';
import Login from '../components/Login';
import AuthenticationService from '../services/AuthenticationService.js';
import { mount } from 'enzyme';

const mockAuthenticate = jest.fn();
jest.mock('../services/AuthenticationService.js', () => {
  return jest.fn().mockImplementation(() => {
    return {authenticate: mockAuthenticate};
  });
});


const createSpyObj = (baseName, methodNames) => {
    return methodNames.reduce((acc,k)=> {
        acc[k] = jest.fn();
        return acc;
    }, {});
};


describe("Login Component tests", ()=>{

    beforeEach(() => {
      // Clear all instances and calls to constructor and all methods:
      AuthenticationService.mockClear();
      mockAuthenticate.mockClear();
    });


    it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(<Login />, div);
      ReactDOM.unmountComponentAtNode(div);
    });
    
    it('calls authentication service on submit', async ()=>{
        //arrange
        const component = mount(<Login />);
        const instance = component.instance();
        
        let history = createSpyObj('history', ['push']);
        
        component.setProps({ history});
        
        const asyncMock = mockAuthenticate.mockResolvedValue({});
        
        jest.spyOn(instance, 'goHome');
        jest.spyOn(instance, 'loginDenied');
        
        component.setState({ username: "user@mail.org", password : "password" });
        
        //act
        component
            .find("button")
            .simulate('click');
        
        //assert
        await asyncMock();
        expect(mockAuthenticate).toHaveBeenCalled();
        expect(instance.goHome).toHaveBeenCalled();
        expect(history.push).toHaveBeenCalledWith('/');
        expect(instance.loginDenied).not.toHaveBeenCalled();
    });
    
    it('can deny login', async ()=>{
        
        //arrange
        const component = mount(<Login />);
        const instance = component.instance();
        
        let history = createSpyObj('history', ['push']);
        
        component.setProps({ history});
        
        const asyncMock = mockAuthenticate.mockRejectedValue({ error : "error message"});
        
        jest.spyOn(instance, 'goHome');
        jest.spyOn(instance, 'loginDenied');

        component.setState({ username: "user@mail.org", password : "nope" });
        
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
        
        expect(mockAuthenticate).toHaveBeenCalled();
        expect(instance.goHome).not.toHaveBeenCalled();
        expect(history.push).not.toHaveBeenCalledWith('/');
        expect(instance.loginDenied).toHaveBeenCalledWith("error message");
        expect(component.state().errorMessage).toBe('error message');
    });
    
});


