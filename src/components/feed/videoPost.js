import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Iframe from "react-iframe";

const VideoPost = (props) => {

    const redirectService = new RedirectService();
    const { videoUrl, id, dateCreated, userId, userDisplayName, type, commentsNum } = props.post;
    const myId = props.ownId;

    const date = new Date(dateCreated);
    const time = date.toLocaleTimeString();
    const dateString = date.toLocaleDateString();
    const youtubeVideoId = videoUrl.slice(videoUrl.indexOf("=") + 1);

    let showDeleteButton = "";

    if (myId !== userId) {
        showDeleteButton = "none";
    };

    const onDeletion = () => {
        dataService.deletePost(id,
            (serverResponseData) => {
                redirectService.goTo("/");
            });
    };

    return (
        <div className="card">
            <button onClick={onDeletion} style={{ display: showDeleteButton }}>Delete Post</button>
            <div className="card-image">
                <Iframe url={`https://www.youtube.com/embed/${youtubeVideoId}`}
                    width="100%"
                    height="500px"
                    display="initial"
                    position="relative"
                    allowFullScreen />
            </div>

            <div className="card-action">
                <span>{type} post</span>
                <span>{commentsNum} comments</span>
            </div>

        </div>
    );
};

VideoPost.propTypes = {
    post: PropTypes.object,
    ownId: PropTypes.number
};

export default VideoPost;