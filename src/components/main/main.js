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
        // this.state = {
        //     name: "",
        //     avatarUrl: "",
        //     about: "",
        //     aboutShort: "",
        //     postsCount: "",
        //     commentsCount: ""
        // };
        this.state = {
            profile: null
        };

        this.initBind();
    }
    initBind() {
        this.handleLogout = this.handleLogout.bind(this);
        this.getMyProfile = this.getMyProfile.bind(this);
    }

    componentDidMount() {
        this.getMyProfile();
    }
    getMyProfile() {
        this.dataService.getProfile((profileData) => {
            this.setState({
                // name: profileData.name
                profile: profileData
            });
        });
    }

    handleLogout(event) {
        this.authService.logOut();
    }

    render() {
        if (!this.state.profile){
            return <h1>Loading...</h1>;
        }
        return (
            <div>
                <Header />
                <button className="waves-effect waves-light btn" onClick={this.handleLogout}>Log out</button>
                <Profile profile={this.state.profile} />

            </div>
        );
    }
};

export default Main;