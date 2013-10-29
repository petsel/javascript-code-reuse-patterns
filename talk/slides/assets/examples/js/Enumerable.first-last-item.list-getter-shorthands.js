var Enumerable_first_last_item_listGetterShorthands = (function () {

  var
    global = this,

    Trait,

    parse_float = global.parseFloat,
    math_floor  = global.Math.floor,

    first = function () {
      return (this()[0]);
    },
    last = function () {
      var list;
      return ((list = this())[list.length - 1]);
    },
    item = function (idx) {
      return (this()[math_floor(parse_float(idx, 10))]);
    }
  ;
  Trait = function () {

    this.first = first;
    this.last = last;
    this.item = item;
  };

  return Trait;

}).call(null);
