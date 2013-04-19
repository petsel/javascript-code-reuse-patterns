kind_of_module_exports("PrivilegedMixin", function () {
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

  - an implementation of a ROLE that does create mutable state on its own in
    order to solve its task(s) but does not rely on additionally injected state
    should be called MIXIN.

  - an implementation of a ROLE that relies either on mutation of additionally
    injected state only or on both, creation of mutable state and additionally
    injected state, regardless if the latter then gets mutated or not, should
    be called PRIVILEGED MIXIN.

*/
  var
    AdditionalState = function () {
      // implementation of a custom state type [PrivilegedMixin] relies on.
    },

    behavior_02 = function () {
      // e.g. stateless implementation of behavior.
      return "behavior_02";
    }
  ;


  var PrivilegedMixin = function (injectedState) {
    var
      compositeType = this,
      additionalState = new AdditionalState(compositeType, injectedState) // (mutable) additional state.
    ;
    compositeType.behavior_01 = function () {
      /*
        - implementation of behavior is allowed to mutate [additionalState].
        - it is also allowed to manipulate [injectedState]
      */
    };
    compositeType.behavior_02 = behavior_02;
  };


  return PrivilegedMixin;


});


// mixin usage / mixin based object components.
var
  obj = {
    // object description.
  },
  PrivilegedMixin = kind_of_module_require("PrivilegedMixin")
;
PrivilegedMixin.call(obj, "injectedState"); // [obj] now features additional behavior applied by [PrivilegedMixin].
