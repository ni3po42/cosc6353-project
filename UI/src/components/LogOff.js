import React from "react";
import { Redirect } from 'react-router-dom';

import { LogOff as logout } from '../services/AuthenticationService.js';

export class LogOff extends React.Component
{
    render(){
        logout();
        return (<Redirect to="/LogIn" />);
    }
}