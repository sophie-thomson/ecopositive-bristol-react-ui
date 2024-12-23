import React from "react";
import styles from "../../styles/CredentialSelectForm.module.css";

import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import { useRedirect } from "../../hooks/useRedirect";
import { useHistory } from "react-router";
import { useEffect } from "react";
import axios from "axios";

import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";



function CredentialSelectForm({ company, currentCredentials }) {
    
    useRedirect("loggedOut");

    const [errors, setErrors] = useState({});
    // sets the state of items to fetch from credentials api
    const [credentialsOptions, setCredentialsOptions] = useState({ results: [] });
    // sets the state of selected credentials data
    const [credentialsData, setCredentialsData] = useState([]);
    const [selectedCredentials, setSelectedCredentials] = ([1, 3, 5]);

    const history = useHistory();

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
        console.log(event.target.value)
    };

    const handleDelete = (event) => {
        
    }

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

    const ecoList = credentialsOptions.results.filter(credential =>
        credential.group === "Eco-Conscious Approach"
    );
    console.log(ecoList)
    const memberList = credentialsOptions.results.filter(credential =>
        credential.group === "Membership / Accreditation"
    );
    const socialList = credentialsOptions.results.filter(credential =>
        credential.group === "Socially Responsible"
    );
    const sustainableList = credentialsOptions.results.filter(credential =>
        credential.group === "Sustainable Production / Materials"
    );
    

    return (
        <Form onSubmit={handleSubmit}>
            <Row>
                <Col className="py-2 p-0 p-md-2">
                    <Container
                        className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
                    >
                        <>
                        <Form.Text className={`${styles.Header} pb-3`}>Select Eco-Credentials</Form.Text>
                        </>
                        <hr className={`${appStyles.Rule}`} />
                        <Form.Group>
                            <Form.Label className={`${styles.ListTitle}`}>Eco-Conscious Approach</Form.Label>
                            <Form.Text
                                className="text-center">
                                    Select a credential to add / remove from your company listing
                            </Form.Text>
                            <Form.Control
                                as="select"
                                multiple
                                name="ecoListCredentials"
                                aria-placeholder="Select credentials"
                                value={ecoList.value}
                                onChange={(event) => handleChange(event)}>
                                    <option value="null"></option>
                                    {ecoList.map((credential) => (
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
                        {errors?.ecoListCredentials?.map((message, idx) => (
                            <Alert variant="warning" key={idx}>
                                {message}
                            </Alert>
                        ))}
                        <Form.Group>
                            <Form.Label className={`${styles.ListTitle}`}>Membership / Accreditation</Form.Label>
                            <Form.Text
                                className="text-center">
                                    Select a credential to add / remove from your company listing
                            </Form.Text>
                            <Form.Control
                                as="select"
                                multiple
                                name="memberListCredentials"
                                aria-placeholder="Select credentials"
                                value={memberList.value}
                                onChange={(event) => handleChange(event)}>
                                    {memberList.map((credential) => (
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
                        {errors?.memberListCredentials?.map((message, idx) => (
                            <Alert variant="warning" key={idx}>
                                {message}
                            </Alert>
                        ))}
                        <Form.Group>
                            <Form.Label className={`${styles.ListTitle}`}>Socially Responsible</Form.Label>
                            <Form.Text
                                className="text-center">
                                    Select a credential to add / remove from your company listing
                            </Form.Text>
                            <Form.Control
                                as="select"
                                multiple
                                name="socialListCredentials"
                                aria-placeholder="Select credentials"
                                value={socialList.value}
                                onChange={(event) => handleChange(event)}>
                                    {socialList.map((credential) => (
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
                        {errors?.socialListCredentials?.map((message, idx) => (
                            <Alert variant="warning" key={idx}>
                                {message}
                            </Alert>
                        ))}
                        <Form.Group>
                            <Form.Label className={`${styles.ListTitle}`}>Sustainable Production / Materials</Form.Label>
                            <Form.Text
                                className="text-center">
                                    Select a credential to add / remove from your company listing
                            </Form.Text>
                            <Form.Control
                                as="select"
                                multiple
                                name="sustainableListCredentials"
                                aria-placeholder="Select credentials"
                                value={sustainableList.value}
                                onChange={(event) => handleChange(event)}>
                                    {sustainableList.map((credential) => (
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
                        {errors?.sustainableListCredentials?.map((message, idx) => (
                            <Alert variant="warning" key={idx}>
                                {message}
                            </Alert>
                        ))}
                        
                        <Button className={`${btnStyles.Button} ${btnStyles.Green} m-2`} type="submit">
                            Add Credential
                        </Button>
                        <Button 
                            className={`${btnStyles.Button} ${btnStyles.Red} m-2`}
                            onClick={handleDelete}
                        >
                            Remove Credential
                        </Button>
                        <Button
                            className={`${btnStyles.Button} ${btnStyles.Bright}`}
                            onClick={() => history.goBack()}
                        >
                            X Cancel
                        </Button>
                        
                    </Container>
                </Col>
            </Row>
        </Form>
    )

};


export default CredentialSelectForm;