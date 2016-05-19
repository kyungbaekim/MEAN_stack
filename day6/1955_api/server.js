// require express
var express = require("express");
// create the express app
var app = express();
// path module -- try to figure out where and why we use this
var path = require("path");

// Require body-parser (to receive post data from clients)
var bodyParser = require("body-parser");
// Integrate body-parser with our App
// app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

// static content
app.use(express.static(path.join(__dirname, "./client/static")));
// setting up ejs and our views folder
app.set('views', path.join(__dirname, './client/views'));
app.set('view engine', 'ejs');

require('./server/config/mongoose.js');

// store the function in a variable
var routes_setter = require('./server/config/routes.js');
// invoke the function stored in routes_setter and pass it the "app" variable
routes_setter(app);

// tell the express app to listen on port 8000
app.listen(8000, function() {
  console.log("listening on port 8000");
});
