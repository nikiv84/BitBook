import { BASE_URL, API_KEY, SESSION_ID_KEY } from "../constants";
import axios from "axios";

class CommunicationService {
    createHeaders() {
        const requestHeaders = {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Key": API_KEY
        };
        const sessionId = sessionStorage.getItem(SESSION_ID_KEY);

        if (sessionId) {
            requestHeaders.SessionID = sessionId;
            return requestHeaders;
        }
        return requestHeaders;
    }

    getRequest(url, getDataHandler, errorHandler) {
        const requestUrl = `${BASE_URL}/${url}`;
        const headers = this.createHeaders();
        axios({
            method: "GET",
            headers: headers,
            url: requestUrl,
            json: true
        })
            .then(result => {
                console.log(result);
                return getDataHandler(result);
            })
            .catch((error) => errorHandler(error));
    }

    postRequest(url, data, postDataHandler, errorHandler) {
        const requestUrl = `${BASE_URL}/${url}`;
        const headers = this.createHeaders();
        console.log(headers);
        axios({
            method: "POST",
            url: requestUrl,
            data: JSON.stringify(data),
            headers: headers,
            json: true
        })
            .then(result => {
                console.log(result);
                return postDataHandler(result);
            })
            .catch((error) => errorHandler(error));
    }

    putRequest(url, data, putDataHandler, putErrorHandler) {
        const requestUrl = `${BASE_URL}/${url}`;
        const headers = this.createHeaders();
        axios({
            method: "PUT",
            url: requestUrl,
            data: JSON.stringify(data),
            headers: headers,
            json: true
        })
            .then(result => {
                return putDataHandler(result);
            })
            .catch((error) => {
                putErrorHandler(error);
            });
    }

}

export default CommunicationService;
