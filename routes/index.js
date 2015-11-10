var express = require("express");
var router = express.Router();
var fs = require("fs");
var tweetBank = require("../tweetBank");
var path = require("path");
var bodyParser = require('body-parser');


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
  res.render( 'index', { title: 'Twitter.js - Posts by '+name, tweets: tweets } );
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

// router.use(function (req, res) {
//   res.setHeader('Content-Type', 'text/plain')
//   console.log(JSON.stringify(req.body, null, 2));
//   res.end("null");
// })

router.post("/submit", function(req, res) {
	tweetBank.add(req.body.name, req.body.text);
	res.redirect('/');
});

module.exports = router;