var express = require("express");
var router = express.Router();
var fs = require("fs");
var tweetBank = require("../tweetBank");
var path = require("path");

router.use("/stylesheets/:fileName", function(req, res, next) {
    res.sendFile(path.join(__dirname.toString(), "../public/stylesheets", req.params.fileName.toString()), next);
});

router.get("/", function(req, res) {
    var tweets = tweetBank.list();
    res.render("index", { title: "Twitter.js", tweets: tweets } );
});
   
// router.post("/", function(req, res) {
//     // console.log(req.method);
//     res.send("Hello world using POST");
// });

module.exports = router;