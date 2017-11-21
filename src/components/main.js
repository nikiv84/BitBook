import React from "react";
import LoginForm from "./login_register/loginForm";
import RegisterForm from "./login_register/registerForm";
import { Switch, Route } from "react-router-dom";


const Main = (props) => {

    return (
        <Switch>
            <Route exact path="/login" component={LoginForm} />
            <Route path="/register" component={RegisterForm} />
        </Switch>

    );
};

export default Main;