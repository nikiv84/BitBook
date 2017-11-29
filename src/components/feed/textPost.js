import React from "react";
import PropTypes from "prop-types";
import CommunicationService from "../../service/communicationService";
import DataService from "../../service/dataService";
import RedirectService from "../../service/redirectService";

const TextPost = (props) => {
    const redirectService = new RedirectService();
    const { text, id, dateCreated, userId, userDisplayName, type, commentsNum } = props.post;
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
        <div className="card blue-grey darken-1">
            <div className="card-action">
                <span>{time}</span>
                <span>{dateString}</span>
            </div>
            <button onClick={onDeletion} style={{ display: showDeleteButton }}>Delete Post</button>
            <div className="card-content white-text">
                <p>{text}</p>
            </div>

            <div className="card-action">
                <span>{type} post</span>
                <span>{commentsNum} comments</span>
            </div>

        </div>

    );
};

TextPost.propTypes = {
    post: PropTypes.object,
    ownId: PropTypes.number
};

export default TextPost;