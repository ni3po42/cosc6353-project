import React from 'react';

const Injections = Symbol();

class IoCContainer
{
    constructor(){
        this.resolutions = {};
        this.singletons = {};
    }
    
    register(resolutionInfo){
        
        if (!("key" in resolutionInfo)){
            throw new Error("missing key.");
        }
        
        this.resolutions[resolutionInfo["key"]] = resolutionInfo;
        
        return this;
    };
    
    inject(concreteType, otherProps){
        
        otherProps = otherProps || {};
        
        const Component = concreteType;
        
        let injections = this.asProps(concreteType);
        
        return (
            <Component {...injections} {...otherProps}  />
            );
    }
    
    asProps(concreteType){
        const thisContainer = this;
        
        let injections = (concreteType[Injections] || []).reduce((acc, key)=>{
         acc[key] = thisContainer.resolveInstance(key);
         return acc;   
        }, {});
        
        return injections
    }
    
    resolveInstance(key){
        const thisContainer = this;
        
        if (!(key in this.resolutions)){
            throw new Error("key not found.");
        }
        
        let info = this.resolutions[key];
        
        if (info.isSingleton && this.singletons[key] !== undefined){
            return this.singletons[key];
        }
        
        if (info.value !== undefined){
            return info.value;
        }
        
        let injections = (info["class"][Injections] || []).map(aKey=> thisContainer.resolveInstance(aKey));
       
        let inst = new info["class"](...injections);
        
        if (info.isSingleton){
            this.singletons[key] = inst;
        }
        
        return inst;
    };
}

export { Injections, IoCContainer};