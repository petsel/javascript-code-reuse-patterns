/**
 *  see also / derived from:
 *  [https://github.com/petsel/composable/blob/master/src/components/Controllable/Controllable.adviceTypes.before-after-around.js]
 *  [https://github.com/petsel/composable/blob/master/src/composites/Function/Function.modifiers.adviceTypes.before-after-around.js]
 */
var Controllable_adviceTypes_before_after_around = (function () {

  "use strict";

  var
    Trait, // the "Controllable_adviceTypes_before_after_around" Trait Module.

    isFunction = function (type) {
      return (
        (typeof type == "function")
        && (typeof type.call == "function")
        && (typeof type.apply == "function")
      );
    },

    NULL_VALUE = null,
    UNDEFINED_VALUE,

    /**
     *  the [joinpoint] argument is optional
     *  and gets provided by and passed only
     *  from within aspect oriented systems.
     */
    makeModificationBefore = function (proceed, behavior, target, joinpoint) {          // before
      return function () {
        var args = arguments;

        behavior.call(target, args, joinpoint);
        return proceed.apply(target, args);
      };
    },
    makeModificationAfterReturning = function (proceed, behavior, target, joinpoint) {  // after - implemented as afterReturning
      return function () {
        var ret, args = arguments;

        ret = proceed.apply(target, args);
        behavior.call(target, ret, args, joinpoint);

        return ret;
      };
    },
    makeModificationAround = function (proceed, behavior, target, joinpoint) {          // around
      return function () {
        return behavior.call(target, proceed, behavior, arguments, joinpoint);
      };
    },


    getSanitizedTarget = function (target) {
      return (!target && ((target === UNDEFINED_VALUE) || (target === NULL_VALUE))) ? NULL_VALUE : target;
    },


    before = function (adviceHandler, target, joinpoint/*:Joinpoint(optional)*/) {
      var proceedAfter = this;
      return ((

        isFunction(proceedAfter) && isFunction(adviceHandler)
        && makeModificationBefore(proceedAfter, adviceHandler, getSanitizedTarget(target), getSanitizedTarget(joinpoint))

      ) || proceedAfter);
    },
    after/*Returning*/ = function (adviceHandler, target, joinpoint/*:Joinpoint(optional)*/) {
      var proceedBefore = this;
      return ((

        isFunction(proceedBefore) && isFunction(adviceHandler)
        && makeModificationAfterReturning(proceedBefore, adviceHandler, getSanitizedTarget(target), getSanitizedTarget(joinpoint))

      ) || proceedBefore);
    },
    around = function (adviceHandler, target, joinpoint/*:Joinpoint(optional)*/) {
      var proceedEnclosed = this;
      return ((

        isFunction(proceedEnclosed) && isFunction(adviceHandler)
        && makeModificationAround(proceedEnclosed, adviceHandler, getSanitizedTarget(target), getSanitizedTarget(joinpoint))

      ) || proceedEnclosed);
    }
  ;

  Trait = function () {
    /**
     *  implementing the "Controllable_adviceTypes_before_after_around" Trait Module.
     */
    var controllable = this;

    controllable.before         = before;
    controllable.after          = after/*Returning*/;
    controllable.around         = around;
  };

  return Trait;

}());


/**
 *  applying the controllable advice types trait onto [Function.prototype].
 */
Controllable_adviceTypes_before_after_around.call(Function.prototype);



/*


  [http://closure-compiler.appspot.com/home]


- Simple          -   810 byte
var Controllable_adviceTypes_before_after_around=function(){var b=function(a){return"function"==typeof a&&"function"==typeof a.call&&"function"==typeof a.apply},g=function(a,e,c,b){return function(){var d=arguments;e.call(c,d,b);return a.apply(c,d)}},h=function(a,e,c,d){return function(){var b,f=arguments;b=a.apply(c,f);e.call(c,b,f,d);return b}},k=function(a,b,c,d){return function(){return b.call(c,a,b,arguments,d)}},d=function(a){return a||void 0!==a&&null!==a?a:null},l=function(a,e,c){return b(this)&&b(a)&&g(this,a,d(e),d(c))||this},m=function(a,e,c){return b(this)&&b(a)&&h(this,a,d(e),d(c))||this},n=function(a,e,c){return b(this)&&b(a)&&k(this,a,d(e),d(c))||this};return function(){this.before=l;this.after=m;this.around=n}}();
Controllable_adviceTypes_before_after_around.call(Function.prototype);


*/
