import React from 'react';
import { Navbar } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { Container } from 'react-bootstrap';

import logo from '../assets/logo.png'
import styles from "../styles/NavBar.module.css"


const NavBar = () => {
    return (
        <Navbar className={styles.NavBar} expand="md" sticky="top">
            <Container>
                <Navbar.Brand>
                    <img className='mr-3' src={logo} alt='EcoPositive Logo' height='65' />
                    ecoPositive    
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto text-right">
                    <Nav.Link>
                        <i className="fa-solid fa-book-open"></i>
                        Browse
                    </Nav.Link>
                    <Nav.Link>
                    <i className="fa-solid fa-arrow-right-to-bracket"></i>
                        Sign In
                    </Nav.Link>
                    <Nav.Link>
                    <i className="fas fa-user-plus"></i>
                        Sign Up
                    </Nav.Link>
                    </Nav>
                    
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar