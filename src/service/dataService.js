import CommunicationService from "./communicationService";
import ProfileDTO from "../components/profile/profileDTO";

class DataService{
    constructor(){
        this.commService = new CommunicationService();
        this.getProfile = this.getProfile.bind(this);
    }
    getProfile(callback){
        this.commService.getRequest("profile", (result)=>{
            const {name, email, about, postsCount, commentsCount, aboutShort, avatarUrl} = result.data;
            const profile = new ProfileDTO(name, email, aboutShort, about, avatarUrl, postsCount, commentsCount);
            callback(profile);
        }, (error) =>{
            console.log("Profile not found;");
        });
    }

}
export default DataService;