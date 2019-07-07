import { GenericInputChange } from "../components/Utilities";

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
});