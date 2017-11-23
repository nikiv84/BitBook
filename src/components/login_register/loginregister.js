import React from "react";
import LoginForm from "./loginForm";
import RegisterForm from "./registerForm";
import { Switch, Route } from "react-router-dom";


const LoginRegister = (props) => {

    return (
        <Switch>
            <Route exact path="/login" component={LoginForm} />
            <Route path="/register" component={RegisterForm} />
        </Switch>

    );
};

export default LoginRegister;