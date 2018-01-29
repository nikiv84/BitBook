import React from "react";
import {dataService} from "../../service/dataService";
import Profile from "../profile/profile";

class UserPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            profile: null
        };

        this.initBind();
    }

    initBind() {
        this.getProfile = this.getProfile.bind(this);
    }

    componentDidMount() {
        this.getProfile();
    }

    getProfile() {
        dataService.getUser(this.props.match.params.id, (profileData) => {
            this.setState({
                profile: profileData
            });
        });
    }



    render() {
        if (!this.state.profile) {
            return <h1>Loading...</h1>;
        }
        return (
            <Profile profile={this.state.profile} />
        );
    }
};

export default UserPage;