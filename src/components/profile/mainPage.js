import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Header from "../common/header";
import ProfilePage from "./profilePage";
import Feed from "./feed";
import People from "./people";
import UserPage from "./userPage";


class Main extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="main-bg">
                <Header />
                <Switch>
                    <Redirect exact from="/" to="/feed"/>
                    <Route path="/feed" component={Feed} />
                    <Route path="/people" component={People} />
                    <Route exact path="/profile" component={ProfilePage} />
                    <Route path="/profile/:id" component={UserPage} />
                </Switch>
            </div>
        );
    }
};

export default Main;