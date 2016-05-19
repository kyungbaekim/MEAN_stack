// require express
var express = require("express");
// path module -- try to figure out where and why we use this
var path = require("path");
// create the express app
var app = express();

// static content
app.use(express.static(path.join(__dirname, "./static")));
// setting up ejs and our views folder
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
// root route to render the index.ejs view
app.get('/', function(req, res) {
 res.render("index");
})

// tell the express app to listen on port 8000
var server = app.listen(8000, function() {
 console.log("listening on port 8000");
})

// this is a new line we're adding AFTER our server listener
// take special note how we're passing the server
// variable. unless we have the server variable, this line will not work!!
var io = require('socket.io').listen(server)
var threads = {};
var counter = 0;
// Whenever a connection event happens (the connection event is built in) run the following code
io.sockets.on('connection', function(socket) {
  console.log("WE ARE USING SOCKETS!");
  console.log(socket.id);
  //all the socket code goes in here!
  socket.on('got_a_new_user', function(data){
    var notice = "----------" + data.name + " entered this room! ----------";
    io.emit('new_user', {name: data.name, response: notice});
    socket.emit('existing_threads', {threads: threads});
    // threads['server'] = notice;
    console.log(threads);
  });
  socket.on('new_message', function(data){
    threads[counter] = {name: data.name, message: data.message};
    counter++;
    console.log(data);
    console.log(threads);
    io.emit('update_message', {name: data.name, message: data.message});
  });
})
