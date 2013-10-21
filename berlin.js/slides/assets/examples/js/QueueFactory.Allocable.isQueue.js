var QueueFactory_Allocable_isQueue = (function () {

  var
    global = this,

    Observable  = global.Observable_SignalsAndSlots,
    Allocable   = global.Allocable,

    Allocable_all         = global.Allocable_all,
    Enumerable_first_last = global.Enumerable_first_last,


    isFunction  = function (type) {
      return (
        (typeof type == "function")
        && (typeof type.call == "function")
        && (typeof type.apply == "function")
      );
    },

    Factory,
    Queue,

    isQueue,
    createQueue,

    queueList = [],

    onEnqueue = function (queue, type) {
      queue.dispatchEvent({type: "enqueue", item: type});
    },
    onDequeue = function (queue, type) {
      queue.dispatchEvent({type: "dequeue", item: type});
    },
    onEmpty = function (queue) {
      queue.dispatchEvent("empty");
    },


    methodAPIKeys = (function (obj) {
      Observable.call(obj, {hasEventListener: ""});
      Allocable.call(obj);
      return global.Object.keys(obj).filter(function (key/*, idx, list*/) {
        return isFunction(obj[key]);
      });
    }({
      enqueue: "",
      dequeue: ""
    })),

    doesMatchMethodAPI = function (type) {
      return methodAPIKeys.every(function (key/*, idx, list*/) {

        return isFunction(type[key]);
      });
    }
  ;


  Queue = function () {
    var
      queue = this,
      list = []
    ;
    queue.enqueue = function (type) {

      list.push(type);
      onEnqueue(queue, type);

      return type;
    };
    queue.dequeue = function () {

      var type = list.shift();
      onDequeue(queue, type);

      (list.length || onEmpty(queue));

      return type;
    };

    Observable.call(queue, {hasEventListener: ""});
    Allocable.call(queue, list);
  };

  isQueue = function (type) {
    return !!(type && ((type instanceof Queue) || doesMatchMethodAPI(type)));
  };
  createQueue = function () {

    queueList.push(new Queue);
    return queueList.last();
  };


  Factory = {

    isQueue : isQueue,
    create  : createQueue
  };
  Enumerable_first_last.call(queueList);
  Allocable_all.call(Factory, queueList);

  return Factory;

}).call(null);
