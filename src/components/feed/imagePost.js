import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { redirectService } from "../../service/redirectService";
import { dataService } from "../../service/dataService";
import { ucFirst } from "../common/helpers";

const ImagePost = (props) => {
    const { imageUrl, id, dateCreated, userId, userDisplayName, type, commentsNum } = props.post;
    const myId = props.myId;

    let showDeleteButton = "";

    if (myId !== userId) {
        showDeleteButton = "none";
    }

    const singlePostUrl = `/feed/${type.slice(0, 1).toUpperCase()}${type.slice(1)}/${id}`;

    const onDeletion = () => {
        dataService.deletePost(id,
            (response) => {
                redirectService.redirectTo("/");
            });
    };

    return (
        <div className="card dark-blue darken-1 post">
            <div className="card-image">
                <img src={imageUrl} alt="image post" />
            </div>
            <div className="card-content white-text">
                {props.hideBtn ? "" :
                    <Link to={singlePostUrl} key={id}>
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

export default ImagePost;

ImagePost.propTypes = {
    post: PropTypes.object,
    ownId: PropTypes.number
};