import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import styles from "../../styles/CompanyPage.module.css"
// import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosReq } from "../../api/axiosDefaults";
import Company from "./Company";
import CredentialSelectForm from "../credentials/CredentialSelectForm";


function CompanyPage() {
    const { id } = useParams();
    const [company, setCompany] = useState({ results: [] });
    const [currentCredentials, setCurrentCredentials] = useState ([]);
  
    // const currentUser = useCurrentUser();
    // const profile_image = currentUser?.profile_image;

    useEffect(() => {
        const handleMount = async () => {
            try {
                const [{ data: company }] = await Promise.all([
                    axiosReq.get(`/companies/${id}`),
                ]);
                setCompany({ results: [company] });
                setCurrentCredentials(company.credentials);
                console.log(company)
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
                    <p>Popular profiles for mobile</p>
                    <div className={`${styles.Main}`}>
                    <Company {...company.results[0]} setCompany={setCompany} companyPage />
                    {/* ADD VERIFICATION HERE TO CHECK IF OWNER */}
                    <div className="mx-3">
                    <CredentialSelectForm
                    company={id}
                    currentCredentials={currentCredentials}
                    setCredentials={setCurrentCredentials}
                    />
                    </div>
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