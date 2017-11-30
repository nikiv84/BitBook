import React from "react";
import DataService from "../../service/dataService";
import ImagePost from "./imagePost";
import VideoPost from "./videoPost";
import TextPost from "./textPost";
import { Link } from "react-router-dom";
import NewPost from "./newPost";
import FeedFilter from "./feedFilter";
import Pagination from "react-js-pagination";
import { POSTS_PER_PAGE } from "../../constants";

export default class FeedPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            allPosts: [],
            filteredPosts: [],
            myId: "",
            activePage: 1,
            numOfPosts: null
        };
        this.dataService = new DataService();

        this.bindEventHandlers();
    }

    bindEventHandlers() {
        this.loadData = this.loadData.bind(this);
        this.filtering = this.filtering.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.postsCount = this.postsCount.bind(this);
    }

    handlePageChange(pageNumber) {
        this.setState({
            activePage: pageNumber
        });
        let skipAmount = pageNumber - 1;
        let skip = skipAmount * POSTS_PER_PAGE;
        this.dataService.getPosts(skip,
            (posts) => {
                this.setState({
                    allPosts: posts,
                    filteredPosts: posts
                });
            });
    }

    postsCount() {
        this.dataService.getPostsCount((result) => {
            this.setState({
                numOfPosts: result.data
            });
        });
    }

    loadData() {
        this.dataService.getPosts(0,
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
        this.postsCount();
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
        const pageRange = Math.floor(this.state.numOfPosts / POSTS_PER_PAGE);

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
                <div className="row">
                    <Pagination
                        activePage={this.state.activePage}
                        itemsCountPerPage={POSTS_PER_PAGE}
                        totalItemsCount={this.state.numOfPosts}
                        pageRangeDisplayed={this.pageRange}
                        onChange={this.handlePageChange}
                    />
                </div>

                <NewPost reloadFeed={this.loadData} />
            </div>
        );
    }
}