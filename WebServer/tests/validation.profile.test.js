import { Validations } from "common/validations/profile";

describe("profile validation test", ()=>{
    
    it("fullname length", ()=>{
        
        expect(Validations.fullName(null)).toBeTruthy();
        expect(Validations.fullName("")).toBeTruthy();
        expect(Validations.fullName("a".padStart(51, 'a'))).toBeTruthy();
        
        expect(Validations.fullName("A Name")).toBeFalsy();
    });
    
    it("address1 length", ()=>{
        expect(Validations.address1(null)).toBeTruthy();
        expect(Validations.address1("")).toBeTruthy();
        expect(Validations.address1("a".padStart(101, 'a'))).toBeTruthy();
        
        expect(Validations.address1("A Name")).toBeFalsy();
    });
    
    it("address2 length", ()=>{
        
        expect(Validations.address2("a".padStart(101, 'a'))).toBeTruthy();
        
        expect(Validations.address2(null)).toBeFalsy();
        expect(Validations.address2("")).toBeFalsy();
        expect(Validations.address2("A Name")).toBeFalsy();
    });
    
    it("city length", ()=>{
        
        expect(Validations.city(null)).toBeTruthy();
        expect(Validations.city("")).toBeTruthy();
        expect(Validations.city("a".padStart(101, 'a'))).toBeTruthy();
        
        expect(Validations.city("A Name")).toBeFalsy();
        
    });
    
    it("state", ()=>{
        
        expect(Validations.state(null)).toBeTruthy();
        expect(Validations.state("")).toBeTruthy();
        
        expect(Validations.state("tx")).toBeTruthy();
        expect(Validations.state("ZZ")).toBeTruthy();
        
        
        expect(Validations.state("TX")).toBeFalsy();
    });
    
    it("zip", ()=>{
        expect(Validations.zip(null)).toBeTruthy();
        expect(Validations.zip("1")).toBeTruthy();
        expect(Validations.zip("12")).toBeTruthy();
        expect(Validations.zip("123")).toBeTruthy();
        expect(Validations.zip("1234")).toBeTruthy();
        
        expect(Validations.zip("1234-")).toBeTruthy();
        expect(Validations.zip("1234-3")).toBeTruthy();
        expect(Validations.zip("1234-45")).toBeTruthy();
        expect(Validations.zip("1234-567")).toBeTruthy();
        
        expect(Validations.zip("345n6")).toBeTruthy();
        
        expect(Validations.zip("34516-6j43")).toBeTruthy();
        
        expect(Validations.zip("51234")).toBeFalsy();
        
        expect(Validations.zip("51234-1234")).toBeFalsy();
    });
    
});