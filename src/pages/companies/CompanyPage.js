import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import { Link } from "react-router-dom";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import styles from "../../styles/CompanyPage.module.css"
import btnStyles from "../../styles/Button.module.css";

import Company from "./Company";
import CompanyContact from "./CompanyContact";
import CredentialSelectForm from "../credentials/CredentialSelectForm";
import Credentials from "../credentials/Credentials";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Comment from "../comments/Comment";
import CommentCreateForm from "../comments/CommentCreateForm";
import Asset from "../../components/Asset";

// import { fetchMoreData } from "../../utils/utils";

function CompanyPage() {
    const [hasLoaded, setHasLoaded] = useState(false);
    const { id } = useParams();
    const [companyOwner, setCompanyOwner] = useState("");
    const [company, setCompany] = useState({ results: [] });
    const [showForm, setShowForm] = useState(false);
    const [comments, setComments] = useState({ results: [] });
    
    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === companyOwner;
    const profile_image = currentUser?.profile_image;

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
                const [{ data: company }, { data: comments }] = await Promise.all([
                    axiosReq.get(`/companies/${id}`),
                    axiosReq.get(`/comments/?company=${id}`),
                ]);
                setCompany({ results: [company] });
                setComments(comments);
                setHasLoaded(true);
            } catch (err) {
                console.log(err);
            }
        };
        setHasLoaded(false);
        const timer = setTimeout(() => {
            handleMount();
          }, 1000);
      
          return () => {
            clearTimeout(timer);
          };   
        // handleMount();
    }, [id, setCompany]);

    return (
        <Container>
            <Row className="h-100">
                
                <Col className="py-2 p-0 p-lg-2" lg={8}>

                    <div className={`${styles.Main}`}>
                        {hasLoaded ? (
                            <>
                                <Company {
                                    ...company.results[0]} 
                                    setCompany={setCompany} 
                                    companyPage 
                                />
                                    <div className="d-lg-none">
                                        <CompanyContact {
                                            ...company.results[0]} 
                                            setCompany={setCompany} 
                                            companyPage 
                                        />
                                    </div>
                                <Credentials
                                    company={id}
                                    setCompany={setCompany}
                                    companyPage
                                />
                                {/* Checks if user = company owner and uses onClick to display CredentialSelectForm */}
                                
                                {is_owner && (
                                    <div className="d-flex justify-content-center mt-3">
                                    <button 
                                        className={`
                                            ${btnStyles.Button} 
                                            ${styles.Credbtn} 
                                            align-items-center
                                        `}
                                        onClick={displayForm}
                                    >
                                        Add / Edit Credentials   
                                    </button>
                                    </div>
                                )}
                            

                        <Container fluid className="d-flex justify-content-center">
                        {showForm && is_owner && (
                            <div className="d-flex justify-content-center">
                            <CredentialSelectForm
                                company={id}
                                className="mx-3 mt-0 pt-0"
                            />
                            </div>
                        )}
                        </Container>
                        <Container className={appStyles.Content}>
                            <div className="d-flex align-items-center pt-3">
                                <p className={`${styles.Subheader} mx-auto`}>Comments</p>    
                            </div>
                            <hr className={`${appStyles.Rule} mb-0`} />
                            {currentUser ? (
                                <CommentCreateForm
                                    profile_id={currentUser.profile_id}
                                    profileImage={profile_image}
                                    company={id}
                                    setCompany={setCompany}
                                    setComments={setComments}
                                />
                            ) : null}
                            {comments.results.length ? (
                                <div
                                    children={comments.results.map((comment) => (
                                        <Comment
                                            key={comment.id}
                                            {...comment}
                                            setCompany={setCompany}
                                            setComments={setComments}
                                        />
                                    ))}
                                    // dataLength={comments.results.length}
                                    loader={<Asset spinner />}
                                    // hasMore={!!comments.next}
                                    //  next={() => fetchMoreData(comments, setComments)}
                                />
                            ) : currentUser ? (
                                <div className={`${styles.Link} ml-auto mt-2 p-2`}>
                                    <i className="far fa-comments mr-2" />
                                    No comments yet, be the first to comment!
                                </div>
                                // <span>No comments yet, be the first to comment!</span>
                            ) : (
                                <div className={`${styles.Link} ml-auto mt-2 p-2`}>
                                    <i className="far fa-comments mr-2" />
                                    <Link className={styles.Link} to="/signin">
                                        No comments... yet. 
                                        <span className={`${styles.Bold}`}>
                                            &nbsp;Sign in&nbsp;
                                        </span>
                                        to comment.
                                    </Link>
                                </div>
                            )}
                        </Container>
                        </>
                        ) : (
                            <Asset spinner />
                        )}
                    </div>
                </Col>
                <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
                    <CompanyContact 
                        {...company.results[0]} 
                        setCompany={setCompany} 
                        companyPage 
                    />
                </Col>
            </Row>
        </Container>
    );
}

export default CompanyPage;