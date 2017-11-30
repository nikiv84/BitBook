import CommunicationService from "./communicationService";
import ProfileDTO from "../components/profile/profileDTO";
import UserDTO from "../components/user/userDTO";
import TextPostDTO from "../dto/textPostDTO";
import VideoPostDTO from "../dto/videoPostDTO";
import ImagePostDTO from "../dto/imagePostDTO";
import CommentDTO from "../dto/commentDTO";

export default class DataService {
    constructor() {
        this.commService = new CommunicationService();
    }

    getProfile(callback) {
        this.commService.getRequest("profile", (result) => {
            const { userId, name, email, about, postsCount, commentsCount, aboutShort, avatarUrl } = result.data;
            const profile = new ProfileDTO(userId, name, email, aboutShort, about, avatarUrl, postsCount, commentsCount);
            callback(profile);
        }, (error) => {
            console.log("Profile not found;");
        });
    }

    getUser(id, callback) {
        const requestUrl = `users/${id}`;
        this.commService.getRequest(requestUrl, (result) => {
            const { userId, name, email, about, postsCount, commentsCount, aboutShort, avatarUrl } = result.data;
            const profile = new ProfileDTO(userId, name, email, aboutShort, about, avatarUrl, postsCount, commentsCount);
            callback(profile);
        }, (error) => {
            console.log("Profile not found;");
        });
    }

    updateProfile(data, dataHandler, errorHandler) {
        this.commService.putRequest("Profiles", data, (response) => {
            dataHandler(response);
        }, (error) => {
            console.log(error);
            errorHandler(error);
        });
    }

    getPeople(peopleHandler) {
        let people = [];
        this.commService.getRequest("users",
            (response) => {
                response.data.forEach(users => {
                    const { id, name, aboutShort, avatarUrl, lastPostDate } = users;
                    const user = new UserDTO(id, name, aboutShort, avatarUrl, lastPostDate);
                    people.push(user);
                });
                peopleHandler(people);
                console.log(people);

            }, (error) => {
                console.log(error);
            });
    }

    getPosts(postsHandler) {
        let posts = [];
        this.commService.getRequest("Posts",
            (response) => {
                response.data.forEach(post => {
                    const { id, dateCreated, userId, userDisplayName, type, text, commentsNum, imageUrl, videoUrl } = post;
                    if (post.type == "text") {
                        const textPost = new TextPostDTO(id, dateCreated, userId, userDisplayName, type, text, commentsNum);
                        posts.push(textPost);
                    } else if (post.type == "image") {
                        const imagePost = new ImagePostDTO(id, dateCreated, userId, userDisplayName, type, commentsNum, imageUrl);
                        posts.push(imagePost);
                    } else if (post.type == "video") {
                        const videoPost = new VideoPostDTO(id, dateCreated, userId, userDisplayName, type, commentsNum, videoUrl);
                        posts.push(videoPost);
                    }
                });

                postsHandler(posts);

            }, (error) => {
                console.log(error);
            });
    }

    newPost(type, postData, responseHandler) {
        this.commService.postRequest(`${type}Posts`, postData,
            (response) => {
                responseHandler(response);
            }, (error) => {
                console.log(error);
            });
    }

    deletePost(id, responseHandler) {
        this.commService.deleteRequest(`Posts/${id}`, (response) => {
            responseHandler(response);
        }, (error) => {
            console.log(error);
        });
    }

    getComments(postId, responseHandler) {
        let comments = [];
        this.commService.getRequest(`Comments?postId=${postId}`,
            (response) => {
                response.data.forEach(commentData => {
                    const { id, dateCreated, body, postId, authorName, authorId } = commentData;
                    const comment = new CommentDTO(id, dateCreated, body, postId, authorName, authorId);
                    comments.push(comment);
                });

                responseHandler(comments);

            }, (error) => {
                console.log(error);
            });
    }

    newComment(comment, postId, responseHandler) {
        const data = {
            body: comment,
            postId: postId
        };
        this.commService.postRequest("Comments", data,
            (response) => {
                responseHandler(response);
            },
            (error) => {
                console.log(error);
            });
    }

    getSinglePost(type, postId, responseHandler) {
        this.commService.getRequest(`${type}Posts/${postId}`, (response) => {
            responseHandler(response);
        }, (error) => {
            console.log(error);
        });
    }
}