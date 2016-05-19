var customer = angular.module('customer', ['ngRoute']);
customer.config(function ($routeProvider) {
  $routeProvider
    .when('/',{
      templateUrl: 'partials/orders.html'
    })
    .when('/customers',{
      templateUrl: 'partials/customers.html'
    })
    .otherwise({
      redirectTo: '/'
    });
});

customer.factory('customerFactory', function(){
  var customers = [];
  var orders = [];
  var factory = {};
  var error = {message: 'The name you entered already exists. Please use another name.'};
  return {
    getCustomers: function(callback){
      callback(customers);
    },
    getOrders: function(callback){
      callback(orders);
    },
    addCustomer: function(newData){
      var date = new Date();
      var added = {created: date.toLocaleString()};
      for(var i=0; i<customers.length; i++){
        if(customers[i].name == newData.name){
          return error;
        }
      }
      customers.push(angular.extend(newData, added));
    },
    removeCustomer: function(customer){
      customers.splice(customers.indexOf(customer), 1);
    },
    addOrder: function(customer, quantity, product){
      var date = new Date();
      var added = {ordered: date.toLocaleString()};
      var newData = {customer: customer.name, quantity: quantity, product: product.name};
      console.log(newData);
      orders.push(angular.extend(newData, added));
    }
  }
});

customer.filter('range', function() {
  return function(input, min, max) {
    min = parseInt(min);
    max = parseInt(max);
    for (var i=min; i<=max; i++)
      input.push(i);
    return input;
  };
});

customer.controller('CustomersController', function(customerFactory, $scope){
  $scope.customers = [];
  $scope.error = [];
  customerFactory.getCustomers(function(data){
    $scope.customers = data;
    $('#name').focus();
  });
  $scope.addCustomer = function(){
    $scope.error = customerFactory.addCustomer($scope.newCustomer)
    $scope.newCustomer = {};
    $('#name').focus();
  }
  $scope.removeCustomer = function(customer){
    customerFactory.removeCustomer(customer);
    $('#name').focus();
  }
});

customer.controller('OrdersController', function($scope, customerFactory){
  $scope.orders = [];
  $scope.customers = [];
  $scope.products = [{name: 'Nike Shoes'}, {name: 'Black Belts'}, {name: 'Ice Creams'}, {name: 'Candies'}];
  customerFactory.getCustomers(function(data){
    $scope.customers = data;
  });
  customerFactory.getOrders(function(data){
    $scope.orders = data;
  });
  $scope.addOrder = function(){
    customerFactory.addOrder($scope.customer, $scope.quantity, $scope.product);
  }
});
