import React from "react";
import { AVATAR_PLACEHOLDER } from "../../constants";
import PropTypes from "prop-types";
import EditProfile from "./editProfile";
import DataService from "../../service/dataService";

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
            clickedOnEdit: false,
            name: "",
            email: "",
            about: "",
            shortabout: "",
            avatar: ""
        };
        this.getProfileEditData = this.getProfileEditData.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }

    componentDidMount() {
        this.getProfileEditData();
    }

    getProfileEditData() {
        this.dataService.getProfile((profileData) => {
            this.setState({
                name: profileData.name,
                email: profileData.email,
                about: profileData.about,
                shortabout: profileData.aboutShort,
                avatar: profileData.avatarUrl
            });
        });
    }
    handleEdit(){
        this.setState({
            clickedOnEdit: true
        });
        console.log("Hey");
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
                        <div className="card">
                            <div className="card-image waves-effect waves-block waves-light">
                                <img src={`${avatarSrc}`} />
                            </div>
                            <div className="card-content">
                                <p onClick={this.handleEdit} className="btn-floating halfway-fab waves-effect waves-light red editprofile" title="Edit profile"><i className="material-icons">create</i></p>
                                <h4>{this.props.profile.name}</h4>
                                <p>{this.props.profile.about}</p>
                                <p>{this.props.profile.postsCount} posts</p>
                                <p>{this.props.profile.commentsCount} comments</p>
                            </div>
                        </div>
                    </div>
                    <EditProfile clickedOnEdit={this.state.clickedOnEdit} />
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
    comments: PropTypes.number
};