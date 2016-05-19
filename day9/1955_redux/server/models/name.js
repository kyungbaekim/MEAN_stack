var mongoose = require('mongoose');

// create mongoose schema
var NamesDojo = new mongoose.Schema({
 name: String,
}, {timestamp: true});

mongoose.model('Names', NamesDojo); // We are setting this Schema in our Models as 'Names'
