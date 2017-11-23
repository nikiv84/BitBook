import React from "react";
import { AVATAR_PLACEHOLDER } from "../../constants";
import PropTypes from "prop-types";


const Profile = (props) => {
    let avatarSrc = props.profile.avatarUrl;
    if (!props.profile.avatarUrl){
        avatarSrc = AVATAR_PLACEHOLDER;
    }

    return (
        <div>
            <img src={`${avatarSrc}`} />
            <h2>{props.profile.name}</h2>
            <p>{props.profile.about}</p>
            <p>{props.profile.postsCount} posts</p>
            <p>{props.profile.commentsCount} comments</p>
        </div>
    );

};

Profile.propTypes = {
    profile: PropTypes.object,
    name: PropTypes.string,
    about: PropTypes.string,
    posts: PropTypes.number,
    comments: PropTypes.number
};


export default Profile;