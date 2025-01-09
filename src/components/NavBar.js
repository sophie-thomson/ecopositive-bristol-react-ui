import React from 'react';
import { Col, Navbar } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import { NavLink } from "react-router-dom";
import axios from 'axios';

import logo from '../assets/logo.png'
import styles from "../styles/NavBar.module.css"
import { useCurrentUser, useSetCurrentUser } from '../contexts/CurrentUserContext';
import Avatar from "./Avatar";
import useClickOutsideToggle from "../hooks/useClickOutsideToggle";
import { useEffect } from 'react';
import { axiosReq } from '../api/axiosDefaults';
import { useState } from 'react';
import { removeTokenTimestamp } from "../utils/utils";
import Asset from './Asset';


const NavBar = () => {
    const [hasLoaded, setHasLoaded] = useState(false);
    const currentUser = useCurrentUser();
    const setCurrentUser = useSetCurrentUser();
    const id = currentUser?.profile_id;

    const [profileData, setProfileData] = useState([]);
    const profile = profileData.data;
    const is_admin = profile?.is_staff === true;
    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const profileData = await axiosReq.get(`/profiles/${id}/`)
                setProfileData(profileData);
                setHasLoaded(true);
            } catch (err) {
                console.log(err)    
            }
        }
        setHasLoaded(false);
        const timer = setTimeout(() => {
            fetchData();
            }, 1000);
        
            return () => {
                clearTimeout(timer);
            };
        
    }, [id, setProfileData]);
    

    const { expanded, setExpanded, ref } = useClickOutsideToggle();

    const handleSignOut = async () => {
        try {
          await axios.post("dj-rest-auth/logout/");
          setCurrentUser(null);
          removeTokenTimestamp();
        } catch (err) {
          console.log(err);
        }
      };

    const loggedInIcons = (
    <>
        <NavLink
            className={styles.NavLink}
            activeClassName={styles.Active}
            to={`/profiles/${currentUser?.profile_id}`}
        >
            <Avatar
                src={currentUser?.profile_image}
                height={30}
            />
            My ecoPositive
        </NavLink>
        {is_admin ? (
            <NavLink
                className={styles.NavLink}
                activeClassName={styles.Active}
                to={`/staff/`}
            >
                
                <i className="fa-solid fa-unlock-keyhole" />
                Staff Only
            </NavLink>
        ) : (null)}
        <NavLink
            className={styles.NavLink}
            activeClassName={styles.Active}
            to="/signin"
            onClick={handleSignOut}
        >
            <i className="fa-solid fa-arrow-right-to-bracket" />
            Sign Out
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
        <>
        {hasLoaded ? (
            
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
        
                ) : (
                    <Col>
                    <Asset spinner message="Loading..." />
                    </Col>
                )}
                </>
    );
};

export default NavBar