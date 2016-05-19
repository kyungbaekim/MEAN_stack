var names = require('../controllers/names.js');
module.exports = function(app) {
  // root route to render the index.ejs view
  app.get('/names', function(req, res) {
    names.index(req, res);
  })

  app.post('/add_name', function(req, res) {
    console.log('add data request received');
    names.create(req, res);
  })

  app.post('/remove/:id', function(req, res) {
    console.log('remove data request received');
    names.delete(req, res);
  })
  app.get('/edit/:id', function(req, res){
    console.log('redirecting to edit page');
    names.edit(req, res);
  })
  app.post('/update/:id', function(req, res){
    console.log('redirecting to edit page');
    names.update(req, res);
  })
}
