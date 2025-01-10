import React, { useEffect, useState } from "react";
import Asset from "../../components/Asset";

import styles from "../../styles/AdminPage.module.css";
import appStyles from "../../App.module.css";
import NewCompany from "./NewCompany";

import { axiosReq } from "../../api/axiosDefaults";
import { Col, Container, Row } from "react-bootstrap";
import NoResults from "../../assets/no-results.png";
import ReportedComment from "./ReportedComment";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

function AdminPage () {
    const [hasLoaded, setHasLoaded] = useState(false);

    const [newCompanies, setNewCompanies] = useState({ results: [] });
    const [reportedComments, setReportedComments] = useState({ results: [] });

    const currentUser = useCurrentUser();
    const id = currentUser?.profile_id;

    const [profileData, setProfileData] = useState([]);
    const profile = profileData.data;
    const is_admin = profile?.is_staff === true;
    

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

                const newCompanies = companies.results.filter(
                    company => company.approved === false
                );
                setNewCompanies(newCompanies);

                const reportedComments = comments.results.filter(
                    comment => comment.reported === true
                );
                setReportedComments(reportedComments);
                
                setHasLoaded(true);
                
            } catch (err) {
                console.log(err)    
            }
        };
        setHasLoaded(false);
        const timer = setTimeout(() => {
                fetchData();
            }, 1000);
        
            return () => {
                clearTimeout(timer);
            };
    
    }, [id, setProfileData, setNewCompanies, setReportedComments]);

    const approveCompanies = (
        <>
            <Row>
                <Col>
                    <p className={`${appStyles.Subheader} text-center mb-2`}>New companies</p>
                    <hr className={appStyles.Rule}/>
                    <div>
                    {newCompanies.length && is_admin ? (
                        <>{newCompanies.map((company) => (
                            <NewCompany
                                key={company.id}
                                {...company}
                                setNewCompanies={setNewCompanies}
                            />
                        ))}
                        </>
                    ) : is_admin ? (
                        <>
                            <Asset
                                src={NoResults}
                                message={`All done! No new companies to approve.`}
                            />
                        </>
                    ) : (
                        <p className="text-center">
                            Sorry, only members of admin staff can view these items.
                        </p>
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
                    <p className={`${appStyles.Subheader} text-center mb-2`}>
                        Review Comments
                    </p>
                    <hr className={appStyles.Rule}/>
                    <div>
                    {reportedComments.length && is_admin ? (
                        <>{reportedComments.map((comment) => (
                            <ReportedComment
                                key={comment.id}
                                {...comment}
                                setReportedComments={setReportedComments}
                                reportedComments={reportedComments}
                            />
                        ))}
                        </>
                    ) : is_admin ? (
                        <>
                            <Asset
                                src={NoResults}
                                message={`All done! No reported comments to review.`}
                            />
                        </>
                    ) : (
                        <p className="text-center">
                            Sorry, only members of admin staff can view these items.
                        </p>
                    )}
                    </div>
                </Col>
            </Row>
        </>
    );
    
    return (
        <Container className="mb-5">
            <div>
                {is_admin ? (null) : (<p>This page requires admin access</p>)}
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