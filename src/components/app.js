import React from "react";
import Main from "./main/mainPage";
import LoginRegister from "./login_register/loginRegister";
import { authService } from "../service/authService";

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        if(authService.isUserAuth()){
            return <Main />;
        };
        
        return <LoginRegister />;

    };
};
export default App;
