import React from "react";
import styles from "../../styles/CredentialSelectForm.module.css";

import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import { useRedirect } from "../../hooks/useRedirect";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import { useEffect } from "react";
import axios from "axios";


function CredentialSelectForm({ company, currentCredentials, setCredentials }) {
    
    useRedirect("loggedOut");

    const [errors, setErrors] = useState({});
    // sets the state of items to fetch from credentials api
    const [credentialsOptions, setCredentialsOptions] = useState({ results: [] });
    // sets the state of selected credentials data
    const [credentialsData, setCredentialsData] = useState("");

    useEffect(() => {
        const fetchCredentials = async () => {
            try {
                const { data } = await axiosReq.get(`/credentials/`);
                setCredentialsOptions(data);
                console.log(data)
            } catch (err) {
                console.log(err);
            }
            
        };
        fetchCredentials();
    }, []);

    const handleChange = (event) => {
        setCredentialsData(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            // creates array to get the current credentials and append new credentials
            const selectedCredentials = [
                ...currentCredentials,
                credentialsData
            ]
            const response = await axios.patch(`/companies/${company}/`, {
                credentials: selectedCredentials,
            });
            setCredentialsData((prevCredentialsData) => [
                ...prevCredentialsData,
                response.data.credentials[0]
            ]);
            setCredentialsData(null);

        } catch (err) {
            console.log(err);
            if (err.response?.status !== 401) {
                setErrors(err.response?.data);
            }    
            
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Row>
                <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
                    <Container
                        className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
                    >
                        <Form.Group>
                            <Form.Label>Eco-Credentials</Form.Label>
                            {/* <p>{credentialsData}</p> */}
                            <Form.Control
                                as="select"
                                multiple
                                name="credentials"
                                aria-placeholder="Select credentials"
                                value={credentialsOptions.results}
                                onChange={handleChange}>
                                    {credentialsOptions.results.map((credential, value) => (
                                        <option
                                            value={credential.id}
                                            key={credential.id}
                                            {...credential}
                                        >
                                            {credential.name}
                                        </option>
                                    ))}
                            </Form.Control>
                        </Form.Group>
                        {errors?.credentials?.map((message, idx) => (
                            <Alert variant="warning" key={idx}>
                                {message}
                            </Alert>
                        ))}
                        <Button
                            className={`${btnStyles.Button} ${btnStyles.Bright}`}
                            // onClick={() => history.goBack()}
                        >
                            cancel
                        </Button>
                        <Button className={`${btnStyles.Button} ${btnStyles.Green}`} type="submit">
                            Submit Credentials
                        </Button>
                    </Container>
                </Col>
            </Row>
        </Form>
    )

};


export default CredentialSelectForm;