import React from "react";
import styles from "../../styles/CompanyContact.module.css";
import appStyles from "../../App.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Button, Card, Col } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
// import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";
import { DotsDropdown } from "../../components/DotsDropdown";
import CompanyPage from "./CompanyPage";
// import btnStyles from "../../styles/Button.module.css";


const CompanyContact = (props) => {
    const {
        id,
        owner,
        street,
        city,
        postcode,
        phone,
        website_url,
    } = props;

    const currentUser = useCurrentUser();
        const is_owner = currentUser?.username === owner;
        const history = useHistory();
    
    const handleEdit = () => {
        history.push(`/companies/${id}/edit`);
    };
        
    const handleDelete = async () => {
        try {
            await axiosRes.delete(`/companies/${id}/`);
            history.goBack();
        } catch (err) {
            console.log(err);
            }
    };

    return (
        <Card className={styles.Company}>
            <Card.Body>
                <div className="d-flex align-items-center justify-content-center">
                        <Card.Title className={`${styles.Header} m-auto py-4`}>
                                Contact
                        </Card.Title>
                        
                        {is_owner && CompanyPage && (
                                <DotsDropdown
                                    handleEdit={handleEdit}
                                    handleDelete={handleDelete}
                                />
                        )}
                </div>
                <hr className={`${appStyles.Rule}`} />
                <Card.Text as="div">
                <div className={`${styles.Address} d-flex text-left`}>
                    <Col className="text-right pr-0">
                        <i className="fa-solid fa-location-dot" />
                    </Col>
                    <Col xs={10} className="mb-2">
                    {street && city && postcode && 
                        <Card.Text>
                            {street},<br />
                            {city},<br />
                            <span
                                className={`${styles.Postcode}`}
                            >
                                {postcode}
                            </span>
                        </Card.Text>
                    }
                    </Col>
                </div>
                <div className={`${styles.Address} d-flex text-left`}>
                    <Col className="text-right pr-0">
                        <i className="fa-solid fa-phone" />
                    </Col>
                    <Col xs={10}>
                        {phone && 
                            <Card.Text className={`${styles.Phone}`}>
                                {phone}
                            </Card.Text>
                        }
                    </Col>
                </div>
                <div className={`${styles.Address} d-flex text-left mt-2`}>
                    <Col className="text-right pr-0">
                        <i className="fa-solid fa-globe" />
                    </Col>
                    <Col xs={10}>
                        {website_url && 
                            <Card.Text className={`${styles.Website}`}>
                                <a href={website_url} target="_blank">Visit website</a>
                            </Card.Text>
                        }
                    </Col>
                </div>
                </Card.Text>   
            </Card.Body>
        </Card>
    );

};

export default CompanyContact;