import React from "react";
import Header from "./header";
import AuthService from "../../service/authService";
import DataService from "../../service/dataService";
import Profile from "../profile/profile";
import Feed from "../profile/feed";

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.authService = new AuthService();
        this.dataService = new DataService();

        this.state = {
            profile: null,
            posts: null
        };

        this.initBind();
    }
    initBind() {
        this.getMyProfile = this.getMyProfile.bind(this);
        this.getAllPost = this.getAllPost.bind(this);
    }

    componentDidMount() {
        this.getMyProfile();
        this.getAllPost();
    }

    getMyProfile() {
        this.dataService.getProfile((profileData) => {
            this.setState({
                profile: profileData
            });
        });
    }
    getAllPost() {
        this.dataService.getPost((postData) => {
            this.setState({
                posts: postData
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
                <Feed posts={this.state.posts}/>

            </div>
        );
    }
};

export default Main;