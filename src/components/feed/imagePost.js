import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import RedirectService from "../../service/redirectService";
import DataService from "../../service/dataService";

const ImagePost = (props) => {
    const redirectService = new RedirectService();
    const dataService = new DataService();

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
    const singlePostUrl = `/feed/${type.slice(0, 1).toUpperCase()}${type.slice(1)}/${id}`;

    return (

        <div className="card dark-blue darken-1 post">
            <div className="card-image">
                <img src={imageUrl} style={{ width: "100%" }} />
                <Link to={singlePostUrl} key={id}>
                    <button className="waves-effect waves-light btn"><i className="material-icons left">chat</i>Read More</button>
                </Link>
                <button className="waves-effect waves-light btn fl-right" onClick={onDeletion} style={{ display: showDeleteButton }}><i className="material-icons left">delete</i>Delete Post</button>
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