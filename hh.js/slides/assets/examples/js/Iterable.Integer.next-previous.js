var Iterable_Integer_next_previous = (function () {

  var
    global = this,

    Trait,

    Number  = global.Number,
    Math    = global.Math,

    isFinite  = global.isFinite,
    floor     = Math.floor,

    INTEGER_MINIMUM = Math.pow(-2, 53),
    INTEGER_MAXIMUM = Math.pow(2, 53),

    UNDEFINED_VALUE,

    sanitizeInteger = function (type) {

      return (isFinite(type = Number(type)) && (type <= INTEGER_MAXIMUM) && (type >= INTEGER_MINIMUM)) ? floor(type) : UNDEFINED_VALUE;
    },

    nextInteger = function () {
      var
        currInt = sanitizeInteger(this),
        nextInt = (currInt + 1)
      ;
      return ((isFinite(nextInt) && (nextInt !== currInt)) ? nextInt : UNDEFINED_VALUE);
    },
    previousInteger = function () {
      var
        currInt = sanitizeInteger(this),
        prevInt = (currInt - 1)
      ;
      return ((isFinite(prevInt) && (prevInt !== currInt)) ? prevInt : UNDEFINED_VALUE);
    }
  ;

  Trait = function () {

    this.next     = nextInteger;
    this.previous = previousInteger;
  };

  return Trait;

}).call(null);
