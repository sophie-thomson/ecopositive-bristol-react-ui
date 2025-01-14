import React from 'react';
import { Navbar } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import { NavLink } from "react-router-dom";
import { useCurrentUser } from '../contexts/CurrentUserContext';
import styles from "../styles/AddCompany.module.css"
import { Link } from 'react-router-dom';

const AddCompany = () => {
    const currentUser = useCurrentUser();

    const addCompanyIcon = (
        <Nav>
            <NavLink
                className={styles.NavLink}
                activeClassName={styles.ActiveLink}
                to="/companies/create"
            >
                <i className="fa-solid fa-building-user" />
                Add My Company  
            </NavLink>
        </Nav>
    );

    return (
        <Navbar className={styles.AddCompanyBar} expand="md" >
            <Container>
            <Navbar.Text className="text-light d-none d-md-inline">
            Are you an ecoPositive company or business owner?
            </Navbar.Text>
            
            {currentUser ? (
                <>{addCompanyIcon}</>
            ) : (
                <span>
                    <i className="fa-solid fa-building-user" />
                    <Link className={styles.Link} to="/signin">
                        <span className={`${styles.Bold}`}>Sign in</span> to add a company
                    </Link>
                </span>
                         
            )}
            </Container>
        </Navbar>
    );
};

export default AddCompany;