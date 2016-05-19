var names = require('../controllers/names.js');
module.exports = function(app) {
  // root route to render the index.ejs view
  app.get('/', function(req, res) {
    names.show(req, res);
  })

  app.get('/new/:name', function(req, res) {
    names.create(req, res);
  })

  app.get('/remove/:name', function(req, res) {
    names.delete(req, res);
  })

  app.get('/:name', function(req, res) {
    names.display(req, res);
  })

  app.get('/names/test', function(req, res) {
    res.render("test");
  })
}
