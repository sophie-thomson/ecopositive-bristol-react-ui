import React, { useEffect, useState } from "react";
import { Card, Col, Container } from "react-bootstrap";
import appStyles from "../../App.module.css";
import styles from "../../styles/TopCompanies.module.css"

import TopCompany from "./TopCompany";
import { axiosReq } from "../../api/axiosDefaults";
import Asset from "../../components/Asset";


const TopCompanies = ({mobile}) => {
    const [hasLoaded, setHasLoaded] = useState(false);
    const [topCompanies, setTopCompanies] = useState([]);
    const [topFive, setTopFive] = useState([]);

    useEffect(() => {
        const handleMount = async () => {
            try {
                const companyData = await axiosReq.get(`/companies/`);

                const endorsedCompanies = companyData.data.results.filter(
                    company => 
                        company.endorsements_count > 0 
                        && company.approved === true
                );

                const sortedCompanies = endorsedCompanies.sort(
                    (a, b) => b.endorsements_count - a.endorsements_count
                );
                
                const topCompanies = sortedCompanies.slice(0, 3);
                setTopCompanies(topCompanies);

                const topFive = sortedCompanies.slice(0, 5);
                setTopFive(topFive);
                setHasLoaded(true);
         
            } catch (err) {}
        };
    
        handleMount();
    }, []);
    
    return ( 
        <Container
            className={`${styles.Border}  ${
                mobile && "d-lg-none text-center mb-3"
            }`}
        >
            <>
                <p className={`${styles.Header} m-2 pb-2`}>
                    <span className={styles.Name}>
                        <i className="fa-solid fa-award" />
                        Highly recommended
                    </span>
                </p>
                <hr className={`${appStyles.Rule} mt-2`} />
                <div>
                    {hasLoaded ? (
                        <>
                            {mobile ? (
                                <Col className="col-flex">
                                    <div 
                                        className="d-flex justify-content-around flex-wrap flex-md-nowrap"
                                    >
                                        {topCompanies.map ((company) => (
                                            <Card 
                                                key={company.id} 
                                                className={`${styles.Card} align-items-center m-1`}
                                            >
                                                <TopCompany 
                                                    key={company.id} 
                                                    company={company} 
                                                    name={company.name}
                                                    logo={company.logo}
                                                    mobile
                                                />
                                            </Card>
                                        ))}
                                    </div>
                                </Col>
                            ) : (
                                <Col className="col-flex align-items-center">
                                    {topFive.map ((company) => (
                                        <Card 
                                            key={company.id} 
                                            className={
                                                `${styles.CardLg} 
                                                d-flex 
                                                justify-content-center 
                                                text-center 
                                                flex-wrap 
                                                m-1`
                                            }
                                        >
                                            <TopCompany 
                                                key={company.id}
                                                company={company} 
                                                name={company.name}
                                                logo={company.logo}
                                            />
                                        </Card>
                                    ))}
                                </Col>
                            )}
                        </>
                    ) : (
                        <Asset spinner />
                    )}
                </div>    
            </>        
        </Container>  
    );
};

export default TopCompanies;