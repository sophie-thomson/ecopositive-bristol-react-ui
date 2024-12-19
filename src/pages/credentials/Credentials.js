import React from "react";
import styles from "../../styles/CredentialSelectForm.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import CompanyPage from "../companies/CompanyPage";
import { useHistory } from "react-router-dom";
import { Card } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { DotsDropdown } from "../../components/DotsDropdown";
import { axiosRes } from "../../api/axiosDefaults";


const Credentials = (props) => {
    const {
        credentials,
 } = props;

    const currentUser = useCurrentUser();
    // const is_owner = currentUser?.username === owner;
    const history = useHistory();
 
    // const handleEdit = () => {
    //     history.push(`/companies/${id}/credentials/edit`);
    // };
 
    // const handleDelete = async () => {
    //     try {
    //         await axiosRes.delete(`/companies/${id}/credentials`);
    //         history.goBack();
    //     } catch (err) {
    //         console.log(err);
    //     }
    // };

    return (
        <Container>
            <Col>
            <div className="d-flex align-items-center">
            {/* <span>{updated_on}</span> */}
            {/* {is_owner && CompanyPage && (
              <DotsDropdown
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            )} */}
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