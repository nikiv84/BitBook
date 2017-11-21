import React from "react";
import { Link } from "react-router-dom";
import Communication from "../../service/communication";

class LoginForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        };
        this.commService = new Communication();

        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.saveHandler = this.saveHandler.bind(this);
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

    saveHandler() {
        const data = {
            username: this.state.username,
            password: this.state.password
        };
        this.commService.post("login", data, ()=>(console.log(result)));

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