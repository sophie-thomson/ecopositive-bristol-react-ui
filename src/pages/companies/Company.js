import React, { useState } from "react";
import styles from "../../styles/Company.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Button, Card, Modal } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { axiosReq, axiosRes } from "../../api/axiosDefaults";
import { DotsDropdown } from "../../components/DotsDropdown";
import CompanyPage from "./CompanyPage";
import btnStyles from "../../styles/Button.module.css";
import { toast } from "react-toastify";

const Company = (props) => {
    const {
        id,
        owner,
        name,
        logo,
        website_url,
        excerpt,
        description,
        endorsements_count,
        endorsement_id,
        comments_count,
        setCompany,
    } = props;

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;
    const history = useHistory();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleEdit = () => {
        history.push(`/companies/${id}/edit`);
    };
    
    const handleDelete = async () => {
        try {
            await axiosRes.delete(`/companies/${id}/`);
            history.goBack();
            toast.success("Company deleted successfully!")
        } catch (err) {
            toast.error("Oops! Something went wrong when deleting your company.")
        }
    };
    
    const handleEndorse = async () => {
        try {
            const { data } = await axiosReq.post("/endorsements/", {
                endorsed_company: id,
            });

            setCompany((prevCompany) => ({
                ...prevCompany,
                endorsements_count: prevCompany.endorsements_count + 1,
                endorsement_id: data.id,
            }));
            window.location.reload();
            toast.success("Company endorsed successfully!")
        } catch (err) {
            console.log(err);
            toast.error("Oops! Something went wrong when endorsing this company. Please try again.")
        }
    };

    const handleUnendorse = async () => {
        try {
            await axiosRes.delete(`/endorsements/${endorsement_id}/`);
            setCompany((prevCompany) => ({
                ...prevCompany,
                endorsements_count: prevCompany.endorsements_count - 1,
                endorsement_id: null,
            }));
            window.location.reload();
            toast.success("Endorsement removed successfully!")
        } catch (err) {
            toast.error("Oops! Something went wrong when removing your endorsement. Please try again.")
        }
    };
    
    return (
        <Card className={styles.Company}>
            <Card.Body>
                <div className={`${styles.Endorse} d-flex align-items-center`}>
                    <div className="text-muted">
                        <i className="fa-solid fa-award" />
                        {endorsements_count}
                        <span 
                            className="d-none d-sm-inline"
                        >    
                            {endorsements_count > 1 ? (
                                <span> endorsements</span>
                            ) : endorsements_count === 1 ? (
                                <span> endorsement</span>
                            ) : (
                                <span> endorsements yet</span>
                            )}
                        </span>
                    </div>
            
                    {is_owner ? (
                        null
                    ) : endorsement_id ? (
                        <Button 
                            className={
                                `${btnStyles.Button} 
                                ${btnStyles.Remove} 
                                ${styles.Remove} 
                                ml-auto`
                            } 
                            onClick={handleUnendorse}
                        >
                            <i className="fa-solid fa-circle-minus" />
                            Remove Endorsement
                        </Button>
                    ) : currentUser ? (
                        <Button 
                            className={`${btnStyles.Button} ${btnStyles.Green} ${styles.Endorse} ml-auto`} 
                            onClick={handleEndorse}
                        >
                            <i className="fa-solid fa-award" />
                            Endorse Company
                        </Button>
                    ) : (
                        <div className={`${styles.Link} ml-auto`}>
                            <i className="fa-solid fa-award" />
                            <Link className={styles.Link} to="/signin">
                                <span className={`${styles.Bold}`}>Sign in</span> to endorse company
                            </Link>
                        </div>    
                        )}
                </div>
                <Card.Text as="div" className="d-flex align-items-center justify-content-center">
                    <a 
                        href={website_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        aria-label={`Visit ${name} website`}
                    > 
                        {name && <Card.Title className={`${styles.Header} m-auto py-4`}>
                            {name}
                        </Card.Title>}
                    </a>
                    {is_owner && CompanyPage && (
                        <DotsDropdown
                            handleEdit={handleEdit}
                            handleDelete={handleShow}
                        />
                    )}
                </Card.Text>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Delete Company?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Are you sure you want to delete this company? 
                        This action cannot be undone, and all endorsements and 
                        comments will be deleted.
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            X Cancel
                        </Button>
                        <Button variant="danger" onClick={handleDelete}>
                            Confirm Delete
                        </Button>
                    </Modal.Footer>
                </Modal>
                <hr className={`${styles.Rule}`} />
                <div 
                    className={`${styles.Endorse} text-muted d-flex align-items-center justify-content-end`}
                >
                    <div className={` ${styles.Comment} mr-2 text-muted`}>
                        <i className="far fa-comments" />
                        {comments_count}
                    </div>
                </div>
                <div className="d-flex justify-content-center">
                    <a 
                        href={website_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        aria-label={`Visit ${name} website`}
                    > 
                        <Card.Img className={`${styles.Logo}`} src={logo} alt={name} />
                    </a>
                
                </div>
                <div className=" my-3 text-left">
                    {excerpt && <Card.Text>{excerpt}</Card.Text>}
                    {description && <Card.Text>{description}</Card.Text>}
                </div>
            </Card.Body>
        </Card>
    );
};

export default Company;