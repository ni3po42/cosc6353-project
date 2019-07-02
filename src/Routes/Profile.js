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
    constructor(props) {
        super(props);
        this.state = {
            firstName: null,
            lastName: null,
            email: null,
            address: null,
            city: null,
            state: null,
            zip: null,
            formErrors: {
                firstName: "",
                lastName: "",
                email: "",
                address: "",
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
                  Address: ${this.state.adress}
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

            case 'address':
                formErrors.password =
                    value.length < 3
                        ? "minimum 3 characters required"
                        : "";

                break;
            case 'city':
                formErrors.password =
                    value.length < 3
                        ? "minimum 3 characters required"
                        : "";

                break;
            case 'state':
                formErrors.password =
                    value.length < 2
                        ? "minimum 2 characters required"
                        : "";

                break;
            case 'zip':
                formErrors.password =
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
                        <div className="address">
                            <label htmlFor="address">Address</label>
                            <input
                                className={formErrors.address.length > 0 ? "error" : null}
                                placeholder="Address"
                                type="address"
                                name="address"
                                noValidate
                                onChange={this.handleChange} />

                            {formErrors.address.length > 0 && (
                                <span className="errorMessage">{formErrors.address}</span>
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
                            <input
                                className={formErrors.state.length > 0 ? "error" : null}
                                placeholder="State"
                                type="text"
                                name="state"
                                noValidate
                                onChange={this.handleChange} />

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
