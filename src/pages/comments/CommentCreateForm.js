import React, { useState } from "react";
import { Link } from "react-router-dom";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import styles from "../../styles/CommentCreateEditForm.module.css";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function CommentCreateForm(props) {
    const { 
        company,
        setCompany, 
        setComments,
        profileImage,
        profile_id,
    } = props;
  
    const [content, setContent] = useState("");

    const handleChange = (event) => {
      setContent(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await axiosRes.post("/comments/", {
                content,
                company,
            });
            setComments((prevComments) => ({
                ...prevComments,
                results: [data, ...prevComments.results],
            }));
            setCompany((prevCompany) => ({
                results: [
                    {
                      ...prevCompany.results[0],
                      comments_count: prevCompany.results[0].comments_count + 1,
                    },
                ],
            }));
            setContent("");
            toast.success("Comment created successfully!");
        } catch (err) {
            toast.error("Something went wrong while adding your comment")
        }
    };

    return (
        <Form className="mt-2" onSubmit={handleSubmit}>
            <Form.Group>
                <InputGroup>
                  <Link to={`/profiles/${profile_id}`}>
                      <Avatar src={profileImage} />
                  </Link>
                  <Form.Control
                      className={styles.Form}
                      placeholder="Comment..."
                      as="textarea"
                      value={content}
                      onChange={handleChange}
                      rows={2}
                  />
                </InputGroup>
            </Form.Group>
            <button
                className={`${styles.Button} btn d-block ml-auto shadow-sm`}
                disabled={!content.trim()}
                type="submit"
            >
                Add Comment
            </button>
        </Form>
    );
}

export default CommentCreateForm;