var mongoose = require('mongoose');

// create mongoose schema
var AnimalsDojo = new mongoose.Schema({
 name: String,
 description: String,
 created_at: {type: Date, default: Date.now}
})
// we can add validations using the .path() method.
AnimalsDojo.path('name').required(true, 'Name field cannot be blank');
AnimalsDojo.path('description').required(true, 'description field cannot be blank');

mongoose.model('Animals', AnimalsDojo); // We are setting this Schema in our Models as 'User'
