import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';

import { NavLink  } from 'react-router-dom';

export const NavigationBar = () => (
    <Navbar expand= "lg">
        <Navbar.Brand href="/"> FUELSTOCK.COM </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>   
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
                <Nav.Item><NavLink to="/">Home</NavLink ></Nav.Item>
                <Nav.Item><NavLink to="/Register">Register</NavLink ></Nav.Item>
                <Nav.Item><NavLink to="/Profile">Profile</NavLink ></Nav.Item>
                <Nav.Item><NavLink to="/LogIn">LogIn</NavLink ></Nav.Item>
            </Nav>
        </Navbar.Collapse> 
    </Navbar> 
)