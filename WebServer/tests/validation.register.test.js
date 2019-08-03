import { Validations } from "common/validations/register";

describe("register validation test", ()=>{
    
    it("email", ()=>{
        
        expect(Validations.email(null)).toBeTruthy();
        expect(Validations.email('')).toBeTruthy();
        
        expect(Validations.email('username')).toBeTruthy();
        expect(Validations.email('username@')).toBeTruthy();
        
      expect(Validations.email('@username@sub.host.com')).toBeTruthy();
      
      
      expect(Validations.email('username@host')).toBeFalsy();
      expect(Validations.email('username@host.com')).toBeFalsy();
      expect(Validations.email('username@sub.host.com')).toBeFalsy();
      
    });
    
    it("password", ()=>{
        expect(Validations.password(null)).toBeTruthy();
       
       expect(Validations.password('')).toBeTruthy();
       expect(Validations.password('p')).toBeTruthy();
       expect(Validations.password('pa')).toBeTruthy();
       expect(Validations.password('pas')).toBeTruthy();
       expect(Validations.password('pass')).toBeTruthy();
       expect(Validations.password('passw')).toBeTruthy();
       
       expect(Validations.password("a".padStart(101, 'a'))).toBeTruthy();
       
       expect(Validations.password('IamHilariousAndYouWillQuoteEverythingISay')).toBeFalsy();
    });
    
    
    it("password confirm", ()=>{
        
        var fields = { password : 'myPassword' };
        
        expect(Validations.passwordConfirm('different', fields)).toBeTruthy();
        expect(Validations.passwordConfirm(null, fields)).toBeTruthy();
        expect(Validations.passwordConfirm(undefined, fields)).toBeTruthy();
        expect(Validations.passwordConfirm('', fields)).toBeTruthy();
        
        expect(Validations.passwordConfirm('myPassword', fields)).toBeFalsy();
       
    });
    
});