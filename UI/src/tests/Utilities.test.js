import { GenericInputChange, SetErrorClass, ErrorMessageRender, ThenableSetState } from "../components/Utilities";

describe("NewQuote Component tests", ()=>{

    beforeEach(() => {
      // Clear all instances and calls to constructor and all methods:
     
    });

    it('can bind input handler to host - not checkbox', async () => {
        //arrange
        const obj = {
            setState : jest.fn()
        }
        
        //act
        const handler = GenericInputChange(obj);
        
        handler({
            target : {
                type : "text",
                value : "abc",
                name : "field"
            }
        });
        
        
        expect(handler).toBeDefined();
        expect(obj.setState).toHaveBeenCalled();
        expect(obj.setState.mock.calls[0][0]).toMatchObject({
            "field":"abc"
        });
        
    });
    
    
    it('can bind input handler to host - not checkbox', async () => {
        //arrange
        const obj = {
            setState : jest.fn()
        }
        
        //act
        const handler = GenericInputChange(obj);
        
        handler({
            target : {
                type : "checkbox",
                checked : true,
                name : "field"
            }
        });
        
        
        expect(handler).toBeDefined();
        expect(obj.setState).toHaveBeenCalled();
        expect(obj.setState.mock.calls[0][0]).toMatchObject({
            "field": true
        });
        
    });
    
    
     it('can set error class', async () => {
        //arrange
        const obj = {
            setState : jest.fn(),
            state : {
                "formErrors": { "field" : null}
            }
        }
        
        //act
        const handler = SetErrorClass(obj, "formErrors");
        
        expect(handler).toBeDefined();
        expect(handler("field")).toBeFalsy();
        obj.state.formErrors.field = "an error";
        
        expect(handler("field")).toBe("error");
        
    });
    
    it('can render error message', async () => {
        //arrange
        const obj = {
            setState : jest.fn(),
            state : {
                "formErrors": { "field" : null}
            }
        }
        
        //act
        const handler = ErrorMessageRender(obj, "formErrors");
        
        expect(handler).toBeDefined();
        expect(handler(null)).toBeFalsy();
        expect(handler(undefined)).toBeFalsy();
        
        obj.state.formErrors.field = "an error";
        
        expect(handler("field")).toBeTruthy();
        
    });
    
     it('can make setState thenable', async () => {
        //arrange
        const obj = {
            state : {
                data : 'data'
            }
        }
        
        obj.setState = (updater, callback)=> {
                obj.state = {...obj.state, ...updater};
                callback && callback();
            };
        const cb = jest.fn();
        //act
        const setState = ThenableSetState(obj, cb);
        
        expect(setState).toBeDefined();
        
       const val = await setState({test:'test'});
        expect(val).toMatchObject({
            data : 'data',
            test : 'test'
        });
        expect(cb).toHaveBeenCalled();
    });
    
});