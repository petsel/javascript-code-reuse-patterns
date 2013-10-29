role PrivilegedTrait {

  protected behavior_02 () {
      // e.g. stateless implementation of behavior.
      return "behavior_02";
  };


  trait (injectedReadOnlyState) {

    this.behavior_01 = function () {
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
    this.behavior_02 = behavior_02;
  }
};


// trait usage / trait based object components.
var
  obj = {
    // object description.
  },
  PrivilegedTrait = kind_of_module_require("PrivilegedTrait")
;
PrivilegedTrait.call(obj, "injectedReadOnlyState"); // [obj] now features additional behavior applied by [PrivilegedTrait].
