import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Welcome from "./login_register/welcome";
import Main from "./main/main";
import LoginRegister from "./login_register/loginregister";
import AuthService from "../service/authService";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.authService = new AuthService();
    }

    render() {
        if (this.authService.isUserAuth()) {
            return <Main />;
        }

        return (
            <div className="container">
                <div className="row">
                    <Welcome />
                    <Switch>
                        <Redirect exact from="/" to="/login" />
                    </Switch>
                    <LoginRegister />
                </div>
            </div>
        );
    }
}
export default App;
