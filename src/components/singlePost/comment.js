import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Comment = (props) => {
    const { id, dateCreated, body, postId, authorName, authorId } = props.comment;

    return (
        <div className="comment">
            {authorId == props.myId ? <Link to={"/profile"}><h5>{authorName}</h5></Link> : <Link to={`/profile/${authorId}`}><h5>{authorName}</h5></Link>}
            <hr />
            <p>{body}</p>
        </div>
    );
};

Comment.propTypes = {
    comment: PropTypes.object,
};

export default Comment;