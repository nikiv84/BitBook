import React from "react";
import Header from "./header";
import AuthService from "../../service/authService";

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.authService = new AuthService();

        this.initBind();
    }
    initBind() {
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout(event) {
        this.authService.logOut();
    }

    render() {
        return (
            <div>
                <Header />
                <button className="waves-effect waves-light btn" onClick={this.handleLogout}>Log out</button>
            </div>
        );
    }
};

export default Main;