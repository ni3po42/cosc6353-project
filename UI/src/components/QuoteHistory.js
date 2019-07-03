import React, { Component } from "react";
import { Pagination } from 'react-bootstrap'

class QuoteTable extends React.Component
{
    static Headers = [{field:"header1", display:"Header 1"}, {field:"header2", display:"Header 2"}, {field:"header3", display:"Header 3"}];
    
    constructor(props){
        super(props);
        
        let start = 0;
        let newPageData = [];
        for(let i = 1; i<=5;i++){
            newPageData.push({
                "key": start + i,"header1": start+i, "header2": "test2", "header3": "test3"
            });
        }
        
        this.state = {
            page : newPageData,
            pageSize :  5,
            pageCount : 10,
            currentPage : 1
        };
    }
    
    componentDidMount() {
        
    }

    handleClick = (delta, gotoPage) => {
        let newPage = gotoPage || this.state.currentPage + delta;
        
        if (newPage > this.state.pageCount || newPage < 1){
            return;
        }
        
        
        
        let start = this.state.pageSize * (newPage-1);
        
        let newPageData = [];
        for(let i = 1; i<=this.state.pageSize;i++){
            newPageData.push({
                "key": start + i,"header1": start+i, "header2": "test2", "header3": "test3"
            });
        }
        
        this.setState({
            page : newPageData,
            currentPage : newPage
        })
    }
    
    render(){
        return (
            
            <section>
            
                {this.state.page.length > 0 && (
                <table>
                    <thead>
                        <tr>
                            {QuoteTable.Headers.map(h=> (<th key={h.field}>{h.display}</th>))}
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.page.map(quote=> (
                            <tr key={quote.key}>
                                {QuoteTable.Headers.map(h=> (<td key={h.field}>{quote[h.field]}</td>))}
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