role SimpleTrait {                                //    var SimpleTrait = (function () {
                                                  //      var
  local behavior_01 () {                          //        behavior_01 = function () {
    // stateless implementation of behavior.      //          // stateless implementation of behavior.
  };                                              //        },
  local behavior_02 () {                          //        behavior_02 = function () {
    // stateless implementation of behavior.      //          // stateless implementation of behavior.
  };                                              //        }
                                                  //      ;
  trait () {                                      //      return function () {
    this.behavior_01 = behavior_01;               //        this.behavior_01 = behavior_01;
    this.behavior_02 = behavior_02;               //        this.behavior_02 = behavior_02;
  }                                               //      };
}                                                 //    }());
                                                  //
// trait usage / trait based object components.   //    // trait usage / trait based object components.
var                                               //    var
  obj = {                                         //      obj = {
    // object description.                        //        // object description.
  }                                               //      }
;                                                 //    ;
obj imports SimpleTrait;                          //    SimpleTrait.call(obj);
                                                  //
                                                  //    // [obj] now features additional behavior applied by [SimpleTrait].
