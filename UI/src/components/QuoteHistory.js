import React from "react";
import { Pagination } from 'react-bootstrap'

import { Link } from 'react-router-dom';

import { GetQuotes } from "../services/QuoteService";
import { Address } from "./Address";

import { ThenableSetState } from "./Utilities";

class QuoteTable extends React.Component
{
    static Headers = [
        {field:"id", display:"Quote Id", render: val => (<span>{val}</span>)}, 
        {field:"gallonsRequested", display:"Gallons Requested", render: val => (<span>{val}</span>)}, 
        {field:"deliveryAddress", display:"Delivery Address", render: val => (<Address {...val} />)},
        {field:"deliveryDate", display:"Delivery Date", render : val => (<span>{val}</span>)},
        {field:"suggestedPrice", display:"Suggested Price", render : val => (<span>${val}</span>)},
        {field:"totalAmount", display:"Total Amount Due", render : val => (<span>${val}</span>)}
        ];
    
    constructor(props){
        super(props);
        
        this.state = {
            page : [],
            numberOfPages : 0,
            pageSize :  5,
            pageCount : 0,
            currentPage : 0
        };
        
        this.promiseSetState = ThenableSetState(this);
    }
    
    componentDidMount() {
        GetQuotes({...this.state})
            .then(response=> this.promiseSetState(response));
    }

    handleClick = (delta, gotoPage) => {
         let newPage = gotoPage || this.state.currentPage + delta;
        
         if (newPage > this.state.pageCount || newPage < 1){
             return;
         }
        
        const newQuery = {...this.state};
        newQuery.currentPage = newPage;
        
        return GetQuotes(newQuery)
            .then(response=> this.promiseSetState(response));
    }
    
    renderNoHistory = () => (
        <div>
            You have no quote history. 
            <Link to="/NewQuote">Get a quote now!</Link>
        </div>
        );
    
    renderTable = (page) => {
        
        return (<table className="table">
            <thead>
                <tr>
                    {QuoteTable.Headers.map(h=> (<th key={h.field}>{h.display}</th>))}
                </tr>
            </thead>
            <tbody>
                {page.map(quote=> (
                    <tr key={quote.id}>
                        {QuoteTable.Headers.map(h=> (<td key={quote.id +"_"+ h.field}>{h.render(quote[h.field])}</td>))}
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
        </table>);
    }
    
    render(){
        return this.state.numberOfPages ? this.renderTable(this.state.page) : this.renderNoHistory();
    }
}


export {QuoteTable};