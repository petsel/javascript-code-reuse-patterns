kind_of_module_exports("PrivilegedTrait", function () {
/*

  - any function object that is a container of at least one public behavior
    or acts as collections of more than one public behavior and is intended
    to neither being invoked by the call operator >>()<< nor with the >>new<<
    operator but always should be applied to objects by invoking one of the
    functions call methods - either [call] or [apply] - is considered to be
    a ROLE.

  - a PURELY STATELESS implementation of a ROLE should be called TRAIT.

  - an implementation of a ROLE that relies on additionally injected state but
    does only read and never does mutate it should be called PRIVILEGED TRAIT.

*/
  var
    behavior_02 = function () {
      // e.g. stateless implementation of behavior.
      return "behavior_02";
    }
  ;


  var PrivilegedTrait = function (injectedReadOnlyState) {
    var compositeType = this;

    compositeType.behavior_01 = function () {
      /*
        implementation of behavior is not allowed
        to mutate [injectedReadOnlyState] but shall
        only read it.

        nevertheless if [injectedReadOnlyState] was
        a reference it still could be mutable but only
        remotely from outside this trait modules scope.
      */
      return injectedReadOnlyState;
    };
    compositeType.behavior_02 = behavior_02;
  };


  return PrivilegedTrait;


});


// trait usage / trait based object components.
var
  obj = {
    // object description.
  },
  PrivilegedTrait = kind_of_module_require("PrivilegedTrait")
;
PrivilegedTrait.call(obj, "injectedReadOnlyState"); // [obj] now features additional behavior applied by [PrivilegedTrait].
