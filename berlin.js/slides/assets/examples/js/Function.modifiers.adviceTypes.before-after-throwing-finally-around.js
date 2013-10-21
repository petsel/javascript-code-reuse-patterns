/**
 *  see also / derived from:
 *  [https://github.com/petsel/composable/blob/master/src/components/Controllable/Controllable.adviceTypes.before-after-throwing-finally-around.js]
 *  [https://github.com/petsel/composable/blob/master/src/composites/Function/Function.modifiers.adviceTypes.before-after-throwing-finally-around.js]
 */
var Controllable_adviceTypes_before_after_throwing_finally_around = (function () {

  "use strict";

  var
    Trait, // the "Controllable_adviceTypes_before_after_throwing_finally_around" Trait Module.

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
     *  implementing the "Controllable_adviceTypes_before_after_throwing_finally_around" Trait Module.
     */
    var controllable = this;

    controllable.before         = before;
    controllable.after          = after/*Returning*/;
    controllable.afterThrowing  = afterThrowing;
    controllable.afterFinally   = afterFinally;
    controllable.around         = around;
  };

  return Trait;

}());


/**
 *  applying the controllable advice types trait onto [Function.prototype].
 */
Controllable_adviceTypes_before_after_throwing_finally_around.call(Function.prototype);



/*


  [http://closure-compiler.appspot.com/home]


- Simple          - 1.254 byte
var Controllable_adviceTypes_before_after_throwing_finally_around=function(){var d=function(a){return"function"==typeof a&&"function"==typeof a.call&&"function"==typeof a.apply},h=function(a,e,c,d){return function(){var f=arguments;e.call(c,f,d);return a.apply(c,f)}},l=function(a,e,c,d){return function(){var f,b=arguments;f=a.apply(c,b);e.call(c,f,b,d);return f}},m=function(a,e,c,d){return function(){var f,b=arguments;try{f=a.apply(c,b)}catch(g){e.call(c,g,b,d)}return f}},n=function(a,e,c,d){return function(){var b,k,g=arguments;try{b=a.apply(c,g)}catch(h){k=h}b=k||b;e.call(c,b,g,d);return b}},p=function(a,b,c,d){return function(){return b.call(c,a,b,arguments,d)}},b=function(a){return a||void 0!==a&&null!==a?a:null},q=function(a,e,c){return d(this)&&d(a)&&h(this,a,b(e),b(c))||this},r=function(a,e,c){return d(this)&&d(a)&&l(this,a,b(e),b(c))||this},s=function(a,e,c){return d(this)&&d(a)&&m(this,a,b(e),b(c))||this},t=function(a,e,c){return d(this)&&d(a)&&n(this,a,b(e),b(c))||this},u=function(a,e,c){return d(this)&&d(a)&&p(this,a,b(e),b(c))||this};return function(){this.before=q;this.after=r;this.afterThrowing=s;this.afterFinally=t;this.around=u}}();
Controllable_adviceTypes_before_after_throwing_finally_around.call(Function.prototype);


*/
