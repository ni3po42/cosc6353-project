import { IoCContainer } from './IoC.js';
import AuthenticationService from '../services/AuthenticationService.js';

const container = new IoCContainer();

container
    .register({
        "key":"authService",
        "class":AuthenticationService
    })
    .register({
        "key":"logger",
        "value": console.log
    });


export default container;