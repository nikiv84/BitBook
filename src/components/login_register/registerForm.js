import React from "react";
import { Link } from "react-router-dom";
import { authService } from "../../service/authService";
import { validationService } from "../../service/validationService";

class RegisterForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            username: "",
            email: "",
            password: "",
            repeatPassword: "",
            isNotValid: false,
            errorMsg: "",
            serverError: ""
        };
        this.initBind();
    }

    initBind() {
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleRepeatPasswordChange = this.handleRepeatPasswordChange.bind(this);
        this.callbackFunc = this.callbackFunc.bind(this);
        this.registerHandler = this.registerHandler.bind(this);
    }

    handleNameChange(event) {
        this.setState({
            name: event.target.value
        });
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
    handleRepeatPasswordChange(event) {
        this.setState({
            repeatPassword: event.target.value
        });
    }

    handleEmailChange(event) {
        this.setState({
            email: event.target.value
        });
    }

    callbackFunc(errors) {
        this.setState({
            isNotValid: true,
            errorMsg: errors,
            loading: false
        });
    }

    registerHandler() {
        const data = {
            name: this.state.name,
            username: this.state.username,
            password: this.state.password,
            repeatPassword: this.state.repeatPassword,
            email: this.state.email
        };

        if (validationService.isRegisterFormValid(data, this.callbackFunc)) {
            authService.register(data, (errors) => {
                this.setState({
                    isNotValid: true,
                    serverError: errors,
                    loading: false
                });

            });
        }
    }



    render() {
        return (
            <div className="bitform col m12 l6">
                <div className="col s12">
                    <ul className="tabs">
                        <li className="tab col s6"><Link to={"/login"}>Login</Link></li>
                        <li className="tab col s6"><Link to={"/register"} className="active">Register</Link></li>
                    </ul>
                </div>
                <div className="col s12">
                    <form>
                        <label htmlFor="name">Name:</label>

                        <input id="name" type="text" onChange={this.handleNameChange} placeholder="Enter first name and last name..." />
                        <p className="errormsg">{this.state.errorMsg.name ? `${this.state.errorMsg.name}` : ""}</p>

                        <label htmlFor="username">Username:</label>

                        <input id="username" type="text" onChange={this.handleUsernameChange} placeholder="Enter username..." />
                        <p className="errormsg">{this.state.errorMsg.username ? `${this.state.errorMsg.username}` : ""}</p>

                        <label htmlFor="email">Email:</label>

                        <input id="email" type="email" onChange={this.handleEmailChange} placeholder="Enter Email..." />
                        <p className="errormsg">{this.state.errorMsg.email ? `${this.state.errorMsg.email}` : ""}</p>

                        <label htmlFor="password">Password:</label>

                        <input id="password" type="password" onChange={this.handlePasswordChange} placeholder="Enter Password..." />
                        <p className="errormsg">{this.state.errorMsg.password ? `${this.state.errorMsg.password}` : ""}</p>


                        <label htmlFor="repeat-password">Confirm Password:</label>

                        <input id="repeat-password" type="password" onChange={this.handleRepeatPasswordChange} placeholder="Re-enter Password..." />
                        <p className="errormsg">{this.state.errorMsg.repeatPassword ? `${this.state.errorMsg.repeatPassword}` : ""}</p>

                        <button className="waves-effect waves-light btn registration" onClick={this.registerHandler}>Register</button>
                    </form>
                    <p className="errormsg">{this.state.errorMsg.allFields ? `${this.state.errorMsg.allFields}` : ""}</p>
                    <p className="errormsg">{this.state.serverError ? `${this.state.serverError}` : ""}</p>
                </div>

            </div>
        );
    }
}

export default RegisterForm;