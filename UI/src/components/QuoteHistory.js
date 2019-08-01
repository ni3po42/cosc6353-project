import React from "react";
import { Pagination } from 'react-bootstrap'

import { Link } from 'react-router-dom';

import { GetQuotes } from "../services/QuoteService";
import { Address } from "./Address";

import { ThenableSetState } from "./Utilities";

class QuoteTable extends React.Component
{
    static Headers = [
        {field:"created", display:"Quote Date", render: val => (<span>{val}</span>)}, 
        {field:"gallonsRequested", display:"Gallons Requested", render: val => (<span>{val}</span>)}, 
        {field:"deliveryAddress", display:"Delivery Address", render: val => (<Address {...val} />)},
        {field:"deliveryDate", display:"Delivery Date", render : val => (<span>{val}</span>)},
        {field:"suggestedPrice", display:"Suggested Price", render : val => (<span>${Number(val).toFixed(2)} / gal</span>)},
        {field:"totalAmount", display:"Total Amount Due", render : val => (<span>${Number(val).toFixed(2)}</span>)}
        ];
    
    constructor(props){
        super(props);
        
        this.state = {
            page : [],
            pageSize :  5,
            pageCount : 0,
            currentPage : 1
        };
        
        this.promiseSetState = ThenableSetState(this);
    }
    
    async componentDidMount() {
        await GetQuotes({pageSize : this.state.pageSize, currentPage : this.state.currentPage})
            .then(response=> this.promiseSetState(response));
    }

    handleClick = async (delta, gotoPage) => {
         let newPage = gotoPage === undefined ? this.state.currentPage + delta : gotoPage;
        
        const newQuery = {pageSize : this.state.pageSize, currentPage : this.state.currentPage};
        
         if (newPage > this.state.pageCount || newPage < 1){
             return newQuery;
         }
        
        newQuery.currentPage = newPage;
        
        return await GetQuotes(newQuery)
            .then(response=> this.promiseSetState(response));
    }
    
    renderNoHistory = () => (
        <div>
            You have no quote history. 
            <Link to="/NewQuote">Get a quote now!</Link>
        </div>
        );
    
    gotoFirst = () => this.handleClick(0,1);
    gotoPrev = () => this.handleClick(-1);
    gotoNext = () => this.handleClick(1);
    gotoLast = () => this.handleClick(0,this.state.pageCount);
    
    renderTable = (page) => {
        
        return (<table className="table">
            <thead>
                <tr>
                    {QuoteTable.Headers.map(h=> (<th key={h.field}>{h.display}</th>))}
                </tr>
            </thead>
            <tbody>
                {page.map(quote=> (
                    <tr key={quote.created}>
                        {QuoteTable.Headers.map(h=> (<td key={quote.created +"_"+ h.field}>{h.render(quote[h.field])}</td>))}
                    </tr>
                ))}
            </tbody>
            <tfoot>
                <tr><td>
                <Pagination>
                    <Pagination.First onClick={this.gotoFirst} />
                    <Pagination.Prev onClick={this.gotoPrev}/>
                    <Pagination.Item active>{this.state.currentPage}</Pagination.Item>
                    <Pagination.Next onClick={this.gotoNext} />
                    <Pagination.Last onClick={this.gotoLast} />
                </Pagination>
                </td></tr>
            </tfoot>
        </table>);
    }
    
    render(){
        return this.state.page.length ? this.renderTable(this.state.page) : this.renderNoHistory();
    }
}


export {QuoteTable};