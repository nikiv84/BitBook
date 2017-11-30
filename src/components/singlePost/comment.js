import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Comment = (props) => {
    const { id, dateCreated, body, postId, authorName, authorId } = props.comment;
    let isItMe = false;
    
    props.myId == authorId ? isItMe = true : false;

    return (
        <div className="comment">
            <Link to={`/profile/${authorId}`}><h5>{authorName}</h5></Link>
            <hr />
            <p>{body}</p>
        </div>
    );
};

Comment.propTyps = {
    comment: PropTypes.object,
};

export default Comment;