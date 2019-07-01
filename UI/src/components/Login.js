import React from 'react';
import { Injections } from './IoC.js';

class Login extends React.Component {

    render(){
        
        let logger = this.props.logger;
        
        logger('i am here');
        
        return (
            <span>Try to log in.</span>
            );
        
    }
    
}

Login[Injections] = ['logger'];

export default Login;