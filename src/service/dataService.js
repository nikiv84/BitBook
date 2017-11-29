import CommunicationService from "./communicationService";
import ProfileDTO from "../components/profile/profileDTO";
import PostDTO from "../components/profile/postDTO";

class DataService {
    constructor() {
        this.commService = new CommunicationService();
        this.getProfile = this.getProfile.bind(this);
        this.getPost = this.getPost.bind(this);
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
        }, (serverErrorObject) => {
            console.log(serverErrorObject);
            errorHandler(serverErrorObject);
        });
    }

    getPost(callback) {
        this.commService.getRequest("Posts", (result) => {
          
            const posts = result.data.map((post) => {
                // const { id,dateCreated,userId,userDisplayName,type } = post;
                return new PostDTO(post);
                
            });
            // console.log(posts);
            callback(posts);
        }, (error) => {
            console.log("Post not found;");
        });
    }

    updatePost(data, dataHandler, errorHandler) {
        this.commService.postRequest("TextPosts", data, (response) => {
            dataHandler(response);
        }, (serverErrorObject) => {
            console.log(serverErrorObject);
            errorHandler(serverErrorObject);
        });
    }


}
export default DataService;