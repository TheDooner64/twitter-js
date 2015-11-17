var express = require("express");
var router = express.Router();
var tweetBank = require("../tweetBank");

module.exports = function (io) {
  router.get("/", function(req, res) {
    var tweetTable = tweetBank.list();
    tweetTable.then(function(tweets) {
      tweets = tweets.map(function(tweet) {
        return {
          tweet: tweet.tweet,
          UserId: tweet.UserId,
          name: tweet.User.name,
          pictureUrl: tweet.User.pictureUrl
        };
      });
      var locals = {
        showForm: true,
        title: "Twitter.js",
        tweets: tweets
      };
      res.render("index", locals);
    });
  });

  router.get( '/users/:name', function(req, res) {
    var name = req.params.name;
    var tweetTable = tweetBank.find( {name: name} );
    tweetTable.then(function(tweets) {
      tweets = tweets.map(function(tweet) {
        return {
          tweet: tweet.tweet,
          UserId: tweet.UserId,
          name: tweet.User.name,
          pictureUrl: tweet.User.pictureUrl
        };
      });
      var locals = {
        title: 'Twitter.js - Posts by ' + name,
        tweets: tweets,
        showForm: true,
        name: name
      };
      res.render( 'index', locals);
    });
  });

  router.get( '/users/:name/tweets/:id', function(req, res) {
    var name = req.params.name;
    var id = req.params.id;
    var tweets = tweetBank.find(req.params);
    var locals = { title: 'Twitter.js - Post by ' + name, tweets: tweets };
    res.render( 'index', locals);
  });

  router.post("/submit", function(req, res) {
    var name = req.body.name;
    var text = req.body.text;
    tweetBank.add(name, text)
      .then(function() {
        res.redirect('/');
      });
    // io.sockets.emit('new_tweet', { name: name, text: text });
  });

  // NOTE: Add a route to default to error handling

  return router;
};