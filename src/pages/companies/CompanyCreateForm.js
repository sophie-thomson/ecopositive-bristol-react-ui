import React from "react";
import { useState } from "react";
import { useRef } from "react";
import { useHistory } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import { useRedirect } from "../../hooks/useRedirect";
import { InputGroup } from "react-bootstrap";
import { toast } from "react-toastify";

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


function CompanyCreateForm() {
    useRedirect("loggedOut");

    const [errors, setErrors] = useState({});

    const [companyData, setCompanyData] = useState({
        name: "",
        logo: "",
        website_url: "",
        street: "",
        city: "",
        postcode: "",
        phone: "",
        excerpt: "",
        description: "",
        key_words: "",
        contact_name: "",
        contact_email: "",
        role: "",
      });

    const {
        name,
        logo,
        website_url,
        street,
        city,
        postcode,
        phone,
        excerpt,
        description,
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
        formData.append("street", street);
        formData.append("city", city);
        formData.append("postcode", postcode);
        formData.append("phone", phone);
        formData.append("excerpt", excerpt);
        formData.append("description", description);
        formData.append("key_words", key_words);
        formData.append("contact_name", contact_name);
        formData.append("contact_email", contact_email);
        formData.append("role", role);
    
        try {
            const { data } = await axiosReq.post("/companies/", formData);
            history.push(`/companies/${data.id}`);

            toast.success("Company created successfully!");
        } catch (err) {
            console.log(err);
            toast.error("Oops! Something went wrong while adding your company.")
            if (err.response?.status !== 401) {
                setErrors(err.response?.data);
            }
            
        }
      };

    const textFields = (
        <div className="text-center">
            <p className={`${styles.Header}`}>
                <i className="fa-regular fa-pen-to-square"></i>
                Contact
            </p>
            <hr className={`${appStyles.Rule}`} />

            <Form.Group>
                <Form.Label className={`${styles.Field}`}>Company Address</Form.Label>
                <Form.Control
                className={`${styles.Input}`}
                type="text"
                name="street"
                value={street}
                onChange={handleChange}
                placeholder="Building number and street name"
                />
            </Form.Group>
            {errors?.street?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                {message}
                </Alert>
            ))}

            <Form.Group>
                <Form.Control
                className={`${styles.Input}`}
                type="text"
                name="city"
                value={city}
                onChange={handleChange}
                placeholder="City"
                />
            </Form.Group>
            {errors?.city?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                {message}
                </Alert>
            ))}

            <Form.Group>
                <Form.Control
                className={`${styles.Input} ${styles.Postcode}`}
                type="text"
                name="postcode"
                value={postcode}
                onChange={handleChange}
                placeholder="Postcode"
                />
            </Form.Group>
            {errors?.postcode?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                {message}
                </Alert>
            ))}

            <Form.Group>
                <InputGroup>
                    <InputGroup.Prepend>
                        <InputGroup.Text
                            className={`${styles.Phone} mb-2`}
                        >
                            (+44)
                        </InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control
                    className={`${styles.Input} mb-2`}
                    type="number"
                    name="phone"
                    value={phone}
                    onChange={handleChange}
                    placeholder="Telephone"
                    inputMode="numeric"
                    />
                </InputGroup>
            </Form.Group>
            {errors?.phone?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                {message}
                </Alert>
            ))}

            <hr className={`${appStyles.Rule} mt-4`} />
            
            <Form.Group>
                <Form.Label className={`${styles.Field}`}>Company Contact Name</Form.Label>
                <Form.Control
                className={`${styles.Input}`}
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
                <Form.Label className={`${styles.Field}`}>Role in Company</Form.Label>
                <Form.Control
                className={`${styles.Input}`}
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

            <Form.Group>
                <Form.Label className={`${styles.Field}`}>Contact Email</Form.Label>
                <Form.Control
                className={`${styles.Input}`}
                type="email"
                name="contact_email"
                value={contact_email}
                onChange={handleChange}
                placeholder="contact@companyname.com"
                />
                <Form.Text className="text-muted text-center">
                    Company contact will be emailed for verification evidence
                </Form.Text>
            </Form.Group>
            {errors?.contact_email?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                {message}
                </Alert>
            ))}
            
            <Button
                className={`${btnStyles.Button} ${btnStyles.Bright}`}
                onClick={() => history.goBack()}
            >
                X Cancel
            </Button>
            <Button className={`${btnStyles.Button} ${btnStyles.Green}`} type="submit">
                Submit Company
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
                        
                        <p className={`${styles.Header}`}>
                            <i className="fa-regular fa-pen-to-square"></i>
                            Company Details
                        </p>
                        <hr className={`${styles.Rule}`} />
                        
                        <Form.Group>
                            
                            <Form.Label className={`${styles.Field}`}>Company Name</Form.Label>
                            <Form.Control
                            className={`${styles.Input}`}
                            type="text"
                            name="name"
                            value={name}
                            onChange={handleChange}
                            // placeholder="Add your company name"
                            />
                        </Form.Group>
                        {errors?.name?.map((message, idx) => (
                            <Alert variant="warning" key={idx}>
                            {message}
                            </Alert>
                        ))}

                        <Form.Label className={`${styles.Field}`}>
                            Logo / Branding Image
                        </Form.Label>
                        <Form.Group className={`${styles.Logo}`}>
                            
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
                            <Form.Text className="text-muted text-center">
                                max size 800 x 800 pixels
                            </Form.Text>
                            </Form.Group>
                            {errors?.image?.map((message, idx) => (
                                <Alert variant="warning" key={idx}>
                                    {message}
                                </Alert>
                            ))}



                        <Form.Group>
                            <Form.Label className={`${styles.Field}`}>
                                Company Website
                            </Form.Label>
                            <Form.Control
                            className={`${styles.Input}`}
                            type="URL"
                            name="website_url"
                            value={website_url}
                            onChange={handleChange}
                            placeholder="https://"
                            />
                        </Form.Group>
                        {errors?.website_url?.map((message, idx) => (
                            <Alert variant="warning" key={idx}>
                            {message}
                            </Alert>
                        ))}
                        
                        <Form.Group>
                            <Form.Label className={`${styles.Field}`}>Brief Description</Form.Label>
                            <Form.Control
                            className={`${styles.Input}`}
                            as="textarea"
                            rows={3}
                            name="excerpt"
                            value={excerpt}
                            onChange={handleChange}
                            placeholder="What does your company or business do in a nutshell?"
                            />
                        </Form.Group>
                        {errors?.excerpt?.map((message, idx) => (
                            <Alert variant="warning" key={idx}>
                            {message}
                            </Alert>
                        ))}

                        <Form.Group>
                            <Form.Label className={`${styles.Field}`}>Further Information</Form.Label>
                            <Form.Control
                            className={`${styles.Input}`}
                            as="textarea"
                            rows={6}
                            name="description"
                            value={description}
                            onChange={handleChange}
                            placeholder="Tell people a bit more about your company and your ethos / vision."
                            />
                        </Form.Group>
                        {errors?.description?.map((message, idx) => (
                            <Alert variant="warning" key={idx}>
                            {message}
                            </Alert>
                        ))}

                        <Form.Group>
                            <Form.Label className={`${styles.Field}`}>Key Words</Form.Label>
                            <Form.Control
                            className={`${styles.Input}`}
                            as="textarea"
                            rows={3}
                            name="key_words"
                            value={key_words}
                            onChange={handleChange}
                            placeholder="Words associated with your main activities."
                            />
                            <Form.Text className="text-muted text-center">
                                Separate each word with a comma
                            </Form.Text>
                        </Form.Group>
                        {errors?.key_words?.map((message, idx) => (
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

export default CompanyCreateForm;