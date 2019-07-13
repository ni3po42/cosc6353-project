import React, { Component } from "react";
import { Link } from 'react-router-dom';
import "../css/App.css";


import { SetErrorClass, ErrorMessageRender, ThenableSetState } from "./Utilities";

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
      
          this.renderErrorClass = SetErrorClass(this, "formErrors");
          this.renderErrorMessage = ErrorMessageRender(this);
          this.promiseSetState = ThenableSetState(this);
        }
      
    handleSubmit = async e => {
        e.preventDefault();
        var errorMessages = ValidateAll(this.state, Validations);
        if (errorMessages) {
            this.setState({formErrors : errorMessages});
            
        } else {
            await CreateNewAccount(this.state.email, this.state.password, this.state.passwordConfirm)
              .then(()=> this.promiseSetState({registered : true}))
              .catch(e=> this.promiseSetState({errorMessage : e}));
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
    
    renderLoginNotice(){
       return (
              <div className="Wrapper">
              <div className="form-wrapper">
                <h1>Account Created</h1>
                <Link to="/LogIn" className="btn btn-link">Please Log in.</Link>
                </div>
                </div>
              );
    }  
    
    renderFormErrorMessage(){
      if (this.state.errorMessage){
        return (<div className="errorMessage">{this.state.errorMessage}</div>);
      } 
    }
    
    renderForm(){
      const { formErrors } = this.state;
      return (
            <div className="Wrapper">
              <div className="form-wrapper">
                <h1>Create Account</h1>
                <section>
                  <div className="formField wide">
                    <label htmlFor="email">Email</label>
                    <input
                      className={this.renderErrorClass("email")}
                      placeholder="Email"
                      type="email"
                      name="email"
                      noValidate
                      onChange={this.handleChange} />
                    {this.renderErrorMessage(formErrors.email)}
                  </div>
                  <div className="formField wide">
                    <label htmlFor="password">Password</label>
                    <input
                      className={this.renderErrorClass("password")}
                      placeholder="Password"
                      type="password"
                      name="password"
                      noValidate
                      onChange={this.handleChange} />
                      {this.renderErrorMessage(formErrors.password)}
                  </div>
                  <div className="formField wide">
                    <label htmlFor="passwordConfirm">Confirm Password</label>
                    <input
                      className={this.renderErrorClass("passwordConfirm")}
                      placeholder="Confirm Password"
                      type="password"
                      name="passwordConfirm"
                      noValidate
                      onChange={this.handleChange} />
                      {this.renderErrorMessage(formErrors.passwordConfirm)}
                  </div>
                  <div>
                    <button type="submit" onClick={this.handleSubmit}>Create Account</button>
                    {this.renderFormErrorMessage()}
                    <Link to="/LogIn" className="btn btn-link">Already Have An Account?</Link>
                  </div>
                </section>
              </div>
            </div>
          );
    }
      
    render() {
          if (this.state.registered){
           return this.renderLoginNotice();
          }else{
            return this.renderForm();
          }
        }
      }  