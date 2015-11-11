var express = require("express");
var router = express.Router();
var fs = require("fs");
var tweetBank = require("../tweetBank");
var path = require("path");
var bodyParser = require('body-parser');

module.exports = function (io) {
  router.use("/stylesheets/:fileName", function(req, res, next) {
    res.sendFile(path.join(__dirname.toString(), "../public/stylesheets", req.params.fileName.toString()), next);
  });

  router.get("/", function(req, res) {
      var tweets = tweetBank.list();
      res.render("index", { showForm: true, title: "Twitter.js", tweets: tweets } );
  });

  router.get( '/users/:name', function(req, res, next) {
    var name = req.params.name;
    var tweets = tweetBank.find( {name: name} );
    res.render( 'index', { title: 'Twitter.js - Posts by '+name, tweets: tweets, showForm: true, name: name} );
  });

  router.get( '/users/:name/tweets/:id', function(req, res, next) {
    var name = req.params.name;
    var id = req.params.id;
    var tweets = tweetBank.find(req.params);
    res.render( 'index', { title: 'Twitter.js - Post by '+name, tweets: tweets } );
  });

  //Handle new tweets
  router.use(bodyParser.urlencoded( { extended : false }));
  router.use(bodyParser.json());

  router.post("/submit", function(req, res) {
    var name = req.body.name;
    var text = req.body.text;
    tweetBank.add(name, text);
    io.sockets.emit('new_tweet', { name: name, text: text });
    res.redirect('/');
  });

  return router;
};