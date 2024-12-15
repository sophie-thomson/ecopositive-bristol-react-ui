import React from 'react';
import { Navbar } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import { NavLink } from "react-router-dom";
import { useCurrentUser } from '../contexts/CurrentUserContext';
import styles from "../styles/AddCompany.module.css"

const AddCompany = () => {
    const currentUser = useCurrentUser;

    const addCompanyIcon = (
        <Nav>
            <NavLink
                className={styles.NavLink}
                activeClassName={styles.Active}
                to="/companies/create"
            >
                <i className="fa-solid fa-building-user"></i>
                Add My Company  
            </NavLink>
        </Nav>
    );

    return (
        <Navbar className={styles.AddCompanyBar} expand="md" >
            <Container>
            <Navbar.Text className={styles.AddCompanyText}>
            Are you an ecoPositive company or business owner?
            </Navbar.Text>
            <>{currentUser && addCompanyIcon}</>
            </Container>
        </Navbar>
    );
};

export default AddCompany