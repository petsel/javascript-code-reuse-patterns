var cat = {
  sound     : "meow",
  makeSound : function () {
    console.log(this.sound);
  }
};

var dog = {
  sound: "woof"
};



var Talkative = function () {
  this.makeSound = function () {
    console.log(this.sound);
  };
};
