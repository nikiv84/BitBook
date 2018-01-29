<<<<<<< HEAD
const express = require("express");
const path = require("path");
const port = process.env.PORT || 4000;
const app = express();

app.use(express.static("./public"));

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./public/index.html"));
=======
const express = require('express');
const path = require('path');
const port = process.env.PORT || 8080;
const app = express();

app.use(express.static('public'));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './public/index.html'));
>>>>>>> fde72efd108d318247f21039197bc7e8e31a0ce3
});

app.listen(port);

<<<<<<< HEAD
console.log("Server started at port:", port);
=======
console.log('Server started.');
>>>>>>> fde72efd108d318247f21039197bc7e8e31a0ce3
