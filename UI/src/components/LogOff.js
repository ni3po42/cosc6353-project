import React from "react";
import { Redirect } from 'react-router-dom';

import AuthenticationService from '../services/AuthenticationService.js';

export class LogOff extends React.Component
{
    constructor(props){
        super(props);
        this.authenticateService = new AuthenticationService();
    }
    
    render(){
        this.authenticateService.logOff();
        return (<Redirect to="/LogIn" />);
    }
}