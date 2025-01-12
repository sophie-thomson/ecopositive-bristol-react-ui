import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { Button, Image, Modal } from "react-bootstrap";

import Asset from "../../components/Asset";
import styles from "../../styles/ProfilePage.module.css";
import appStyles from "../../App.module.css";
import CompanyList from "../companies/CompanyList";
import TopCompanies from "../topCompanies/TopCompanies";
import { DotsDropdown } from "../../components/DotsDropdown";
import InfiniteScroll from "react-infinite-scroll-component";
import { axiosReq, axiosRes } from "../../api/axiosDefaults";
import NoResults from "../../assets/no-results.png";
import { fetchMoreData } from "../../utils/utils";
import { useCurrentUser } from "../../contexts/CurrentUserContext";


function ProfilePage() {
    const [hasLoaded, setHasLoaded] = useState(false);
    const [profileCompanies, setProfileCompanies] = useState({ results: [] });
    const [endorsedCompanies, setEndorsedCompanies] = useState({ results: [] });
    const [show, setShow] = useState(false);

    const currentUser = useCurrentUser();
    const id = currentUser?.profile_id;
     
    const [profileData, setProfileData] = useState([]);
    const profile = profileData.data;
    const is_owner = currentUser?.username === profile?.owner;

    const history = useHistory(); 

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [profileData, companiesData] = await Promise.all ([
                    axiosReq.get(`/profiles/${id}/`),
                    axiosReq.get(`/companies/`)
                ]);

                const companies = companiesData.data;
                setProfileData(profileData);

                const profileCompanies = companies.results.filter(
                    company => company.owner === profileData.data.owner
                );
                setProfileCompanies(profileCompanies);

                const endorsedCompanies = companies.results.filter(
                    company => company.endorsing_users.some(
                        user => user.username === profileData.data.owner
                    ) 
                );
                setEndorsedCompanies(endorsedCompanies);
                setHasLoaded(true);
                
            } catch (err) {}
        };
        setHasLoaded(false);
        const timer = setTimeout(() => {
            fetchData();
          }, 1000);
      
          return () => {
            clearTimeout(timer);
          };   
        
    }, [id, setProfileData]);


    const handleEdit = () => {
        history.push(`/profiles/${id}/edit`);     
    };


    const handleDelete = async () => {
        try {
            await axiosRes.delete(`/profiles/${id}/`);
            history.goBack();
            toast.success("Profile deleted successfully!");
        } catch (err) {
            toast.error(
                "Oops! Something went wrong when deleting your profile. Please refresh the page and try again."
            );
        }
    };
    
    const mainProfile = (
        <>
            <span className={`${styles.Dots} d-flex justify-content-end`}>
                {is_owner && 
                    <DotsDropdown 
                        id={profile?.id} 
                        className={styles.Dots}
                        handleEdit={handleEdit}
                        handleDelete={handleShow}
                    />}
            </span>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete profile?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete this profile? 
                    This action cannot be undone, and all your owned companies, endorsements and 
                    comments will also be deleted.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        X Cancel
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        Confirm Delete
                    </Button>
                </Modal.Footer>
            </Modal>
            <Row noGutters className="px-3 text-center">
                <Col lg={3} className="text-lg-left">
                    <Image
                        className={styles.ProfileImage}
                        roundedCircle
                        src={profile?.image}
                        fluid
                    />
                </Col>
                <Col lg={6}>
                    <div className={styles.Name}> 
                        {profile?.first_name ? (
                            `Hello ${profile?.first_name}!`
                        ) : (
                            `Hello ${profile?.owner}!`
                        )}
                    </div>
                    <Row className="justify-content-center no-gutters">
                        <Col className="my-2">
                            <div>
                                {profileCompanies.length > 1 ? (
                                    <p>
                                        You have
                                        <span className={styles.Company}> 
                                            &nbsp;{profileCompanies.length}&nbsp;
                                        </span> 
                                        companies listed.
                                    </p>
                                ) : profileCompanies.length === 1 ? (
                                    <p>
                                        You have 
                                        <span className={styles.Company}> 
                                            &nbsp;{profileCompanies.length}&nbsp;
                                        </span> 
                                        company listed.
                                    </p>
                                ) : (
                                    <p>You haven't submitted any companies of your own.</p>
                                )}
                            </div>
                            <div>
                                {profile?.endorsements_count > 1 ? (
                                    <p>
                                        Great work! You have endorsed 
                                        <span className={styles.Endorse}>
                                            &nbsp;{profile?.endorsements_count}&nbsp;
                                        </span> 
                                        companies.
                                    </p>
                                ) : profile?.endorsements_count === 1 ? (
                                    <p>
                                        You have endorsed 
                                        <span className={styles.Endorse}>
                                            &nbsp;{profile?.endorsements_count}&nbsp;
                                        </span> 
                                        company. Keep going!
                                    </p>
                                ) : profile?.endorsements_count === 0 ? (
                                    <p>
                                        You have endorsed 
                                        <span className={styles.Endorse}>
                                            &nbsp;{profile?.endorsements_count}&nbsp;
                                        </span>
                                        companies.
                                    </p>
                                ) : (
                                    <p>You don't appear to have endorsed any companies.</p>
                                )}
                            </div>
                            
                        </Col>   
                    </Row>
                </Col>
            </Row>
        </>
    );
    const mainProfileCompanies = (
        <>
            <p className={`${appStyles.Subheader} text-center mb-2`}>Your companies</p>
            <hr className={appStyles.Rule}/>
            {profileCompanies.length ? (
                <InfiniteScroll
                children={profileCompanies.map((company) => (
                    
                    <CompanyList 
                        key={company.id}
                        {...company}
                        setCompanies={setProfileCompanies}
                    />
                ))}
                dataLength={profileCompanies.length}
                loader={<Asset spinner />}
                hasMore={!!profileCompanies.next}
                next={() => fetchMoreData(profileCompanies, setProfileCompanies)}
                />
            ) : (
                <Asset
                src={NoResults}
                message={`No results found, ${profile?.owner} doesn't own any companies.`}
                />
            )}
        </>
    );

    const mainProfileEndorsed = (
        <div>
            <p className={`${appStyles.Subheader} text-center my-2`}>companies you endorse</p>
            <hr className={appStyles.Rule}/>
            {endorsedCompanies.length ? (
                <InfiniteScroll
                children={endorsedCompanies.map((company) => (
                    
                    <CompanyList 
                        key={company.id} 
                        {...company} 
                        setCompanies={setEndorsedCompanies}
                    />
                ))}
                dataLength={endorsedCompanies.length}
                loader={<Asset spinner />}
                hasMore={!!endorsedCompanies.next}
                next={() => fetchMoreData(endorsedCompanies, setEndorsedCompanies)}
                />
            ) : (
                <Asset
                src={NoResults}
                message={`No results found, you haven't endorsed any companies yet.`}
                />
            )}
        </div>
    );

    return (
        <Row>
            {hasLoaded ? (
                <Container>
                    {currentUser && is_owner && (
                        <div className="d-flex">
                            <Col className="py-2 p-0 p-lg-2" lg={8}>
                                <TopCompanies mobile />
                                <Container className={appStyles.Content}>
                                    <>
                                        {mainProfile}
                                    </>
                                </Container>
                                {profileCompanies.length ? (
                                    <Container 
                                        className={
                                            `${styles.Frame} 
                                            ${styles.BorderCompany} 
                                            mt-3`
                                        }
                                    >
                                        <>
                                            {mainProfileCompanies}
                                        </>
                                    </Container>
                                ) : (null)}
                                <Container 
                                    className={
                                        `${styles.Frame} 
                                        ${styles.BorderEndorse} 
                                        my-4 pt-3`
                                    }
                                >
                                    <>
                                        {mainProfileEndorsed}
                                    </>
                                </Container>
                            </Col>
                            <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
                                <TopCompanies />
                            </Col>
                        </div>
                    )}

                </Container>
            ) : (
                <Container>
                    <Asset spinner />
                </Container>
            )}  
            {!currentUser && ( 
                <Container 
                    className={`${appStyles.Content} ${styles.Attention} text-center`}
                >
                    <p>
                        Only the profile owner can view this profile. 
                    </p>
                    <Link className={styles.Link} to="/signin">
                        Please
                        <span className={`${styles.Bold}`}>
                                &nbsp;sign in&nbsp;
                        </span>
                        to view your profile.
                    </Link>   
                </Container>
            )}
        </Row>
    );
};
    
export default ProfilePage;