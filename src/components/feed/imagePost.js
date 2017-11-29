import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import RedirectService from "../../service/redirectService";

const ImagePost = (props) => {
    const redirectService = new RedirectService();

    const { imageUrl, id, dateCreated, userId, userDisplayName, type, commentsNum } = props.post;
    const myId = props.myId;

    const date = new Date(dateCreated);
    const time = date.toLocaleTimeString();
    const dateString = date.toLocaleDateString();

    let showDeleteButton = "";

    if (myId !== userId) {
        showDeleteButton = "none";
    }

    const onDeletion = () => {
        dataService.deletePost(id,
            (response) => {
                redirectService.redirectTo("/");
            });
    };


    return (

        <div className="card">
            <button onClick={onDeletion} style={{ display: showDeleteButton }}>Delete Post</button>
            <div className="card-image">
                <img src={imageUrl} style={{ width: "100%" }} />
                <span className="btn-floating halfway-fab waves-effect waves-light red"><i className="material-icons">add</i></span>
            </div>

            <div className="card-action">
                <span>{type} post</span>
                <span>{commentsNum} comments</span>
            </div>

        </div>
    );
};

ImagePost.propTypes = {
    post: PropTypes.object,
    ownId: PropTypes.number
};

export default ImagePost;