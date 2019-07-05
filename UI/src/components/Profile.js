import React, { Component } from "react";

import { ValidateAll } from "common/validations/core";
import {States, Validations } from "common/validations/profile"

import {GetProfile, UpdateProfile} from "../services/ProfileService";
import { GetAccount } from '../services/AuthenticationService.js';

export class Profile extends Component {
    
    constructor(props) {
        super(props);
        
        const fields = {
            fullName: "",
            address1: "",
            address2: "",
            city: "",
            state: "",
            zip: ""
        };
        
        this.state = {
            id : "",
            ...fields,
            formErrors: {
                ...fields
            },
            profileDirty : false,
            updated : false,
            updateError : ""
        };
    }

    componentDidMount() {
        GetAccount()
            .then(account=> GetProfile(account.id))
            .then(profile => {
                const { accountId, ...data } = profile;
                this.setState({...data});
            });
    }
    
    handleSubmit = (e) => {
        e.preventDefault();
        
        var errorMessages = ValidateAll(this.state, Validations);
        if (errorMessages) {
            this.setState({formErrors : errorMessages});
        } else {
            
            GetAccount()
                .then(account => UpdateProfile(account.id, this.state))
                .then(()=> {
                    this.setState({profileDirty : false, updated : true});
                })
                .catch(e => this.setState({updateError : e}));
        }
    };

    handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        let formErrors = this.state.formErrors;
        const message = Validations[name](value);
        
        if (message){
            formErrors[name] = message;
        }else{
            delete formErrors[name];
        }
        
        this.setState({ formErrors, [name]: value, profileDirty : true, updated : false });
    };


    render() {

        const { formErrors } = this.state;
        return (
            <div className="Wrapper">
                <div className="form-wrapper">
                    <h1>Account Information</h1>
                    <form onSubmit={this.handleSubmit} noValidate>
                       
                        <div className="formField wide">
                            <label htmlFor="fullName">Full Name</label>
                            <input
                                className={formErrors.fullName ? "error" : null}
                                placeholder="Full Name"
                                type="text"
                                name="fullName"
                                value={this.state.fullName}
                                noValidate
                                onChange={this.handleChange} />

                            {formErrors.fullName && (
                                <span className="errorMessage">{formErrors.fullName}</span>
                            )}
                        </div>
                       
                        <div className="formField wide">
                            <label htmlFor="address1">Address Line 1</label>
                            <input
                                className={formErrors.address1 ? "error" : null}
                                placeholder="Address"
                                type="text"
                                name="address1"
                                value={this.state.address1}
                                noValidate
                                onChange={this.handleChange} />

                            {formErrors.address1 && (
                                <span className="errorMessage">{formErrors.address1}</span>
                            )}
                        </div>
                        
                        <div className="formField wide">
                            <label htmlFor="address2">Address Line 2</label>
                            <input
                                className={formErrors.address2 ? "error" : null}
                                placeholder="(optional)"
                                type="text"
                                name="address2"
                                value={this.state.address2}
                                noValidate
                                onChange={this.handleChange} />

                            {formErrors.address2 && (
                                <span className="errorMessage">{formErrors.address2}</span>
                            )}
                        </div>
                        
                        <div className="formField wide">
                            <label htmlFor="city">City</label>
                            <input
                                className={formErrors.city ? "error" : null}
                                placeholder="City"
                                type="text"
                                name="city"
                                value={this.state.city}
                                noValidate
                                onChange={this.handleChange} />

                            {formErrors.city && (
                                <span className="errorMessage">{formErrors.city}</span>
                            )}
                        </div>
                        
                        <div className="formField wide">
                            <label htmlFor="state">State</label>
                            <select
                              className={formErrors.state ? "error" : null}
                                type="text"
                                name="state"
                                noValidate
                                onChange={this.handleChange}>
                                {
                                    States.map(state=> (
                                        <option value={state} selected={this.state.state == state && "selected"}>{state}</option>
                                    ))
                                }
                               
                            </select>
                           
                            {formErrors.state && (
                                <span className="errorMessage">{formErrors.state}</span>
                            )}
                        </div>
                        
                        <div className="formField wide">
                            <label htmlFor="zip">Zip</label>
                            <input
                                className={formErrors.zip ? "error" : null}
                                placeholder="Zip"
                                type="text"
                                name="zip"
                                value={this.state.zip}
                                noValidate
                                onChange={this.handleChange} />

                            {formErrors.zip && (
                                <span className="errorMessage">{formErrors.zip}</span>
                            )}

                        </div>
                        {this.state.updateError && (
                                <div className="errorMessage">{this.state.updateError}</div>
                            )}
                        {this.state.updated && (
                            <div>Updated!</div>
                        )}
                        <div>
                            <button type="submit" disabled={!this.state.profileDirty}>Update Account</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
