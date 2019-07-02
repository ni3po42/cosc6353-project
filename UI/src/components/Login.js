import React from 'react';
import Logger from '../services/Logger.js';
import AuthenticationService from '../services/AuthenticationService.js';
import { GenericInputChange } from './Utilities.js';

class Login extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            username : "",
            password : "",
            errorMessage : ""
        };
        
        this.handleInputChange = GenericInputChange(this);
        this.authenticateService = new AuthenticationService();
    }

    handleSubmit = async (event) => {
        await this.authenticateService
            .authenticate()
            .then(()=> this.goHome())
            .catch((e)=>this.loginDenied(e.error));
    }

    goHome = () =>{
        this.props.history.push('/');
    }

    loginDenied = (message) =>{
        this.setState({errorMessage : message});
    }

    render(){
        return (
            <section>
                <input 
                    type="text" 
                    name="username" 
                    value={this.state.username} 
                    onChange={this.handleInputChange} />
                <input 
                    type="password" 
                    name="password" 
                    value={this.state.password} 
                    onChange={this.handleInputChange} />
                <button onClick={this.handleSubmit}>Log in</button>
            </section>
        );
    }
    
}

export default Login;