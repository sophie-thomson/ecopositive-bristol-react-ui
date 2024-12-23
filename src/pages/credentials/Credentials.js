import React from "react";
import styles from "../../styles/Credentials.module.css";
import appStyles from "../../App.module.css";
import { DotsDropdown } from "../../components/DotsDropdown";
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
                    // console.log(companyCredentials);
                    // console.log(data.results);
    
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
                className="list-unstyled"
            >
                <i className="fa-brands fa-envira" />{credential.name}
            </li>
        );

        const memberList = credentialsList.filter(credential =>
            credential.group === "Membership / Accreditation"
        );
        
        const companyMemberList = memberList.map((credential) =>
            <li 
                key={credential.id}
                group={credential.group}
                className="list-unstyled"
            >
                <i className="fa-brands fa-envira" />{credential.name}
            </li>
        );

        const socialList = credentialsList.filter(credential =>
            credential.group === "Socially Responsible"
        );
        
        const companySocialList = socialList.map((credential) =>
            <li 
                key={credential.id}
                group={credential.group}
                className="list-unstyled"
            >
                <i className="fa-brands fa-envira" />{credential.name}
            </li>
        );

        const sustainableList = credentialsList.filter(credential =>
            credential.group === "Sustainable Production / Materials"
        );
        
        const companySustainableList = sustainableList.map((credential) =>
            <li 
                key={credential.id}
                group={credential.group}
                className="list-unstyled"
            >
                <i className="fa-brands fa-envira" />
                {credential.name}
            </li>
        );

    return (
        <Container>
            
            <div className="d-flex align-items-center">
                <p className={`${styles.Header} mx-auto`}>Eco-Credentials</p>    
            </div>
            <hr className={`${appStyles.Rule}`} />
            <Col className="py-2 p-0 p-md-2" >
                <div className="d-flex justify-content-around flex-wrap mb-3">
                <Card className={`${styles.List}`}>
                    <Card.Body className="pb-1 pt-4">
                        <Card.Title className={`${styles.ListTitle} px-1`}>
                            Eco-Conscious Approach
                        </Card.Title>
                        <Card.Text className={`${styles.ListText}`}><ul className="pl-0">{companyEcoList}</ul></Card.Text>
                    </Card.Body>
                </Card>
                <Card className={`${styles.List}`}>
                    <Card.Body className="pb-1 pt-4">
                        <Card.Title className={`${styles.ListTitle}`}>
                            Membership / Accreditation
                        </Card.Title>
                        <Card.Text className={`${styles.ListText}`}><ul className="pl-0">{companyMemberList}</ul></Card.Text>
                    </Card.Body>
                </Card>
                <Card className={`${styles.List}`}>
                    <Card.Body className="pb-1 pt-4">
                        <Card.Title className={`${styles.ListTitle}`}>
                            Socially Responsible
                        </Card.Title>
                        <Card.Text className={`${styles.ListText}`}><ul className="pl-0">{companySocialList}</ul></Card.Text>
                    </Card.Body>
                </Card>
                <Card className={`${styles.List}`}>
                    <Card.Body className="pb-1 pt-4">
                        <Card.Title className={`${styles.ListTitle} px-2`}>
                            Sustainable Production / Materials
                        </Card.Title>
                        <Card.Text className={`${styles.ListText}`}><ul className="pl-0">{companySustainableList}</ul></Card.Text>
                    </Card.Body>
                </Card>
                </div>
            </Col>
        </Container>
    );
};

export default Credentials
