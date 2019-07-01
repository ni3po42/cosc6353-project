const React = require('react');
const IoC = require("../components/IoC.js");

const IoCContainer = IoC.IoCContainer;
const Injections = IoC.Injections;
const InjectionKeys = IoC.InjectionKeys;

describe("IoCContainer Tests", () => {
 
  it("Should exist", () => {
    expect(IoCContainer).toBeDefined();
  });
  
  describe("Instance related Tests", ()=>{
  
    const container = new IoCContainer();
  
  
    class aClass
    {    }
  
    class bClass
    {    }
  
    class cClass
    {
      constructor(a,b){
        this.a = a;
        this.b = b;
      }
    }
    cClass[Injections] = ["a_class", "b_class"];
  
    class dClass extends React.Component
    {
    }
    dClass[Injections] = ["a_class", "b_class"];
  
    
    
  
    it("Should register a key/class and return an instance", ()=> {
      container.register({
        "key": "a_key",
        "class": aClass
      });
      
      let inst = container.resolveInstance("a_key");
      
      expect(inst).not.toBeNull();
      expect(inst instanceof aClass).toBeTruthy();
    });
  
  
   it("Should enforce a key for the resolution parameter", ()=> {
     
     expect(()=>{
      
      container.register({
        //no key
        "class": aClass
      }).toThrowError("missing key.");
       
    });
   });
   
    it("Should resolve nested dependencies", ()=> {
      container.register({
        "key": "a_class",
        "class": aClass
      });
      container.register({
        "key": "b_class",
        "class": bClass
      });
      container.register({
        "key": "c_class",
        "class": cClass
      });
      
      
      let inst = container.resolveInstance("c_class");
      
      expect(inst).not.toBeNull();
      expect(inst instanceof cClass).toBeTruthy();
      
      expect(inst.a).not.toBeNull();
      expect(inst.b).not.toBeNull();
      
      expect(inst.a instanceof aClass).toBeTruthy();
      expect(inst.b instanceof bClass).toBeTruthy();
      
    });
  
  it("Should register a singleton", ()=> {
      container.register({
        "key": "a_key",
        "class": aClass,
        "isSingleton": true
      });
      
      let inst1 = container.resolveInstance("a_key");
      let inst2 = container.resolveInstance("a_key");
      
      expect(inst1 === inst2).toBeTruthy();
    });
  
  
  it("Should register a value", ()=> {
      container.register({
        "key": "a_key",
        "value": 31415
      });
      
      let val = container.resolveInstance("a_key");
      
      expect(val).toBe(31415);
    });
    
    
    it("Should resolve injections as props of an object", ()=> {
       container.register({
        "key": "a_class",
        "class": aClass
      });
      container.register({
        "key": "b_class",
        "class": bClass
      });
      container.register({
        "key": "d_class",
        "class": dClass
      });
      
      let comp = container.inject(dClass);
      let props = comp.props;
      
      expect(props).toBeDefined();
      
      expect(props.a_class).toBeDefined();
      expect(props.b_class).toBeDefined();
      
      expect(props.a_class instanceof aClass).toBeTruthy();
      expect(props.b_class instanceof bClass).toBeTruthy();
    });
    
     it("Should resolve props of class", ()=> {
       container.register({
        "key": "a_class",
        "class": aClass
      });
      container.register({
        "key": "b_class",
        "class": bClass
      });
      container.register({
        "key": "c_class",
        "class": cClass
      });
      
      let props = container.asProps(cClass);
      
      expect(props).toBeDefined();
      
      expect(props.a_class).toBeDefined();
      expect(props.b_class).toBeDefined();
      
      expect(props.a_class instanceof aClass).toBeTruthy();
      expect(props.b_class instanceof bClass).toBeTruthy();
    });
    
  })
  
  
});