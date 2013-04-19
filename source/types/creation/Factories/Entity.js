kind_of_module_exports("Entity", function () {


  var EntityType = function (type_configuration) {
    /*
      - do implement [EntityType]
      - do something with [type_configuration]
    */
  };
  EntityType.prototype = {
    /*
      - if necessary do assign and/or describe
        the [EntityType] constructor's prototype.
    */
  };


  var
    createType = function (arg_0/*[, arg_1[, arg_2[,...]]]*/) {
      return (new EntityType({
        /*
          do something with [arguments] ...
          ... e.g. creating a type configuration.
        */
      }));
    },
    isType = function (type) {

      return (type instanceof EntityType);
    }
  ;


  return {
    create: createType,
    isType: isType
  };


});
