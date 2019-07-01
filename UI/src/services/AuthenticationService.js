import { Injections } from '../components/IoC.js';

class AuthenticationService
{
    constructor(logger){
        this.logger = logger;
    }
    
    authenticate(){
        this.logger('hello world');
    }
}

AuthenticationService[Injections] = ['logger'];

export default AuthenticationService;