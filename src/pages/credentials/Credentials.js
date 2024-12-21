import React from "react";
import styles from "../../styles/Credentials.module.css";
// import { useCurrentUser } from "../../contexts/CurrentUserContext";
// import { useHistory } from "react-router-dom";
import { Card } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

// import axios from "axios";
import { useEffect } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import { useState } from "react";


function Credentials({ company }) {

    const [errors, setErrors] = useState({});
    const [companyCredentials, setCompanyCredentials] = useState ([]);
    const [credentials, setCredentials] = useState ([]);
    const [credentialsList, setCredentialsList] = useState ([]);
    

        useEffect(() => {
            const fetchCredentials = async () => {
                try {
                    const { data } = await axiosReq.get(`/credentials/`);
                    const companyData = await axiosReq.get(`/companies/${company}/`);
                    const companyCredentials = (companyData.data.credentials);
                    setCompanyCredentials(companyCredentials);
                    setCredentials(data.results);
                    console.log(companyCredentials);
                    console.log(data.results);
    
                    const credentialsList = companyCredentials.map(id => {
                        return data.results.find(credential => credential.id === id);    
                    });
                    setCredentialsList(credentialsList);
                    console.log(credentialsList);
                        
                } catch (err) {
                    console.log(err);
                }   
            };
        
            fetchCredentials();
        }, [company]);

        const ecoList = credentialsList.filter(credential =>
            credential.group === "Eco-Conscious Approach"
        );

        const companyEcoList = ecoList.map((credential) =>
            <li 
                key={credential.id}
                group={credential.group}
            >
                {credential.name}
            </li>
        );

        const memberList = credentialsList.filter(credential =>
            credential.group === "Membership / Accreditation"
        );
        
        const companyMemberList = memberList.map((credential) =>
            <li 
                key={credential.id}
                group={credential.group}
            >
                {credential.name}
            </li>
        );

        const socialList = credentialsList.filter(credential =>
            credential.group === "Socially Responsible"
        );
        
        const companySocialList = socialList.map((credential) =>
            <li 
                key={credential.id}
                group={credential.group}
            >
                {credential.name}
            </li>
        );

        const sustainableList = credentialsList.filter(credential =>
            credential.group === "Sustainable Production / Materials"
        );
        
        const companySustainableList = sustainableList.map((credential) =>
            <li 
                key={credential.id}
                group={credential.group}
            >
                {credential.name}
            </li>
        );


    return (
        <Container>
            <Col>
            <div className="d-flex align-items-center">
                <p className={`${styles.Header} mx-auto`}>Eco-Credentials</p>    
            </div>
            <hr className={`${styles.Rule}`} />
                <Card className={styles.Company}>
                    <Card.Body>
                        <Card.Title className="text-center">
                            Eco-Conscious Approach
                        </Card.Title>
                        <Card.Text><ul>{companyEcoList}</ul></Card.Text>
                    </Card.Body>
                </Card>
            </Col>
            <Col>
                <Card className={styles.Company}>
                    <Card.Body>
                        <Card.Title className="text-center">
                            Membership / Accreditation
                        </Card.Title>
                        <Card.Text><ul>{companyMemberList}</ul></Card.Text>
                    </Card.Body>
                </Card>
            </Col>
            <Col>
                <Card className={styles.Company}>
                    <Card.Body>
                        <Card.Title className="text-center">
                            Socially Responsible
                        </Card.Title>
                        <Card.Text><ul>{companySocialList}</ul></Card.Text>
                    </Card.Body>
                </Card>
            </Col>
            <Col>
                <Card className={styles.Company}>
                    <Card.Body>
                        <Card.Title className="text-center">
                            Sustainable Production / Materials
                        </Card.Title>
                        <Card.Text><ul>{companySustainableList}</ul></Card.Text>
                    </Card.Body>
                </Card>
            </Col>
        </Container>
    );
};

export default Credentials
