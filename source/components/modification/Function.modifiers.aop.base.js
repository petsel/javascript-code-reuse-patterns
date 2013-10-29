

/**
 *  components.Introspective.isFunction-isCallable
 */
var Introspective_isFunction_isCallable = (function () {


  var
    global = this,


    Trait, // the "Introspective_isFunction_isCallable" Trait Module.


    functionPrototype = global.Function.prototype,


    isFunction = function (type) {
      /*
       *  - x-frame-safe and also filters e.g. [[RegExp]] implementation of older mozilla's
       *    as well as e.g. modern browser implementations of [[Element]], [[Node]] and of
       *    related DOM elements that claim to be functional but are not at all callable.
       */
      return ((typeof type == "function") && (typeof type.call == "function") && (typeof type.apply == "function"));
    },


    getCallability = function (type) {
      var callability;
      try {
        type();
        callability = true;
      //functionPrototype.call.call(type);    // merciless.
      } catch (exc) {
        try {                                 // forgiving.
          functionPrototype.call.call(type);  //
          callability = true;                 //
        } catch (exc) {                       //
          callability = false;
        }
      }
      return callability;
    },


    isCallable = function (type) {
      return (isFunction(type) || getCallability(type));
    }
  ;


  Trait = function () {
    /**
     *  implementing the "Introspective_isFunction_isCallable" Trait Module.
     */
    this.isFunction = isFunction;
    this.isCallable = isCallable;
  };


  return Trait;


}).call(null);



/**
 *  composites.Function.isFunction-isCallable
 */
(function () {

  var
    global = this
  ;
  global.Introspective_isFunction_isCallable.call(global.Function);

}).call(null);



/**
 *  components.Controllable.Advice.before-after-around
 */
var Controllable_Advice_before_after_around = (function () {


  var
    global = this,


    Trait, // the "Controllable_Advice_before_after_around" Trait Module.


    Function    = global.Function,

    isFunction  = Function.isFunction,
    isCallable  = Function.isCallable,


    NULL_VALUE = null,
    UNDEFINED_VALUE,


    makeModifierBeforeAfter = function (fctBefore, fctAfter, target) {
      return function () {

        var args = arguments;

        fctBefore.apply(target, args);
        return fctAfter.apply(target, args);
      };
    },
    makeModifierAround = function (fctEnclosed, fctAround, target) {
      return function () {

        //return fctAround.call(target, arguments, fctEnclosed, fctAround, target);
        return fctAround.call(target, fctEnclosed, fctAround, arguments, target);
      };
    },
    getSanitizedTarget = function (target) {

      return (!target && ((target === UNDEFINED_VALUE) || (target === NULL_VALUE))) ? NULL_VALUE : target;
    }
  ;


  Trait = function () {
    /**
     *  implementing the "Controllable_Advice_before_after_around" Trait Module.
     */
    this.before = function (adviceBefore/*:function*/, target/*:object(optional)*/) {

      var proceedAfter = this;
      return (isFunction(adviceBefore) && isFunction(proceedAfter) && makeModifierBeforeAfter(adviceBefore, proceedAfter, getSanitizedTarget(target))) || proceedAfter;
    };
    this.after = function (adviceAfter/*:function*/, target/*:object(optional)*/) {

      var proceedBefore = this;
      return (isFunction(proceedBefore) && isFunction(adviceAfter) && makeModifierBeforeAfter(proceedBefore, adviceAfter, getSanitizedTarget(target))) || proceedBefore;
    };
    this.around = function (adviceAround/*:function*/, target/*:object(optional)*/) {

      var proceedEnclosed = this;
      return (isCallable(proceedEnclosed) && isFunction(adviceAround) && makeModifierAround(proceedEnclosed, adviceAround, getSanitizedTarget(target))) || proceedEnclosed;
    };
  };


  return Trait;


}).call(null);



/**
 *  composites.Function.modifiers.Advice.before-after-around
 */
(function () {

  var
    global = this
  ;
  global.Controllable_Advice_before_after_around.call(global.Function.prototype);

}).call(null);






var AO/* Aspect Oriented DSL */ = (function () {


  var
    global = this,


    Observable = global.Observable,


    Array = global.Array,


    isFunction = function (type) {
      return (typeof type == "function") && (typeof type.call == "function") && (typeof type.apply == "function");
    },
    isArray = (isFunction(Array.isArray) && Array.isArray) || function (type) {
      return isFunction(type.push) && isFunction(type.some) && isFunction(type.forEach);
    },

    list_reject = function (list, type) {
      var accumulator;

      if (isArray(list)) {
        list = list.reduce(function (accumulator, item) {

          if (item !== type) {
            accumulator.push(item);
          }
          return accumulator;

        }, []);
      }
      return list;
    },


    EventProxy = {},


    AspectOrientedModule,
    ApproachableTrait,

    Pointcut,
    Advice,

    Aspect,


    joinpointList = [],

    pointcutMap = {},
    adviceMap = {},

    aspectMap = {}
  ;


  Observable.call(EventProxy);


  var
    addJoinpoint = function (joinpoint) {
      if (isFunction(joinpoint) && !joinpointList.some(function (storedJoinpoint) {return (storedJoinpoint === joinpoint);})) {

        joinpointList.push(joinpoint);

        EventProxy.trigger({
          type          : "addjoinpoint",
          joinpoint     : joinpoint,
          joinpointList : joinpointList
        });
      }
    },
    addJoinpoints = function (joinpointCollector) {
      var list = isFunction(joinpointCollector) && joinpointCollector();
      if (isArray(list)) {

        list.forEach(function (joinpoint) {
          addJoinpoint(joinpoint);
        });
      }
    },

    removeJoinpoint = function (joinpoint) {
      if (isFunction(joinpoint)) {

        joinpointList = list_reject(joinpointList, joinpoint);

        EventProxy.trigger({
          type          : "removeJoinpoint",
          joinpoint     : joinpoint,
          joinpointList : joinpointList
        });
      }
    },
    removeJoinpoints = function (joinpointCollector) {
      var list = isFunction(joinpointCollector) && joinpointCollector();
      if (isArray(list)) {

        list.forEach(function (joinpoint) {
          removeJoinpoint(joinpoint)
        });
      }
    }
  ;


  ApproachableTrait = function () {
    var approachable = this;

    approachable.addJoinpoint = addJoinpoint;
    approachable.addJoinpoints = addJoinpoints;
  };


  Pointcut = function () {
/*
    var onAddJoinpoint = function () {

      EventProxy.trigger({
        type    : "pointcutschanged"
      });
    };
    EventProxy.on("addjoinpoint", onAddJoinpoint);
*/
  };
  Advice = function () {

  };
  Aspect = function () {

  };


  AspectOrientedModule = {

    Approachable      : ApproachableTrait,

    removeJoinpoint   : removeJoinpoint,
    removeJoinpoints  : removeJoinpoints,


    pointcut  : Pointcut,
    advice    : Advice,

    aspect    : Aspect
  };
  ApproachableTrait.call(AspectOrientedModule);


  return AspectOrientedModule;


}).call(null);
