import React, { Component } from "react";
import { Pagination } from 'react-bootstrap'

import { Link } from 'react-router-dom';

import { GetQuotes } from "../services/QuoteService";
import { GetAccount } from '../services/AuthenticationService';
import { GetProfile} from "../services/ProfileService";

class QuoteTable extends React.Component
{
    static Headers = [
        {field:"id", display:"Quote Id"}, 
        {field:"gallonsRequested", display:"Gallons Requested"}, 
        {field:"deliveryAddress", display:"Delivery Address"},
        {field:"deliveryDate", display:"Delivery Date"},
        {field:"suggestedPrice", display:"Suggested Price"},
        {field:"totalAmount", display:"Total Amount Due"}
        ];
    
    constructor(props){
        super(props);
        
        this.state = {
            page : [],
            pageSize :  5,
            pageCount : 0,
            currentPage : 0
        };
    }
    
    componentDidMount() {
        GetAccount()
            .then(account => GetProfile(account.id))
            .then(profile => {
                
                return GetQuotes(profile.accountId)
                    .then(quotes=> {
                        var pageData = quotes.map(quote=> ({
                            ...quote,
                            deliveryAddress : [profile.address1, profile.address2, profile.city + " ," + profile.state + " " + profile.zip]
                        }));
                        this.setState({page : pageData});
                    });
            })
            .catch(e => console.log(e) );
    }

    handleClick = (delta, gotoPage) => {
        // let newPage = gotoPage || this.state.currentPage + delta;
        
        // if (newPage > this.state.pageCount || newPage < 1){
        //     return;
        // }
        
        
        
        // let start = this.state.pageSize * (newPage-1);
        
        // let newPageData = [];
        // for(let i = 1; i<=this.state.pageSize;i++){
        //     newPageData.push({
        //         "key": start + i,
        //         "gallonsRequested": start+i, 
        //         "deliveryAddress": i*i + " street", 
        //         "deliveryDate": new Date().toDateString(),
        //         "suggestedPrice": 0.0,
        //         "totalAmount": 0.0
        //     });
        // }
        
        // this.setState({
        //     page : newPageData,
        //     currentPage : newPage
        // })
    }
    
    render(){
        return (
            
            <section>
            
            {this.state.page.length === 0 && (
                <div>
                    You have no quote history. 
                    <Link to="/NewQuote">Get a quote now!</Link>
                </div>
            )}
                {this.state.page.length > 0 && (
                <table class="table">
                    <thead>
                        <tr>
                            {QuoteTable.Headers.map(h=> (<th key={h.field}>{h.display}</th>))}
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.page.map(quote=> (
                            <tr key={quote.key}>
                                {QuoteTable.Headers.map(h=> (<td key={h.field}>{
                                Array.isArray(quote[h.field]) ? quote[h.field].map((v)=> <div>{v}</div> ) : quote[h.field]
                                }</td>))}
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr><td>
                        <Pagination>
                            <Pagination.First onClick={()=> this.handleClick(0,1)} />
                            <Pagination.Prev onClick={()=> this.handleClick(-1)}/>
                            
                            <Pagination.Item active>{this.state.currentPage}</Pagination.Item>
                            
                            <Pagination.Next onClick={()=> this.handleClick(1)} />
                            <Pagination.Last onClick={()=> this.handleClick(0,this.state.pageCount)} />
                        </Pagination>
                        </td></tr>
                    </tfoot>
                </table>
                    
                )}
                
            </section>
            );
    }
}


export {QuoteTable};