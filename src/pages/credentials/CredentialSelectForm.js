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



function CredentialSelectForm({ company }) {
    
    useRedirect("loggedOut");

    const [errors, setErrors] = useState({});
    // sets the state of items to fetch from credentials api
    const [credentialsOptions, setCredentialsOptions] = useState({ results: [] });
    // sets the state of selected credentials data
    const [credentialsData, setCredentialsData] = useState([1, 3, 5]);
    const [companyCredentials, setCompanyCredentials] = useState ([]);

    const history = useHistory();

    useEffect(() => {
        const fetchCredentials = async () => {
            try {
                const { data } = await axiosReq.get(`/credentials/`);
                const companyData = await axiosReq.get(`/companies/${company}/`);
                const companyCredentials = (companyData.data.credentials);
                setCredentialsOptions(data);
                setCompanyCredentials(companyCredentials);
                console.log(data);
                console.log(companyCredentials);
            } catch (err) {
                console.log(err);
            }   
        };
        fetchCredentials();
    }, [company]);

    const handleChange = (event) => {
        setCredentialsData(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            // creates array to get the company credentials and append new credentials
            const selectedCredentials = [
                ...companyCredentials,
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
            window.location.reload();
            

        } catch (err) {
            console.log(err);
            if (err.response?.status !== 401) {
                setErrors(err.response?.data);
            }    
            
        }
    };

    const handleDelete = async (event) => {
        try {
            setCredentialsData(event.target.value);
            const updatedCredentials = companyCredentials.filter(
                credential => credential !== parseInt(credentialsData)
            );
            const response = await axios.patch(`/companies/${company}/`, {
                credentials: updatedCredentials,
            });
            setCredentialsData(null);

            window.location.reload();
        } catch (err) {
            console.log(err)
        }    
    };

    const handleCancel = () => {
        window.location.reload();
    };

    const ecoList = credentialsOptions.results.filter(credential =>
        credential.group === "Eco-Conscious Approach"
    );

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
                        className={`${appStyles.Content} d-flex flex-column justify-content-center`}
                    >
                        <>
                        <Form.Text 
                            className={`${styles.Header} pb-3`}
                        >
                            Select Eco-Credentials
                        </Form.Text>
                        </>
                        <hr className={`${appStyles.Rule}`} />
                        <div className={`${styles.Field} my-3 p-3`}>
                            <Form.Group>
                                <Form.Label
                                    className={`${styles.ListTitle}`}
                                >
                                    Eco-Conscious Approach
                                </Form.Label>
                                <Form.Control
                                    className={`${styles.Input}`}
                                    as="select"
                                    name="ecoListCredentials"
                                    aria-placeholder="Select credentials"
                                    value={ecoList.value}
                                    onChange={(event) => handleChange(event)}>
                                        <option 
                                            value={(null)} 
                                            className="text-muted">
                                                Select credential
                                        </option>
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
                            <div className="d-flex justify-content-around">
                            <Button
                                className={`${btnStyles.Button} ${btnStyles.Green} m-2`}
                                type="submit"
                            >
                                Add Credential
                            </Button>
                            <Button 
                                className={`${btnStyles.Button} ${btnStyles.Red} m-2`}
                                onClick={handleDelete}
                            >
                                Remove Credential
                            </Button>
                            </div>
                        </div>
                        <div className={`${styles.Field} my-3 p-3`}>
                            <Form.Group>
                                <Form.Label
                                    className={`${styles.ListTitle}`}
                                >
                                    Membership / Accreditation
                                </Form.Label>
                                <Form.Control
                                    className={`${styles.Input}`}
                                    as="select"
                                    name="memberListCredentials"
                                    aria-placeholder="Select credentials"
                                    value={memberList.value}
                                    onChange={(event) => handleChange(event)}>
                                        <option 
                                            value={(null)} 
                                            className="text-muted">
                                                Select credential
                                        </option>
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
                            <div className="d-flex justify-content-around">
                            <Button className={`${btnStyles.Button} ${btnStyles.Green} m-2`} type="submit">
                                Add Credential
                            </Button>
                            <Button 
                                className={`${btnStyles.Button} ${btnStyles.Red} m-2`}
                                onClick={handleDelete}
                            >
                                Remove Credential
                            </Button>
                            </div>
                        </div>
                        <div className={`${styles.Field} my-3 p-3`}>
                            <Form.Group>
                                <Form.Label
                                    className={`${styles.ListTitle}`}
                                >
                                    Socially Responsible
                                </Form.Label>
                                <Form.Control
                                    className={`${styles.Input}`}
                                    as="select"
                                    name="socialListCredentials"
                                    aria-placeholder="Select credentials"
                                    value={socialList.value}
                                    onChange={(event) => handleChange(event)}>
                                        <option 
                                            value={(null)} 
                                            className="text-muted">
                                                Select credential
                                        </option>
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
                            <div className="d-flex justify-content-around">
                            <Button className={`${btnStyles.Button} ${btnStyles.Green} m-2`} type="submit">
                                Add Credential
                            </Button>
                            <Button 
                                className={`${btnStyles.Button} ${btnStyles.Red} m-2`}
                                onClick={handleDelete}
                            >
                                Remove Credential
                            </Button>
                            </div>
                        </div>
                        <div className={`${styles.Field} my-3 p-3`}>
                            <Form.Group>
                                <Form.Label
                                className={`${styles.ListTitle}`}
                                >
                                    Sustainable Production / Materials
                                </Form.Label>
                                <Form.Control
                                    className={`${styles.Input}`}
                                    as="select"
                                    name="sustainableListCredentials"
                                    aria-placeholder="Select credentials"
                                    value={sustainableList.value}
                                    onChange={(event) => handleChange(event)}>
                                        <option 
                                            value={(null)} 
                                            className="text-muted">
                                                Select credential
                                        </option>
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
                            <div className="d-flex justify-content-around">
                                <Button className={`${btnStyles.Button} ${btnStyles.Green} m-2`} type="submit">
                                    Add Credential
                                </Button>
                                <Button 
                                    className={`${btnStyles.Button} ${btnStyles.Red} m-2`}
                                    onClick={handleDelete}
                                >
                                    Remove Credential
                                </Button>
                            </div>
                        </div>
                        <Button
                            className={`${btnStyles.Button} ${btnStyles.Bright}`}
                            onClick={handleCancel}
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