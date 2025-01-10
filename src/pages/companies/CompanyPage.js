import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { toast } from "react-toastify";

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
import { fetchMoreData } from "../../utils/utils";


function CompanyPage() {
    const [hasLoaded, setHasLoaded] = useState(false);
    const { id } = useParams();
    const [companyOwner, setCompanyOwner] = useState("");
    const [approvedStatus, setApprovedStatus] = useState(false);
    const [company, setCompany] = useState({ results: [] });
    const [showForm, setShowForm] = useState(false);
    const [comments, setComments] = useState({ results: [] });
    const [adminStatus, setAdminStatus] = useState([]);
    
    const currentUser = useCurrentUser();
    const user_id = currentUser?.profile_id;
    const is_owner = currentUser?.username === companyOwner;
    const is_admin = adminStatus === true;
    const profile_image = currentUser?.profile_image;
    const approved = approvedStatus === true;
    
     // Code adapted from Stack Overflow thread
    const displayForm = (event) => {
        event.preventDefault();
        setShowForm(prevState => !prevState);
    }

    useEffect(() => {
        const handleMount = async () => {
            try {
                const [
                    { data: company }, { data: comments },
                ] = await Promise.all([
                    axiosReq.get(`/companies/${id}`),
                    axiosReq.get(`/comments/?company=${id}`),
                ]);
                setCompany({ results: [company] });
                setHasLoaded(true);
                const companyOwner = (company.owner);
                const approvedStatus = (company.approved);
                setApprovedStatus(approvedStatus);
                setCompanyOwner(companyOwner);
                setComments(comments);
                if (currentUser) {
                    const { data: profileData } = await axiosReq.get(
                        `/profiles/${user_id}/`
                    );
                    const adminStatus = (profileData.is_staff);
                    setAdminStatus(adminStatus);
                }
            } catch (err) {
                if (err.response?.status !== 404) {
                    toast.error("Problem loading company details.");
                } 
            }
        };
        
        handleMount();
    }, [id, user_id, currentUser]);

    return (
        <Container>
            <Row className="h-100">
            {hasLoaded ? (
                <Col className="py-2 p-0 p-lg-2" lg={8}>
                    {approved ? (
                        <div className={`${styles.Main}`}>
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
                                    <p 
                                    className={`${appStyles.Subheader} mx-auto`}>
                                        Comments
                                    </p>    
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
                                    <InfiniteScroll
                                        children={comments.results.map((comment) => (
                                            <Comment
                                                key={comment.id}
                                                {...comment}
                                                setCompany={setCompany}
                                                setComments={setComments}
                                            />
                                        ))}
                                        dataLength={comments.results.length}
                                        loader={<Asset spinner />}
                                        hasMore={!!comments.next}
                                        next={() => fetchMoreData(comments, setComments)}
                                    />
                                ) : currentUser ? (
                                    <div className={`${styles.Link} ml-auto mt-2 p-2`}>
                                        <i className="far fa-comments mr-2" />
                                        No comments yet, be the first to comment!
                                    </div>
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
                        </div>
                    ) : is_owner || is_admin ? (
                        <div className={`${styles.Main}`}>
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
                                    <p className={`${appStyles.Subheader} mx-auto`}>
                                        Comments
                                    </p>    
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
                                    <InfiniteScroll
                                        children={comments.results.map((comment) => (
                                            <Comment
                                                key={comment.id}
                                                {...comment}
                                                setCompany={setCompany}
                                                setComments={setComments}
                                            />
                                        ))}
                                        dataLength={comments.results.length}
                                        loader={<Asset spinner />}
                                        hasMore={!!comments.next}
                                        next={() => fetchMoreData(comments, setComments)}
                                    />
                                ) : currentUser ? (
                                    <div className={`${styles.Link} ml-auto mt-2 p-2`}>
                                        <i className="far fa-comments mr-2" />
                                        No comments yet, be the first to comment!
                                    </div>
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
                        </div>
                    ) : (
                        <Container 
                            className={`${appStyles.Content} ${styles.Attention} text-center`}
                        >
                            <p>
                                <i className="fa-solid fa-exclamation" />
                                Only the company owner and admin staff can 
                                view a company before it has been approved. 
                            </p>
                            {!currentUser && <Link className={styles.Link} to="/signin">
                                If you are the owner,
                                <span className={`${styles.Bold}`}>
                                    &nbsp;sign in&nbsp;
                                </span>
                                to view your company details.
                            </Link>}   
                        </Container>   
                    )}
                </Col>
                ) : (
                    <Col>
                    <Asset spinner message="Loading..." />
                    </Col>
                )}
                {approved || is_owner || is_admin ? (<Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
                    <CompanyContact 
                        {...company.results[0]} 
                        setCompany={setCompany} 
                        companyPage 
                    />
                </Col>): null}
            </Row>
        </Container>
    );
};

export default CompanyPage;