import React, { useEffect, useState } from "react";
import Asset from "../../components/Asset";

import styles from "../../styles/AdminPage.module.css";
import appStyles from "../../App.module.css";
import NewCompany from "./NewCompany";
// import { useCurrentUser } from "../../contexts/CurrentUserContext";

import { useParams } from "react-router";
import { axiosReq, axiosRes } from "../../api/axiosDefaults";
import { Alert, Col, Container, Image, Row } from "react-bootstrap";
import NoResults from "../../assets/no-results.png";
import ReportedComment from "./ReportedComment";

function AdminPage () {
    const [hasLoaded, setHasLoaded] = useState(false);

    const [newCompanies, setNewCompanies] = useState({ results: [] });
    const [reportedComments, setReportedComments] = useState({ results: [] });

    // const currentUser = useCurrentUser();
    const { id } = useParams();

    const [profileData, setProfileData] = useState([]);
    const profile = profileData.data;
    

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
                // console.log(profileData);

                const newCompanies = companies.results.filter(
                    company => company.approved === false
                );
                setNewCompanies(newCompanies);
                // console.log(newCompanies);

                const reportedComments = comments.results.filter(
                    comment => comment.reported === true
                );
                setReportedComments(reportedComments);
                // console.log(reportedComments);
                setHasLoaded(true);
                
            } catch (err) {
                console.log(err)    
            }
        }
    
        fetchData();
    }, [id, setProfileData, setNewCompanies, setReportedComments]);

    const approveCompanies = (
        <>
            <Row>
                <Col>
                    <p className={`${appStyles.Subheader} text-center mb-2`}>New companies</p>
                    <hr className={appStyles.Rule}/>
                    <div>
                    {newCompanies.length ? (
                        <>{newCompanies.map((company) => (
                            <NewCompany
                                key={company.id}
                                {...company}
                                setNewCompanies={setNewCompanies}
                            />
                        ))}
                        </>
                    ):(
                        <p className="text-center">There are no new companies to approve at the moment.</p>
                    )}
                    </div>
                </Col>
            </Row>
        </>
    );

    const reviewComments = (
        <>
            <Row>
                <Col>
                    <p className={`${appStyles.Subheader} text-center mb-2`}>Review Comments</p>
                    <hr className={appStyles.Rule}/>
                    <div>
                    {reportedComments.length ? (
                        <>{reportedComments.map((comment) => (
                            <ReportedComment
                                key={comment.id}
                                {...comment}
                                setReportedComments={setReportedComments}
                                reportedComments={reportedComments}
                            />
                        ))}
                        </>
                    ):(
                        <p className="text-center">There are no reported comments to review at the moment.</p>
                    )}
                    </div>
                </Col>
            </Row>
        </>
    );
    
    return (
        <Container className="mb-5">
            <div>
                {profile?.is_staff ? (<p>Has admin access</p>) : (<p>Doesn't have admin access</p>)}
                {hasLoaded ? (
                    <>
                    <Container className={`${styles.Frame} mb-3`}>
                    {approveCompanies}
                    </Container>
                    <Container className={`${styles.Frame} mb-3`}>
                    {reviewComments}
                    </Container>
                    </>
                ) : (
                    <Asset spinner />
                )}
                
                
            </div>
        </Container>
        
    )        
}

export default AdminPage;