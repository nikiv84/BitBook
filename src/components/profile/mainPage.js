import React from "react";
import { Switch, Route } from "react-router-dom";
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
            <div>
                <Header />
                <Switch>
                    <Route path="/feed" component={Feed} />
                    <Route path="/people" component={People} />
                    <Route exact path="/profile" component={ProfilePage} />
                    <Route path="/profile/:id" component={UserPage} />
                    <Route exact path="/" component={ProfilePage} />
                </Switch>
            </div>
        );
    }
};

export default Main;