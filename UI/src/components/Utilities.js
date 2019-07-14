import React from "react";

function GenericInputChange(thisObj){
    
    const func = function(event){
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        
        this.setState({
          [name]: value
        });
    };
    
    return func.bind(thisObj);
}

function SetErrorClass(thisObj, errorStateProperty){
    
    const func = function(field){
        return this.state[errorStateProperty][field] && "error";
    };
    
    return func.bind(thisObj);
}

function ErrorMessageRender(thisObj){
    const func = function(message){
        return message && (<span className="errorMessage">{message}</span>)
    };
    
    return func.bind(thisObj);
}

function ThenableSetState(thisObj, stateSetCallback){
    const func = function(updater){
        const t = this;
        return new Promise(resolve => {
            t.setState(updater, ()=> {
                resolve(t.state);
                stateSetCallback && stateSetCallback(t.state);
            });
        });
    }
    return func.bind(thisObj);
}

export { GenericInputChange, SetErrorClass, ErrorMessageRender, ThenableSetState };