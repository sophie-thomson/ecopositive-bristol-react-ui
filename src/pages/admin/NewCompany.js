import React, { useState } from "react";
import styles from "../../styles/AdminPage.module.css";
import btnStyles from "../../styles/Button.module.css";
import { Link } from "react-router-dom";
import { Alert, Button, Image } from "react-bootstrap";
import { axiosReq } from "../../api/axiosDefaults";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";


const NewCompany = (props) => {
    const { 
        id,
        name,
        logo,
        created_on,
    } = props;
    
    const history = useHistory();
    const [errors, setErrors] = useState({});

    const handleApprove = async (event) => {
        event.preventDefault();

        const approved = { approved: true };
        try {
            await axiosReq.patch(`/companies/${id}/`, approved);
            history.push(`/companies/${id}`);
            toast.success("Company successfully approved!");
        } catch (err) {
            toast.error(
                "Oops! Something went wrong when approving this company. Please refresh the page and try again."
            );
            if (err.response?.status !== 401) {
                setErrors(err.response?.data);
            }
        }
    };
    
    return(
        <div>
            <li className={`${styles.ListItem} d-flex justify-content-between px-2`}>
                <Link to={`/companies/${id}`}>
                    <Image 
                        className={`${styles.Logo} mr-3 d-none d-md-inline`} 
                        src={logo} 
                        alt={name} />
                    <span className={`${styles.Name}`}>
                        {name}
                    </span>
                </Link>
                <span className="d-flex align-items-center text-muted small"
                >
                    Added: {created_on}
                </span>
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