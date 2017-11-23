
class ValidationService {

    isLoginFormValid(data) {
        return this.hasAllRequiredFields(data);
    }
    isEditFormValid(data) {
        
    }

    isRegisterFormValid(data, callback) {
        let errorMsgs = [];

        if(!this.hasAllRequiredFields(data)){
            errorMsgs.push("All fields must be filled out!");
            callback(errorMsgs);
            return false;
        }

        if(!this.isNameValid(data)){
            errorMsgs.push("Name must contain first and last name!");
            callback(errorMsgs);
            return false;
        }

        if(!this.isUsernameValid(data)){
            errorMsgs.push("Username must be longer than 3 characters!");
            callback(errorMsgs);
            return false;
        }

        if(!this.isEmailValid(data)){
            errorMsgs.push("Email is not invalid format!");
            callback(errorMsgs);
            return false;
        }

        if(!this.isPasswordValid(data)){
            errorMsgs.push("Password must be longer than 6 characters!");
            callback(errorMsgs);
            return false;
        }

        if(!this.isPasswordConfirm(data)){
            errorMsgs.push("Passwords must match!");
            callback(errorMsgs);
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
        if (data.password.length < 6) {
            console.log("Pass error!");
            return false;
        }
      
        return true;
    }
    isPasswordConfirm(data) {
        if (data.password != data.repeatPassword) {
            console.log("Passwords must match");
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
        return isOK;
    }
}



export default ValidationService;