import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import appStyles from "../../App.module.css";
import styles from "../../styles/TopCompanies.module.css"

import TopCompany from "./TopCompany";
import { axiosReq } from "../../api/axiosDefaults";


const TopCompanies = ({mobile}) => {
    
    const [topCompanies, setTopCompanies] = useState([]);

    useEffect(() => {
        const handleMount = async () => {
            try {
                const companyData = await axiosReq.get(`/companies/`);
                const endorsedCompanies = companyData.data.results.filter(
                    company => company.endorsements_count > 0
                );
                const sortedCompanies = endorsedCompanies.sort(
                    (a, b) => b.endorsements_count - a.endorsements_count
                );
                
                const topCompanies = sortedCompanies.slice(0, 3);
                setTopCompanies(topCompanies);
         
            } catch (err) {
                console.log(err);
            }
        };
    
        handleMount();
    }, []);
    
    return (
        
        <Container
        className={`${styles.Border} ${appStyles.Content} ${
            mobile && "d-lg-none text-center mb-3"
          }`}
        >
                <>
                    <p className={`${styles.Header} m-2 pb-2`}>Highly recommended</p>
                    <hr className={`${appStyles.Rule} mt-2`} />
                    <div>
                        {mobile ? (
                            <div className="d-flex justify-content-around">
                                {topCompanies.map ((company) => (
                                    <TopCompany 
                                        key={company.id} 
                                        company={company} 
                                        name={company.name}
                                        logo={company.logo}
                                        endorsements_count={company.endorsements_count}
                                        mobile
                                    />
                                ))}
                            </div>
                        ) : (topCompanies.map ((company) => (
                            <TopCompany 
                                key={company.id} 
                                company={company} 
                                name={company.name}
                                logo={company.logo}
                                endorsements_count={company.endorsements_count}
                            />
                        )))
                    }  
                </div>    
                </>
            
                
                
        </Container>
       
    );
};

export default TopCompanies;