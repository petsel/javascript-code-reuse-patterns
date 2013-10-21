var Allocable_all = (function () {

  var
    global = this,

    Enumerable_listGetterShorthands = global.Enumerable_first_last_item_listGetterShorthands,

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
    allocable.all = function () {
      return array_from(list);
    };
    allocable.all.size = function () {
      return list.length;
    };
    Enumerable_listGetterShorthands.call(allocable.all);
  };

  return Trait;

}).call(null);
