import React from 'react';
import Logger from '../services/Logger.js';
import { Authenticate } from '../services/AuthenticationService.js';

import { Link } from 'react-router-dom';
import { GenericInputChange } from './Utilities.js';

class LogIn extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            email : "",
            password : "",
            errorMessage : ""
        };
        
        this.handleInputChange = GenericInputChange(this);
    }

    handleSubmit = async (event) => {
        await Authenticate(this.state.email, this.state.password)
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
        const { errorMessage } = this.state;
        return (
            <div className="Wrapper">
                <div className="form-wrapper">
                    <h1>Sign In</h1>
                    <section>
                        <div className="email">
                            <label htmlFor="email">Email</label>
                            <input 
                                className={errorMessage ? "error" : null }
                                placeholder="Email"
                                type="email"
                                name="email" 
                                value={this.state.email} 
                                onChange={this.handleInputChange} />
                        </div>
                        <div className="password">
                            <label htmlFor="password">Password</label>
                            <input 
                                className={errorMessage ? "error" : null }
                                placeholder="Password"
                                type="password" 
                                name="password" 
                                value={this.state.password} 
                                onChange={this.handleInputChange} />
                        </div>
                        <div className="Sign In">
                            <button type="submit" onClick={this.handleSubmit}>Sign In</button>

                            {errorMessage && (
                                <span className="errorMessage">{errorMessage}</span>
                            )}
                            
                            <Link to="/Register" className="btn btn-link">Don't have an Account?</Link>
                        </div>
                    </section>
                </div>
            </div>
        );
    }
}

export { LogIn };