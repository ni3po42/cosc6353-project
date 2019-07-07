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
            gallonsRequested: null, 
            deliveryAddress: {
                address1: "",
                address2: "",
                city :"",
                state : "",
                zip : ""
            }, 
            deliveryDate: "",
            suggestedPrice: null
        };
        
        this.state = {
            ...fields,
            formErrors :
            {
                gallonsRequested: null,
                deliveryDate: null
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
    
    renderSuggestedPrice = () =>
        this.state.suggestedPrice && (
            <React.Fragment>
                <div className="formField wide">
                    <span>Suggested Price: ${this.state.suggestedPrice}</span>
                </div>
                 <div className="formField wide">
                    <span>Total Amount Due: ${this.state.suggestedPrice * this.state.gallonsRequested}</span>
                </div>
            </React.Fragment>
        );
    
    renderErrorMessage = (message) => (
        message && (<span className="errorMessage">{message}</span>)
    );
    
    renderDeliveryAddress = (address) => (
        <div className="formField wide">
            <div>Delivery Address:</div>
            <div>{address.address1}</div>
            { address.address2 && (<div>{address.address2}</div>)}
            <div>{address.city}, {address.state} {address.zip}</div>
        </div>
        );
    
    render(){
        const { formErrors } = this.state;
        return (
            <div className="Wrapper">
                <div className="form-wrapper">
                    <h1>Get a Quote</h1>
                    <form onSubmit={this.handleSubmit} noValidate>
                       
                        <div className="formField wide">
                            <label htmlFor="gallonsRequested">Gallons Requested</label>
                            <input
                                className={formErrors.gallonsRequested && "error"}
                                placeholder="0"
                                type="text"
                                name="gallonsRequested"
                                noValidate
                                onChange={this.handleChange} />
                            {this.renderErrorMessage(formErrors.gallonsRequested)}
                        </div>
                        
                        <hr />
                        
                        {this.renderDeliveryAddress(this.state.deliveryAddress)}
                        
                        <hr />
                        
                        <div className="formField wide">
                            <label htmlFor="deliveryDate">Delivery Date</label>
                            <input
                                className={formErrors.deliveryDate && "error"}
                                type="date"
                                name="deliveryDate"
                                placeholder="mm/dd/yyyy"
                                noValidate
                                onChange={this.handleChange} />
                            {this.renderErrorMessage(formErrors.deliveryDate)}
                        </div>
                        
                         <div>
                            <button type="submit">Get Quote</button>
                         </div>
                         <hr />
                        
                        {this.renderSuggestedPrice()}
                    </form>
                    
                    <div>
                        <Link to="/QuoteHistory" className="btn btn-link">View your historical quotes.</Link>
                    </div>
                    
                </div>
            </div>
            );
    }
    
}