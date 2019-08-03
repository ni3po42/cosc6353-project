import { Validations } from "common/validations/quoteRequest";

describe("quote validation test", ()=>{
    
    it("gallonsRequested", ()=>{
        
        expect(Validations.gallonsRequested(null)).toBeTruthy();
        expect(Validations.gallonsRequested("boy")).toBeTruthy();
        
        expect(Validations.gallonsRequested("1.6")).toBeFalsy();
        expect(Validations.gallonsRequested("15")).toBeFalsy();
        expect(Validations.gallonsRequested(1500)).toBeFalsy();
        
    });
    
    it("deliveryDate", ()=>{
        expect(Validations.deliveryDate(null)).toBeTruthy();
       
       expect(Validations.deliveryDate('')).toBeTruthy();
       
       expect(Validations.deliveryDate('message')).toBeTruthy();
       
       expect(Validations.deliveryDate('2019-2-2')).toBeFalsy();
       
       expect(Validations.deliveryDate('10000')).toBeFalsy();
       
    });
    
});