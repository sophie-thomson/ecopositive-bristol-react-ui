import React, { useEffect, useState } from "react";
import Avatar from "../../components/Avatar";
import styles from "../../styles/AdminPage.module.css";
import btnStyles from "../../styles/Button.module.css";
import { Link } from "react-router-dom";
import { Alert, Button, Media } from "react-bootstrap";
import { axiosReq, axiosRes } from "../../api/axiosDefaults";
import { toast } from "react-toastify";


const ReportedComment = (props) => {
    const { 
        id,
        owner,
        content,
        company,
        created_on,
        profile_id,
        profile_image,
    } = props;

    const [errors, setErrors] = useState({});
    const [companyInfo, setCompanyInfo] = useState({});

    useEffect(() => {
            const fetchData = async () => {
                try {
                    const { data } = await axiosReq.get(
                        `/companies/${company}/`
                    );
                    setCompanyInfo(data);

                } catch (err) {
                    console.log(err)    
                }
            }
        
            fetchData();
        }, [id, setCompanyInfo, company]);
    
    const handleApprove = async (event) => {
        event.preventDefault();

        try {
            await axiosReq.patch(`/comments/${id}/`, {
                approved: true,
                reported: false,
            });
            window.location.reload();
            toast.success("Comment approved successfully!");
        } catch (err) {
            console.log(err);
            toast.error("Oops! Something went wrong when approving this comment. Please refresh the page and try again.");
            if (err.response?.status !== 401) {
                setErrors(err.response?.data);
            }
        }
    };

    const handleDelete = async () => {
        try {
                await axiosRes.delete(`/comments/${id}/`)
                await axiosReq.patch(`/companies/${company}/`, {
                    comments_count: companyInfo.comments_count - 1
                });
                window.location.reload();
                toast.success("Comment deleted successfully!");
        } catch (err) {
                console.log(err);
                toast.error("Oops! Something went wrong when deleting this comment. Please refresh the page and try again.");
        }
    };

    return(
        <>
            <li className={`${styles.ListItem}`}>
            <Link to={`/companies/${company}`}>
                    <span className={`${styles.Name} m-2 pb-3`}>{companyInfo.name}</span>
            </Link>
            
            <Media>
                
                <Link to={`/profiles/${profile_id}`}>
                    <Avatar src={profile_image} />
                </Link>
                <Media.Body className="align-self-center ml-2">
                    <span className={styles.Owner}>{owner}</span>
                    <span className={`${styles.Date} small`}>{created_on}</span>
                    
                        <p className="smaller font-italic">
                            <i className="fa-solid fa-quote-left"></i>
                            {content}
                            <i className="fa-solid fa-quote-right"></i>
                        </p>
                </Media.Body>
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
                <Button
                    className={
                        `${btnStyles.Button} 
                        ${btnStyles.Red}`
                    }
                    onClick={handleDelete}
                    name="approved"
                >
                    Delete
                </Button>
                {errors?.approved?.map((message, idx) => (
                    <Alert variant="warning" key={idx}>
                        {message}
                    </Alert>
                ))}
            </Media>
            </li>
        </>
    );
};

export default ReportedComment; 