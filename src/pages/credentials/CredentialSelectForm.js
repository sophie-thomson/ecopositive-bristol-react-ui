import React from "react";
import styles from "../../styles/CredentialSelectForm.module.css";

import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import { useRedirect } from "../../hooks/useRedirect";
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
    const [credentialsOptions, setCredentialsOptions] = useState({ results: [] });
    const [submittedCredentials, setSubmittedCredentials] = useState([]);
    const [ecoCredentials, setEcoCredentials] = useState([]);
    const [memberCredentials, setMemberCredentials] = useState([]);
    const [socialCredentials, setSocialCredentials] = useState([]);
    const [sustainableCredentials, setSustainableCredentials] = useState([]);
    const [companyCredentials, setCompanyCredentials] = useState ([]);
    const [removeCredentials, setRemoveCredentials] = useState ([]);
    const [companyCredentialsList, setCompanyCredentialsList] = useState ([]);
    

    
    useEffect(() => {
        const fetchCredentials = async () => {
            try {
                const { data } = await axiosReq.get(`/credentials/`);
                const companyData = await axiosReq.get(`/companies/${company}/`);
                const companyCredentials = (companyData.data.credentials);
                setCredentialsOptions(data);
                setCompanyCredentials(companyCredentials);

                const companyCredentialsList = companyCredentials.map(id => {
                    return data.results.find(credential => credential.id === id);    
                });
                setCompanyCredentialsList(companyCredentialsList);
                // console.log(data);
                // console.log(companyCredentials);
            } catch (err) {
                console.log(err);
            }   
        };
        fetchCredentials();
    }, [company]);
    console.log(companyCredentials);
    
    // handlers adapted from StackOverflow discussion using map() instead of for loop
    // https://stackoverflow.com/questions/50090335/how-handle-multiple-select-form-in-reactjs
    const handleEcoSelect = function(selectedItems) {
        const selectedCredentials = Array.from(selectedItems).map(
            item => parseInt(item.value)
        );
        setEcoCredentials(selectedCredentials);
        console.log(selectedCredentials);
    };

    const handleMemberSelect = function(selectedItems) {
        const selectedCredentials = Array.from(selectedItems).map(
            item => parseInt(item.value)
        );
        setMemberCredentials(selectedCredentials);
        console.log(selectedCredentials);
    };

    const handleSocialSelect = function(selectedItems) {
        const selectedCredentials = Array.from(selectedItems).map(
            item => parseInt(item.value)
        );
        setSocialCredentials(selectedCredentials);
        console.log(selectedCredentials);
    };

    const handleSustainableSelect = function(selectedItems) {
        const selectedCredentials = Array.from(selectedItems).map(
            item => parseInt(item.value)
        );
        setSustainableCredentials(selectedCredentials);
        console.log(selectedCredentials);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            // creates array to get the company credentials and append selected credentials
            const submittedCredentials = [
                ...companyCredentials,
                ...ecoCredentials,
                ...memberCredentials,
                ...socialCredentials,
                ...sustainableCredentials,   
            ]
            console.log(submittedCredentials);
            const response = await axios.patch(`/companies/${company}/`, {
                credentials: submittedCredentials,
            });
            setSubmittedCredentials((prevSubmittedCredentials) =>
            [
                ...prevSubmittedCredentials,
                response.data.credentials
            ])
            console.log(response.data.credentials)
            
            setCompanyCredentials(null);
            setSubmittedCredentials(null);
            
            // window.location.reload();
            

        } catch (err) {
            console.log(err);
            if (err.response?.status !== 401) {
                setErrors(err.response?.data);
            }    
            
        }
    };

    const handleRemoveSelect = function(selectedItems) {
        const selectedCredentials = Array.from(selectedItems).map(
            item => parseInt(item.value)
        );
        setRemoveCredentials(selectedCredentials);
        console.log(selectedCredentials);
    };

    const handleRemove = async (event) => {
        try {
            // setCredentialsData(event.target.value);
            const updatedCredentials = companyCredentials.filter(
                credential => credential !== parseInt(removeCredentials)
            );
            console.log(updatedCredentials);
            await axios.patch(`/companies/${company}/`, {
                credentials: updatedCredentials,
            });
            // setCredentialsData(null);

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
    console.log(ecoList);

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
        <Container>
        <Form onSubmit={handleSubmit}>
            <Row>
                <Col className="py-2 p-0 p-md-2">
                    <Container
                        className={
                            `${appStyles.Content} 
                            d-flex flex-column justify-content-center`
                        }
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
                                    multiple
                                    name="ecoListCredentials"
                                    aria-placeholder="Select credentials"
                                    value={ecoList.value}
                                    onChange={(event) => {
                                        handleEcoSelect(event.target.selectedOptions)
                                    }}
                                >
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

                            <Form.Group>
                                <Form.Label
                                    className={`${styles.ListTitle}`}
                                >
                                    Membership / Accreditation
                                </Form.Label>
                                <Form.Control
                                    className={`${styles.Input}`}
                                    as="select"
                                    multiple
                                    name="memberListCredentials"
                                    aria-placeholder="Select credentials"
                                    value={memberList.value}
                                    onChange={(event) => {
                                        handleMemberSelect(event.target.selectedOptions)
                                    }}
                                >
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
                            
                            <Form.Group>
                                <Form.Label
                                    className={`${styles.ListTitle}`}
                                >
                                    Socially Responsible
                                </Form.Label>
                                <Form.Control
                                    className={`${styles.Input}`}
                                    as="select"
                                    multiple
                                    name="socialListCredentials"
                                    aria-placeholder="Select credentials"
                                    value={socialList.value}
                                    onChange={(event) => {
                                        handleSocialSelect(event.target.selectedOptions)
                                    }}
                                >
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
                            
                            <Form.Group>
                                <Form.Label
                                className={`${styles.ListTitle}`}
                                >
                                    Sustainable Production / Materials
                                </Form.Label>
                                <Form.Control
                                    className={`${styles.Input}`}
                                    as="select"
                                    multiple
                                    name="sustainableListCredentials"
                                    aria-placeholder="Select credentials"
                                    value={sustainableList.value}
                                    onChange={(event) => {
                                        handleSustainableSelect(event.target.selectedOptions)
                                    }}
                                >
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
                                <Button
                                    className={`${btnStyles.Button} ${btnStyles.Bright}`}
                                    onClick={handleCancel}
                                >
                                    X Cancel
                                </Button>
                                <Button 
                                    className={
                                        `${btnStyles.Button} 
                                        ${btnStyles.Green} 
                                        m-2`
                                    } 
                                    type="submit"
                                >
                                    Add Credentials
                                </Button>   
                            </div>
                        </div>   
                    </Container>
                </Col>
            </Row>
        </Form>
        <div className={`${styles.Field} d-flex justify-content-around my-3 p-3`}>
            <Form>
                    <Form.Group>

                        <Form.Label
                            className={`${styles.ListTitle}`}
                        >
                            Remove Credentials
                        </Form.Label>
                        <Form.Control
                            className={`${styles.Input}`}
                            as="select"
                            multiple
                            name="companyCredentials"
                            aria-placeholder="Select credentials"
                            value={companyCredentialsList.value}
                            onChange={(event) => {
                                handleRemoveSelect(event.target.selectedOptions)
                            }}
                        >
                            <option
                                value={(null)}
                                className="text-muted">
                                Select credential
                            </option>
                            {companyCredentialsList.map((credential) => (
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
                    {errors?.companyCredentials?.map((message, idx) => (
                        <Alert variant="warning" key={idx}>
                            {message}
                        </Alert>
                    ))}
                    <Button
                        className={`${btnStyles.Button} ${btnStyles.Bright}`}
                        onClick={handleCancel}
                    >
                        X Cancel
                    </Button>
                    <Button
                        className={`${btnStyles.Button} ${btnStyles.Red} m-2`}
                        onClick={handleRemove}
                    >
                        Remove Credentials
                    </Button>

                </Form>
            </div>
        </Container>
    );

};


export default CredentialSelectForm;