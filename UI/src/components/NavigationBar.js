import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { LinkContainer as WithRouter } from "react-router-bootstrap";
import "../css/NavigationBar.scss";

import { IsAuthenticated, RegisterListener, UnregisterListener } from '../services/AuthenticationService.js';

export class NavigationBar extends React.Component {
    
    constructor(props){
        super(props);
        this.state = { authenticated : IsAuthenticated() };
        this.authStateChange = ()=> this.setState({authenticated : IsAuthenticated()});
    }
    
    componentDidMount() {
        RegisterListener(this.authStateChange);
    }

    componentWillUnmount() {
        UnregisterListener(this.authStateChange);
    }
    
    renderProtectedLinks = ()=>
        (
        <React.Fragment>
            <Nav.Item><WithRouter to="/Profile"><Nav.Link>Profile</Nav.Link></WithRouter></Nav.Item>
            <Nav.Item><WithRouter to="/NewQuote"><Nav.Link>Get Quote</Nav.Link></WithRouter></Nav.Item>
            <Nav.Item><WithRouter to="/QuoteHistory"><Nav.Link>QuoteHistory</Nav.Link></WithRouter></Nav.Item>
            <Nav.Item><WithRouter to="/LogOff"><Nav.Link>Log Off</Nav.Link></WithRouter></Nav.Item>
        </React.Fragment>
        )
    
    renderPublicLinks = ()=>
    (
        <React.Fragment>
            <Nav.Item><WithRouter to="/LogIn" ><Nav.Link>Log In</Nav.Link></WithRouter></Nav.Item>
            <Nav.Item><WithRouter to="/Register"><Nav.Link>Register</Nav.Link></WithRouter></Nav.Item>
        </React.Fragment>
    )
    
    render() {
        const links = this.state.authenticated ? this.renderProtectedLinks() : this.renderPublicLinks();
        return (
        <Navbar expand= "lg">
            <WithRouter to="/"><Navbar.Brand>FUELSTOCK.COM</Navbar.Brand></WithRouter>
            <Nav className="ml-auto">
                    <Nav.Item><WithRouter to="/" ><Nav.Link>Home</Nav.Link></WithRouter></Nav.Item>
                    {links}
                </Nav>
        </Navbar> 
        );
    }
}