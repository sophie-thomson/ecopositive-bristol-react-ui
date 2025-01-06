import React, { useEffect, useState } from "react";
import Avatar from "../../components/Avatar";
// import styles from "../../styles/Comment.module.css";
import styles from "../../styles/AdminPage.module.css";
import btnStyles from "../../styles/Button.module.css";
import { Link } from "react-router-dom";
import { Alert, Button, Media } from "react-bootstrap";
import { axiosReq, axiosRes } from "../../api/axiosDefaults";
import { useHistory } from "react-router-dom";


const ReportedComment = (props) => {
    const { 
        id,
        owner,
        content,
        company,
        reported,
        approved,
        created_on,
        profile_id,
        profile_image,
        setReportedComments,
    } = props;

    const history = useHistory();
    const [errors, setErrors] = useState({});
    const [companyInfo, setCompanyInfo] = useState({});

    useEffect(() => {
            const fetchData = async () => {
                try {
                    const { data } = await axiosReq.get(
                        `/companies/${company}/`
                    );
                    setCompanyInfo(data);
                    console.log(data);

                } catch (err) {
                    console.log(err)    
                }
            }
        
            fetchData();
        }, [id, companyInfo]);
    
    const handleApprove = async (event) => {
        event.preventDefault();

        const approved = { approved: true };
        const reported = { reported: false };
        try {
            await axiosReq.patch(`/comments/${id}/`, {
                approved,
                reported
            });
            setReportedComments((prevComments) => ({
                ...prevComments,
                results: [{approved, reported}, ...prevComments.results],
            }));
            history.push(`/comments/${id}`);
        } catch (err) {
            console.log(err);
            if (err.response?.status !== 401) {
                setErrors(err.response?.data);
            }
        }
    };

    const handleDelete = async () => {
            try {
                await axiosRes.delete(`/comments/${id}/`)
                // await axiosReq.patch(`/companies/${company}/`, {
                //     comments_count: companyData.comments_count - 1
                // });

                setCompanyInfo(prevCompanyInfo => ({
                    results: [{
                        ...prevCompanyInfo.results[0],
                        comments_count: prevCompanyInfo.results[0].comments_count - 1
                    }]
                }));
    
                setReportedComments(prevComments => ({
                    ...prevComments,
                    results: prevComments.results.filter(comment => comment.id !== id),
                }));
            } catch (err) {
            
            }
        };

    return(
        <>
            <hr />
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
                    <span className={styles.Company}>{company}</span>
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