var Allocable = (function () {

  var
    global = this,

    Enumerable_listWrapper = global.Enumerable_first_last_item_listWrapper,

    Trait,

    Array = global.Array,

    array_from = ((typeof Array.from == "function") && Array.from) || (function (proto_slice) {
      return function (listType) {

        return proto_slice.call(listType);
      };
    }(Array.prototype.slice))
  ;

  Trait = function (list) {
    var
      allocable = this
    ;
    allocable.valueOf = allocable.toArray = function () {
      return array_from(list);
    };
    allocable.toString = function () {
      return ("" + list);
    };
    allocable.size = function () {
      return list.length;
    };
    Enumerable_listWrapper.call(allocable, list);
  };

  return Trait;

}).call(this);
