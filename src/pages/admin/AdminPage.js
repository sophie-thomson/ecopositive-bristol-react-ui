import React, { useEffect, useState } from "react";
import Asset from "../../components/Asset";

import styles from "../../styles/ProfilePage.module.css";
import appStyles from "../../App.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

import CompanyList from "../companies/CompanyList";
import { useParams } from "react-router";
import InfiniteScroll from "react-infinite-scroll-component";
import { axiosReq, axiosRes } from "../../api/axiosDefaults";
import { Alert, Container, Image } from "react-bootstrap";
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
                
            } catch (err) {
                console.log(err)    
            }
        }
    
        fetchData();
    }, [id])
    
    
    return (
        <Container className={`${appStyles.Content} mb-3`}>
                <div>
                {profile?.admin_access ? (<p>Has admin access</p>) : (<p>Doesn't have admin access</p>)}
        </div>
        </Container>
        
    )        
}

export default AdminPage;