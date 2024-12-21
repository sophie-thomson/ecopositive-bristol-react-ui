import React from "react";
import styles from "../../styles/Company.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Button, Card, Form, Media } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
// import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";
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
        // website_url,
        excerpt,
        description,
        // created_on,
        updated_on,
        // credentials,
        // endorsing_users,
        endorsements_count,
        comments_count,
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

//   const handleLike = async () => {
//     try {
//       const { data } = await axiosRes.post("/likes/", { post: id });
//       setPosts((prevPosts) => ({
//         ...prevPosts,
//         results: prevPosts.results.map((post) => {
//           return post.id === id
//             ? { ...post, likes_count: post.likes_count + 1, like_id: data.id }
//             : post;
//         }),
//       }));
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const handleUnlike = async () => {
//     try {
//       await axiosRes.delete(`/likes/${like_id}/`);
//       setPosts((prevPosts) => ({
//         ...prevPosts,
//         results: prevPosts.results.map((post) => {
//           return post.id === id
//             ? { ...post, likes_count: post.likes_count - 1, like_id: null }
//             : post;
//         }),
//       }));
//     } catch (err) {
//       console.log(err);
//     }
//   };

    return (
        <Card className={styles.Company}>
            <Card.Body>
                <div className="d-flex align-items-center"> 
                    <Button className={`${btnStyles.Button} ${btnStyles.Green} d-flex ml-auto`} type="submit">
                        Endorse This Company
                    </Button>
                        {is_owner && CompanyPage && (
                            <DotsDropdown
                                handleEdit={handleEdit}
                                handleDelete={handleDelete}
                            />
                        )}
                </div>
                <Card.Text className="align-items-center">                   
                    {name && <Card.Title className={`${styles.Header} m-auto py-4`}>{name}</Card.Title>}
                </Card.Text>
                <hr className={`${styles.Rule}`} />
                <div className={`${styles.Endorse} text-muted d-flex align-items-center justify-content-between`}>
                    <p><i className="fa-solid fa-award" />
                        {endorsements_count}
                        <span className="d-none d-sm-inline"> endorsements</span>
                    </p>
                    <Link to={`/companies/${id}`} className={` ${styles.Comment} mr-2 text-muted`}>
                        <i className="far fa-comments" />
                        {comments_count}
                    </Link>
                </div>
              <div className="d-flex justify-content-center justify-content-md-start">
                <Link to={`/companies/${id}`}>
                    <Card.Img className={`${styles.Logo}`} src={logo} alt={name} />
                </Link>
                <span className="d-none d-md-inline mx-3 mt-2 text-left">
                    {excerpt && <Card.Text>{excerpt}</Card.Text>}
                    {description && <Card.Text>{description}</Card.Text>}
                </span>
                
              </div>
              <div className="d-md-none my-3 text-left">
                  {excerpt && <Card.Text>{excerpt}</Card.Text>}
                  {description && <Card.Text>{description}</Card.Text>}
              </div>
          {/* <Link to={`/profiles/${owner_profile_id}`}>
                      <Avatar src={owner_profile_image} height={55} />
                      {owner}
                    </Link> */}
          {/* {is_owner ? (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>You can't like your own post!</Tooltip>}
            >
              <i className="far fa-heart" />
            </OverlayTrigger>
          ) : like_id ? (
            <span onClick={handleUnlike}>
              <i className={`fas fa-heart ${styles.Heart}`} />
            </span>
          ) : currentUser ? (
            <span onClick={handleLike}>
              <i className={`far fa-heart ${styles.HeartOutline}`} />
            </span>
          ) : (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Log in to like posts!</Tooltip>}
            >
              <i className="far fa-heart" />
            </OverlayTrigger>
          )}
          {likes_count} */}
          
          {/* <Link to={`/companies/${id}`}>
            <i className="far fa-comments" />
            {comments_count}
          </Link> */}
          
        
        <span className="text-muted text-small">Last updated: {updated_on}</span>
      </Card.Body>
    </Card>
  );
};

export default Company;