import React, { useEffect, useState } from "react";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import CompanyList from "./CompanyList";
import Asset from "../../components/Asset";

import appStyles from "../../App.module.css";
import styles from "../../styles/CompanyListPage.module.css";
import { useLocation } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";

import NoResults from "../../assets/no-results.png";
import InfiniteScroll from "react-infinite-scroll-component";
// import { fetchMoreData } from "../../utils/utils";
// import PopularProfiles from "../profiles/PopularProfiles";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import TopCompanies from "../topCompanies/TopCompanies";

function CompanyListPage({ message, filter = "" }) {
    const [companies, setCompanies] = useState({ results: [] });
    const [hasLoaded, setHasLoaded] = useState(false);
    const { pathname } = useLocation();

    const [query, setQuery] = useState("");
    const currentUser = useCurrentUser();

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const { data } = 
                    await axiosReq.get(`/companies/?${filter}search=${query}`);
                setCompanies(data);
                setHasLoaded(true);
            } catch (err) {
                console.log(err);
            }
        };

        setHasLoaded(false);
        const timer = setTimeout(() => {
            fetchCompanies();
        }, 1000);

        return () => {
            clearTimeout(timer);
        };
    }, [filter, query, pathname, currentUser]);

    return (
        <Row className="h-100">
            <Col className="py-2 p-0 p-lg-2" lg={8}>
                <p>PopularProfiles mobile</p>
                <i className={`fas fa-search ${styles.SearchIcon}`} />
                <Form
                    className={styles.SearchBar}
                    onSubmit={(event) => event.preventDefault()}
                >
                    <Form.Control
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        type="text"
                        className="mr-sm-2"
                        placeholder="Search companies"
                    />
                </Form>

                {hasLoaded ? (
                    <>
                        {companies.results.length ? (
                            <InfiniteScroll
                                children={companies.results.map((company) => (
                                    <CompanyList 
                                        key={company.id} 
                                        {...company} 
                                        setCompanies={setCompanies}
                                    />
                                ))}
                                dataLength={companies.results.length}
                                loader={<Asset spinner />}
                                hasMore={!!companies.next}
                                // next={() => fetchMoreData(companies, setCompanies)}
                            />
                        ) : (
                            <Container className={appStyles.Content}>
                                <Asset src={NoResults} message={message} />
                            </Container>
                        )}
                    </>
                ) : (
                    <Container className={appStyles.Content}>
                        <Asset spinner />
                    </Container>
                )}
            </Col>
            <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
                <TopCompanies />
            </Col>
        </Row>
    );
};

export default CompanyListPage;