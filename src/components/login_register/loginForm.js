import React from "react";
import { Link } from "react-router-dom";

class LoginForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        };

        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.saveHandler = this.saveHandler.bind(this);
    }

    handleUsernameChange(event) {
        this.setState({
            username: event.target.value
        });
        console.log(this.state.username);
    }

    handlePasswordChange(event) {
        this.setState({
            password: event.target.value
        });
        console.log(this.state.password);
    }

    saveHandler() {
        const data = {
            username: this.state.username,
            password: this.state.password
        };
        return data;
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
                        <button className="waves-effect waves-light btn" onClick={this.saveHandler}>Login</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default LoginForm;