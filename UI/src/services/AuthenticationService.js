import Logger from './Logger.js';
import axios from 'axios';


const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  );

//  handleChange = e => {
//           e.preventDefault();
//           const { name, value } = e.target;
//           let formErrors = this.state.formErrors;
      
      
//           switch (name) {

//             case 'email':
//               formErrors.email =
//                 emailRegex.test(value)
//                   ? ""
//                   : "invalid email address";
//               break;
      
//             case 'password':
//               formErrors.password =
//                 value.length < 6
//                   ? "minimum 6 characters required"
//                   : "";
      
//               break;
//             default:
//               break;
//           }
//           this.setState({ formErrors, [name]: value }, () => console.log(this.state));
      
//         };

const formValid = ({ formErrors, ...rest }) => {
    let valid = true;
  
    Object.values(formErrors).forEach(val => {
      val.length > 0  && (valid = false);
    });
  
    Object.values(rest).forEach(val=> {
      val === null && (valid = false);
    });
  
    return valid;
  };

class AuthenticationService
{
    
    authenticate(email, password){
        Logger('hello world');
        return Promise.resolve({});
    }
}

export default AuthenticationService;