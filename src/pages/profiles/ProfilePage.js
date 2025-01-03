import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import Asset from "../../components/Asset";

import styles from "../../styles/ProfilePage.module.css";
import appStyles from "../../App.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

import CompanyList from "../companies/CompanyList";
import { DotsDropdown } from "../../components/DotsDropdown";
import { useParams } from "react-router";
import InfiniteScroll from "react-infinite-scroll-component";
import { axiosReq } from "../../api/axiosDefaults";
import { Image } from "react-bootstrap";
import NoResults from "../../assets/no-results.png";

function ProfilePage() {
    const [hasLoaded, setHasLoaded] = useState(false);
    const [profileCompanies, setProfileCompanies] = useState({ results: [] });
      
    const currentUser = useCurrentUser();
    const { id } = useParams();
      

    const [profileData, setProfileData] = useState({        
        // pageProfile: { results: [] },    
    });
        
    // const { pageProfile } = useProfileData();
      
    const profile = profileData.data;
    const is_owner = currentUser?.username === profile?.owner;
    const is_company_owner = currentUser?.username === profileCompanies?.results.owner;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const profileData = await axiosReq.get(`/profiles/${id}/`);
                const companies = await axiosReq.get(`/companies/`);
                // const [ profileCompanies ] = companies.data.results.filter(
                //     company => company.owner === profileData.data.owner
                // );
                // const profileCompanies = await axiosReq.get(`/companies/?owner__profile=${id}`);
                const [{ data: profileCompanies }] =
                    await Promise.all([
                        // axiosReq.get(`/profiles/${id}/`),
                        axiosReq.get(`/companies/?owner__profile=${profile}`),
                    ]);
                    setProfileData(profileData);
                    setProfileCompanies(profileCompanies);
                    setHasLoaded(true);
                    console.log(profileCompanies);
                    console.log(profileData.data.owner)
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, [id, setProfileData]);
    console.log(profile);

    const mainProfile = (
        <>
            {profile?.is_owner && <DotsDropdown id={profile?.id} />}
                <Row noGutters className="px-3 text-center">
                    <Col lg={3} className="text-lg-left">
                        <Image
                            className={styles.ProfileImage}
                            roundedCircle
                            src={profile?.image}
                        />
                    </Col>
                    <Col lg={6}>
                      <h3 className="m-2">{profile?.owner}</h3>
                      <Row className="justify-content-center no-gutters">
                        <Col className="my-2">
                          <div>{profile?.posts_count}</div>
                          <div>companies</div>
                        </Col>
                        <Col className="my-2">
                          <div>{profile?.followers_count}</div>
                          <div>endorsed</div>
                        </Col>
                        
                      </Row>
                    </Col>
                    {profile?.content && <Col className="p-3">{profile.content}</Col>}
      </Row>
    </>
  );
  const mainProfilePosts = (
        <>
            <hr />
            <p className="text-center">{profile?.owner}'s own companies</p>
            <hr />
            {profileCompanies.results.length ? (
                <InfiniteScroll
                children={profileCompanies.results.map((company) => (
                    
                    <CompanyList key={company.id} {...company} setCompanies={setProfileCompanies} />
                ))}
                dataLength={profileCompanies.results.length}
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
      return (
        <Row>
            <Col className="py-2 p-0 p-lg-2" lg={8}>
                {/* <PopularProfiles mobile /> */}
                <Container className={appStyles.Content}>
                {hasLoaded ? (
                    <>
                    {mainProfile}
                    {mainProfilePosts}
                    </>
                ) : (
                    <Asset spinner />
                )}
                </Container>
            </Col>
            <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
                {/* <PopularProfiles /> */}
            </Col>
        </Row>
      );
    }
    
    export default ProfilePage;