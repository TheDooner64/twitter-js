var express = require("express");
var swig = require("swig");
var routes = require("./routes/");
var socketio = require("socket.io");
var app = express();

// Default settings for template engine
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.set('view cache', false);
swig.setDefaults({ cache : false});

// Set up server
var port = 3000;
var server = app.listen(port, function() {
    console.log("Listening on port " + port);
});
// Give socket a server instance
var io = socketio.listen(server);

app.use(function(req, res, next) {
    console.log(req.method + " " + req.path);
    next();
});

app.use("/", routes(io));