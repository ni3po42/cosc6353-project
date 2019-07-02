import React, { Component } from "react";

import "../App.css";

const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  );


const formValid = ({ formErrors, ...rest }) => {
    let valid = true;
  
    Object.values(formErrors).forEach(val => {
      val.length > 0  && (valid = false);
    });
  
    Object.values(rest).forEach(val=> {
      val === null && (valid = false);
    });
  
    return valid;
  };






 export class LogIn extends Component {
        constructor(props) {
          super(props);
          this.state = {
            email: null,
            password: null,
            formErrors: {
              email: "",
              password: ""
            }
          };
      
        }
      
        handleSubmit = e => {
          e.preventDefault();
      
          if (formValid(this.state)) {
            console.log(`
              --SUBMITIING--
              Email: ${this.state.email}
              Password: ${this.state.password}
            `);
          } else {
            console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
          }
        };
      
        handleChange = e => {
          e.preventDefault();
          const { name, value } = e.target;
          let formErrors = this.state.formErrors;
      
      
          switch (name) {

            case 'email':
              formErrors.email =
                emailRegex.test(value)
                  ? ""
                  : "invalid email address";
              break;
      
            case 'password':
              formErrors.password =
                value.length < 6
                  ? "minimum 6 characters required"
                  : "";
      
              break;
            default:
              break;
          }
          this.setState({ formErrors, [name]: value }, () => console.log(this.state));
      
        };
      
      
        render() {
      
          const { formErrors } = this.state;
          return (
            <div className="Wrapper">
              <div className="form-wrapper">
                <h1>Sign In</h1>
                <form onSubmit={this.handleSubmit} noValidate>


                  <div className="email">
                    <label htmlFor="email">Email</label>
                    <input
                      className={formErrors.email.length > 0 ? "error" : null }
                      placeholder="Email"
                      type="email"
                      name="email"
                      noValidate
                      onChange={this.handleChange} />
      
                    {formErrors.email.length > 0 && (
                      <span className="errorMessage">{formErrors.email}</span>
                    )}
      
                  </div>
                  <div className="password">
                    <label htmlFor="password">Password</label>
                    <input
                      className={formErrors.password.length > 0 ? "error" : null }
                      placeholder="Password"
                      type="password"
                      name="password"
                      noValidate
                      onChange={this.handleChange} />
      
                      {formErrors.password.length > 0 && (
                        <span className="errorMessage">{formErrors.password}</span>
                      )}
      
                    
                  </div>
                  <div className="Sign In">
                    <button type="submit">Sign In</button>

                    <a href="http://localhost:3000/Register" class="btn btn-link" role="button">Don't have an Account?</a>


      
      
                  </div>


                </form>
              </div>
            </div>
          );
        }
      }  
      
      
     


 
