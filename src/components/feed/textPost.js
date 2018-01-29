import React from "react";
import PropTypes from "prop-types";
import CommunicationService from "../../service/communicationService";
<<<<<<< HEAD
import { dataService } from "../../service/dataService";
import { redirectService } from "../../service/redirectService";
import { Link } from "react-router-dom";
import { ucFirst } from "../common/helpers";
=======
import {dataService} from "../../service/dataService";
import { redirectService } from "../../service/redirectService";
import { Link } from "react-router-dom";
>>>>>>> fde72efd108d318247f21039197bc7e8e31a0ce3

const TextPost = (props) => {
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
    const singlePostUrl = `/feed/${type.slice(0, 1).toUpperCase()}${type.slice(1)}/${id}`;

    return (
        <div className="card dark-blue darken-1 post">
            <div className="card-action">
                <span>{time}</span>
                <span>{dateString}</span>
            </div>
            <div className="card-content white-text">
                <p>{text}</p>
                <hr />
                {props.hideBtn ? "" :
                    <Link to={singlePostUrl} key={id}>
                        <button className="waves-effect waves-light btn"><i className="material-icons left">chat</i>Read More</button>
                    </Link>
                }
                <button className="waves-effect waves-light btn fl-right" onClick={onDeletion} style={{ display: showDeleteButton }}><i className="material-icons left">delete</i>Delete Post</button>
            </div>

            <div className="card-action">
<<<<<<< HEAD
                <span>{ucFirst(type)} post</span>
=======
                <span>{type} post</span>
>>>>>>> fde72efd108d318247f21039197bc7e8e31a0ce3
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