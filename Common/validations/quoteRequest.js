
const validations = {
        gallonsRequested : (value)=> !/^\d+(\.\d+)?$/.test(value) && "Must be a number.",
        deliveryDate : (value)=> !value && "Not a valid date."
    };
    
module.exports = {
  Validations : validations
};