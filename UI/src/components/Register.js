import React, { Component } from "react";
import { Link } from 'react-router-dom';
import "../css/App.css";


import { CreateNewAccount } from '../services/AuthenticationService.js';

import { ValidateAll } from "common/validations/core";
import { Validations } from "common/validations/register";

 export class Register extends Component {
        constructor(props) {
          super(props);
          
          const fields = {
            email : "",
            password: "",
            passwordConfirm : ""
          };
          
          this.state = {
            ...fields,
            formErrors: {
              ...fields
            },
            registered : false,
            errorMessage : null
          };
      
        }
      
    handleSubmit = e => {
        e.preventDefault();
        var errorMessages = ValidateAll(this.state, Validations);
        if (errorMessages) {
            this.setState({formErrors : errorMessages});
            
        } else {
            CreateNewAccount(this.state.email, this.state.password)
              .then(()=> this.setState({registered : true}))
              .catch(e=> this.setState({errorMessage : e}));
        }
    };
      
    handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        let formErrors = this.state.formErrors;
        const message = Validations[name](value, this.state);
        
        if (message){
            formErrors[name] = message;
        }else{
            delete formErrors[name];
        }
        
        this.setState({ formErrors, [name]: value });
    };
      
      
        render() {
      
          const { formErrors } = this.state;
          
          if (this.state.registered){
            return (
              <div className="Wrapper">
              <div className="form-wrapper">
                <h1>Account Created</h1>
                <Link to="/LogIn" className="btn btn-link">Please Log in.</Link>
                </div>
                </div>
              );
          }
          
          return (
            <div className="Wrapper">
              <div className="form-wrapper">
                <h1>Create Account</h1>
                <section>
                 
                  <div className="formField wide">
                    <label htmlFor="email">Email</label>
                    <input
                      className={formErrors.email ? "error" : null }
                      placeholder="Email"
                      type="email"
                      name="email"
                      noValidate
                      onChange={this.handleChange} />
      
                    {formErrors.email && (
                      <span className="errorMessage">{formErrors.email}</span>
                    )}
      
                  </div>
                  <div className="formField wide">
                    <label htmlFor="password">Password</label>
                    <input
                      className={formErrors.password ? "error" : null }
                      placeholder="Password"
                      type="password"
                      name="password"
                      noValidate
                      onChange={this.handleChange} />
      
                      {formErrors.password && (
                        <span className="errorMessage">{formErrors.password}</span>
                      )}
      
                    
                  </div>
                  
                  <div className="formField wide">
                    <label htmlFor="passwordConfirm">Confirm Password</label>
                    <input
                      className={formErrors.passwordConfirm ? "error" : null }
                      placeholder="Confirm Password"
                      type="password"
                      name="passwordConfirm"
                      noValidate
                      onChange={this.handleChange} />
      
                      {formErrors.passwordConfirm && (
                        <span className="errorMessage">{formErrors.passwordConfirm}</span>
                      )}
      
                    
                  </div>
                  
                  <div>
                    <button type="submit" onClick={this.handleSubmit}>Create Account</button>
                    {this.state.errorMessage && (
                        <div className="errorMessage">{this.state.errorMessage}</div>
                      )}
                    <Link to="/LogIn" className="btn btn-link">Already Have An Account?</Link>
                  </div>
                </section>
              </div>
            </div>
          );
        }
      }  
      
      
     


 
