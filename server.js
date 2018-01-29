const express = require("express");
const path = require("path");
const port = process.env.PORT || 4000;
const app = express();

app.use(express.static("./public"));

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./public/index.html"));
});

app.listen(port);

console.log("Server started at port:", port);
