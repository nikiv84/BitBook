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
        <div className="container feed">
            <button onClick={onDeletion} style={{ display: showDeleteButton }}>Delete Post</button>
            <div className="row postContainer">
                <div className="col 12 text">
                    <h3>{text}</h3>
                    <hr />
                </div>
                <div className="col 4 date">
                    <p>{time}</p>
                    <p>{dateString}</p>
                </div>
                <div className="col 4 commentsNum">
                    <p>{commentsNum} comments</p>
                </div>
                <div className="col 4 type">
                    <p>{type}</p>
                </div>
            </div>
        </div>
    );
};

TextPost.propTypes = {
    post: PropTypes.object,
    ownId: PropTypes.number
};

export default TextPost;