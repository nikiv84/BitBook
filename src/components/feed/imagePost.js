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

        <div className="container feed">
            <button onClick={onDeletion} style={{ display: showDeleteButton }}>Delete Post</button>
            <div className="row postContainer">

                <div className="col 12 text">
                    <img src={imageUrl} style={{ width: "100%" }} />
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

ImagePost.propTypes = {
    post: PropTypes.object,
    ownId: PropTypes.number
};

export default ImagePost;