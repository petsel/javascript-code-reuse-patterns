/**
 *  see also / derived from:
 *  [https://github.com/petsel/composable/blob/master/src/components/Enumerable/Enumerable.first-last-item.js]
 *  [https://github.com/petsel/composable/blob/master/src/composites/Array/Array.first-last.js]
 */
var Enumerable_first_last = (function () {

  var
    Trait, // the "Enumerable_first_last" Trait Module.

    first = function () {
      return this[0];
    },
    last = function () {
      return this[this.length - 1];
    }
  ;
  Trait = function () {
    /**
     *  implementing the "Enumerable_first_last" Trait Module.
     */
    this.first = first;
    this.last = last;
  };

  return Trait;

}());
