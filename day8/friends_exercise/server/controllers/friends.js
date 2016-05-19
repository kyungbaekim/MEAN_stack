// need to require mongoose to be able to run mongoose.model()
var mongoose = require('mongoose');
var Friend = mongoose.model('Friend');

// this is our friends.js file located at /server/controllers/friends.js
// note the immediate function and the object that is returned
module.exports = (function() {
  return {
// notice how index in the factory(client side) is calling the index method(server side)
    index: function(req, res) {
      Friend.find({}, function(err, results) {
        if(err) {
          console.log(err);
        } else {
          res.json(results);
        }
      })
    },
    create: function(req, res){
      console.log(req.body);
      // create a new Friend with the name and age corresponding to those from req.body
      var friend = new Friend({name: req.body.name, age: req.body.age});
      // Try to save that new user to the database (this is the method that actually inserts into the db) and run a callback function with an error (if any) from the operation.
      friend.save(function(err) {
        // if there is an error console.log that something went wrong!
        if(err) {
          console.log(err);
        } else { // else console.log that we did well and then redirect to the root route
          console.log('data saved');
          res.redirect('/');
        }
      })
    },
    remove: function(req, res) {
      console.log(req.body);
      Friend.remove({name: req.body.name}, function(err){
        if(err){
          // res.render("index", {title: 'You have error!', errors: animal.errors});
          console.log(err);
        }
        else {
          console.log('data removed');
          res.redirect('/');
        }
      })
    }
  }
})();
// note that this is just a code snippet of the show method from the object returned in the controller (this includes the exports module.exports
