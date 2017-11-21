import { BASE_URL, API_KEY, SESSION_ID } from "../constants";
import axios from "axios";

class Communication {
    constructor() {
        this.get = this.get.bind(this);
        this.post = this.post.bind(this);
        this.createHeaders = this.createHeaders.bind(this);
    }
    createHeaders() {
        const requestHeaders = new Headers({
            "Content-Type": "application/json",
            "Key": API_KEY
        });
        const sessionId = sessionStorage.getItem(SESSION_ID);

        if (sessionId) {
            requestHeaders.append("SessionID", sessionId);
            return requestHeaders;
        }
        return requestHeaders;
    }


    get(url, getDataHandler, errorHandler) {

        const requestUrl = `${BASE_URL}/${url}`;

        const params = {
            method: "GET",
            headers: this.createHeaders(),
        };

        fetch(requestUrl, params)
            .then((response) => response.json())
            .then((response) => getDataHandler(response))
            .catch((error) => errorHandler(error));

    }
    //     post(url, data, postDataHandler) {

    //         const requestUrl = `${BASE_URL}/${url}`;

    //         const params = {
    //             method: "POST",
    //             body: JSON.stringify(data),
    //             headers: this.createHeaders(),
    //             // mode: "no-cors"
    //         };
    //         fetch(requestUrl, params)
    //             .then((response) => response.json())
    //             .then((response) => postDataHandler(response))
    //             .catch((error) => console.log(error));

    //     }
    post(url, data, postDataHandler) {
        const requestUrl = `${BASE_URL}/${url}`;
        axios({
            method: "POST",
            url: requestUrl,
            data: JSON.stringify(data),
            headers: {"Content-Type": "application/json","key": API_KEY, "Accept" : "application/json"},
            json: true
        })
            .then((response) => response.json())
            .then((response) => postDataHandler(response))
            .catch((error) => console.log(error));

    }

}

export default Communication;
