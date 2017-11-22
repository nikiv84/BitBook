
class ValidationService {

    isLoginFormValid(data) {
        return this.hasAllRequiredFields(data);
    }


    isRegisterFormValid(data, callback) {
        if(!this.isPasswordValid(data)){
            callback("Password error!");
        }
        if(!this.isUsernameValid(data)){
            callback("Username error!");
        }
        if(!this.isNameValid(data)){
            callback("Name error!");
        }
        if(!this.isEmailValid(data)){
            callback("Email error!");
            return false;
        }

        // if(!this.hasAllRequiredFields(data) || !this.isPasswordValid(data) || !this.isUsernameValid(data) || !this.isNameValid(data) || !this.isEmailValid(data)) {
        //     return false;
        // }
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
        if (data.password.length < 6) {
            console.log("Pass error!");
            return false;
        }
        return true;
    }
    isUsernameValid(data) {
        if (data.username.length < 3) {
            console.log("Username error!");
            return false;
        }
        return true;
    }
    isNameValid(data) {
        const res = data.name.split(" ");
        for (const key in res) {
            if (res.length<2 || res[key].length < 2) {
                console.log("Name error!");
                return false;
            }
        }
        return true;
    }
    isEmailValid(data) {   
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const isOK = re.test(data.email);
        console.log("Email is: " + isOK);
        return isOK;
    }
}



export default ValidationService;