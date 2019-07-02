import Logger from './Logger.js';
import axios from 'axios';

class AuthenticationService
{
    
    authenticate(){
        Logger('hello world');
        return Promise.resolve({});
    }
}

export default AuthenticationService;