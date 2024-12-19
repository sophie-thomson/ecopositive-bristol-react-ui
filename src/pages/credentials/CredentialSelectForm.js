import React from "react";
import styles from "../../styles/CredentialSelectForm.module.css";

import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { axiosReq, axiosRes } from "../../api/axiosDefaults";
import { useRedirect } from "../../hooks/useRedirect";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";


function CredentialSelectForm() {
    useRedirect("loggedOut");
    
    const [errors, setErrors] = useState({});

    const [credentialsData, setCredentialsData] = useState({
            credentials: [],
    });

    const {
        credentials,
    } = credentialsData;

    const history = useHistory();

    const handleChange = (event) => {
        setCredentialsData({
            ...credentialsData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();

        // CHECK THIS IF ERROR - might need to have [] instead?
        formData.append("credentials", credentials);

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

    // const handleSubmit = async (event) => {
    //     event.preventDefault();
    //     try {
    //       const { data } = await axiosRes.post("/credentials/", {
    //         credentials,
    //         company,
    //       });
    //       setComments((prevComments) => ({
    //         ...prevComments,
    //         results: [data, ...prevComments.results],
    //       }));
    //       setPost((prevPost) => ({
    //         results: [
    //           {
    //             ...prevPost.results[0],
    //             comments_count: prevPost.results[0].comments_count + 1,
    //           },
    //         ],
    //       }));
    //       setContent("");
    //     } catch (err) {
    //       console.log(err);
    //     }
    //   };


    return (
        <Form onSubmit={handleSubmit}>
            <Row>
                <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
                    <Container
                        className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
                    >
                        <Form.Group>
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
                    </Container>
                </Col>
            </Row>
        </Form>
    )

};


export default CredentialSelectForm;