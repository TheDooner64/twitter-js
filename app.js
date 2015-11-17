var express = require("express");
var swig = require("swig");
var morgan = require("morgan");
var socketio = require("socket.io");
var bodyParser = require('body-parser');
var fs = require("fs");
var mime = require("mime");
var routes = require("./routes/index.js");
var app = express();

// Logging middleware. NOTE: Need to figure out what this is doing
app.use(morgan("dev"));

// Default settings for Swig template engine
  // Set which function to use when rendering HTML
app.engine('html', swig.renderFile);
  // Render views using the "html" engine
app.set('view engine', 'html');
  // Set where views for are found for express' "res.render" command
app.set('views', __dirname + '/views');
  // Turn off default cache preferences for swig and express
app.set('view cache', false);
swig.setDefaults({ cache: false});

// HTTP body parsing (JSON or URL-encoded) middleware
  // We include both of these so we can parse the two major kinds of bodies
  // HTML forms default to a URL encoded body
app.use(bodyParser.urlencoded( { extended: true }));
app.use(bodyParser.json());

// Set up server
  // app.listen does a LOT under the hood
  // Check out Joe's version of the code from his Q&A to understand what it's doing
var port = 3000;
var server = app.listen(port, function() {
  console.log("Listening on port " + port);
});

// Give socket a server instance
var io = socketio.listen(server);

// Start the middleware chain with this function to check which requests come in
  // If you don't define a path, it assumes it's for everything
app.use(function(req, res, next) {
  // When a response is completed, the console.log will fire
    // This is an event emitter
  res.on("finish", function() {
    console.log(req.method, req.path, res.statusCode);
  });
  // Next will pass the req and res to the next middleware in the chain
  next();
});

// Set up dynamic route to serve up the CSS file, which the HTML file will access
  // This is the quick way to set up dynamic routes, compared to the below code
app.use(express.static(__dirname + "/public"));

/* NOTE: Below is the more manual way to set up dynamic routes. REVIEW THIS!

// Set up dynamic route to serve up the CSS file, which the HTML file will access
app.use(function(req, res, next) {
  console.log(req.path);
  var mimeType = mime.lookup(req.path);
  fs.readFile("./public/" + req.path, function(err, fileBuffer) {
    if(err) return next();
    res.header("Content-Type", mimeType);
    res.send(fileBuffer);
  });
});
*/

/* NOTE: Below is Andrew's version of the manual implementation 

router.get('/*', function (req, res, next) {
    var path = req.path;
    // console.log(path);

  var options = {
    root: __dirname + '/../public',
    dotfiles: 'deny',
    headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
    }
  };

  var fileName = req.params.name;
  res.sendFile(path, options, function (err) {
    if (err) {
      // res.status(err.status);
      next();
    }
    else {
      console.log('Sent:', path);
    }
  });

})
*/

// Pass the req and res to the routes file
  // Passing io as an argument to the routes will give the sockets server access
app.use("/", routes(io));