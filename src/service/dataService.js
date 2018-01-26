import { commService } from "./communicationService";
import ProfileDTO from "../components/profile/profileDTO";
import UserDTO from "../components/user/userDTO";
import TextPostDTO from "../dto/textPostDTO";
import VideoPostDTO from "../dto/videoPostDTO";
import ImagePostDTO from "../dto/imagePostDTO";
import CommentDTO from "../dto/commentDTO";
import { POSTS_PER_PAGE } from "../constants";

class DataService {

    getProfile(callback) {
        commService.getRequest("profile", (result) => {
            const { userId, name, email, about, postsCount, commentsCount, aboutShort, avatarUrl } = result.data;
            const profile = new ProfileDTO(userId, name, email, aboutShort, about, avatarUrl, postsCount, commentsCount);
            callback(profile);
        }, (error) => {
            console.log("Profile not found;");
        });
    }

    getUser(id, callback) {
        const requestUrl = `users/${id}`;
        commService.getRequest(requestUrl, (result) => {
            const { userId, name, email, about, postsCount, commentsCount, aboutShort, avatarUrl } = result.data;
            const profile = new ProfileDTO(userId, name, email, aboutShort, about, avatarUrl, postsCount, commentsCount);
            callback(profile);
        }, (error) => {
            console.log("Profile not found;");
        });
    }

    updateProfile(data, dataHandler, errorHandler) {
        commService.putRequest("Profiles", data, (response) => {
            dataHandler(response);
        }, (error) => {
            console.log(error);
            errorHandler(error);
        });
    }

    getPeople(peopleHandler) {
        let people = [];
        commService.getRequest("users",
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

    getPosts(skip, postsHandler) {
        let posts = [];
        commService.getRequest(`Posts/?$orderby=DateCreated desc&$skip=${skip}&$top=${POSTS_PER_PAGE}`,
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

    getPostsCount(responseHandler) {
        commService.getRequest("posts/count",
            (response) => {
                console.log(response);
                responseHandler(response);
            });
    }

    newPost(type, postData, responseHandler) {
        commService.postRequest(`${type}Posts`, postData,
            (response) => {
                responseHandler(response);
            }, (error) => {
                console.log(error);
            });
    }

    deletePost(id, responseHandler) {
        commService.deleteRequest(`Posts/${id}`, (response) => {
            responseHandler(response);
        }, (error) => {
            console.log(error);
        });
    }

    getComments(postId, responseHandler) {
        let comments = [];
        commService.getRequest(`Comments?postId=${postId}`,
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
        commService.postRequest("Comments", data,
            (response) => {
                responseHandler(response);
            },
            (error) => {
                console.log(error);
            });
    }

    getSinglePost(type, postId, responseHandler) {
        commService.getRequest(`${type}Posts/${postId}`, (response) => {
            responseHandler(response);
        }, (error) => {
            console.log(error);
        });
    }

    fileUpload(file, responseHandler, errorHandler) {
        let formData = new FormData();
        formData.append("file", file);

        commService.uploadRequest("upload", formData, (response) => {
            responseHandler(response);
        }, (error) => {
            errorHandler(error);
        }
        );

    }
}

export const dataService = new DataService(); 