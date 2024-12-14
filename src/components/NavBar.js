import React from 'react';
import { Navbar } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import { NavLink } from "react-router-dom";

import logo from '../assets/logo.png'
import styles from "../styles/NavBar.module.css"


const NavBar = () => {
    return (
        <Navbar className={styles.NavBar} expand="md" sticky="top">
            <Container>
                <NavLink to="/">
                    <Navbar.Brand>
                        <img className='mr-3' src={logo} alt='EcoPositive Logo' height='65' />
                        ecoPositive    
                    </Navbar.Brand>
                </NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto text-right">
                    <NavLink
                        exact
                        className={styles.NavLink}
                        activeClassName={styles.Active}
                        to="/"
                    >
                        <i className="fa-solid fa-book-open"></i>
                        Browse
                    </NavLink>
                    <NavLink
                        // exact
                        className={styles.NavLink}
                        activeClassName={styles.Active}
                        to="/signin"
                    >
                    <i className="fa-solid fa-arrow-right-to-bracket"></i>
                        Sign In
                    </NavLink>
                    <NavLink
                        // exact
                        className={styles.NavLink}
                        activeClassName={styles.Active}
                        to="/signup"
                    >
                    <i className="fas fa-user-plus"></i>
                        Sign Up
                    </NavLink>
                    </Nav>
                    
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar