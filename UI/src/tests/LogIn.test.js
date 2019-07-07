import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router';

import { LogIn } from '../components/LogIn.js';
import { Authenticate } from '../services/AuthenticationService.js';
import { GetProfile} from "../services/ProfileService";

jest.mock('../services/AuthenticationService.js', () => ({Authenticate: jest.fn()}));
jest.mock('../services/ProfileService.js', () => ({GetProfile: jest.fn()}));

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

const swallowCatch = (action) => {
    try
    {
        action && action().catch(()=>{});
    }catch (e)
        {        }
}

describe("Login Component tests", ()=>{

    beforeEach(() => {
      // Clear all instances and calls to constructor and all methods:
      Authenticate.mockClear();
      GetProfile.mockClear();
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
        
        const authPromise = Authenticate.mockResolvedValue({ accountId : 'id'});
        const profPromise = GetProfile.mockResolvedValue();
        
        component.setState({ email: "user@mail.org", password : "password" });
        
        //act
        component
            .find("button")
            .simulate('click');
        
        //assert
        await authPromise();
        await profPromise();
        
        expect(Authenticate).toHaveBeenCalledWith("user@mail.org", "password");
        expect(history.push).toHaveBeenCalledWith('/');
        expect(component.state('errorMessage')).toBeFalsy();
    });
    
    it('can deny login', async ()=>{
        
        //arrange
        let history = createSpyObj('history', ['push']);
        const component = createLoginComp({ history });
        
        const authPromise = Authenticate.mockRejectedValue("error message");
        
        component.setState({ email: "user@mail.org", password : "nope" });
        
        //act
        component
            .find("button")
            .simulate('click');
        
        //assert
        swallowCatch(async ()=> await authPromise());
        component.update();
        
        expect(Authenticate).toHaveBeenCalledWith("user@mail.org", "nope");
        expect(history.push).not.toHaveBeenCalled();
    });
    
    it('redirects to profile if profile not completed', async ()=>{
        //arrange
        
        let history = createSpyObj('history', ['push']);
        
        const component = createLoginComp({ history});
        
        const authPromise = Authenticate.mockResolvedValue({ accountId : 'id'});
        const profPromise = GetProfile.mockRejectedValue();
        
        component.setState({ email: "user@mail.org", password : "password" });
        
        //act
        component
            .find("button")
            .simulate('click');
        
        //assert
        await authPromise();
        swallowCatch(async () => await profPromise());
        
        expect(Authenticate).toHaveBeenCalledWith("user@mail.org", "password");
        expect(history.push).toHaveBeenCalledWith('/Profile');
    });
});


