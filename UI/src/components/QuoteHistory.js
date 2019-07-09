import React from "react";
import { Pagination } from 'react-bootstrap'

import { Link } from 'react-router-dom';

import { GetQuotes } from "../services/QuoteService";
import { Address } from "./Address";

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
            pageSize :  5,
            pageCount : 0,
            currentPage : 0
        };
    }
    
    componentDidMount() {
        GetQuotes()
            .then(quotes=> this.setState({page : quotes}));
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
    
    renderNoHistory = () => (
        <div>
            You have no quote history. 
            <Link to="/NewQuote">Get a quote now!</Link>
        </div>
        );
    
    renderTable = (page) => {
        return (<table class="table">
            <thead>
                <tr>
                    {QuoteTable.Headers.map(h=> (<th key={h.field}>{h.display}</th>))}
                </tr>
            </thead>
            <tbody>
                {page.map(quote=> (
                    <tr key={quote.key}>
                        {QuoteTable.Headers.map(h=> (<td>{h.render(quote[h.field])}</td>))}
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
        return this.state.page.length === 0 ? this.renderNoHistory() : this.renderTable(this.state.page);
    }
}


export {QuoteTable};