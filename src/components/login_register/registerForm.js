import React from "react";
import { Link } from "react-router-dom";

class RegisterForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            password: ""
        };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.saveHandler = this.saveHandler.bind(this);
    }

    handleNameChange(event) {
        this.setState({
            name: event.target.value
        });
        console.log(this.state.name);
    }

    handlePasswordChange(event) {
        this.setState({
            password: event.target.value
        });
        console.log(this.state.password);
    }

    handleEmailChange(event) {
        this.setState({
            email: event.target.value
        });
        console.log(this.state.email);
    }

    saveHandler() {
        const data = {
            name: this.state.name,
            password: this.state.password,
            email: this.state.email
        };
        return data;
    }

    render() {
        return (
            <div className="bitform col s6">
                <div className="col s12">
                    <ul className="tabs">
                        <li className="tab col s6"><Link to={"/login"}>Login</Link></li>
                        <li className="tab col s6"><Link to={"/register"}>Register</Link></li>
                    </ul>
                </div>
                <div className="col s12">
                    <form>
                        <label htmlFor="name">Name:</label>
                        <input id="name" type="text" onChange={this.handleNameChange} placeholder="Enter Name..." />
                        <label htmlFor="email">Email:</label>
                        <input id="email" type="text" onChange={this.handleEmailChange} placeholder="Enter Email..." />
                        <label htmlFor="password">Password:</label>
                        <input id="password" type="password" onChange={this.handlePasswordChange} placeholder="Enter Password..." />
                        <button className="waves-effect waves-light btn">Register</button>

                    </form>

                </div>

            </div>
        );
    }
}

export default RegisterForm;