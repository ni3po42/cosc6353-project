import React, { Component } from "react";
import { Route, Redirect } from 'react-router-dom';

import AuthenticationService from '../services/AuthenticationService.js';

export class ProtectedRoute extends React.Component
{
    constructor(props){
        super(props);
        
        this.authenticateService = new AuthenticationService();
    }
    
    render(){
        if (!this.authenticateService.isAuthenticated()){
            return (<Redirect to={this.props.redirectTo} />);
        }
        
        const { redirectTo, ...theRest } = this.props;
        return (<Route {...theRest}/>);
    }
}