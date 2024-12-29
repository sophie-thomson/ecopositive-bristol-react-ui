import React from "react";
import styles from "../../styles/Company.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Button, Card } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
// import Avatar from "../../components/Avatar";
import { axiosReq, axiosRes } from "../../api/axiosDefaults";
import { DotsDropdown } from "../../components/DotsDropdown";
import CompanyPage from "./CompanyPage";
import btnStyles from "../../styles/Button.module.css";

const Company = (props) => {
    const {
        id,
        owner,
        // owner_profile_id,
        // owner_profile_image,
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
        } catch (err) {
            console.log(err);
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
        } catch (err) {
            console.log(err);
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
                            handleDelete={handleDelete}
                        />
                    )}
                </Card.Text>
                <hr className={`${styles.Rule}`} />
                <div 
                    className={`${styles.Endorse} text-muted d-flex align-items-center justify-content-end`}
                >
                    <Link to={`/companies/${id}`} className={` ${styles.Comment} mr-2 text-muted`}>
                        <i className="far fa-comments" />
                        {comments_count}
                    </Link>
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
                  {/* <Link to={`/profiles/${owner_profile_id}`}>
                              <Avatar src={owner_profile_image} height={55} />
                              {owner}
                            </Link> */}
                  
                  {/* <Link to={`/companies/${id}`}>
                    <i className="far fa-comments" />
                    {comments_count}
                  </Link> */}
                  
                
                {/* <span className="text-muted text-small">Last updated: {updated_on}</span> */}
            </Card.Body>
        </Card>
    );
};

export default Company;