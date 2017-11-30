import React from "react";
import DataService from "../../service/dataService";
import ImagePost from "./imagePost";
import VideoPost from "./videoPost";
import TextPost from "./textPost";
import { Link } from "react-router-dom";
import NewPost from "./newPost";
import FeedFilter from "./feedFilter";


export default class FeedPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            allPosts: [],
            filteredPosts: [],
            myId: ""
        };
        this.dataService = new DataService();

        this.bindEventHandlers();
    }

    bindEventHandlers() {
        this.loadData = this.loadData.bind(this);
        this.filtering = this.filtering.bind(this);
        // this.deletePost = this.deletePost.bind(this);
    }

    loadData() {
        this.dataService.getPosts(
            (posts) => {
                this.setState({
                    allPosts: posts,
                    filteredPosts: posts
                });
            });

        this.dataService.getProfile(
            (profile) => {
                this.setState({
                    myId: profile.userId
                });
            });
    }

    componentDidMount() {
        this.loadData();
    }

    filtering(selectedFilter) {
        const currentList = this.state.allPosts;

        if (selectedFilter === "") {
            this.setState({ filteredPosts: currentList });
            return;
        }

        const filteredList = currentList.filter(
            (item) => {
                return item.type.includes(selectedFilter);
            });

        this.setState({
            filteredPosts: filteredList
        });
    }


    render() {
        const posts = this.state.filteredPosts;

        return (
            <div className="container newsfeed">
                <div className="row">
                    <div className="col s12 m8 offset-m2">
                        <FeedFilter filterPosts={this.filtering} />
                        <h1 className="center">News feed</h1>
                        {posts.map(post => {
                            if (post.type == "text") {
                                return (
                                    <TextPost myId={this.state.myId} post={post} key={post.id} />
                                );
                            } else if (post.type == "image") {
                                return (
                                    <ImagePost myId={this.state.myId} post={post} key={post.id} />
                                );
                            } else if (post.type == "video") {
                                return (
                                    <VideoPost myId={this.state.myId} post={post} key={post.id} />
                                );
                            }
                        })}
                    </div>
                </div>

                <NewPost reloadFeed={this.loadData} />
            </div>
        );
    }
}