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
var MessageSchema = new mongoose.Schema({
  name: String,
  message: String,
  comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}]
  // created_at: {type: Date, default: Date.now}
}, {timestamps: true});

var CommentSchema = new mongoose.Schema({
  _message: {type: mongoose.Schema.Types.ObjectId, ref: 'Message'},
  name: String,
  comment: String
  // created_at: {type: Date, default: Date.now}
}, {timestamps: true});

// we can add validations using the .path() method.
MessageSchema.path('name').required(true, 'Name field cannot be blank');
MessageSchema.path('name').validate(function (str) {
  return str.length > 3;}, 'Your name should be at least 4 characters long');
MessageSchema.path('message').required(true, 'Message field cannot be blank');
CommentSchema.path('name').required(true, 'Your name field for comment cannot be blank');
CommentSchema.path('name').validate(function (str) {
  return str.length > 3;}, 'Your name should be at least 4 characters long');
CommentSchema.path('comment').required(true, 'Your comment field cannot be blank');

mongoose.model('Message', MessageSchema); // We are setting this Schema in our Models as 'Message'
mongoose.model('Comment', CommentSchema); // We are setting this Schema in our Models as 'Comment'
var Message = mongoose.model('Message'); // We are retrieving this Schema from our Models, named 'Message'
var Comment = mongoose.model('Comment'); // We are retrieving this Schema from our Models, named 'Comment'

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
  Message.find({})
         .populate('comments')
         .exec(function(err, messages){
            if(err){
              res.render('index', {errors: messages.errors});
            }
            else{
              console.log(messages);
              res.render('index', {messages: messages});
            }
          })
});

app.post('/add_message', function(req, res) {
  // create a new User with the name and age corresponding to those from req.body
  var message = new Message({name: req.body.name, message: req.body.message});
  // Try to save that new user to the database (this is the method that actually inserts into the db) and run a callback function with an error (if any) from the operation.
  message.save(function(err) {
    // if there is an error console.log that something went wrong!
    if(err) {
      Message.find({})
             .populate('comments')
             .exec(function(err, messages){
                if(err){
                  res.render('index', {errors: messages.errors});
                }
                else{
                  res.render('index', {errors: message.errors, messages: messages});
                }
              });
    } else { // else console.log that we did well and then redirect to the root route
      console.log('message successfully added!', message);
      res.redirect('/');
    }
  });
});

app.post('/add_comment/:id', function(req, res) {
  Message.findOne({_id: req.params.id}, function(err, message){
    // create a new User with the name and age corresponding to those from req.body
    var comment = new Comment({name: req.body.name, comment: req.body.comment, _message: message._id});
    comment.save(function(err){
      if(err){
        console.log('Error occurred while saving your comment', comment.errors);
        Message.find({})
               .populate('comments')
               .exec(function(err, messages){
                  if(err){
                    res.render('index', {errors: comment.errors});
                  }
                  else{
                    res.render('index', {errors: comment.errors, messages: messages});
                  }
                });
      }
      else{
        message.comments.push(comment._id);
        // Try to save that new user to the database (this is the method that actually inserts into the db) and run a callback function with an error (if any) from the operation.
        message.save(function(err) {
          // if there is an error console.log that something went wrong!
          if(err) {
            console.log('Error occurred while updating your message', message.errors);
            res.redirect('/');
            // res.render('index', {title: 'You have error!', errors: message.errors});
          } else { // else console.log that we did well and then redirect to the root route
            console.log(message);
            console.log('your comment successfully added!', message);
            res.redirect('/');
          }
        });
      }
    });
  });
});

// tell the express app to listen on port 8000
app.listen(8000, function() {
  console.log("listening on port 8000");
})
