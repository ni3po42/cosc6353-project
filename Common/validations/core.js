
function validateAll(fields, fieldValidators){
    let isValid = true;
    let validationMessages = {};
    for(let key in fieldValidators){
        let message = fieldValidators[key](fields[key], fields);
        if (message){
            isValid = false;
            validationMessages[key] = message;
        }
    }
    if (isValid){
        return null;
        
    }
    return validationMessages;
}

module.exports = {
    ValidateAll : validateAll
};