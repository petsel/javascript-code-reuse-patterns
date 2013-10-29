var cat = {
  sound     : "meow",
  makeSound : function () {
    console.log(this.sound);
  }
};
var dog = {
  sound: "woof"
};

console.log("cat.sound", cat.sound); // "meow"
console.log("dog.sound", dog.sound); // "woof"

console.log("typeof cat.makeSound", (typeof cat.makeSound)); // "function"
console.log("typeof dog.makeSound", (typeof dog.makeSound)); // "undefined"

cat.makeSound.call(dog); // "woof"





var cat = {
  sound: "meow"
};
var dog = {
  sound: "woof"
};

var Talkative = function () {
  this.makeSound = function () {
    console.log(this.sound);
  };
};

console.log("typeof cat.makeSound", (typeof cat.makeSound)); // "undefined"
console.log("typeof dog.makeSound", (typeof dog.makeSound)); // "undefined"

Talkative.call(cat);
Talkative.call(dog);

cat.makeSound(); // "meow"
dog.makeSound(); // "woof"
