var Queue = (function () {

  var
    global = this,

    Observable  = global.Observable_SignalsAndSlots,
    Allocable   = global.Allocable,

    Queue,

    onEnqueue = function (queue, type) {
      queue.dispatchEvent({type: "enqueue", item: type});
    },
    onDequeue = function (queue, type) {
      queue.dispatchEvent({type: "dequeue", item: type});
    },
    onEmpty = function (queue) {
      queue.dispatchEvent("empty");
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

  return Queue;

}).call(null);
