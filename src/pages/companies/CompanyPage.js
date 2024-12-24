import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router";


import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import styles from "../../styles/CompanyPage.module.css"
import btnStyles from "../../styles/Button.module.css";
import { axiosReq } from "../../api/axiosDefaults";
import Company from "./Company";
import CredentialSelectForm from "../credentials/CredentialSelectForm";
import Credentials from "../credentials/Credentials";
import { useCurrentUser } from "../../contexts/CurrentUserContext";


function CompanyPage() {
    
    const { id } = useParams();
    const [companyOwner, setCompanyOwner] = useState("");
    const [company, setCompany] = useState({ results: [] });
    const [showForm, setShowForm] = useState(false);
  

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === companyOwner;

    // const profile_image = currentUser?.profile_image;

     // Code adapted from Stack Overflow thread
    const displayForm = (event) => {
        event.preventDefault();
        setShowForm(prevState => !prevState);
    }

    useEffect(() => {
        const fetchCompanyOwner = async () => {
            try {
                const companyData = await axiosReq.get(`/companies/${id}/`);
                const companyOwner = (companyData.data.owner);
                setCompanyOwner(companyOwner);
            } catch (err) {
                console.log(err);
            }
        };

        fetchCompanyOwner();
    });

    useEffect(() => {
        const handleMount = async () => {
            try {
                const [{ data: company }] = await Promise.all([
                    axiosReq.get(`/companies/${id}`),
                ]);
                setCompany({ results: [company] });
            } catch (err) {
                console.log(err);
            }
        };
        handleMount();
    }, [id]);

    return (
        <Container>
            <Row className="h-100">
                
                <Col className="py-2 p-0 p-lg-2" lg={8}>
                    Popular profiles for mobile
                    <div className={`${styles.Main}`}>
                    <Company {...company.results[0]} setCompany={setCompany} companyPage />
                    <Credentials
                        company={id}
                    />
                    {/* Checks if user = company owner and uses onClick to display CredentialSelectForm */}
                    
                    {is_owner && (
                        <button 
                            className={`${btnStyles.Button} ${btnStyles.Green} align-items-center`}
                            onClick={displayForm}
                        >
                            Add / Edit Credentials   
                        </button>
                    )}
                    <Container fluid className="d-flex justify-content-center">
                    {showForm && is_owner && (
                        <div className="d-flex justify-content-center">
                        <CredentialSelectForm
                            company={id}
                            // currentCredentials={company.credentials}
                            className="mx-3 mt-0 pt-0"
                        />
                        </div>
                    )}
                    </Container>
                    <Container className={appStyles.Content}>
                        Comments
                    </Container>
                    </div>
                </Col>
                <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
                    Popular profiles for desktop
                </Col>
            </Row>
        </Container>
    );
}

export default CompanyPage;