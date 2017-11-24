import React from "react";
import AuthService from "../../service/authService";
import DataService from "../../service/dataService";
import Profile from "./profile";

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
        this.getMyProfile = this.getMyProfile.bind(this);
    }

    componentDidMount() {
        this.getMyProfile();
    }

    getMyProfile() {
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
            <div>
                <Profile profile={this.state.profile}/>
            </div>
        );
    }
};

export default UserPage;