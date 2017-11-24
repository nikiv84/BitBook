import React from "react";
import CommunicationService from "../../service/communicationService";
import User from "./user";
import Search from "../common/search";
import { Link } from "react-router-dom";

export default class People extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            filteredUsers: []
        };

        this.commService = new CommunicationService();
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


    componentDidMount() {
        this.getUsers();
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
                <div className="row">
                    <Search onSearchRequested={this.searchHandler} instant={true} />
                    {users.map((user) => {
                        return <User user={user} key={user.id} />;
                    })}
                </div>
            </div>

        );
    }
}