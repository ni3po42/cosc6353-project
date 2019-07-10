import React from "react";
import { Route, Redirect } from 'react-router-dom';

import { IsAuthenticated } from '../services/AuthenticationService.js';

export class ProtectedRoute extends React.Component
{
    renderRedirect = (to) =>{
        return (<Redirect to={to} />);
    }
    
    renderRoute = (params) => {
        return (<Route {...params}/>);
    }
    
    render(){
        if (!IsAuthenticated()){
            return this.renderRedirect(this.props.redirectTo);
        }
        
        const { redirectTo, ...theRest } = this.props;
        return this.renderRoute(theRest);
    }
}