import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import Asset from "../../components/Asset";

import styles from "../../styles/ProfilePage.module.css";
import appStyles from "../../App.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

import CompanyList from "../companies/CompanyList";
import TopCompanies from "../topCompanies/TopCompanies";
import { DotsDropdown } from "../../components/DotsDropdown";
import { useParams } from "react-router";
import InfiniteScroll from "react-infinite-scroll-component";
import { axiosReq } from "../../api/axiosDefaults";
import { Alert, Image } from "react-bootstrap";
import NoResults from "../../assets/no-results.png";

function ProfilePage() {
    const [hasLoaded, setHasLoaded] = useState(false);
    const [profileCompanies, setProfileCompanies] = useState({ results: [] });
      
    const currentUser = useCurrentUser();
    const { id } = useParams();
      

    const [profileData, setProfileData] = useState([]);
      
    const profile = profileData.data;
    const is_owner = currentUser?.username === profileData.owner;
    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [profileData, companiesData] = await Promise.all ([
                    axiosReq.get(`/profiles/${id}/`),
                    axiosReq.get(`/companies/`)
                ]);

                const companies = companiesData.data;
                
                setProfileData(profileData);
                setHasLoaded(true);
                const profileCompanies = companies.results.filter(
                    company => company.owner === profileData.data.owner
                );
                setProfileCompanies(profileCompanies);
                    
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
        
    }, [id, setProfileData]);

    const mainProfile = (
        <>
            <span className={`${styles.Dots} d-flex justify-content-end`}>
                {profile?.is_owner && <DotsDropdown id={profile?.id} className={styles.Dots} />}
            </span>
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
                    <div className={styles.Name}> {profile?.owner}</div>
                    <Row className="justify-content-center no-gutters">
                        <Col className="my-2">
                            <div>{profileCompanies.length}</div>
                            <div>companies</div>
                        </Col>
                        <Col className="my-2">
                            <div>{profile?.endorsement_count}</div>
                            <div>endorsed</div>
                        </Col>   
                    </Row>
                </Col>
                    {profile?.content && <Col className="p-3">{profile.content}</Col>}
            </Row>
        </>
    );
    const mainProfileCompanies = (
        <>
            {/* <hr /> */}
            <p className={`${styles.Subheader} text-center mb-2`}>Your companies</p>
            <hr className={appStyles.Rule}/>
            {profileCompanies.length ? (
                <InfiniteScroll
                children={profileCompanies.map((company) => (
                    
                    <CompanyList key={company.id} {...company} setCompanies={setProfileCompanies} />
                ))}
                dataLength={profileCompanies.length}
                loader={<Asset spinner />}
                hasMore={!!profileCompanies.next}
                // next={() => fetchMoreData(profileCompanies, setProfileCompanies)}
                />
            ) : (
                <Asset
                src={NoResults}
                message={`No results found, ${profile?.owner} hasn't posted yet.`}
                />
            )}
        </>
    );

    const mainProfileEndorsed = (
        <div>
            <p className={`${styles.Subheader} text-center my-2`}>companies you endorse</p>
            <hr className={appStyles.Rule}/>
        </div>
    );

    return (
        <Row>
            {/* {is_owner && <Alert variant="success"> Welcome Back!</Alert>} */}
            <Col className="py-2 p-0 p-lg-2" lg={8}>
            <TopCompanies mobile/>
                <Container className={appStyles.Content}>
                {hasLoaded ? (
                    <>
                    <Container className={styles.Banner}>
                    {mainProfile}
                    </Container>
                    {mainProfileCompanies}
                    </>
                ) : (
                    <Asset spinner />
                )}
                </Container>
                <Container className={`${appStyles.Content} my-4`}>
                    {mainProfileEndorsed}
                </Container>
            </Col>
            <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
            <TopCompanies />
            </Col>
        </Row>
    );
}
    
export default ProfilePage;