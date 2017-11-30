import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Header from "../common/header";
import ProfilePage from "./profilePage";
import People from "../user/people";
import UserPage from "../user/userPage";
import FeedPage from "../feed/feedPage";
import SinglePostPage from "../singlePost/singlePostPage";

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
                    <Route exact path="/feed" component={FeedPage} />
                    <Route path="/feed/:type/:postId" component={SinglePostPage}/>
                    <Route path="/people" component={People} />
                    <Route exact path="/profile" component={ProfilePage} />
                    <Route path="/profile/:id" component={UserPage} />
                </Switch>
            </div>
        );
    }
};

export default Main;