import React, { useEffect, useState } from "react";
import Asset from "../../components/Asset";

import styles from "../../styles/AdminPage.module.css";
import appStyles from "../../App.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

import CompanyList from "../companies/CompanyList";
import { useParams } from "react-router";
import InfiniteScroll from "react-infinite-scroll-component";
import { axiosReq, axiosRes } from "../../api/axiosDefaults";
import { Alert, Col, Container, Image, Row } from "react-bootstrap";
import NoResults from "../../assets/no-results.png";

function AdminPage () {
    const [hasLoaded, setHasLoaded] = useState(false);

    const [newCompanies, setNewCompanies] = useState({ results: [] });
    const [reportedComments, setReportedComments] = useState({ results: [] });

    const currentUser = useCurrentUser();
    const { id } = useParams();

    console.log()

    const [profileData, setProfileData] = useState([]);
    const profile = profileData.data;
    console.log(profile);
    
    
    // const isAdmin = profile.data.admin_access === true;
    // console.log(isAdmin);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [profileData, companiesData, commentsData] = await Promise.all ([
                    axiosReq.get(`/profiles/${id}/`),
                    axiosReq.get(`/companies/`),
                    axiosReq.get(`/comments/`)
                ]);

                const companies = companiesData.data;
                const comments = commentsData.data;
                setProfileData(profileData);
                console.log(profileData);

                const newCompanies = companies.results.filter(
                    company => company.approved === false
                );
                setNewCompanies(newCompanies);
                console.log(newCompanies);

                const reportedComments = comments.results.filter(
                    comment => comment.reported === true
                );
                setReportedComments(reportedComments);
                console.log(reportedComments);
                setHasLoaded(true);
                
            } catch (err) {
                console.log(err)    
            }
        }
    
        fetchData();
    }, [id, setProfileData]);

    const approveCompanies = (
        <>
            <Row>
                <Col>
                    <p className={`${styles.Subheader} text-center mb-2`}>New companies</p>
                    <hr className={appStyles.Rule}/>
                    <p>List of New Companies</p>
                </Col>
            </Row>
        </>
    );

    const reviewComments = (
        <>
            <Row>
                <Col>
                    <p className={`${styles.Subheader} text-center mb-2`}>Review Comments</p>
                    <hr className={appStyles.Rule}/>
                    <p>List of Comments to Review</p>
                </Col>
            </Row>
        </>
    );
    
    return (
        <Container className={`${styles.Frame} mb-3`}>
            <div>
                {profile?.admin_access ? (<p>Has admin access</p>) : (<p>Doesn't have admin access</p>)}
                {hasLoaded ? (
                    <>
                    {approveCompanies}
                    {reviewComments}
                    </>
                ) : (
                    <Asset spinner />
                )}
                
                
            </div>
        </Container>
        
    )        
}

export default AdminPage;