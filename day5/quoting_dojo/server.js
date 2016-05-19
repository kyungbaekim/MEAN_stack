// require express
var express = require("express");
// create the express app
var app = express();

// require mongoose
var mongoose = require('mongoose');
// This is how we connect to the mongodb database using mongoose -- "basic_mongoose" is the name of
// our db in mongodb -- this should match the name of the db you are going to use for your project.
mongoose.connect('mongodb://localhost/basic_mongoose');
// create mongoose schema
var QuotingDojo = new mongoose.Schema({
 name: String,
 quote: String,
 created_at: {type: Date, default: Date.now}
})
// we can add validations using the .path() method.
QuotingDojo.path('name').required(true, 'Your name cannot be blank');
QuotingDojo.path('quote').required(true, 'Your quote cannot be blank');


mongoose.model('Quotes', QuotingDojo); // We are setting this Schema in our Models as 'User'
var Quotes = mongoose.model('Quotes') // We are retrieving this Schema from our Models, named 'User'

// Require body-parser (to receive post data from clients)
var bodyParser = require("body-parser");
// Integrate body-parser with our App
app.use(bodyParser.urlencoded());

// path module -- try to figure out where and why we use this
var path = require("path");
// static content
app.use(express.static(path.join(__dirname, "./static")));
// setting up ejs and our views folder
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
// root route to render the index.ejs view
app.get('/', function(req, res) {
  res.render("index");
})
app.get('/quotes', function(req, res) {
  Quotes.find({}, null, {sort:{created_at: -1}}, function(err, quotes){
    if(err){
      res.render("main", {errors: quotes.errors});
    }
    else{
      console.log(quotes);
      res.render("main", {result: quotes});
    }
  })
})
// Add User Request
app.post('/quotes', function(req, res) {
  // create a new User with the name and age corresponding to those from req.body
  var quotes = new Quotes({name: req.body.name, quote: req.body.quote});
  // Try to save that new user to the database (this is the method that actually inserts into the db) and run a callback function with an error (if any) from the operation.
  quotes.save(function(err) {
    // if there is an error console.log that something went wrong!
    if(err) {
      console.log('something went wrong');
      console.log(err);
      res.render("index", {title: 'You have error(s)!', errors: quotes.errors});
    } else { // else console.log that we did well and then redirect to the root route
      console.log('successfully added a user!');
      res.redirect('/quotes');
    }
  })
})

// tell the express app to listen on port 8000
app.listen(8000, function() {
  console.log("listening on port 8000");
})
