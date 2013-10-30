kind_of_module_exports("Trait", function () {
/*

  - any function object that is a container of at least one public behavior
    or acts as collections of more than one public behavior and is intended
    to neither being invoked by the call operator >>()<< nor with the >>new<<
    operator but always should be applied to objects by invoking one of the
    functions call methods - either [call] or [apply] - is considered to be
    a ROLE.

  - a PURELY STATELESS implementation of a ROLE should be called TRAIT.

*/
  var
    behavior_01 = function () {
      // stateless implementation of behavior.
    },
    behavior_02 = function () {
      // stateless implementation of behavior.
    }/*,
    behavior_03 = function () {
      // stateless implementation of behavior.
    }*/
  ;


  var Trait = function () {
    var compositeType = this;

    compositeType.behavior_01 = behavior_01;
    compositeType.behavior_02 = behavior_02;
  //compositeType.behavior_03 = behavior_03;
  };


  return Trait;


});


// trait usage / trait based object components.
var
  obj = {
    // object description.
  },
  Trait = kind_of_module_require("Trait")
;
Trait.call(obj); // [obj] now features additional behavior applied by [Trait].
