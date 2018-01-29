

class ValidationService {

    isLoginFormValid(data, callback) {
        let errors = {};

        if (!this.hasAllRequiredFields(data)) {
            errors.allFields = "All fields must be filled out!";
            callback(errors);
            return false;
        }
        return true;
    }

    isEditFormValid(data, callback) {
        let errors = {};

        if (!this.isNameValid(data)) {
            errors.name = "Name must contain first and last name!";
            callback(errors);
            return false;
        }

        if (!this.isEmailValid(data)) {
            errors.email = "Email is not in valid format!";
            callback(errors);
            return false;
        }

        if (!this.isLinkValid(data)) {
            errors.link = "Link is not in valid format!";
            callback(errors);
            return false;
        }

        if (!this.hasAllRequiredFields(data)) {
            errors.allFields = "All fields must be filled out!";
            callback(errors);
            return false;
        }

        return true;
    }

    isRegisterFormValid(data, callback) {
        let errors = {};

        if (!this.hasAllRequiredFields(data)) {
            errors.allFields = "All fields must be filled out!";
            callback(errors);
            return false;
        }

        if (!this.isNameValid(data)) {
            errors.name = "Name must contain first and last name!";
            callback(errors);
            return false;
        }

        if (!this.isUsernameValid(data)) {
            errors.username = "Username must be longer than 3 characters!";
            callback(errors);
            return false;
        }

        if (!this.isEmailValid(data)) {
            errors.email = "Email is not in valid format!";
            callback(errors);
            return false;
        }

        if (!this.isPasswordValid(data)) {
            errors.password = "Password must be longer than 6 characters!";
            callback(errors);
            return false;
        }

        if (!this.isPasswordConfirm(data)) {
            errors.repeatPassword = "Passwords must match!";
            callback(errors);
            return false;
        }

        if (Object.keys(errors).length !== 0) {
            return false;
        }

        return true;

    }

    isTextPostValid(data, successCallback, errorCallback) {
        if (!this.hasAllRequiredFields(data)) {
            const error = "Post must contain text!";
            errorCallback(error);
            return false;
        }

        successCallback(data);
    }

    isImagePostValid(data, successCallback, errorCallback) {
        let errors = {};
        if (!this.hasAllRequiredFields(data)) {
            errors.allFields = "Post must contain text!";
            errorCallback(errors);
            return false;
        }
        successCallback(data);
    }

    isVideoPostValid(data, successCallback, errorCallback) {
        let errors = {};

        if (!this.hasAllRequiredFields(data)) {
            errors.allFields = "Post must contain text!";
            errorCallback(errors);
            return false;
        }

        if (!this.isYouTubeLinkValid(data)) {
            errors.link = "You Tube link is not valid!";
            errorCallback(errors);
            return false;
        }
        successCallback(data);

    }

    isCommentValid(data, successCallback, errorCallback) {
        if (!this.isEmptyField(data)) {
            const error = "Comment must contain text!";
            errorCallback(error);
            return false;
        }
        successCallback(data);
    }

    isEmptyField(data) {
        if (data.length == 0) {
            return false;
        }
        return true;
    }

    hasAllRequiredFields(data) {
        for (let key in data) {
            if (data[key] === "") {
                return false;
            }
        }

        return true;
    }

    isPasswordValid(data) {
        if (data.password.length < 6 && data.password !== "") {
            return false;
        }

        return true;
    }

    isPasswordConfirm(data) {
        if ((data.password !== data.repeatPassword) && data.repeatPassword !== "") {
            return false;
        }
        return true;
    }

    isUsernameValid(data) {
        if (data.username.length < 3 && data.username !== "") {
            return false;
        }
        return true;
    }

    isNameValid(data) {
        const res = data.name.split(" ");
        for (const key in res) {
            if ((res.length < 2 || res[key].length < 2) && data.name !== "") {
                return false;
            }
        }
        return true;
    }

    isEmailValid(data) {
        if (data.email !== "") {
            const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            const isOK = re.test(data.email);
            return isOK;
        }
        return true;
    }

    isLinkValid(data) {
        if (data.avatarUrl !== "") {
            const re = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
            const isOK = re.test(data.avatarUrl);
            return isOK;
        }
        return true;
    }

    isYouTubeLinkValid(data) {
        if (data.videoUrl !== "") {
            const re = /(https?:\/\/)?(?:www\.)?youtube.com\/watch\?v=\w+(&\S*)?$/;
            const isOk = re.test(data.videoUrl);
            return isOk;
        }
        return true;
    }
}



export const validationService = new ValidationService();