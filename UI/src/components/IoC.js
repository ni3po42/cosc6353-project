
export class Injections
{
    constructor(...keys)
    {
        this.keys = keys;
    }
}

export class IoCContainer
{
    
    register(key, concreteClass, singleton){
        
    };
    
    resolveInstance(key){
        
    };
}

//export { Injections, IoCContainer };