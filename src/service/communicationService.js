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

}

export default CommunicationService;
