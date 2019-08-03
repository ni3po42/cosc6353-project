
const validations = {
        gallonsRequested : (value)=> !/^\d+(\.\d+)?$/.test(value || '') && "Must be a number.",
        deliveryDate : (value)=> isNaN(new Date(value || '')) && "Not a valid date."
    };
    
module.exports = {
  Validations : validations
};