/**
 *  see also / derived from:
 *  [https://github.com/petsel/composable/blob/master/src/components/Introspective/Introspective.isFunction-isCallable.js]
 *  [https://github.com/petsel/composable/blob/master/src/composites/Function/Function.isFunction-isCallable.js]
 */
var Introspective_isFunction_isCallable = (function () {

  var
    Trait, // the "Introspective_isFunction_isCallable" Trait Module.

    testCallability = function (type) {
      var callability = true;
      try {
        type();
      } catch (exc) {
        callability = false;
      }
      return callability;
    },

    /**
     *  check back with the so far three iterations of the jsperf test
     *  [http://jsperf.com/iscallable-isfunction-isfunctiontype/3]
     */
    isCallable = function (type) {
      return (type ? testCallability(type) : !!type);
    },
    isFunction = function (type) {
      return ((typeof type == "function") && (typeof type.call == "function") && (typeof type.apply == "function"));
    }
  ;

  Trait = function () {
    /**
     *  implementing the "Introspective_isFunction_isCallable" Trait Module.
     */
    this.isCallable     = isCallable;
    this.isFunction     = isFunction;
  };

  return Trait;

}());
