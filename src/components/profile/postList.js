import React from "react";


const PostList = (props) => {

    const { text, id, dateCreated, userId, userDisplayName, type } = props.posts;


    return (


        <div className="col s12 m6 l4 profile center-content">
            <div className="card large">
                <div className="card-image waves-effect waves-block waves-light">

                </div>
                <div className="card-content">
                    <p>{text}</p>
                    <p>{dateCreated}</p>
                    <p>{userDisplayName}</p>
                </div>
            </div>
            
        </div>


    );

};

export default PostList;