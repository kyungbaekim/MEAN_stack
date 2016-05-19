var mongoose = require('mongoose');
var path = require('path');

// create mongoose schema
var StoreCustomers = new mongoose.Schema({
 name: String,
}, {timestamps: true});

var StoreOrders = new mongoose.Schema({
 name: String,
 product: String,
 quantity: Number,
}, {timestamps: true});

// we can add validations using the .path() method.
StoreCustomers.path('name').required(true, 'Name field cannot be blank');

mongoose.model('Customers', StoreCustomers);
mongoose.model('Orders', StoreOrders);
