import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import RedirectService from "../../service/redirectService";
import DataService from "../../service/dataService";

export default class ImagePost extends React.Component {

    constructor(props) {
        super(props);
        this.redirectService = new RedirectService();
        this.dataService = new DataService();
        this.onDeletion = this.onDeletion.bind(this);
    }

    onDeletion() {
        this.dataService.deletePost(id,
            (response) => {
                this.redirectService.redirectTo("/");
            });
    };

    render() {
        const { imageUrl, id, dateCreated, userId, userDisplayName, type, commentsNum } = this.props.post;
        const myId = this.props.myId;

        let showDeleteButton = "";

        if (myId !== userId) {
            showDeleteButton = "none";
        }

        const singlePostUrl = `/feed/${type.slice(0, 1).toUpperCase()}${type.slice(1)}/${id}`;

        return (
            <div className="card dark-blue darken-1 post">
                <div className="card-image">
                    <img className="materialboxed" src={imageUrl} />
                </div>
                <div className="card-content white-text">
                    {this.props.hideBtn ? "" :
                        <Link to={singlePostUrl} key={id}>
                            <button className="waves-effect waves-light btn"><i className="material-icons left">chat</i>Read More</button>
                        </Link>
                    }
                    <button className="waves-effect waves-light btn fl-right" onClick={this.onDeletion} style={{ display: showDeleteButton }}><i className="material-icons left">delete</i>Delete Post</button>
                </div>
                <div className="card-action">
                    <span>{type} post</span>
                    <span>{commentsNum} comments</span>
                </div>
            </div>
        );
    }
};

ImagePost.propTypes = {
    post: PropTypes.object,
    ownId: PropTypes.number
};