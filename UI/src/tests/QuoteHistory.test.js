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
        
        await getquoteAwait();
        
        expect(GetQuotes).toHaveBeenCalled();
        
        ReactDOM.unmountComponentAtNode(div);
    });
    
     it('updates state on mount', async () => {
       //arrange
       const response = { 
            page : [{id: "2"}],
            numberOfPages : 1,
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
    
});