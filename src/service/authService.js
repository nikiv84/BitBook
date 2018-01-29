import { commService } from "./communicationService";
import { redirectService } from "./redirectService";
import { SESSION_ID_KEY } from "../constants";

class AuthService {

    isUserAuth() {
        return !!sessionStorage.getItem(SESSION_ID_KEY);
    }

    login(data, callback) {
        commService.postRequest("login", data, (response) => {
            sessionStorage.setItem(SESSION_ID_KEY, response.data.sessionId);
            redirectService.redirectTo("/feed");
        }, (error) => {
            callback(error.response.data.error.message);
        });
    }

    register(data, callback) {
        commService.postRequest("register", data,
            (response) => {
<<<<<<< HEAD
                redirectService.redirectTo("/login");
=======
                redirectService.redirectTo("/");
>>>>>>> fde72efd108d318247f21039197bc7e8e31a0ce3
            }, (error) => {
                callback(error.response.data.error.message);
            });
    }


    logOut() {
        sessionStorage.removeItem(SESSION_ID_KEY);
        redirectService.redirectTo("/");
    }

}

export const authService = new AuthService();