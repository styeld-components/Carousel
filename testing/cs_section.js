var Car = function(loc) {
  var obj = Object.create(Car.prototype);
  obj.loc = loc;
  return obj;
};
Car.methods = {
  move:function(){this.loc++};
}

Car.prototype.move = function(){this.loc++};

//every prototype object has a .constructor property pointingback to the function
//it is attached to.

console.log(Car.prototype.constructor) // => Car
console.log(amy.constructor) // => Car
console.log(amy instanceof Car) // => true

//new pseudoclassical
var Car = function(loc){
  this.loc = loc;
}
Car.prototype.move = function(){this.loc++};

var amy = new Car(1);
amy.move();
