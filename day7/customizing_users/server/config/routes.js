var animals = require('../controllers/animals.js');
module.exports = function(app) {
  // root route to render the index.ejs view
  app.get('/', function(req, res) {
    animals.show(req, res);
  })

  app.get('/animals/new', function(req, res) {
    res.render("add_animal");
  })

  app.get('/animals/:id', function(req, res) {
    animals.display(req, res);
  })

  app.post('/animals', function(req, res) {
    animals.create(req, res);
  })

  app.get('/animals/edit/:id', function(req, res) {
    animals.display(req, res);
  })

  app.post('/animals/:id', function(req, res) {
    animals.edit(req, res);
  })

  app.post('/animals/delete/:id', function(req, res) {
    animals.delete(req, res);
  })
}
