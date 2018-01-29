import React from "react";
import ReactDOM from "react-dom";
<<<<<<< HEAD
import { BrowserRouter } from "react-router-dom";
=======
import { HashRouter } from "react-router-dom";
>>>>>>> fde72efd108d318247f21039197bc7e8e31a0ce3
import "babel-polyfill";
import App from "./components/app";

ReactDOM.render(
<<<<<<< HEAD
    <BrowserRouter>
        <App />
    </BrowserRouter>,
=======
    <HashRouter>
        <App />
    </HashRouter>,
>>>>>>> fde72efd108d318247f21039197bc7e8e31a0ce3
    document.getElementById("app")
);
