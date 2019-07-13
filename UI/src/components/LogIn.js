import React from 'react';
import { Authenticate } from '../services/AuthenticationService.js';


import {GetProfile} from "../services/ProfileService";

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
            .then(() => 
                GetProfile()
                    .then(()=> this.goHome())
                    .catch(()=> this.updateProfile())
            )
            .catch((e)=>this.loginDenied(e));
    }

    goHome = () =>{
        this.props.history.push('/');
    }

    updateProfile = () =>{
        this.props.history.push('/Profile');
    }

    loginDenied = (message) =>{
        this.setState({errorMessage : message && message.toString()});
    }

    render(){
        const { errorMessage } = this.state;
        
        return (
            <div className="Wrapper">
                <div className="form-wrapper">
                    <h1>Sign In</h1>
                    <section>
                        <div className="formField wide">
                            <label htmlFor="email">Email</label>
                            <input 
                                className={errorMessage ? "error" : null }
                                placeholder="Email"
                                type="email"
                                name="email" 
                                value={this.state.email} 
                                onChange={this.handleInputChange} />
                        </div>
                        <div className="formField wide">
                            <label htmlFor="password">Password</label>
                            <input 
                                className={errorMessage ? "error" : null }
                                placeholder="Password"
                                type="password" 
                                name="password" 
                                value={this.state.password} 
                                onChange={this.handleInputChange} />
                        </div>
                        {errorMessage && (
                                <div className="errorMessage">{errorMessage}</div>
                            )}
                        <div>
                            <button type="submit" onClick={this.handleSubmit}>Sign In</button>

                            <Link to="/Register" className="btn btn-link">Don't have an Account?</Link>
                        </div>
                    </section>
                </div>
            </div>
        );
    }
}

export { LogIn };