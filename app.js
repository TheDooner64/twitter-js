var express = require("express");
var swig = require("swig");
var app = express();

var port = 3000;

app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.set('view cache', false);
swig.setDefaults({ cache : false});

app.listen(port, function() {
    console.log("Listening on port " + port);
});

app.use(function(req, res, next) {
    console.log(req.method + " " + req.path);
    next();
});

app.get("/", function(req, res) {
    // console.log(req.method);
    var localsForSwig = { 
		title: "whatever",
		people: [{
			name: "bobby"
		},
		{
			name: "everett"
		}]
	}
    res.render('index', localsForSwig);
});
   

app.post("/", function(req, res) {
    // console.log(req.method);
    res.send("Hello world using POST");
});


