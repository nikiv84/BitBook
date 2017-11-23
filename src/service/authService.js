import CommunicationService from "./communicationService";
import RedirectService from "./redirectService";
import { SESSION_ID_KEY } from "../constants";

class AuthService {
    constructor() {
        this.commService = new CommunicationService();
        this.redirectService = new RedirectService();
    }

    isUserAuth() {
        return !!sessionStorage.getItem(SESSION_ID_KEY);
    }

    login(data, callback) {
        this.commService.postRequest("login", data, (response) => {
            if (response.status === 200) {
                console.log("TODO BIEN!");
                sessionStorage.setItem(SESSION_ID_KEY, response.data.sessionId);
                this.redirectService.redirectTo("/");
            }
        }, (error) => {
            callback(error.response.data.error.message);
        });
    }

    register(data, callback) {
        this.commService.postRequest("register", data,
            (response) => {
                this.redirectService.redirectTo("/");                
            }, (error) => {
                callback(error.response.data.error.message);
            });
    }
   

    logOut() {
        sessionStorage.removeItem(SESSION_ID_KEY);
        this.redirectService.redirectTo("/login");
    }

}

export default AuthService;