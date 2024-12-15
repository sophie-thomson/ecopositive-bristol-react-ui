import React from 'react';
import { Navbar } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import { NavLink } from "react-router-dom";
import axios from 'axios';

import logo from '../assets/logo.png'
import styles from "../styles/NavBar.module.css"
import { useCurrentUser, useSetCurrentUser } from '../contexts/CurrentUserContext';
import Avatar from "./Avatar";
import useClickOutsideToggle from "../hooks/useClickOutsideToggle";


const NavBar = () => {
    const currentUser = useCurrentUser();
    const setCurrentUser = useSetCurrentUser();

    const { expanded, setExpanded, ref } = useClickOutsideToggle();

    const handleSignOut = async () => {
        try {
          await axios.post("dj-rest-auth/logout/");
          setCurrentUser(null);
        } catch (err) {
          console.log(err);
        }
      };

    const loggedInIcons = (
    <>
        <NavLink
                className={styles.NavLink}
                activeClassName={styles.Active}
                to="/signin"
                onClick={handleSignOut}
            >
                <i className="fa-solid fa-arrow-right-to-bracket"></i>
                Sign Out
        </NavLink>
        <NavLink
        className={styles.NavLink}
        to={`/profiles/${currentUser?.profile_id}`}
      >
        <Avatar
            src={currentUser?.profile_image}
            text="My Profile"
            height={40}
        />
      </NavLink>

    </>
    );

    const loggedOutIcons = (
        <>
            <NavLink
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
        </>
    );

    return (
        <Navbar
            expanded={expanded}
            className={styles.NavBar}
            expand="md"
            sticky="top"
        >
            <Container>
                <NavLink to="/">
                    <Navbar.Brand>
                        <img className='mr-3' src={logo} alt='EcoPositive Logo' height='65' />
                        ecoPositive    
                    </Navbar.Brand>
                </NavLink>
                <Navbar.Toggle 
                    ref={ref}
                    onClick={() => setExpanded(!expanded)}
                    aria-controls="basic-navbar-nav"
                />
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
                    {currentUser ? loggedInIcons : loggedOutIcons}
                    </Nav>
                    
                </Navbar.Collapse>
                
                
            </Container>
            
        </Navbar>
    );
};

export default NavBar