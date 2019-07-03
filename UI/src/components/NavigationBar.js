import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { LinkContainer as WithRouter } from "react-router-bootstrap";


export const NavigationBar = () => (
    <Navbar expand= "lg">
        <WithRouter to="/"><Navbar.Brand>FUELSTOCK.COM</Navbar.Brand></WithRouter>
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
                <Nav.Item><WithRouter to="/" ><Nav.Link>Home</Nav.Link></WithRouter></Nav.Item>
                <Nav.Item><WithRouter to="/LogIn" ><Nav.Link>Log In</Nav.Link></WithRouter></Nav.Item>
                <Nav.Item><WithRouter to="/Register"><Nav.Link>Register</Nav.Link></WithRouter></Nav.Item>
                <Nav.Item><WithRouter to="/Profile"><Nav.Link>Profile</Nav.Link></WithRouter></Nav.Item>
                <Nav.Item><WithRouter to="/QuoteHistory"><Nav.Link>QuoteHistory</Nav.Link></WithRouter></Nav.Item>
                <Nav.Item><WithRouter to="/LogOff"><Nav.Link>Log Off</Nav.Link></WithRouter></Nav.Item>
            </Nav>
        </Navbar.Collapse> 
    </Navbar> 
);