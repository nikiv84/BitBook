import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const User = (props) => {

    const { id, name, aboutShort, lastPostDate, avatarUrl } = props.user;


    return (
        <div className="col s12 m6 l4 profile center-content">
            <div className="card large">
                <div className="card-image waves-effect waves-block waves-light">
                    <img src={`${avatarUrl}`} />
                </div>
                <div className="card-content">
                    <h4>{name}</h4>
                    <p>{aboutShort}</p>
                    <p>{lastPostDate}</p>
                </div>
            </div>
        </div>
    );

};

User.propTypes = {
    user: PropTypes.object,

};

export default User;