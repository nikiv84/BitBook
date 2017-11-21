import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Welcome from "./login_register/welcome";
import Main from "./main";

class App extends React.Component {
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
                    </Switch>
                    <Main />
                </div>
            </div>
        );
    }
}
export default App;
