import React from "react";
import { Card, CardGroup, Col } from "react-bootstrap";

import styles from "../../styles/CompanyContact.module.css";
import appStyles from "../../App.module.css";


const CompanyContact = (props) => {
    const {
        name,
        street,
        city,
        postcode,
        phone,
        website_url,
    } = props;

    return (
        <Card className={styles.Company}>
            <Card.Body className={`${styles.Contact} d-lg-none py-1`}>
                <CardGroup>
                <Card className={`${styles.Address} ${styles.Card} py-2 pb-xs-0`}>
                    <Card.Body className="py-0 ">
                        {street && city && postcode && (
                            <Card.Text className="mb-0">
                                <i className="fa-solid fa-location-dot" />
                                {name},<br />
                                {street},<br />
                                {city},<br />
                                <span
                                    className={`${styles.Postcode}`}
                                >
                                    {postcode}
                                </span>
                            </Card.Text>
                        )}
                    
                    </Card.Body>
                </Card>
                <Card className={`${styles.Address} ${styles.Card} pt-xs-0`}>
                    <Card.Body className="py-1">
                    <div>
                        {phone && (
                            <Card.Text className={`${styles.Phone}`}>
                                <i className="fa-solid fa-phone" />
                                {phone}
                            </Card.Text>
                        )}
                    </div>
                    <div>
                        
                        {website_url && (
                            <Card.Text className={`${styles.Website}`}>
                                <i className="fa-solid fa-globe" />
                                <a 
                                    href={website_url} 
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={`Visit company website`}
                                >
                                    Visit website
                                </a>
                            </Card.Text>
                        )}
                    </div>
                    </Card.Body>
                </Card>
                </CardGroup>
                   
            </Card.Body>
            <Card.Body className="d-none d-lg-block">
                <div className="d-flex align-items-center justify-content-center">
                        <Card.Title className={`${styles.Header} m-auto py-4`}>
                                Contact
                        </Card.Title>
                </div>
                <hr className={`${appStyles.Rule}`} />
                <Card.Text as="div">
                <div className={`${styles.Address} d-flex text-left`}>
                    <Col className="text-right pr-0">
                        <i className="fa-solid fa-location-dot" />
                    </Col>
                    <Col xs={10} className="mb-2">
                    {street && city && postcode ? (
                        <Card.Text>
                            {name},<br />
                            {street},<br />
                            {city},<br />
                            <span
                                className={`${styles.Postcode}`}
                            >
                                {postcode}
                            </span>
                        </Card.Text>
                    ) : (
                        <Card.Text className="mb-0 small mt-2 text-muted">
                            No address provided
                        </Card.Text>
                    )}
                    </Col>
                </div>
                <div className={`${styles.Address} d-flex text-left`}>
                    <Col className="text-right pr-0">
                        <i className="fa-solid fa-phone" />
                    </Col>
                    <Col xs={10}>
                        {phone ? (
                            <Card.Text className={`${styles.Phone}`}>
                                {phone}
                            </Card.Text>
                        ) : (
                            <Card.Text className="mb-0 small mt-2 text-muted">
                                No phone provided
                            </Card.Text>
                        )}
                    </Col>
                </div>
                <div className={`${styles.Address} d-flex text-left mt-2`}>
                    <Col className="text-right pr-0">
                        <i className="fa-solid fa-globe" />
                    </Col>
                    <Col xs={10}>
                        {website_url ? ( 
                            <Card.Text className={`${styles.Website}`}>
                                <a 
                                    href={website_url} 
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={`Visit company website`}
                                >
                                    Visit website
                                </a>
                            </Card.Text>
                        ) : (
                            <Card.Text className="mb-0 small mt-2 text-muted">
                                No website provided
                            </Card.Text>
                        )}
                    </Col>
                </div>
                </Card.Text>   
            </Card.Body>
        </Card>
    );

};

export default CompanyContact;