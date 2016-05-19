var store = angular.module('store-app', ['ngRoute']);
store.config(function ($routeProvider) {
  $routeProvider
    .when('/',{
      templateUrl: 'partials/customers.html'
    })
    .when('/orders',{
      templateUrl: 'partials/orders.html'
    })
    .otherwise({
      redirectTo: '/'
    });
});

store.factory('customerFactory', function($http){
  var customers = [];
  var factory = {};
  var error = {message: 'The name you entered already exists. Please use another name.'};
  //Restful syntax: index = get all that object
  factory.index = function(callback) {
    // Where do we get access to $http?
    $http.get('/customers').success(function(data) {
      console.log('Data received successfully');
      customers = data;
      callback(customers);
    })
  }
  // note the use of callbacks!
  // Restful syntax: create = add one to DB
  factory.create = function(newData, callback) {
    console.log(newData);
    for(var i=0; i<customers.length; i++){
      if(customers[i].name == newData.name){
        console.log(error.message);
        return error;
      }
    }
    console.log('Sending add customer request',newData);
    $http.post('/new_customer', newData).success(function(data) {
      $http.get('/customers').success(function(data) {
        customers = data;
        callback(customers);
      })
    })
  }
  // Restful syntax: remove = remove one friend object by given friend name from DB
  factory.removeCustomer = function(data, callback) {
    $http.post('/customer/delete/' + data).success(function() {
      console.log('Remove request sent');
      $http.get('/customers').success(function(data) {
        customers = data;
        callback(customers);
      })
    })
  }
  return factory;
});

store.factory('orderFactory', function($http){
  var orders = [];
  var factory = {};
  //Restful syntax: index = get all that object
  factory.index = function(callback) {
    // Where do we get access to $http?
    $http.get('/orders').success(function(data) {
      orders = data;
      callback(orders);
    })
  }
  // note the use of callbacks!
  // Restful syntax: create = add one to DB
  factory.addOrder = function(newData, callback) {
    $http.post('/new_order', newData).success(function() {
      $http.get('/orders').success(function(data) {
        orders = data;
        callback(orders);
      })
    })
  }
  return factory;
});

store.filter('range', function() {
  return function(input, min, max) {
    min = parseInt(min);
    max = parseInt(max);
    for (var i=min; i<=max; i++)
      input.push(i);
    return input;
  };
});

store.controller('CustomersController', function(customerFactory, $scope){
  customerFactory.index(function(data) {
    $scope.customers = data;
    $('#name').focus();
  });
  $scope.addCustomer = function(){
    customerFactory.create($scope.new_customer, function() {
      customerFactory.index(function(data){
        $scope.customers = data;
      });
      $scope.new_customer = {};
      $('#name').focus();
    });
  }
  $scope.removeCustomer = function(customer){
    customerFactory.removeCustomer(customer._id, function(){
      customerFactory.index(function(data){
        $scope.customers = data;
      });
      $scope.new_customer = {};
      $('#name').focus();
    });
  }
});

store.controller('OrdersController', function($scope, orderFactory, customerFactory){
  $scope.products = [{name: 'Nike Shoes'}, {name: 'Black Belts'}, {name: 'Ice Creams'}, {name: 'Candies'}];
  orderFactory.index(function(data){
    $scope.orders = data;
  });
  customerFactory.index(function(data){
    $scope.customers = data;
  });
  $scope.addOrder = function(){
    // console.log($scope.new_order);
    orderFactory.addOrder($scope.new_order, function(){
      orderFactory.index(function(data){
        $scope.orders = data;
      });
    });
  };
});
