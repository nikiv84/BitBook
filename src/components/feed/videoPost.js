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
        <div className="container feed">
            <button onClick={onDeletion} style={{ display: showDeleteButton }}>Delete Post</button>
            <div className="row postContainer">
                <div className="col 12 text">
                    <Iframe url={`https://www.youtube.com/embed/${youtubeVideoId}`}
                        width="100%"
                        height="500px"
                        display="initial"
                        position="relative"
                        allowFullScreen />
                    <hr />
                </div>
                
                <div className="col 4 date">
                    <p>{time}</p>
                    <p>{dateString}</p>
                </div>

                <div className="col 4 commentsNum">
                    <p>{commentsNum} comments</p>
                </div>

                <div className="col-4 type">
                    <p>{type}</p>
                </div>
                
            </div>
        </div>
    );
};

VideoPost.propTypes = {
    post: PropTypes.object,
    ownId: PropTypes.number
};

export default VideoPost;