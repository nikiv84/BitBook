import React from "react";
import DataService from "../../service/dataService";
import Profile from "./profile";

class ProfilePage extends React.Component {
    constructor(props) {
        super(props);
        this.dataService = new DataService();

        this.state = {
            profile: null
        };

        this.initBind();
    }
    initBind() {
        this.getMyProfile = this.getMyProfile.bind(this);
        this.isUpdated = this.isUpdated.bind(this);
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

    isUpdated(){
        this.getMyProfile();
    }

    render() {
        if (!this.state.profile) {
            return <h1>Loading...</h1>;
        }
        return (
            <div>
                <Profile profile={this.state.profile} me={true} isUpdated={this.isUpdated}/>
            </div>
        );
    }
};

export default ProfilePage;