import React from "react";

import { ValidateAll } from "common/validations/core";
import {States, Validations } from "common/validations/profile";

import { SetErrorClass, ErrorMessageRender, ThenableSetState } from "./Utilities";

import {GetProfile, UpdateProfile} from "../services/ProfileService";

export class Profile extends React.Component {
    
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
        this.renderErrorClass = SetErrorClass(this, "formErrors");
        this.renderErrorMessage = ErrorMessageRender(this);
        this.availableStates = States;
        this.promiseSetState = ThenableSetState(this);
    }

    componentDidMount() {
        GetProfile()
            .then(profile => {
                const { accountId, ...data } = profile;
                this.setState({...data});
            });
    }
    
    handleSubmit = async (e) => {
        e.preventDefault();
        var errorMessages = ValidateAll(this.state, Validations);
        if (errorMessages) {
            this.setState({formErrors : errorMessages});
        } else {
            const {fullName, address1, address2, city, state, zip} = this.state;
            await UpdateProfile({fullName, address1, address2, city, state, zip})
                .then(()=> {
                    this.setState({profileDirty : false, updated : true});
                })
                .catch(e => this.promiseSetState({updateError : e}));
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
                                className={this.renderErrorClass("fullName")}
                                placeholder="Full Name"
                                type="text"
                                name="fullName"
                                value={this.state.fullName}
                                noValidate
                                onChange={this.handleChange} />
                            {this.renderErrorMessage(formErrors.fullName)}
                        </div>
                       
                        <div className="formField wide">
                            <label htmlFor="address1">Address Line 1</label>
                            <input
                                className={this.renderErrorClass("address1")}
                                placeholder="Address"
                                type="text"
                                name="address1"
                                value={this.state.address1}
                                noValidate
                                onChange={this.handleChange} />
                            {this.renderErrorMessage(formErrors.address1)}
                        </div>
                        
                        <div className="formField wide">
                            <label htmlFor="address2">Address Line 2</label>
                            <input
                                className={this.renderErrorClass("address2")}
                                placeholder="(optional)"
                                type="text"
                                name="address2"
                                value={this.state.address2}
                                noValidate
                                onChange={this.handleChange} />
                            {this.renderErrorMessage(formErrors.address2)}
                        </div>
                        
                        <div className="formField wide">
                            <label htmlFor="city">City</label>
                            <input
                                className={this.renderErrorClass("city")}
                                placeholder="City"
                                type="text"
                                name="city"
                                value={this.state.city}
                                noValidate
                                onChange={this.handleChange} />
                            {this.renderErrorMessage(formErrors.city)}
                        </div>
                        
                        <div className="formField wide">
                            <label htmlFor="state">State</label>
                            <select
                              className={this.renderErrorClass("state")}
                                type="text"
                                name="state"
                                value={this.state.state}
                                noValidate
                                onChange={this.handleChange}>
                                {
                                    this.availableStates.map(state=> (
                                        <option key={state} value={state}>{state}</option>
                                    ))
                                }
                               
                            </select>
                           {this.renderErrorMessage(formErrors.state)}
                        </div>
                        
                        <div className="formField wide">
                            <label htmlFor="zip">Zip</label>
                            <input
                                className={this.renderErrorClass("zip")}
                                placeholder="Zip"
                                type="text"
                                name="zip"
                                value={this.state.zip}
                                noValidate
                                onChange={this.handleChange} />
                            {this.renderErrorMessage(formErrors.zip)}
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
