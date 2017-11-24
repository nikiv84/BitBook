import React from "react";
import AuthService from "../../service/authService";
import { Link } from "react-router-dom";

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
        this.authService = new AuthService();
    }

    handleLogout() {
        this.authService.logOut();
    }
    render() {
        return (
            <nav className="nav-extended">
                <div className="nav-wrapper">
                    <div className="container">
                        <a href="#" className="brand-logo">BitBook</a>
                        <a href="#" data-target="mobile-demo" className="sidenav-trigger button-collapse"><i className="material-icons">menu</i></a>
                        <ul id="nav-mobile" className="right hide-on-med-and-down">
                            <li><Link to={"/feed"}>Feed</Link></li>
                            <li><Link to={"/people"}>People</Link></li>
                            <li><Link to={"/profile"}>Profile</Link></li>
                            <li><button id="logout" className="waves-effect waves-light btn" onClick={this.handleLogout}>Log out</button></li>
                        </ul>
                        <ul className="sidenav" id="mobile-demo">
                            <li><Link to={"/feed"}>Feed</Link></li>
                            <li><Link to={"/people"}>People</Link></li>
                            <li><Link to={"/profile"}>Profile</Link></li>
                            <li><button id="logout" className="waves-effect waves-light btn" onClick={this.handleLogout}>Log out</button></li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }

};
export default Header;