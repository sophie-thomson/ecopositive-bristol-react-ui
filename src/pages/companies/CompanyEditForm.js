import React from "react";
import { useState } from "react";
import { useRef } from "react";
import { useHistory } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import { useRedirect } from "../../hooks/useRedirect";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Image from "react-bootstrap/Image";

import Upload from "../../assets/upload.png";

import styles from "../../styles/CompanyCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import Asset from "../../components/Asset";

function CompanyEditForm() {
    useRedirect("loggedOut");

    const [errors, setErrors] = useState({});

    const [companyData, setCompanyData] = useState({
        name: "",
        logo: "",
        website_url: "",
        excerpt: "",
        description: "",
        // credentials: 0,
        key_words: "",
        contact_name: "",
        contact_email: "",
        role: "",
      });

    const {
        name,
        logo,
        website_url,
        excerpt,
        description,
        // credentials,
        key_words,
        contact_name,
        contact_email,
        role,
    } = companyData;

    const imageInput = useRef(null);

    const history = useHistory();

    const handleChange = (event) => {
        setCompanyData({
            ...companyData,
            [event.target.name]: event.target.value,
        });
    };
    
    const handleChangeImage = (event) => {
        if (event.target.files.length) {
          URL.revokeObjectURL(logo);
          setCompanyData({
            ...companyData,
            logo: URL.createObjectURL(event.target.files[0]),
          });
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
    
        formData.append("name", name);
        formData.append("logo", imageInput.current.files[0]);
        formData.append("website_url", website_url);
        formData.append("excerpt", excerpt);
        formData.append("description", description);
        // formData.append("credentials", credentials);
        formData.append("key_words", key_words);
        formData.append("contact_name", contact_name);
        formData.append("contact_email", contact_email);
        formData.append("role", role);
    
        try {
            const { data } = await axiosReq.post("/companies/", formData);
            history.push(`/companies/${data.id}`);
            console.log(data);
        } catch (err) {
            console.log(err);
            if (err.response?.status !== 401) {
                setErrors(err.response?.data);
            }
            
        }
      };

    const textFields = (
        <div className="text-center">
            <Form.Group>
                <Form.Label>Company Name</Form.Label>
                <Form.Control
                type="text"
                name="name"
                value={name}
                onChange={handleChange}
                />
            </Form.Group>
            {errors?.name?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                {message}
                </Alert>
            ))}

            <Form.Group>
                <Form.Label>Company Website</Form.Label>
                <Form.Control
                type="URL"
                name="website_url"
                value={website_url}
                onChange={handleChange}
                />
            </Form.Group>
            {errors?.website_url?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                {message}
                </Alert>
            ))}
            
            <Form.Group>
                <Form.Label>Brief Description</Form.Label>
                <Form.Control
                as="textarea"
                rows={3}
                name="excerpt"
                value={excerpt}
                onChange={handleChange}
                />
            </Form.Group>
            {errors?.excerpt?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                {message}
                </Alert>
            ))}

            <Form.Group>
                <Form.Label>Further Information</Form.Label>
                <Form.Control
                as="textarea"
                rows={6}
                name="description"
                value={description}
                onChange={handleChange}
                />
            </Form.Group>
            {errors?.description?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                {message}
                </Alert>
            ))}

            {/* <Form.Group>
                <Form.Label>Eco-Credentials</Form.Label>
                <Form.Control
                as="select"
                name="credentials"
                value={credentials}
                onChange={handleChange}
                />
            </Form.Group>
            {errors?.credentials?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                {message}
                </Alert>
            ))} */}

            <Form.Group>
                <Form.Label>Key Words</Form.Label>
                <Form.Control
                as="textarea"
                rows={3}
                name="key_words"
                value={key_words}
                onChange={handleChange}
                />
            </Form.Group>
            {errors?.key_words?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                {message}
                </Alert>
            ))}
            
            <Form.Group>
                <Form.Label>Company Contact Name</Form.Label>
                <Form.Control
                type="text"
                name="contact_name"
                value={contact_name}
                onChange={handleChange}
                />
            </Form.Group>
            {errors?.contact_name?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                {message}
                </Alert>
            ))}

            <Form.Group>
                <Form.Label>Contact Email</Form.Label>
                <Form.Control
                type="email"
                name="contact_email"
                value={contact_email}
                onChange={handleChange}
                />
            </Form.Group>
            {errors?.contact_email?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                {message}
                </Alert>
            ))}

            <Form.Group>
                <Form.Label>Role in Company</Form.Label>
                <Form.Control
                type="text"
                name="role"
                value={role}
                onChange={handleChange}
                />
            </Form.Group>
            {errors?.role?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                {message}
                </Alert>
            ))}
            
            <Button
                className={`${btnStyles.Button} ${btnStyles.Bright}`}
                onClick={() => history.goBack()}
            >
                cancel
            </Button>
            <Button className={`${btnStyles.Button} ${btnStyles.Green}`} type="submit">
                create
            </Button>
        </div>
    );

    return (
        <Form onSubmit={handleSubmit}>
            <Row>
                <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
                    <Container
                        className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
                    >
                        <Form.Group className="text-center">
                            {logo ? (
                                <>
                                <figure>
                                    <Image
                                        className={appStyles.Image}
                                        src={logo}
                                        rounded
                                    />
                                </figure>
                                <div>
                                    <Form.Label
                                    className={`${btnStyles.Button} ${btnStyles.Green} btn`}
                                    htmlFor="image-upload"
                                    >
                                    Change the image
                                    </Form.Label>
                                </div>
                                </>
                            ) : (
                                <Form.Label
                                    className="d-flex justify-content-center"
                                    htmlFor="image-upload"
                                >
                                <Asset
                                    src={Upload}
                                    message="Click or tap to upload logo"
                                />
                                </Form.Label>
                            )}

                            <Form.File
                                id="image-upload"
                                accept="image/*"
                                onChange={handleChangeImage}
                                ref={imageInput}
                            />
                            </Form.Group>
                            {errors?.image?.map((message, idx) => (
                                <Alert variant="warning" key={idx}>
                                    {message}
                                </Alert>
                            ))}
                        <div className="d-md-none">{textFields}</div>
                    </Container>
                </Col>
                <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2">
                    <Container
                        className={appStyles.Content}>{textFields}
                    </Container>
                </Col>
            </Row>
        </Form>
    );
}

export default CompanyEditForm;