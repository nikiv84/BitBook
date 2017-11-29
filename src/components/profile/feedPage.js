import React from "react";
import DataService from "../../service/dataService";
import PostList from "./postList";
import CreateFeed from "./createFeed";

class FeedPage extends React.Component {
    constructor(props) {
        super(props);
        this.dataService = new DataService();

        this.state = {
            posts: [],
            clickedOnEdit: false
        };
     

        this.initBind();
    }
    initBind() {
        this.getAllPost = this.getAllPost.bind(this);
        this.isUpdated = this.isUpdated.bind(this);
        this.clickedOnClose = this.clickedOnClose.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }

    componentDidMount() {
        this.getAllPost();
    }

    getAllPost() {
        this.dataService.getPost((postData) => {
            console.log("result: ", postData);
            this.setState({
                posts: postData
            });
        });
    }
    clickedOnClose() {
        this.setState({
            clickedOnEdit: false,
        });
        this.props.isUpdated();
    }

    handleEdit() {
        this.setState({
            clickedOnEdit: true
        });
    }

    isUpdated() {
        this.getAllPost();
    }

    render() {
        if (!this.state.posts) {
            return <h1>Loading...</h1>;
        }
        return (

            <div className="row">
                {this.state.posts.map((post) => {
                    console.log(post);
                    return <PostList posts={post} key={post.id} />;
                })}
                <p onClick={this.handleEdit} className="btn-floating halfway-fab waves-effect waves-light indigo darken-4 " title="Create Feed"><i className="material-icons">create</i></p>

                <CreateFeed clickedOnEdit={this.state.clickedOnEdit} clickedOnClose={this.clickedOnClose} />
            </div>

        );
    }
};

export default FeedPage;