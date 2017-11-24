import React from "react";
import Main from "./profile/mainPage";
import LoginRegister from "./login_register/loginRegister";
import AuthService from "../service/authService";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.authService = new AuthService();
    }

    render() {
        if(this.authService.isUserAuth()){
            return <Main />;
        };
        
        return <LoginRegister />;

    };
};
export default App;
