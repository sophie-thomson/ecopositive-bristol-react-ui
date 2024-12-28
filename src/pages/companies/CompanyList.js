import React, { useEffect, useState } from "react";
import { Card, CardGroup, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { axiosReq, axiosRes } from "../../api/axiosDefaults";

import { DotsDropdown } from "../../components/DotsDropdown";
import CompanyPage from "./CompanyPage";
import styles from "../../styles/CompanyList.module.css";
import appStyles from "../../App.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

function CompanyList (props) {

    const [credentialsList, setCredentialsList] = useState ([]);

    
    const {
        id,
        owner,
        // owner_profile_id,
        // owner_profile_image,
        name,
        logo,
        excerpt,
        endorsements_count,
        comments_count,
        credentials,
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
            <Card.Body>
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
                <div className="d-flex flex-wrap">
                    <Card.Img className={`${styles.Logo} mr-3`} src={logo} alt={name} />
                    {name && <Card.Text className={`${styles.Header}`}>{name}</Card.Text>}
                </div>
                {excerpt &&
                    <Card.Text className="mb-0 text-left">
                        {excerpt}
                    </Card.Text>
                }
                <div className="d-flex justify-content-center">
                <div className={`${styles.List} px-3 pt-3 pb-0`}>
                    
                    <ul className={`${styles.Credentials} list-unstyled`}>
                        <p className={`${styles.Subheader}`}>Eco-Credentials</p>
                        <hr className={` ${appStyles.Rule} py-0`} />
                        <li>{ecoList.length > 0 ? (
                            <>
                                <i className="fa-brands fa-envira" />
                                Eco-Conscious Approach
                            </>
                        ) : (null)
                        }</li>

                        <li>{memberList.length > 0 ? (
                            <>
                                <i className="fa-brands fa-envira" />
                                Membership / Accreditation
                            </>
                        ) : (null)
                        }</li>

                        <li>{socialList.length > 0 ? (
                            <>
                                <i className="fa-brands fa-envira" />
                                Socially Responsible
                            </>
                        ) : (null)
                        }</li>
                        <li>{sustainableList.length > 0 ? (
                            <>
                                <i className="fa-brands fa-envira" />
                                Sustainable Production / Materials
                            </>
                        ) : (null)
                        }</li>
                    </ul>
                </div>
                </div>
            </Card.Body>
        </Card>
    );
};

export default CompanyList;