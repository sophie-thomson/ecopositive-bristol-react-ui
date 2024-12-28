import React from "react";
import { Card, CardGroup, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { axiosRes } from "../../api/axiosDefaults";

import { DotsDropdown } from "../../components/DotsDropdown";
import CompanyPage from "./CompanyPage";
import styles from "../../styles/CompanyList.module.css";
import appStyles from "../../App.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

const CompanyList = (props) => {
    const {
        id,
        owner,
        // owner_profile_id,
        // owner_profile_image,
        name,
        logo,
        excerpt,
        endorsements_count,
        comments_count,
        credentials,
    } = props;



    return(
        <Card className={`${styles.Company}`}>
                    <Card.Body>
                    <div className={`${styles.Counts} d-flex justify-content-end`}>
                        <span className={`${styles.Comment} mr-3`}>
                        <i className="far fa-comments" />
                        ({comments_count})
                        </span>
                        <span className={`${styles.Endorse} mr-2`}>
                        <i className="fa-solid fa-award" />
                        ({endorsements_count})
                        </span>
                        
                    </div>
                        <div className="d-flex flex-wrap">
                    <Card.Img className={`${styles.Logo} mr-3`} src={logo} alt={name} />
                    {name && <Card.Text className={`${styles.Header}`}>{name}</Card.Text>}
                    </div>
                        {excerpt &&
                            <Card.Text className="mb-0 text-left">
                                {excerpt}
                            </Card.Text>
                        }
                        {credentials &&
                            <Card.Text>{credentials}</Card.Text>
                        }
                    
                    </Card.Body>
                </Card>
    );
};

export default CompanyList;