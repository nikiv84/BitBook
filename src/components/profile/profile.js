import React from "react";
import { AVATAR_PLACEHOLDER } from "../../constants";
import PropTypes from "prop-types";
import EditProfile from "./editProfile";
import DataService from "../../service/dataService";
import User from "../profile/user";

const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        width: "50%"
    }
};


export default class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.dataService = new DataService();

        this.state = {
            clickedOnEdit: false
        };

        this.clickedOnClose = this.clickedOnClose.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }

    clickedOnClose() {
        this.setState({
            clickedOnEdit: false
        });
    }

    handleEdit() {
        this.setState({
            clickedOnEdit: true
        });
    }

    render() {
        let avatarSrc = this.props.profile.avatarUrl;
        if (!this.props.profile.avatarUrl) {
            avatarSrc = AVATAR_PLACEHOLDER;
        }
        if (!this.props) {
            return <h1>Loading...</h1>;
        }

        return (
            <div className="container">
                <div className="row">
                    <div className="col s12 m6 offset-m3 l4 offset-l4 profile center-content">
                        <div className="card large">
                            <div className="card-image waves-effect waves-block waves-light">
                                <img src={`${avatarSrc}`} />
                            </div>
                            <div className="card-content">
                                {this.props.me ? <p onClick={this.handleEdit} className="btn-floating halfway-fab waves-effect waves-light red editprofile" title="Edit profile"><i className="material-icons">create</i></p> : ""}
                                <h4>{this.props.profile.name}</h4>
                                <p>{this.props.profile.about}</p>
                                <p>{this.props.profile.postsCount} posts</p>
                                <p>{this.props.profile.commentsCount} comments</p>
                            </div>
                        </div>
                    </div>
                    {this.props.me ? <EditProfile clickedOnEdit={this.state.clickedOnEdit} clickedOnClose={this.clickedOnClose} /> : ""}
                </div>
            </div>
        );
    }
};

Profile.propTypes = {
    profile: PropTypes.object,
    name: PropTypes.string,
    about: PropTypes.string,
    posts: PropTypes.number,
    comments: PropTypes.number,
    match: PropTypes.func,
    me: PropTypes.bool
};


Profile.defaultParams = {
    me: false
};