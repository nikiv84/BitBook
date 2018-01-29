import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Iframe from "react-iframe";
import { redirectService } from "../../service/redirectService";
import { dataService } from "../../service/dataService";
import { ucFirst } from "../common/helpers";

const VideoPost = (props) => {
    const { videoUrl, id, dateCreated, userId, userDisplayName, type, commentsNum } = props.post;
    const myId = props.myId;

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
            (response) => {
                redirectService.redirectTo("/");
            });
    };
    const singlePostURL = `/feed/${type.slice(0, 1).toUpperCase()}${type.slice(1)}/${id}`;

    return (
        <div className="card dark-blue darken-1 post">

            <div className="card-image">
                <Iframe url={`https://www.youtube.com/embed/${youtubeVideoId}`}
                    width="100%"
                    height="480"
                    display="initial"
                    position="relative"
                    allowFullScreen />
            </div>
            <div className="card-content white-text">
                {props.hideBtn ? "" :
                    <Link to={singlePostURL} key={id}>
                        <button className="waves-effect waves-light btn"><i className="material-icons left">chat</i>Read More</button>
                    </Link>
                }
                <button className="waves-effect waves-light btn fl-right" onClick={onDeletion} style={{ display: showDeleteButton }}><i className="material-icons left">delete</i>Delete Post</button>
            </div>
            <div className="card-action">
                <span>{ucFirst(type)} post</span>
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