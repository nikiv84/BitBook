import React from "react";
import AuthService from "../../service/authService";
import DataService from "../../service/dataService";
import Profile from "../profile/profile";

class UserPage extends React.Component {
    constructor(props) {
        super(props);
        this.authService = new AuthService();
        this.dataService = new DataService();

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
        this.dataService.getUser(this.props.match.params.id, (profileData) => {
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