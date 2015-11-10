//testing

var express = require("express");

var app = express();

var port = 3000;

app.listen(port, function() {
    console.log("Listening on port " + port);
});

app.use(function(req, res, next) {
    console.log(req.method + " " + req.path);
    next();
});

app.get("/", function(req, res) {
    // console.log(req.method);
    res.send("Hello world using GET");
});

app.post("/", function(req, res) {
    // console.log(req.method);
    res.send("Hello world using POST");
});