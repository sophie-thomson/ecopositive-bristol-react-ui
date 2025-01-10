import React, { useState } from "react";
import { Button, Media } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import styles from "../../styles/Comment.module.css";
import btnStyles from "../../styles/Button.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { DotsDropdown } from "../../components/DotsDropdown";
import { axiosReq, axiosRes } from "../../api/axiosDefaults";
import CommentEditForm from "./CommentEditForm";
import { toast } from "react-toastify";

const Comment = (props) => {
    const { 
        profile_id,
        profile_image,
        owner,
        updated_on,
        content,
        id,
        setCompany,
        setComments,
        reported,
    } = props;

    const [showEditForm, setShowEditForm] = useState(false);
    const [showReportBtn, setShowReportBtn] = useState(false);

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;

    const displayButtons = (event) => {
        event.preventDefault();
        setShowReportBtn(prevState => !prevState);
    };
    
    const handleDelete = async () => {
        try {
            await axiosRes.delete(`/comments/${id}/`)
            setCompany(prevCompany => ({
                results: [{
                    ...prevCompany.results[0],
                    comments_count: prevCompany.results[0].comments_count - 1
                }]
            }));

            setComments(prevComments => ({
                ...prevComments,
                results: prevComments.results.filter(comment => comment.id !== id),
            }));
            toast.error("Comment deleted")
        } catch (err) {
        
        }
    };

    const handleReport = async (event) => {
        event.preventDefault();
    
        try {
            await axiosReq.patch(`/comments/${id}/`, {
                approved: false,
                reported: true,
            });
            setShowReportBtn();
            toast.success("Comment successfully reported for review by staff.")
            setComments(prevComments => ({
                ...prevComments,
                results: prevComments.results.map((comment) => {
                    return comment.id === id
                        ? {
                            ...comment,
                            reported: true,
                          }
                        : comment;
                }),
            }));
                
        } catch (err) {
            console.log(err);
            toast.error("Oops! Something went wrong when reporting this comment. Please try again.")
        }
    };

    return (
        <>
            <hr />
            <Media className="d-flex">
                <Link to={`/profiles/${profile_id}`}>
                    <Avatar src={profile_image} />
                </Link>
                <Media.Body className="align-self-center ml-2">
                    <span className={styles.Owner}>
                        {owner}
                    </span>
                    <span className={`${styles.Date} small`}>
                        {updated_on}
                    </span>
                    {showEditForm && is_owner ? (
                        <CommentEditForm
                            id={id}
                            profile_id={profile_id}
                            content={content}
                            profileImage={profile_image}
                            setComments={setComments}
                            setShowEditForm={setShowEditForm}
                        />
                    ) : (
                        <p className="smaller font-italic">
                            <i className="fa-solid fa-quote-left"></i>
                            {content}
                            <i className="fa-solid fa-quote-right"></i>
                        </p>
                    )}
                </Media.Body>
                
                {is_owner && !showEditForm && (
                    <DotsDropdown
                      handleEdit={() => setShowEditForm(true)}
                      handleDelete={handleDelete}
                    />
                )}
            </Media>
            {currentUser && (
                    <>
                    <span className={`${reported ? styles.Reported : styles.NotReported}`}>
                    <i 
                        className="fa-solid fa-flag"
                        onClick={displayButtons} 
                    />
                    {reported && <span className="small text-muted">Comment Reported</span>}
                    </span>
                        {showReportBtn && reported && is_owner ? (
                            <p>
                                Your comment has been reported,&nbsp;
                                you may wish to edit or delete this comment.
                            </p>
                        ) : showReportBtn && reported && !is_owner ? (
                            <p>
                                This comment is being reviewed by ecoPositive staff.
                            </p>
                        ) : showReportBtn && is_owner ? (
                            <p>
                                You cannot report your own comment.
                            </p>
                        ) : showReportBtn ? (
                            <>
                            <p>Report this comment?</p>
                            <Button
                                className={`${btnStyles.Button} ${btnStyles.Red} btn`}
                                onClick={handleReport}
                            >
                                Yes
                            </Button>
                            <Button
                                className={`${btnStyles.Button} ${btnStyles.Bright} btn`}
                                onClick={displayButtons}
                            >
                                No
                            </Button>
                        </>
                        ) : null
                    }
                    </>
                )}
        </>
    );
};

export default Comment;