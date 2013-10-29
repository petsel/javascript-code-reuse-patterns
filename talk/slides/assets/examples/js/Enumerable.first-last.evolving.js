

Array.prototype.first = function () {
  return this[0];
};
Array.prototype.last = function () {
  return this[this.length - 1];
};

var
  str = "The quick brown fox jumped over the lazy dog",
  arr = str.split(" ")
;
console.log("arr", arr); // ["The", "quick", "brown", "fox", "jumped", "over", "the", "lazy", "dog"]

console.log("arr.first()", arr.first());  // "The"
console.log("arr.last()", arr.last());    // "dog"

delete Array.prototype.first;
delete Array.prototype.last;





var Enumerable_first_last = function () {

  this.first = function () {
    return this[0];
  };
  this.last = function () {
    return this[this.length - 1];
  };
};

var
  arr  = ["foo", "bar"],
  coll = {"length": 2, "0": "baz", "1": "biz"}
;
console.log("arr.first", arr.first);    // undefined
console.log("coll.first", coll.first);  // undefined

Enumerable_first_last.call(arr);
Enumerable_first_last.call(coll);

console.log("arr.last()", arr.last());    // "bar"
console.log("coll.last()", coll.last());  // "biz"

console.log("(arr.last === coll.last)", (arr.last === coll.last)); // false





var Enumerable_first_last = (function () {

  var
    Trait, // the "Enumerable_first_last" Trait Module.

    first = function () {
      return this[0];
    },
    last = function () {
      return this[this.length - 1];
    }
  ;
  Trait = function () {
    /**
     *  implementing the "Enumerable_first_last" Trait Module.
     */
    this.first = first;
    this.last = last;
  };

  return Trait;

}());

var
  arr  = ["foo", "bar"],
  coll = {"length": 2, "0": "baz", "1": "biz"}
;
console.log("arr.first", arr.first);    // undefined
console.log("coll.first", coll.first);  // undefined

Enumerable_first_last.call(arr);
Enumerable_first_last.call(coll);

console.log("arr.last()", arr.last());    // "bar"
console.log("coll.last()", coll.last());  // "biz"

console.log("(arr.last === coll.last)", (arr.last === coll.last)); // true





var Enumerable_first = (function () {

  var first = function () {
    return this[0];
  };

  return function () {
    this.first = first;
  };

}());


var Enumerable_last = (function () {

  var last = function () {
    return this[this.length - 1];
  };

  return function () {
    this.last = last;
  };

}());


var Enumerable_first_last = function () {

  Enumerable_first.call(this);
  Enumerable_last.call(this);
};

var
  arr  = ["foo", "bar"],
  coll = {"length": 2, "0": "baz", "1": "biz"}
;
console.log("arr.first", arr.first);    // undefined
console.log("coll.first", coll.first);  // undefined

Enumerable_first_last.call(arr);
Enumerable_first_last.call(coll);

console.log("arr.last()", arr.last());    // "bar"
console.log("coll.last()", coll.last());  // "biz"

console.log("(arr.last === coll.last)", (arr.last === coll.last)); // true
