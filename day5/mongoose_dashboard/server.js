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
var AnimalsDojo = new mongoose.Schema({
 name: String,
 description: String,
 created_at: {type: Date, default: Date.now}
})
// we can add validations using the .path() method.
AnimalsDojo.path('name').required(true, 'Name field cannot be blank');
AnimalsDojo.path('description').required(true, 'description field cannot be blank');

mongoose.model('Animals', AnimalsDojo); // We are setting this Schema in our Models as 'User'
var Animals = mongoose.model('Animals') // We are retrieving this Schema from our Models, named 'User'

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
  Animals.find({}, function(err, animals){
    if(err){
      res.render("index", {errors: animals.errors});
    }
    else{
      res.render("index", {animals: animals});
    }
  })
})

app.get('/animals/new', function(req, res) {
  res.render("add_animal");
})

app.get('/animals/:id', function(req, res) {
  Animals.findOne({_id: req.params.id}, function(err, animal){
    if(err){
      res.render("display", {title: 'You have error!', errors: animal.errors});
    }
    else {
      res.render("display", {animal: animal});
    }
  })
})

app.post('/animals', function(req, res) {
  // create a new User with the name and age corresponding to those from req.body
  var animals = new Animals({name: req.body.name, description: req.body.description});
  // Try to save that new user to the database (this is the method that actually inserts into the db) and run a callback function with an error (if any) from the operation.
  animals.save(function(err) {
    // if there is an error console.log that something went wrong!
    if(err) {
      res.render("add_animal", {title: 'You have error!', errors: animals.errors});
    } else { // else console.log that we did well and then redirect to the root route
      console.log('successfully added!');
      res.redirect('/');
    }
  })
})

app.get('/animals/edit/:id', function(req, res) {
  Animals.findOne({_id: req.params.id}, function(err, animal){
    if(err){
      res.render("edit_animal", {title: 'You have error!', errors: animal.errors});
    }
    else {
      res.render("edit_animal", {animal: animal});
    }
  })
})

app.post('/animals/:id', function(req, res) {
  Animals.update({_id: req.params.id}, {name: req.body.name, description: req.body.description}, function(err, animal){
    if(err){
      res.render("edit_animal", {title: 'You have error!', errors: animal.errors});
    }
    else {
      res.redirect('/');
    }
  })
})

app.post('/animals/delete/:id', function(req, res) {
  Animals.remove({_id: req.params.id}, function(err, animal){
    if(err){
      res.render("index", {title: 'You have error!', errors: animal.errors});
    }
    else {
      res.redirect('/');
    }
  })
})

// tell the express app to listen on port 8000
app.listen(8000, function() {
  console.log("listening on port 8000");
})
