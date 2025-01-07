import React, { useEffect, useState } from "react";
import appStyles from "../../App.module.css";
import NoResults from "../../assets/no-results.png";
import { Link } from "react-router-dom";
import { Card, Container } from "react-bootstrap";
import Asset from "../../components/Asset";


const PageNotFound = () => {
    return(
        <Container className={`${appStyles.Content} mt-5`}>
            <Card>
                <Asset
                src={NoResults}
                message={`Sorry, we can't seem to find that page!`}
                />
                <Link className="text-center mb-3" to="/">
                    <i className="fa-solid fa-house" />
                    Head back to main directory
                </Link>             
            </Card>
        </Container>
    );
};

export default PageNotFound;