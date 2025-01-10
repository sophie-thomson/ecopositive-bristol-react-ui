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
import { useEffect } from 'react';
import { axiosReq } from '../api/axiosDefaults';
import { useState } from 'react';
import { removeTokenTimestamp } from "../utils/utils";
import { toast } from 'react-toastify';



const NavBar = () => {
    const currentUser = useCurrentUser();
    const setCurrentUser = useSetCurrentUser();
    const id = currentUser?.profile_id;

    const [profileData, setProfileData] = useState([]);
    const profile = profileData.data;
    const is_admin = profile?.is_staff === true;
    

    useEffect(() => {
        if (!id) return;
        const fetchData = async () => {
            try {
                const profileData = await axiosReq.get(`/profiles/${id}/`)
                setProfileData(profileData);
            } catch (err) {}
        }
        fetchData();
        
    }, [id, setProfileData]);
    

    const { expanded, setExpanded, ref } = useClickOutsideToggle();

    const handleSignOut = async () => {
        try {
          await axios.post("dj-rest-auth/logout/");
          setCurrentUser(null);
          removeTokenTimestamp();
        } catch (err) {
          toast.error("Oh dear, there was a problem while logging you out. Please try refreshing the page.");
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
                id="myProfileAvatar"
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