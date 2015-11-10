var express = require("express");
var swig = require("swig");
var mySwig = new swig.Swig();
var fs = require('fs');
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
    fs.readFile("./views/index.html", function(err, contents) {
		if(err) throw err;
		 var sendMe = mySwig.render(contents.toString(), {
		 	locals: {
				title: "whatever",
				people: [{
					name: "bobby"
				},
				{
					name: "everett"
				}]
			}
		});
    	res.send(sendMe);
	});
});
   

app.post("/", function(req, res) {
    // console.log(req.method);
    res.send("Hello world using POST");
});


