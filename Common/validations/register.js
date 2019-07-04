const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  );


const validations = {
        email : (value)=> !emailRegex.test(value) && "Not a valid email address.",
        password : (value)=> !/.{6,100}/.test(value) && "Must be aleast 6 characters long.",
        passwordConfirm : (value, fieldValues)=> (fieldValues.password !== value) && "Must match password"
    };
    
module.exports = {
  Validations : validations
};