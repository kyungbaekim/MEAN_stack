// require mongoose
var mongoose = require('mongoose');
var Names = mongoose.model('Names') // We are retrieving this Schema from our Models, named 'User'

module.exports = {
  index: function(req, res) {
    Names.find({}, function(err, names){
      if(err){
        console.log(err);
      }
      else{
        res.json(names);
      }
    })
  },
  create: function(req, res) {
    // create a new User with the name and age corresponding to those from req.body
    var name = new Names({name: req.body.name});
    // Try to save that new user to the database (this is the method that actually inserts into the db) and run a callback function with an error (if any) from the operation.
    name.save(function(err) {
      // if there is an error console.log that something went wrong!
      if(err) {
        console.log(err);
      } else { // else console.log that we did well and then redirect to the root route
        res.redirect('/');
      }
    })
  },
  delete: function(req, res) {
    console.log(req.params.id);
    Names.remove({_id: req.params.id}, function(err){
      if(err){
        console.log(err);
      }
      else {
        res.redirect('/');
      }
    })
  },
  update: function(req, res) {
    Names.update({_id: req.params.id}, {name: req.body.name}, function(err){
      if(err){
        console.log(err);
      }
      else {
        res.redirect('/');
      }
    })
  }
}
