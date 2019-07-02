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

export { GenericInputChange };