import React from "react";
import { Link } from "react-router-dom";
import { authService } from "../../service/authService";
import { validationService } from "../../service/validationService";

class LoginForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            isNotValid: false,
            errorMsg: "",
            loading: false
        };
        this.initBind();
    }

    initBind() {
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.callbackFunc = this.callbackFunc.bind(this);
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
    }

    callbackFunc(errors) {
        this.setState({
            isNotValid: true,
            errorMsg: errors,
            loading: false
        });
    }

    loginHandler(e) {
        e.preventDefault();

        const data = {
            username: this.state.username,
            password: this.state.password
        };


        if (validationService.isLoginFormValid(data, this.callbackFunc)) {
            authService.login(data, (errors) => {
                this.setState({
                    isNotValid: true,
                    errorMsg: errors,
                    loading: false
                });
            });
<<<<<<< HEAD
=======
        } else {
            console.log("Else");
>>>>>>> fde72efd108d318247f21039197bc7e8e31a0ce3
        }
    }

    render() {
        return (
            <div className="bitform col m12 l6">
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

                        <input id="password" type="password" value={this.state.password} onChange={this.handlePasswordChange} placeholder="Enter Password..." />

                        {this.state.loading ? <div className="progress"><div className="indeterminate"></div></div> : ""}

                        <button className="waves-effect waves-light btn registration" onClick={this.loginHandler}>Login</button>
                    </form>

                    <p className="errormsg">{this.state.errorMsg.allFields ? `${this.state.errorMsg.allFields}` : `${this.state.errorMsg}`}</p>
                </div>
            </div>
        );
    }
}

export default LoginForm;