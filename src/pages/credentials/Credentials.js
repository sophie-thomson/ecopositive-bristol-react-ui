import React from "react";
import styles from "../../styles/Credentials.module.css";
import appStyles from "../../App.module.css";
import { Card } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import { useEffect } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import { useState } from "react";


function Credentials({ company }) {

    const [credentialsList, setCredentialsList] = useState ([]);
    

    useEffect(() => {
        const fetchCredentials = async () => {
            try {
                const { data } = await axiosReq.get(`/credentials/`);
                const companyData = await axiosReq.get(`/companies/${company}/`);
                const companyCredentials = (companyData.data.credentials);

                const credentialsList = companyCredentials.map(id => {
                    return data.results.find(credential => credential.id === id);    
                });
                
                setCredentialsList(credentialsList);
                        
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
            <i className="fa-brands fa-envira" />
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
            className="list-unstyled"
        >
            <i className="fa-brands fa-envira" />
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
            className="list-unstyled"
        >
            <i className="fa-brands fa-envira" />
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
            className="list-unstyled"
        >
            <i className="fa-brands fa-envira" />
            {credential.name}
        </li>
    );

    return (
        <Container>
            <Card>
                <Card.Body className={`${styles.Credentials}`}>
            <div className="d-flex align-items-center pt-3">
                <p className={`${styles.Header} mx-auto`}>Eco-Credentials</p>    
            </div>
            <hr className={`${appStyles.Rule} mb-0`} />
            <Col className="py-2 p-0 p-md-2" >
            {
                            ecoList.length || 
                            memberList.length || 
                            socialList.length || 
                            sustainableList.length > 0 ? (
                <div className="d-flex justify-content-around flex-wrap mb-3">
                    {companyEcoList.length > 0 &&
                        <Card className={`${styles.List}`}>
                            <Card.Body className={`${styles.Credentials}`}>
                                <Card.Title 
                                    className={`${styles.ListTitle} px-1`}
                                >
                                    Eco-Conscious Approach
                                </Card.Title>
                                <Card.Text
                                    as="div"
                                    className={`${styles.ListText}`}
                                >
                                    <ul className="pl-0">
                                        {companyEcoList}
                                    </ul>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    }
                    {companyMemberList.length > 0 &&
                        <Card className={`${styles.List}`}>
                            <Card.Body className={`${styles.Credentials}`}>
                                <Card.Title className={`${styles.ListTitle}`}>
                                    Membership / Accreditation
                                </Card.Title>
                                <Card.Text
                                    as="div"
                                    className={`${styles.ListText}`}
                                >
                                    <ul className="pl-0">
                                        {companyMemberList}
                                    </ul>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    }
                    {companySocialList.length > 0 &&
                        <Card className={`${styles.List}`}>
                            <Card.Body className={`${styles.Credentials}`}>
                                <Card.Title className={`${styles.ListTitle}`}>
                                    Socially Responsible
                                </Card.Title>
                                <Card.Text
                                    as="div"
                                    className={`${styles.ListText}`}
                                >
                                    <ul className="pl-0">
                                        {companySocialList}
                                    </ul>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    }
                    {companySustainableList.length > 0 ? (
                        <Card className={`${styles.List}`}>
                            <Card.Body className={`${styles.Credentials}`}>
                                <Card.Title 
                                    className={`${styles.ListTitle} px-2`}
                                >
                                    Sustainable Materials
                                </Card.Title>
                                <Card.Text
                                    as="div"
                                    className={`${styles.ListText}`}
                                >
                                    <ul className="pl-0">
                                        {companySustainableList}
                                    </ul>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    ): (null)
                    }
                </div>
                ) : (
                    <p 
                        className="text-muted small text-center"
                    >
                        No eco-credentials added for this company yet.
                    </p>
                )
            }
            </Col>
            </Card.Body>
            </Card>
        </Container>
    );
};

export default Credentials
