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
import Asset from "../../components/Asset";
import { toast } from "react-toastify";



function CredentialSelectForm({ company, setShowForm }) {
    
    useRedirect("loggedOut");
    const [hasLoaded, setHasLoaded] = useState(false);
    const [errors, setErrors] = useState({});
    
    const [ecoCredentials, setEcoCredentials] = useState([]);
    const [memberCredentials, setMemberCredentials] = useState([]);
    const [socialCredentials, setSocialCredentials] = useState([]);
    const [sustainableCredentials, setSustainableCredentials] = useState([]);
    const [companyCredentials, setCompanyCredentials] = useState ([]);
    const [removeCredentials, setRemoveCredentials] = useState ([]);
    const [companyCredentialsList, setCompanyCredentialsList] = useState ([]);
    const [ecoList, setEcoList] = useState ([]);
    const [memberList, setMemberList] = useState ([]);
    const [socialList, setSocialList] = useState ([]);
    const [sustainableList, setSustainableList] = useState ([]);
    

    
    useEffect(() => {
        const fetchCredentials = async () => {
            try {
                const { data } = await axiosReq.get(`/credentials/`);
                const companyData = await axiosReq.get(`/companies/${company}/`);

                const companyCredentials = (companyData.data.credentials);
                setCompanyCredentials(companyCredentials);

                const ecoList = data.results.filter(credential =>
                    credential.group === "Eco-Conscious Approach"
                );
                setEcoList(ecoList);
            
                const memberList = data.results.filter(credential =>
                    credential.group === "Membership / Accreditation"
                );
                setMemberList(memberList);

                const socialList = data.results.filter(credential =>
                    credential.group === "Socially Responsible"
                );
                setSocialList(socialList);

                const sustainableList = data.results.filter(credential =>
                    credential.group === "Sustainable Production / Materials"
                );
                setSustainableList(sustainableList);

                const companyCredentialsList = companyCredentials.map(id => {
                    return data.results.find(credential => credential.id === id);    
                });
                setCompanyCredentialsList(companyCredentialsList);
                setHasLoaded(true);

            } catch (err) {}   
        };
        fetchCredentials();
    }, [company]);
    
    
    // handlers adapted from StackOverflow discussion using map() instead of for loop
    // https://stackoverflow.com/questions/50090335/how-handle-multiple-select-form-in-reactjs
    const handleEcoSelect = function(selectedItems) {
        const selectedCredentials = Array.from(selectedItems).map(
            item => parseInt(item.value)
        );
        setEcoCredentials(selectedCredentials);
    };

    const handleMemberSelect = function(selectedItems) {
        const selectedCredentials = Array.from(selectedItems).map(
            item => parseInt(item.value)
        );
        setMemberCredentials(selectedCredentials);
    };

    const handleSocialSelect = function(selectedItems) {
        const selectedCredentials = Array.from(selectedItems).map(
            item => parseInt(item.value)
        );
        setSocialCredentials(selectedCredentials);
    };

    const handleSustainableSelect = function(selectedItems) {
        const selectedCredentials = Array.from(selectedItems).map(
            item => parseInt(item.value)
        );
        setSustainableCredentials(selectedCredentials);
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
            
            const response = await axios.patch(`/companies/${company}/`, {
                credentials: submittedCredentials,
            });

            setCompanyCredentials((prevCompanyCredentials) =>
            [
                ...prevCompanyCredentials,
                response.data.credentials
            ])
            
            setEcoCredentials((prevEcoCredentials) =>
            [
                ...prevEcoCredentials,
                response.data.credentials
            ]);
            window.location.reload();
            toast.success("Credentials added successfully!");
        } catch (err) {
            toast.error(
                "Oops! Something went wrong when adding your credentials. Please try again."
            );
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
    };

    const handleRemove = async () => {
        try {
            const updatedCredentials = companyCredentials.filter(
                credential => credential !== parseInt(removeCredentials)
            );
            await axios.patch(`/companies/${company}/`, {
                credentials: updatedCredentials,
            });

            window.location.reload();
            toast.success("Credentials removed successfully!");
        } catch (err) {
            toast.error(
                "Oops! Something went wrong when removing your credentials. Please try again."
            );
        }    
    };

    const handleCancel = () => {
        setShowForm(false);
    };

    return (
        <Container>
        {hasLoaded ? (
            <>            
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
                                <p className="small text-center">Hold Ctrl to select multiple credentials to add to your company profile.</p>
                                <div className={`${styles.Field} my-3 p-3`}>
                                    
                                    <Form.Group className="mb-4">
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
                                                ></option>
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

                                    <Form.Group className="mb-4">
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
                                                ></option>
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
                                    
                                    <Form.Group className="mb-4">
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
                                                ></option>
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
                                                ></option>
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
                <div className={`${styles.Remove} my-3 p-3`}>
                        <Form>
                                <Form.Group className="mb-3">

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
                                                ></option>
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
            </>
        ) : (
            <Asset spinner />
        )}  
        </Container>
    );
};

export default CredentialSelectForm;