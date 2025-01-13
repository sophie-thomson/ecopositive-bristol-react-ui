import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";

import Form from "react-bootstrap/Form";
import styles from "../../styles/CommentCreateEditForm.module.css";
import btnStyles from "../../styles/Button.module.css";

import { axiosRes } from "../../api/axiosDefaults";


function CommentEditForm(props) {
    const { 
        id,
        content, 
        setShowEditForm, 
        setComments 
    } = props;

    const [formContent, setFormContent] = useState(content);

    const handleChange = (event) => {
        setFormContent(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axiosRes.put(`/comments/${id}/`, {
            content: formContent.trim(),
            });
            setComments((prevComments) => ({
                ...prevComments,
                results: prevComments.results.map((comment) => {
                    return comment.id === id
                        ? {
                            ...comment,
                            content: formContent.trim(),
                            updated_at: "now",
                          }
                        : comment;
                }),
            }));
            toast.success("Comment updated successfully!");
            setShowEditForm(false);
        } catch (err) {
            toast.error("Something went wrong while updating your comment");
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="pr-1">
                <Form.Control
                    className={styles.Form}
                    as="textarea"
                    value={formContent}
                    onChange={handleChange}
                    rows={2}
                />
            </Form.Group>
            <div className="text-right">
                <button
                    className={`${btnStyles.Button} ${btnStyles.Bright} btn`}
                    onClick={() => setShowEditForm(false)}
                    type="button"
                >
                    X Cancel
                </button>
                <button
                    className={styles.Button}
                    disabled={!content.trim()}
                    type="submit"
                >
                    Save
                </button>
            </div>
        </Form>
    );
}

export default CommentEditForm;