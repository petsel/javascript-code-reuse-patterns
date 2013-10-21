/**
 *  see also / derived from:
 *  [https://github.com/petsel/composable/blob/master/src/components/Controllable/Controllable.adviceTypes.afterThrowing-afterFinally.js]
 *  [https://github.com/petsel/composable/blob/master/src/composites/Function/Function.modifiers.adviceTypes.afterThrowing-afterFinally.js]
 */
var Controllable_adviceTypes_afterThrowing_afterFinally = (function () {

  "use strict";

  var
    Trait, // the "Controllable_adviceTypes_afterThrowing_afterFinally" Trait Module.

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
    makeModificationAfterThrowing = function (proceed, behavior, target, joinpoint) {   // afterThrowing
      return function () {
        var ret, args = arguments;
        try {
          ret = proceed.apply(target, args);
        } catch (exc) {
          behavior.call(target, exc, args, joinpoint);
        //throw exc;
        }
        return ret;
      };
    },
    makeModificationAfterFinally = function (proceed, behavior, target, joinpoint) {    // afterFinally
      return function () {
        var ret, err, args = arguments;
        try {
          ret = proceed.apply(target, args);
        } catch (exc) {
          err = exc;
        } // finally { ... }
        ret = (err || ret);
        behavior.call(target, ret, args, joinpoint);

        return ret;
      };
    },


    getSanitizedTarget = function (target) {
      return (!target && ((target === UNDEFINED_VALUE) || (target === NULL_VALUE))) ? NULL_VALUE : target;
    },


    afterThrowing = function (adviceHandler, target, joinpoint/*:Joinpoint(optional)*/) {
      var proceedBefore = this;
      return ((

        isFunction(proceedBefore) && isFunction(adviceHandler)
          && makeModificationAfterThrowing(proceedBefore, adviceHandler, getSanitizedTarget(target), getSanitizedTarget(joinpoint))

        ) || proceedBefore);
    },
    afterFinally = function (adviceHandler, target, joinpoint/*:Joinpoint(optional)*/) {
      var proceedBefore = this;
      return ((

        isFunction(proceedBefore) && isFunction(adviceHandler)
        && makeModificationAfterFinally(proceedBefore, adviceHandler, getSanitizedTarget(target), getSanitizedTarget(joinpoint))

      ) || proceedBefore);
    }
  ;

  Trait = function () {
    /**
     *  implementing the "Controllable_adviceTypes_afterThrowing_afterFinally" Trait Module.
     */
    var controllable = this;

    controllable.afterThrowing  = afterThrowing;
    controllable.afterFinally   = afterFinally;
  };

  return Trait;

}());


/**
 *  applying the controllable advice types trait onto [Function.prototype].
 */
Controllable_adviceTypes_afterThrowing_afterFinally.call(Function.prototype);



/*


  [http://closure-compiler.appspot.com/home]


- Simple          -   731 byte
var Controllable_adviceTypes_afterThrowing_afterFinally=function(){var d=function(a){return"function"==typeof a&&"function"==typeof a.call&&"function"==typeof a.apply},g=function(a,f,b,d){return function(){var e,h=arguments;try{e=a.apply(b,h)}catch(c){f.call(b,c,h,d)}return e}},l=function(a,f,b,d){return function(){var e,c,k=arguments;try{e=a.apply(b,k)}catch(g){c=g}e=c||e;f.call(b,e,k,d);return e}},c=function(a){return a||void 0!==a&&null!==a?a:null},m=function(a,f,b){return d(this)&&d(a)&&g(this,a,c(f),c(b))||this},n=function(a,f,b){return d(this)&&d(a)&&l(this,a,c(f),c(b))||this};return function(){this.afterThrowing=m;this.afterFinally=n}}();
Controllable_adviceTypes_afterThrowing_afterFinally.call(Function.prototype);


*/
