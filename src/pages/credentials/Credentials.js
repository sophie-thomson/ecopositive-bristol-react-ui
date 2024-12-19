import React from "react";
import styles from "../../styles/CredentialSelectForm.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useHistory } from "react-router-dom";
import { Card } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";


const Credentials = (props) => {
    const {
        credentials,
 } = props;

    const currentUser = useCurrentUser();
    // const is_owner = currentUser?.username === owner;
    const history = useHistory();

    return (
        <Container>
            <Col>
            <div className="d-flex align-items-center">
            {/* <span>{updated_on}</span> */}
            
          </div>
                <Card className={styles.Company}>
                    <Card.Body>
                        <Card.Title className="text-center">
                            Eco-Conscious Approach
                        </Card.Title>
                        {credentials && <Card.Text>{credentials}</Card.Text>}
                    </Card.Body>
                </Card>
            </Col>
            <Col>
                <Card className={styles.Company}>
                    <Card.Body>
                        <Card.Title className="text-center">
                            Membership / Accreditation
                        </Card.Title>
                        {credentials && <Card.Text>{credentials}</Card.Text>}
                    </Card.Body>
                </Card>
            </Col>
            <Col>
                <Card className={styles.Company}>
                    <Card.Body>
                        <Card.Title className="text-center">
                            Socially Responsible
                        </Card.Title>
                        {credentials && <Card.Text>{credentials}</Card.Text>}  
                    </Card.Body>
                </Card>
            </Col>
            <Col>
                <Card className={styles.Company}>
                    <Card.Body>
                        <Card.Title className="text-center">
                            Sustainable Production / Materials
                        </Card.Title>
                        {credentials && <Card.Text>{credentials}</Card.Text>}
                    </Card.Body>
                </Card>
            </Col>
        </Container>
    );
};

export default Credentials;