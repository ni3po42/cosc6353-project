const states = [ 'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY' ];

const validations = {
        fullName : (value)=> !/[A-Za-z0-9 _.,!"'/$]{1,50}/.test(value) && "Full name is required (50 character Max).",
        address1 : (value)=> !/[A-Za-z0-9 _.,!"'/$]{1,100}/.test(value) && "Address is required (100 character Max).",
        address2 : (value)=> !/[A-Za-z0-9 _.,!"'/$]{0,100}/.test(value) && "Address (Additional) not valid (100 character Max).",
        city     : (value)=> !/[A-Za-z0-9 _.,!"'/$]{1,100}/.test(value) && "City is required (100 character Max).",
        state    : (value)=> states.indexOf(value) < 0 && "City is required (100 character Max).",
        zip      : (value)=> !/^[0-9]{5}(?:-[0-9]{4})?$/.test(value) && "Zip code required (XXXXX or XXXXX-XXXX)."
    };
    
module.exports = {
  States : states,
  Validations : validations
};