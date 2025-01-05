import React, { useState } from "react";
import styles from "../../styles/AdminPage.module.css";
import btnStyles from "../../styles/Button.module.css";
import { Link } from "react-router-dom";
import { Alert, Button, Card, Col, Image } from "react-bootstrap";
import { axiosReq } from "../../api/axiosDefaults";
import { useHistory } from "react-router-dom";


const NewCompany = (props) => {
    const { 
        id,
        name,
        logo,
    } = props;
    
    const history = useHistory();
    const [errors, setErrors] = useState({});

    const handleApprove = async (event) => {
        event.preventDefault();

        const approved = { approved: true }
        try {
            await axiosReq.patch(`/companies/${id}/`, approved);
            history.push(`/companies/${id}`);
        } catch (err) {
            console.log(err);
            if (err.response?.status !== 401) {
                setErrors(err.response?.data);
            }
        }
    };
    
    return(
        <div>
            <li className={`${styles.ListItem} d-flex justify-content-between px-2`}>
                <Link to={`/companies/${id}`}>
                    <Image className={`${styles.Logo} mr-3 d-none d-sm-inline`} src={logo} alt={name} />
                    <span className={`${styles.Name}`}>{name}</span>
                </Link>
                <Button
                    className={
                        `${btnStyles.Button} 
                        ${btnStyles.Green}`
                    }
                    onClick={handleApprove}
                    name="approved"
                >
                    Approve
                </Button>
                {errors?.approved?.map((message, idx) => (
                    <Alert variant="warning" key={idx}>
                        {message}
                    </Alert>
                ))}
            </li>   
        </div>
    );
};

export default NewCompany; 