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
            <div className="login">
                <div className="vh-center">
                    <div className="container panel-bg">
                        <div className="row">
                            <Welcome />
                            <Switch>
                                <Route path="/login" component={LoginForm} />
                                <Route path="/register" component={RegisterForm} />
                                <Redirect from="/" to="/login" />
                            </Switch>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
};

export default LoginRegister;