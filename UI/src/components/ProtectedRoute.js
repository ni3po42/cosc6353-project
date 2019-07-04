import React, { Component } from "react";
import { Route, Redirect } from 'react-router-dom';

import { IsAuthenticated } from '../services/AuthenticationService.js';

export class ProtectedRoute extends React.Component
{
    constructor(props){
        super(props);
    }
    
    render(){
        if (!IsAuthenticated()){
            return (<Redirect to={this.props.redirectTo} />);
        }
        
        const { redirectTo, ...theRest } = this.props;
        return (<Route {...theRest}/>);
    }
}