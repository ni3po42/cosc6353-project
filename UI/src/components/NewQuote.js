import React, { Component } from "react";

import { Link } from 'react-router-dom';

import { CreateQuote} from "../services/QuoteService";
import { GetAccount } from '../services/AuthenticationService';
import { GetProfile} from "../services/ProfileService";

import { ValidateAll } from "common/validations/core";
import { Validations } from "common/validations/quoteRequest";

export class NewQuote extends React.Component {
    
    constructor(props){
        super(props);
        
        const fields = {
            gallonsRequested: 0, 
            deliveryAddress: {
                address1: "",
                address2: "",
                city :"",
                state : "",
                zip : ""
            }, 
            deliveryDate: "",
            suggestedPrice: null,
           // totalAmount": 0.0
        };
        
        this.state = {
            ...fields,
            formErrors :
            {
                ...fields
            }
        };
        
    }
    
    componentDidMount() {
        GetAccount()
            .then(account=> GetProfile(account.id))
            .then(profile => {
                const { address1, address2, city, state, zip } = profile;
                this.setState({ deliveryAddress : { address1, address2, city, state, zip}});
            });
    }
    
    handleSubmit = e => {
        e.preventDefault();
        var errorMessages = ValidateAll(this.state, Validations);
        if (errorMessages) {
            this.setState({formErrors : errorMessages});
            
        } else {
            const {gallonsRequested, deliveryDate} = this.state;
            GetAccount()
            .then(account=> CreateQuote(account.id, {gallonsRequested, deliveryDate}))
            .then((quote) => {
                this.setState({suggestedPrice : quote.suggestedPrice});
            });
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
        
        this.setState({ formErrors, [name]: value, suggestedPrice: null });
    };
    
    render(){
        const { formErrors } = this.state;
        return (
            <div className="Wrapper">
                <div className="form-wrapper">
                    <h1>Get a Quote</h1>
                    <form onSubmit={this.handleSubmit} noValidate>
                       
                        <div>
                            <label htmlFor="gallonsRequested">Gallons Requested</label>
                            <input
                                className={formErrors.gallonsRequested ? "error" : null}
                                placeholder="0"
                                type="text"
                                name="gallonsRequested"
                                noValidate
                                onChange={this.handleChange} />

                            {formErrors.gallonsRequested && (
                                <span className="errorMessage">{formErrors.gallonsRequested}</span>
                            )}
                        </div>
                        
                        <hr />
                        
                        <div>
                            <div>Delivery Address:</div>
                            <div>{this.state.deliveryAddress.address1}</div>
                            { this.state.deliveryAddress.address2 && (
                                <div>{this.state.deliveryAddress.address1}</div>
                            )}
                            <div>{this.state.deliveryAddress.city}</div>
                            <div>{this.state.deliveryAddress.state}</div>
                            <div>{this.state.deliveryAddress.zip}</div>
                        </div>
                        
                        <hr />
                        
                        <div>
                            <label htmlFor="deliveryDate">Delivery Date</label>
                            <input
                                className={formErrors.deliveryDate ? "error" : null}
                                type="date"
                                name="deliveryDate"
                                placeholder="mm/dd/yyyy"
                                noValidate
                                onChange={this.handleChange} />

                            {formErrors.deliveryDate && (
                                <span className="errorMessage">{formErrors.deliveryDate}</span>
                            )}
                        </div>
                        
                         <div>
                            <button type="submit">Get Quote</button>
                         </div>
                         <hr />
                         
                        <div>
                            <span>Suggested Price: {this.state.suggestedPrice}</span>
                        </div>
                         <div>
                            <span>Total Amount Due: {this.state.suggestedPrice * this.state.gallonsRequested}</span>
                        </div>
                    </form>
                    
                    <div>
                        <Link to="/QuoteHistory" className="btn btn-link">View your historical quotes.</Link>
                    </div>
                    
                </div>
            </div>
            );
    }
    
}