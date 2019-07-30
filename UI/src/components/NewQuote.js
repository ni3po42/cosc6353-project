import React from "react";

import { Link } from 'react-router-dom';

import { Address } from "./Address";

import { CreateQuote, GetPrice} from "../services/QuoteService";
import { GetProfile} from "../services/ProfileService";

import { ValidateAll } from "common/validations/core";
import { Validations } from "common/validations/quoteRequest";

import { SetErrorClass, ErrorMessageRender } from "./Utilities";

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
            id : null,
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
        
        this.renderErrorClass = SetErrorClass(this, "formErrors");
        this.renderErrorMessage = ErrorMessageRender(this);
    }
    
    componentDidMount() {
        GetProfile()
            .then(profile => {
                const { address1, address2, city, state, zip } = profile;
                this.setState({ deliveryAddress : { address1, address2, city, state, zip}});
            });
    }
    
    handleSubmit = e => {
        e.preventDefault();
        const { name } = e.target;
        var errorMessages = ValidateAll(this.state, Validations);
        if (errorMessages) {
            this.setState({formErrors : errorMessages});
            
        } else {
            const {gallonsRequested, deliveryDate} = this.state;
            
            if (name === "getPrice"){
                GetPrice({gallonsRequested, deliveryDate})
                    .then((quote) => this.setState({suggestedPrice : quote.suggestedPrice}));
            }else if (name === "submitQuote"){
                CreateQuote({gallonsRequested, deliveryDate})
                    .then((quote) => this.setState({id : quote.id}));
            }
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
        
        this.setState({ formErrors, [name]: value, suggestedPrice: null, id:null });
    };
    
    renderSuccess = () => {
        if (this.state.id){
            return <span>Quote Submitted!</span>        
        }
    }
    
    renderSuggestedPrice = () =>
        this.state.suggestedPrice && (
            <React.Fragment>
                <div className="formField wide">
                    <span>Suggested Price: ${Number(this.state.suggestedPrice).toFixed(2)} / gal</span>
                </div>
                 <div className="formField wide">
                    <span>Total Amount Due: ${Number(this.state.suggestedPrice * this.state.gallonsRequested).toFixed(2)}</span>
                </div>
            </React.Fragment>
        );
    
   
    renderDeliveryAddress = (address) => (
        <div className="formField wide">
            <div>Delivery Address:</div>
            <Address {...address} />
        </div>
        );
    
    render(){
        const { formErrors } = this.state;
        const submitDisabled = this.state.suggestedPrice === null || this.state.id !== null;
        const getPriceDisabled = this.state.suggestedPrice !== null;
        return (
            <div className="Wrapper">
                <div className="form-wrapper">
                    <h1>Get a Quote</h1>
                    <form onSubmit={this.handleSubmit} noValidate>
                       
                        <div className="formField wide">
                            <label htmlFor="gallonsRequested">Gallons Requested</label>
                            <input
                                className={this.renderErrorClass("gallonsRequested")}
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
                                className={this.renderErrorClass("deliveryDate")}
                                type="date"
                                name="deliveryDate"
                                placeholder="mm/dd/yyyy"
                                noValidate
                                onChange={this.handleChange} />
                            {this.renderErrorMessage(formErrors.deliveryDate)}
                        </div>
                        
                        <hr />
                        
                        {this.renderSuggestedPrice()}
                        
                         <div>
                            <button name="getPrice" disabled={getPriceDisabled} onClick={this.handleSubmit}>Get Price</button>
                            <button name="submitQuote" disabled={submitDisabled} onClick={this.handleSubmit}>Submit Quote</button>
                            {this.renderSuccess()}
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