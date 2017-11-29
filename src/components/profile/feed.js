import React from "react";
import { AVATAR_PLACEHOLDER } from "../../constants";
import PropTypes from "prop-types";
import CreateFeed from "./createFeed";
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


export default class Feed extends React.Component {
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
            clickedOnEdit: false,
        });
        this.props.isUpdated();
    }

    handleEdit() {
        this.setState({
            clickedOnEdit: true
        });
    }

    render() {

        if (!this.props) {
            return <h1>Loading...</h1>;
        }

        return (
            <div className="container">
                <div className="row">
                    <div className="col s12 m6 offset-m3 l4 offset-l4 profile center-content">
                        <div className="card large">
                            <p onClick={this.handleEdit} className="btn-floating halfway-fab waves-effect waves-light indigo darken-4 " title="Create Feed"><i className="material-icons">create</i></p>

                            <CreateFeed clickedOnEdit={this.state.clickedOnEdit} clickedOnClose={this.clickedOnClose} />
                        </div>
                    </div>
                </div>
            </div>


        );
    }
};

Feed.propTypes = {
    profile: PropTypes.object,
    name: PropTypes.string,
    about: PropTypes.string,
    posts: PropTypes.number,
    comments: PropTypes.number,

    me: PropTypes.bool
};


Feed.defaultParams = {
    me: false
};