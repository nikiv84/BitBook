import React from "react";
import { Link } from "react-router-dom";
import AuthService from "../../service/authService";
import ValidationService from "../../service/validationService";

class LoginForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            isNotValid: false,
            errorMsg: ""
        };
        this.initBind();
        this.authService = new AuthService();
        this.validService = new ValidationService();
    }

    initBind() {
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.loginHandler = this.loginHandler.bind(this);
    }

    handleUsernameChange(event) {
        this.setState({
            username: event.target.value
        });
    }

    handlePasswordChange(event) {
        this.setState({
            password: event.target.value
        });
    }

    login(sessID) {
        const sessionId = sessionStorage.setItem(SESSION_ID_KEY, JSON.stringify(sessID));
        console.log("Successfully logged in!");
    }

    loginHandler() {
        const data = {
            username: this.state.username,
            password: this.state.password
        };

        if (this.validService.isLoginFormValid(data)) {
            this.setState({
                isNotValid: false
            });
            this.authService.login(data, (error) => {
                this.setState({
                    isNotValid: true,
                    errorMsg: error
                });
            });
        } else {
            this.setState({
                isNotValid: true,
                errorMsg: "All fields must be filled out!"             
            });
        }

    }

    render() {
        return (
            <div className="bitform col s6">
                <div className="col s12">
                    <ul className="tabs">
                        <li className="tab col s6"><Link to={"/login"} className="active">Login</Link></li>
                        <li className="tab col s6"><Link to={"/register"}>Register</Link></li>
                    </ul>
                </div>

                <div className="col s12">
                    <form>
                        <label htmlFor="username">Username:</label>
                        <input id="username" type="text" onChange={this.handleUsernameChange} placeholder="Enter Username..." />
                        <label htmlFor="password">Password:</label>
                        <input id="password" type="password" onChange={this.handlePasswordChange} placeholder="Enter Password..." />
                        <button className="waves-effect waves-light btn registration" onClick={this.loginHandler}>Login</button>
                    </form>
                    <p id="error">{this.state.isNotValid ? `${this.state.errorMsg}` : ""}</p>
                </div>
            </div>
        );
    }
}

export default LoginForm;