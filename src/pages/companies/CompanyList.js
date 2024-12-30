import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { axiosReq } from "../../api/axiosDefaults";

import styles from "../../styles/CompanyList.module.css";
import appStyles from "../../App.module.css";
import { Link } from "react-router-dom";

function CompanyList (props) {

    const [credentialsList, setCredentialsList] = useState ([]);

    
    const {
        id,
        // owner,
        // owner_profile_id,
        // owner_profile_image,
        name,
        logo,
        excerpt,
        endorsements_count,
        comments_count,
        // credentials,
    } = props;

    useEffect(() => {
        const fetchCredentials = async () => {
            try {
                const { data } = await axiosReq.get(`/credentials/`);
                const companyData = await axiosReq.get(`/companies/${id}/`);
                const companyCredentials = (companyData.data.credentials);

                const credentialsList = companyCredentials.map(id => {
                    return data.results.find(credential => credential.id === id);    
                });
                setCredentialsList(credentialsList);
                // console.log(credentialsList);            
            } catch (err) {
                console.log(err);
            }   
        };
            
        fetchCredentials();
    }, [id]);
    
    const ecoList = credentialsList.filter(credential =>
        credential.group === "Eco-Conscious Approach"
    );

    const memberList = credentialsList.filter(credential =>
        credential.group === "Membership / Accreditation"
    );

    const socialList = credentialsList.filter(credential =>
        credential.group === "Socially Responsible"
    );

    const sustainableList = credentialsList.filter(credential =>
        credential.group === "Sustainable Production / Materials"
    );

    return (
        <Card className={`${styles.Company}`}>
            <Card.Body className="pb-1 pt-2">
                <div className={`${styles.Counts} d-flex justify-content-end`}>
                    <span className={`${styles.Comment} mr-3`}>
                        <i className="far fa-comments" />
                        ({comments_count})
                    </span>
                    <span className={`${styles.Endorse} mr-2`}>
                        <i className="fa-solid fa-award" />
                        ({endorsements_count})
                    </span>

                </div>
                <Row className="d-flex justify-content-center">
                <Col sm={3} className="d-flex justify-content-center">
                    <Link to={`/companies/${id}`}>
                    <Card.Img className={`${styles.Logo} mr-3`} src={logo} alt={name} />
                    </Link>
                </Col>
                <Col className={`${styles.Company}`}>
                <Link to={`/companies/${id}`}>
                {name && 
                    <Card.Text className={`${styles.Header} d-sm-flex`}>
                        {name}
                    </Card.Text>   
                }
                </Link>
                {excerpt &&
                    <Card.Text className="mb-0 text-sm-left">
                        {excerpt}
                    </Card.Text>
                }
                </Col>
                </Row>
                
                <Row className={`${styles.List} d-flex justify-content-center`}>
                    <div className="my-2 w-100">
                        <p className={`${styles.Subheader}`}>Eco-Credentials</p>
                        <hr className={` ${appStyles.Rule} py-0 mb-2`} />
                        {
                            ecoList.length || 
                            memberList.length || 
                            socialList.length || 
                            sustainableList.length > 0 ? (
                                <ul 
                                    className={
                                        `${styles.Credentials} 
                                        list-unstyled 
                                        d-flex 
                                        justify-content-center
                                        flex-wrap`
                                }>  
                                    <li>{ecoList.length > 0 &&
                                        <>
                                            <i className="fa-brands fa-envira" />
                                            Eco-Conscious Approach
                                        </>
                                    }</li>

                                    <li>{memberList.length > 0 &&
                                        <>
                                            <i className="fa-brands fa-envira" />
                                            Membership / Accreditation
                                        </>
                                    }</li>

                                    <li>{socialList.length > 0 &&
                                        <>
                                            <i className="fa-brands fa-envira" />
                                            Socially Responsible
                                        </>
                                    }</li>
                                    <li>{sustainableList.length > 0 &&
                                        <>
                                            <i className="fa-brands fa-envira" />
                                            Sustainable Materials
                                        </>
                                    }</li>
                                </ul>
                        ) : (
                                <p 
                                    className="text-muted small"
                                >
                                    No eco-credentials added for this company yet.
                                </p>
                            )
                        }
                    </div>
                </Row>
            </Card.Body>
        </Card>
    );
};

export default CompanyList;