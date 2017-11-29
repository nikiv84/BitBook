import React from "react";
import DataService from "../../service/dataService";
import ImagePost from "./imagePost";
import VideoPost from "./videoPost";
import TextPost from "./textPost";
// import Filter from "../common/postsFilter";
import { Link } from "react-router-dom";
import NewPost from "./newPost";


export default class FeedPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            myId: ""
        };
        this.dataService = new DataService();

        this.bindEventHandlers();
    }

    bindEventHandlers() {
        this.loadData = this.loadData.bind(this);
        // this.filtering = this.filtering.bind(this);
        // this.deletePost = this.deletePost.bind(this);
    }

    loadData() {
        this.dataService.getPosts(
            (posts) => {
                this.setState({
                    posts: posts
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

    // filtering(searchString) {
    //     const currentPosts = this.state.allPosts;

    //     if (searchString === "") {
    //         this.setState({
    //             posts: currentPosts
    //         });
    //     }

    //     const filteredPosts = currentPosts.filter(
    //         (item) => {
    //             return item.type.includes(searchString);
    //         });

    //     this.setState({
    //         posts: filteredPosts
    //     });
    // }

    // deletePost(id) {
    //     dataService.deletePost(id,
    //         (serverResponseData) => {
    //             this.loadData();
    //         });
    // }

    render() {

        const posts = this.state.posts;

        return (

            <div className="container">
                {/* <Filter filterPosts={this.filtering} /> */}
                <div className="row">
                    <div className="col s12 m8 offset-m2">
                        {posts.map(post => {
                            const pathToSinglePost = `/feed/${post.type.slice(0, 1).toUpperCase()}${post.type.slice(1)}/${post.id}`;
                            if (post.type == "text") {
                                return (
                                    <Link to={pathToSinglePost} key={post.id}>
                                        <TextPost myId={this.state.myId} post={post} />
                                    </Link>
                                );
                            } else if (post.type == "image") {
                                return (
                                    <Link to={pathToSinglePost} key={post.id}>
                                        <ImagePost myId={this.state.myId} post={post} key={post.id} />
                                    </Link>
                                );
                            } else if (post.type == "video") {
                                return (
                                    <Link to={pathToSinglePost} key={post.id}>
                                        <VideoPost myId={this.state.myId} post={post} key={post.id} />
                                    </Link>
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