import React from "react";
import DataService from "../../service/dataService";
import CommunicationService from "../../service/communicationService";
import User from "./user";
import Search from "../common/search";
import { Link } from "react-router-dom";

export default class People extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            filteredUsers: [],
            me: []
        };

        this.commService = new CommunicationService();
        this.dataService = new DataService();
        this.searchHandler = this.searchHandler.bind(this);
    }

    getUsers() {
        this.commService.getRequest("users", (result) => {
            this.setState({
                users: result.data,
                filteredUsers: result.data
            });
        }, (error) => {
            console.log(error);
        });
    }

    searchHandler(searchString) {
        const currentList = this.state.users;

        if (searchString === "") {
            this.setState({ filteredUsers: currentList });
            return;
        }

        const filteredList = currentList.filter((item) => {
            return item.name.toLowerCase().includes(searchString.toLowerCase());
        });
        console.log(filteredList);

        this.setState({ filteredUsers: filteredList });
    }

    getMyProfileId() {
        this.dataService.getProfile((profileData) => {
            this.setState({
                me: profileData.userId
            });
            console.log(profileData.userId);
        });
    }


    componentDidMount() {
        this.getUsers();
        this.getMyProfileId();
    }


    render() {

        const users = this.state.filteredUsers;
        if (!users) {
            return (
                <div className="center-align">
                    <h4>Loading users...</h4>
                </div>
            );
        }
        return (
            <div className="container">
                <Search onSearchRequested={this.searchHandler} instant={true} />
                <div className="row">
                    {users.filter(user => {
                        return user.id !== this.state.me;
                    }).map((user) => {
                        return <User user={user} key={user.id} />;
                    })}
                </div>
            </div>

        );
    }
}