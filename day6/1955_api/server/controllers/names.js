// require mongoose
var mongoose = require('mongoose');
var Names = mongoose.model('Names') // We are retrieving this Schema from our Models, named 'User'

module.exports = {
  show: function(req, res) {
    Names.find({}, function(err, names){
      if(err){
        res.json(err);
      }
      else{
        res.json(names);
      }
    })
  },
  create: function(req, res) {
    // create a new User with the name and age corresponding to those from req.body
    var name = new Names({name: req.params.name});
    // Try to save that new user to the database (this is the method that actually inserts into the db) and run a callback function with an error (if any) from the operation.
    name.save(function(err, names) {
      // if there is an error console.log that something went wrong!
      if(err) {
        res.json(err);
      } else { // else console.log that we did well and then redirect to the root route
        // res.json(names);
        res.redirect('/');
      }
    })
  },
  display: function(req, res){
    Names.findOne({name: req.params.name}, function(err, name){
      if(err){
        res.json(err);
      }
      else {
        res.json(name);
      }
    })
  },
  delete: function(req, res) {
    Names.remove({name: req.params.name}, function(err, name){
      if(err){
        res.json(err);
      }
      else {
        // res.json(name);
        res.redirect('/');
      }
    })
  }
}
