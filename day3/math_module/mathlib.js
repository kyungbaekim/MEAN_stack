module.exports = function (){
  return {
    add: function(num1, num2) {
         console.log("the sum is:", num1 + num2);
       },
    multiply: function(num1, num2) {
         console.log("the multiply is:", num1 * num2);
       },
    square: function(num) {
         console.log("the square is:", num * num);
       },
    random: function(num1, num2) {
        var temp = Math.floor((Math.random() * (num2 - num1 + 1)) + num1);
        console.log("the random number is:", temp);
    }
  }
};
