// require mongoose
var mongoose = require('mongoose');
var Animals = mongoose.model('Animals') // We are retrieving this Schema from our Models, named 'User'

module.exports = {
  show: function(req, res) {
    Animals.find({}, function(err, animals){
      if(err){
        res.render("index", {errors: animals.errors});
      }
      else{
        res.render("index", {animals: animals});
      }
    })
  },
  create: function(req, res) {
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
  },
  display: function(req, res){
    Animals.findOne({_id: req.params.id}, function(err, animal){
      if(err){
        res.render("edit_animal", {title: 'You have error!', errors: animal.errors});
      }
      else {
        res.render("edit_animal", {animal: animal});
      }
    })
  },
  edit: function(req, res) {
    Animals.update({_id: req.params.id}, {name: req.body.name, description: req.body.description}, function(err, animal){
      if(err){
        res.render("edit_animal", {title: 'You have error!', errors: animal.errors});
      }
      else {
        res.redirect('/');
      }
    })
  },
  delete: function(req, res) {
    Animals.remove({_id: req.params.id}, function(err, animal){
      if(err){
        res.render("index", {title: 'You have error!', errors: animal.errors});
      }
      else {
        res.redirect('/');
      }
    })
  }
}
