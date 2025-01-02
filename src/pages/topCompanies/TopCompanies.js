import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import appStyles from "../../App.module.css";
import styles from "../../styles/TopCompanies.module.css"
import Asset from "../../components/Asset";
// import Company from "../companies/Company";
import TopCompany from "./TopCompany";
import { axiosReq, axiosRes } from "../../api/axiosDefaults";


const TopCompanies = ({ mobile }) => {
    
    const [companyData, setCompanyData] = useState([]);
    const [endorsedCompanies, setEndorsedCompanies] = useState([]);
    const [topCompanies, setTopCompanies] = useState({
        topCompanies: { results: [] },
    });

    useEffect(() => {
        const fetchEndorsedCompanies = async () => {
            try {
                const companyData = await axiosReq.get(`/companies/`);
                
                const endorsedCompanies = companyData.filter(
                    company => company.endorsements_count > 0
                );
                setCompanyData(companyData);
                setEndorsedCompanies(endorsedCompanies);
                console.log(endorsedCompanies);
            } catch (err) {
                console.log(err);
            }
        }
        fetchEndorsedCompanies()
    }, []);

    
    useEffect(() => {
        const handleMount = async () => {
            try {
                const topCompanies = endorsedCompanies;
                // const topCompanies = await axiosReq.get(
                //     "/companies/?ordering=-endorsement_count"
                // );
                setTopCompanies((prevState) => ({
                    ...prevState,
                    topCompanies: topCompanies,
                }));
                // console.log(topCompanies)
            } catch (err) {
                console.log(err);
            }
        };
    
        handleMount();
    }, []);
    

    return (
        
        <Container
            className={`${appStyles.Content} ${
            mobile && "d-lg-none text-center mb-3"
            }`}
        >
            
                <>
                    <p>Top Three</p>
                    {mobile ? (
                        <div className="d-flex justify-content-around">
                            {endorsedCompanies.results.slice(0, 3).map((company) => (
                
                            <TopCompany key={company.id} company={company} mobile />
                            ))}
                        </div>
                    ) : (
                        endorsedCompanies.results.map((company) => (
                            <TopCompany key={company.id} company={company} />
                            ))
                        )}
                </>
            
                
                
        </Container>
       
    );
};

export default TopCompanies;