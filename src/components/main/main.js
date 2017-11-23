import React from "react";
import Header from "./header";
import AuthService from "../../service/authService";
import DataService from "../../service/dataService";
import Profile from "../profile/profile";

class Main extends React.Component {
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
        this.dataService.getProfile((profileData) => {
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

                <Header />
                <Profile profile={this.state.profile} />

            </div>
        );
    }
};

export default Main;