import React from "react";
import Welcome from "./welcome";
import LoginForm from "./loginForm";
import RegisterForm from "./registerForm";
import { Switch, Route, Redirect } from "react-router-dom";

class LoginRegister extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <Welcome />
                    <Switch>
                        <Redirect exact from="/" to="/login" />
                        <Route path='/login' component={LoginForm} />
                        <Route path='/register' component={RegisterForm} />
                    </Switch>
                </div>
            </div>
        );
    };
};

export default LoginRegister;