var Enumerable_first_last_item_listWrapper = (function () {

  var
    global = this,

    Trait,

    parse_float = global.parseFloat,
    math_floor  = global.Math.floor
  ;
  Trait = function (list) {

    this.first = function () {
      return list[0];
    };
    this.last = function () {
      return list[list.length - 1];
    };
    this.item = function (idx) {
      return list[math_floor(parse_float(idx, 10))];
    };
  };

  return Trait;

}).call(null);
