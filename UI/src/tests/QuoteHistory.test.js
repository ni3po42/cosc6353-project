import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';

import { BrowserRouter as Router } from 'react-router-dom';

import { QuoteTable } from '../components/QuoteHistory';

import { GetQuotes } from '../services/QuoteService.js';
import { Pagination } from 'react-bootstrap'
import { Link } from 'react-router-dom';

jest.mock('../services/QuoteService.js', () => ({GetQuotes: jest.fn()}));

const createComp = (props) => {
    const component = mount(<Router><QuoteTable {...props} /></Router>);
    return component.find(QuoteTable);
}

describe("QuoteHistory Component tests", ()=>{

    beforeEach(() => {
      // Clear all instances and calls to constructor and all methods:
      GetQuotes.mockClear();
    });

    it('renders without crashing', async () => {
        const div = document.createElement('div');
        
        const getquoteAwait = GetQuotes.mockResolvedValue({ 
            page : [{id: "1"}],
            pageSize :  1,
            pageCount : 1,
            currentPage : 1
        });
        
        ReactDOM.render(<Router><QuoteTable /></Router>, div);
        
        expect(GetQuotes).toHaveBeenCalled();
        
        await getquoteAwait();
        ReactDOM.unmountComponentAtNode(div);
    });
    
     it('updates state on mount', async () => {
       //arrange
       const response = { 
            page : [{id: "2"}],
            pageSize :  1,
            pageCount : 3,
            currentPage : 2
          };
       const quoateAwait = GetQuotes.mockResolvedValue(response);
       const component = createComp({});
       const instance = component.instance();
       jest.spyOn(instance, "setState");
       
       //act
        await quoateAwait();
        
        //assert
        expect(instance.setState).toHaveBeenCalled();
        expect(instance.setState.mock.calls[0][0]).toMatchObject(response);
    });
    
    it('can go to the first page', async ()=>{
        //arrange
       const response = { 
            page : [{id: "2"}],
            pageSize :  1,
            pageCount : 3,
            currentPage : 2
          };
       const quoateAwait = GetQuotes.mockResolvedValue(response);
       const component = createComp({});
       const instance = component.instance();
       jest.spyOn(instance, "handleClick");
       
       //act
        await quoateAwait();
        instance.gotoFirst();
        
        //assert
        expect(instance.handleClick).toHaveBeenCalledWith(0,1);
    });
    
    it('can go to the prev page', async ()=>{
         //arrange
       const response = { 
            page : [{id: "2"}],
            pageSize :  1,
            pageCount : 3,
            currentPage : 2
          };
       const quoateAwait = GetQuotes.mockResolvedValue(response);
       const component = createComp({});
       const instance = component.instance();
       jest.spyOn(instance, "handleClick");
       
       //act
        await quoateAwait();
        instance.gotoPrev();
        
        //assert
        expect(instance.handleClick).toHaveBeenCalledWith(-1);
    });
    
    it('can go to the next page', async ()=>{
          //arrange
       const response = { 
            page : [{id: "2"}],
            pageSize :  1,
            pageCount : 3,
            currentPage : 2
          };
       const quoateAwait = GetQuotes.mockResolvedValue(response);
       const component = createComp({});
       const instance = component.instance();
       jest.spyOn(instance, "handleClick");
       
       //act
        await quoateAwait();
        instance.gotoNext();
        
        //assert
        expect(instance.handleClick).toHaveBeenCalledWith(1);
    });
    
    it('can go to the last page', async ()=>{
         //arrange
       const response = { 
            page : [{id: "2"}],
            pageSize :  1,
            pageCount : 3,
            currentPage : 2
          };
       const quoateAwait = GetQuotes.mockResolvedValue(response);
       const component = createComp({});
       const instance = component.instance();
       jest.spyOn(instance, "handleClick");
       
       //act
        await quoateAwait();
        instance.gotoLast();
        
        //assert
        expect(instance.handleClick).toHaveBeenCalledWith(0,response.pageCount);
    });
    
    it('can alter page state when clicking', async ()=> {
        //arrange
       const response = { 
            page : [{id: "2"}],
            pageSize :  1,
            pageCount : 3
          };
       let quoateAwait = GetQuotes.mockResolvedValue({...response, currentPage : 2});
                            
       const component = createComp({});
       const instance = component.instance();
       jest.spyOn(instance, "handleClick");
       await quoateAwait();
       
       //act
       expect(component.state().currentPage).toBe(2);
       
       GetQuotes.mockClear();
       await GetQuotes.mockResolvedValue({...response, currentPage : 1});
       let s = await instance.handleClick(0,1);
       expect(s.currentPage).toBe(1);
       expect(GetQuotes.mock.calls[0][0]).toMatchObject({...response, currentPage : 1})
        
        GetQuotes.mockClear();
       await GetQuotes.mockResolvedValue({...response, currentPage : 2});
        s = await instance.handleClick(1);
        expect(s.currentPage).toBe(2);
        expect(GetQuotes.mock.calls[0][0]).toMatchObject({...response, currentPage : 2})
        
        GetQuotes.mockClear();
       await GetQuotes.mockResolvedValue({...response, currentPage : 3});
        s = await instance.handleClick(0,3);
        expect(s.currentPage).toBe(3);
        expect(GetQuotes.mock.calls[0][0]).toMatchObject({...response, currentPage : 3})
        
        GetQuotes.mockClear();
       await GetQuotes.mockResolvedValue({...response, currentPage : 2});
        s = await instance.handleClick(-1);
        expect(s.currentPage).toBe(2);
        expect(GetQuotes.mock.calls[0][0]).toMatchObject({...response, currentPage : 2})
        
    });
    
    
    it('cant move beyond page boundaries', async ()=> {
        //arrange
       const response = { 
            page : [{id: "2"}],
            pageSize :  1,
            pageCount : 1
          };
       let quoateAwait = GetQuotes.mockResolvedValue({...response, currentPage : 1});
                            
       const component = createComp({});
       const instance = component.instance();
       jest.spyOn(instance, "handleClick");
       await quoateAwait();
       
       //act
       expect(component.state().currentPage).toBe(1);
       
       GetQuotes.mockClear();
       
       await instance.handleClick(0,0);
       expect(GetQuotes).not.toHaveBeenCalled();
       await instance.handleClick(0,2);
       expect(GetQuotes).not.toHaveBeenCalled();
       await instance.handleClick(-1);
       expect(GetQuotes).not.toHaveBeenCalled();
       await instance.handleClick(1);
       expect(GetQuotes).not.toHaveBeenCalled();
        
    });
});