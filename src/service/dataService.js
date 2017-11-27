import CommunicationService from "./communicationService";
import ProfileDTO from "../components/profile/profileDTO";

class DataService {
    constructor() {
        this.commService = new CommunicationService();
        this.getProfile = this.getProfile.bind(this);
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

}
export default DataService;