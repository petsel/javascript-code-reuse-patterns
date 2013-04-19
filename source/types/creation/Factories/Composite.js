kind_of_module_exports("Composite", function () {


  var
    Trait = kind_of_module_require("Trait"),
    Mixin = kind_of_module_require("Mixin"),

    PrivilegedTrait = kind_of_module_require("PrivilegedTrait")/*,
    PrivilegedMixin = kind_of_module_require("PrivilegedMixin")*/
  ;


  var CompositeType = function (type_configuration) {
    var compositeType = this;
    /*
      - do implement something type specific
      - do something with [type_configuration]
    */
    var locallyScopedTypeSpecificReference = [];

    Mixin.apply(compositeType);
    PrivilegedTrait.apply(compositeType, locallyScopedTypeSpecificReference);
  };
  CompositeType.prototype = {
    /*
      - if necessary do assign and/or describe
        the [CompositeType] constructor's prototype.
    */
  };
  /*
    - purely stateless trait implementations almost always
      should be exclusively applied to a constructors prototype.
  */
  Trait.call(CompositeType.prototype);


  var
    createType = function (arg_0/*[, arg_1[, arg_2[,...]]]*/) {
      return (new CompositeType({
        /*
          do something with [arguments] ...
          ... e.g. creating a type configuration.
        */
      }));
    },
    isType = function (type) {

      return (type instanceof CompositeType);
    }
  ;


  return {
    create: createType,
    isType: isType
  };


});
