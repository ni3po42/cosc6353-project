import React, { Component } from "react";

const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);


const formValid = ({ formErrors, ...rest }) => {
    let valid = true;

    Object.values(formErrors).forEach(val => {
        val.length > 0 && (valid = false);
    });

    Object.values(rest).forEach(val => {
        val === null && (valid = false);
    });

    return valid;
};




export class Profile extends Component {
    
    static states = [ 'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY' ];
    
    constructor(props) {
        super(props);
        this.state = {
            firstName: null,
            lastName: null,
            email: null,
            address1: null,
            address2: null,
            city: null,
            state: null,
            zip: null,
            formErrors: {
                firstName: "",
                lastName: "",
                email: "",
                address1: "",
                address2: "",
                city: "",
                state: "",
                zip: ""
            }
        };

    }

    handleSubmit = e => {
        e.preventDefault();

        if (formValid(this.state)) {
            console.log(`
                  --SUBMITIING--
                  First Name: ${this.state.firstName}
                  Last Name: ${this.state.lastName}
                  Email: ${this.state.email}
                  Address1: ${this.state.adress1},
                  Address2: ${this.state.adress2}
                  City: ${this.state.city}
                  State: ${this.state.state}
                  Zip: ${this.state.zip}
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
            case 'firstName':
                formErrors.firstName =
                    value.length < 3
                        ? ' minimum 3 characters required'
                        : "";

                break;
            case 'lastName':
                formErrors.lastName =
                    value.length < 3
                        ? ' minimum 3 characters required'
                        : "";

                break;
            case 'email':
                formErrors.email =
                    emailRegex.test(value)
                        ? ""
                        : "invalid email address";
                break;

            case 'address1':
                formErrors.address1 =
                    value.length < 3
                        ? "minimum 3 characters required"
                        : "";

                break;
                
            case 'address2':
                formErrors.address2 =
                    value.length < 3
                        ? "minimum 3 characters required"
                        : "";

                break;
            case 'city':
                formErrors.city =
                    value.length < 3
                        ? "minimum 3 characters required"
                        : "";

                break;
            case 'state':
                formErrors.state =
                    value.length < 2
                        ? "minimum 2 characters required"
                        : "";

                break;
            case 'zip':
                formErrors.zip =
                    value.length < 5
                        ? "minimum 5 characters required"
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
                    <h1>Account Information</h1>
                    <form onSubmit={this.handleSubmit} noValidate>
                        <div className="firstName">
                            <label htmlFor="firstName">First Name</label>
                            <input
                                className={formErrors.firstName.length > 0 ? "error" : null}
                                placeholder="First Name"
                                type="text"
                                name="firstName"
                                noValidate
                                onChange={this.handleChange} />

                            {formErrors.firstName.length > 0 && (
                                <span className="errorMessage">{formErrors.firstName}</span>
                            )}

                        </div>
                        <div className="lastName">
                            <label htmlFor="lastName">Last Name</label>
                            <input
                                className={formErrors.lastName.length > 0 ? "error" : null}
                                placeholder="Last Name"
                                type="text"
                                name="lastName"
                                noValidate
                                onChange={this.handleChange} />

                            {formErrors.lastName.length > 0 && (
                                <span className="errorMessage">{formErrors.lastName}</span>
                            )}

                        </div>
                        <div className="email">
                            <label htmlFor="email">Email</label>
                            <input
                                className={formErrors.email.length > 0 ? "error" : null}
                                placeholder="Email"
                                type="email"
                                name="email"
                                noValidate
                                onChange={this.handleChange} />

                            {formErrors.email.length > 0 && (
                                <span className="errorMessage">{formErrors.email}</span>
                            )}

                        </div>
                        <div className="address1">
                            <label htmlFor="address1">Address</label>
                            <input
                                className={formErrors.address1.length > 0 ? "error" : null}
                                placeholder="Address"
                                type="text"
                                name="address1"
                                noValidate
                                onChange={this.handleChange} />

                            {formErrors.address1.length > 0 && (
                                <span className="errorMessage">{formErrors.address1}</span>
                            )}


                        </div>
                        
                        <div className="address2">
                            <label htmlFor="address2">Address (Additional)</label>
                            <input
                                className={formErrors.address2.length > 0 ? "error" : null}
                                placeholder="Address"
                                type="text"
                                name="address2"
                                noValidate
                                onChange={this.handleChange} />

                            {formErrors.address2.length > 0 && (
                                <span className="errorMessage">{formErrors.address2}</span>
                            )}


                        </div>
                        
                        <div className="city">
                            <label htmlFor="city">City</label>
                            <input
                                className={formErrors.city.length > 0 ? "error" : null}
                                placeholder="City"
                                type="text"
                                name="city"
                                noValidate
                                onChange={this.handleChange} />

                            {formErrors.city.length > 0 && (
                                <span className="errorMessage">{formErrors.city}</span>
                            )}

                        </div>
                        <div className="state">
                            <label htmlFor="state">State</label>
                            <select
                              className={formErrors.state.length > 0 ? "error" : null}
                                type="text"
                                name="state"
                                noValidate
                                onChange={this.handleChange}>
                                {
                                    Profile.states.map(state=> (
                                        <option value={state}>{state}</option>
                                    ))
                                }
                               
                            </select>
                           
                            {formErrors.state.length > 0 && (
                                <span className="errorMessage">{formErrors.state}</span>
                            )}

                        </div>
                        <div className="zip">
                            <label htmlFor="zip">Zip</label>
                            <input
                                className={formErrors.zip.length > 0 ? "error" : null}
                                placeholder="Zip"
                                type="text"
                                name="zip"
                                noValidate
                                onChange={this.handleChange} />

                            {formErrors.zip.length > 0 && (
                                <span className="errorMessage">{formErrors.zip}</span>
                            )}

                        </div>
                        <div className="updateAccount">
                            <button type="submit">Update Account</button>
                           

                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
