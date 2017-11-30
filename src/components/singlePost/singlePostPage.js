import React from "react";
import ValidationService from "../../service/validationService";
import DataService from "../../service/dataService";
import TextPost from "../feed/textPost";
import ImagePost from "../feed/imagePost";
import VideoPost from "../feed/videoPost";
import Comment from "./comment";
import PropTypes from "prop-types";

export default class SinglePostPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            postData: null,
            comments: [],
            comment: "",
            myId: "",
            commentError: ""
        };

        this.validationService = new ValidationService();
        this.dataService = new DataService();

        this.bindEventHandlers();
    }

    bindEventHandlers() {
        this.handleChange = this.handleChange.bind(this);
        this.newComment = this.newComment.bind(this);
        this.loadData = this.loadData.bind(this);
        this.getSinglePost = this.getSinglePost.bind(this);
    }

    handleChange(event) {
        const value = event.target.value;
        const name = event.target.name;
        this.setState({
            [name]: value
        });
    }

    newComment() {
        const comment = this.state.comment;
        const postId = this.props.match.params.postId;

        this.validationService.isCommentValid(comment,
            (comment) => {
                this.dataService.newComment(comment, postId,
                    (response) => {
                        this.setState({
                            comment: "",
                            commentError: ""
                        });
                        this.loadData();
                        this.getSinglePost();   
                    });
            }, (error) => {
                this.setState({
                    commentError: error
                });
            });
    }

    loadData() {
        const postId = this.props.match.params.postId;
        this.dataService.getComments(postId,
            (comments) => {
                this.setState({
                    comments: comments
                });
            });

        this.dataService.getProfile(
            (profile) => {
                this.setState({
                    myId: profile.userId
                });
            });
    }

    getSinglePost() {
        const postId = this.props.match.params.postId;
        const postType = this.props.match.params.type;
        this.dataService.getSinglePost(postType, postId,
            (singlePost) => {
                this.setState({
                    postData: singlePost.data
                });
            });
    }

    componentDidMount() {
        this.getSinglePost();
        this.loadData();
    }

    render() {
        if (this.state.postData == null) {
            return <h1>Loading...</h1>;
        }

        const post = this.state.postData;
        const comments = this.state.comments;

        let postType = null;


        switch (post.type) {
        case "text":
            postType = <TextPost myId={this.state.myId} post={post} hideBtn={true} />;
            break;
        case "image":
            postType = <ImagePost myId={this.state.myId} post={post} hideBtn={true} />;
            break;
        case "video":
            postType = <VideoPost myId={this.state.myId} post={post} hideBtn={true} />;
            break;
        }

        return (
            <div className="container feedContainer">

                <div className="row">
                    <div className="col s12 m8 offset-m2">
                        {postType}
                    </div>
                </div>

                <div className="row">
                    <div className="col s10 m7 offset-m2">
                        <input className="commentInput" type="text" placeholder="Post comment" name="comment" onChange={this.handleChange} value={this.state.comment} />
                    </div>

                    <div className="col s2 m1">
                        <span onClick={this.newComment} className="btn-floating btn-large waves-effect waves-light light-blue darken-4">
                            <i className="material-icons">comment</i>
                        </span>

                    </div>
                    <div className="col s12 m8 offset-m2">
                        <p id="error">{this.state.commentError ? `${this.state.commentError}` : ""}</p>
                    </div>
                </div>

                <div className="row">
                    <div className="col s12 m8 offset-m2">
                        {comments.map((comment) => {
                            return <Comment myId={this.state.myId} comment={comment} key={comment.id} />;
                        })}
                    </div>
                </div>

            </div>

        );

    }
}

SinglePostPage.propTypes = {
    match: PropTypes.object,
};
