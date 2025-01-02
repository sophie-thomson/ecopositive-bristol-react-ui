import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import appStyles from "../../App.module.css";
import styles from "../../styles/TopCompanies.module.css"
import Asset from "../../components/Asset";
// import Company from "../companies/Company";
import TopCompany from "./TopCompany";
import { axiosReq, axiosRes } from "../../api/axiosDefaults";


const TopCompanies = ({ mobile }) => {
    
    // const [companyData, setCompanyData] = useState([]);
    const [endorsedCompanies, setEndorsedCompanies] = useState([]);
    const [topCompanies, setTopCompanies] = useState({
        topCompanies: { results: [] },
    });
    const [topCompaniesList, setTopCompaniesList] = useState([]);

    // useEffect(() => {
    //     const fetchEndorsedCompanies = async () => {
    //         try {
    //             const companyData = await axiosReq.get(`/companies/`);
    //             const companyEndorsements = (companyData.data.endorsements_count);
                
    //             const endorsedCompanies = companyData.data.results.filter(
    //                     company => company.endorsements_count > 0
    //                 );
    //             // setCompanyData(companyData);
    //             setEndorsedCompanies(endorsedCompanies);
    //             console.log(endorsedCompanies);
    //         } catch (err) {
    //             console.log(err);
    //         }
    //     }
    //     fetchEndorsedCompanies()
    // }, []);


    useEffect(() => {
        const handleMount = async () => {
            try {
                const companyData = await axiosReq.get(`/companies/`);
                const endorsedCompanies = companyData.data.results.filter(
                    company => company.endorsements_count > 0
                );
                // setEndorsedCompanies(endorsedCompanies);
                const sortedCompanies = endorsedCompanies.sort(
                    (a, b) => b.endorsements_count - a.endorsements_count
                );
                console.log(sortedCompanies);
                // setTopCompanies(topCompanies);
                const topCompanies = sortedCompanies.slice(0, 3);
                setTopCompanies(topCompanies);
                console.log(topCompanies);
            } catch (err) {
                console.log(err);
            }
        };
    
        handleMount();
    }, []);
    
    // useEffect(() => {
    //     const handleMount = async () => {
    //         try {
    //             const topCompanies = endorsedCompanies.sort(
    //                 (a, b) => b.endorsements_count - a.endorsements_count);
    //             console.log(endorsedCompanies);
                
    //             setTopCompanies((prevState) => ({
    //                 ...prevState,
    //                 topCompanies: topCompanies,
    //             }));
    //             // const topCompaniesList = topCompanies.results.slice(0, 3);
    //             // setTopCompaniesList(topCompaniesList);
    //             console.log(topCompanies);
    //         } catch (err) {
    //             console.log(err);
    //         }
    //     };
    
    //     handleMount();
    // }, []);
    

    return (
        
        <Container
            className={`${appStyles.Content} ${
            mobile && "d-lg-none text-center mb-3"
            }`}
        >
            
                <>
                    <p>Top Three</p>
                    {/* {topCompanies.map((company) => 
                            <li 
                                key={company.id} 
                                // company={company} 
                                name={company.name}
                                logo={company.logo}
                                endorsements_count={company.endorsements_count}
                            >
                                <strong>{company.name}</strong>
                                <i className="fa-solid fa-award" />
                                ({company.endorsements_count})
                            </li>
                            )} */}
                    {/* {mobile ? (
                        <div className="d-flex justify-content-around">
                            {topCompanies.slice(0, 3).map((company) => (
                
                            <TopCompany key={company.id} company={company} mobile />
                            ))}
                        </div>
                    ) : (
                        topCompanies.map((company) => (
                            <TopCompany key={company.id} company={company} />
                            ))
                        )} */}
                </>
            
                
                
        </Container>
       
    );
};

export default TopCompanies;