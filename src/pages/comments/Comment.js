import React, { useState } from "react";
import { Media } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import styles from "../../styles/Comment.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { DotsDropdown } from "../../components/DotsDropdown";
import { axiosRes } from "../../api/axiosDefaults";
import CommentEditForm from "./CommentEditForm";

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
    } = props;

    const [showEditForm, setShowEditForm] = useState(false);

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;

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
        } catch (err) {
        
        }
    }
    return (
        <>
            <hr />
            <Media>
                <Link to={`/profiles/${profile_id}`}>
                    <Avatar src={profile_image} />
                </Link>
                <Media.Body className="align-self-center ml-2">
                    <span className={styles.Owner}>{owner}</span>
                    <span className={`${styles.Date} small`}>{updated_on}</span>
                    {showEditForm ? (
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
        </>
    );
};

export default Comment;