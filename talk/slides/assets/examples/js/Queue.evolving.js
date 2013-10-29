

var Allocable = (function () {

  var
    global = this,
    Array = global.Array,

    array_from = ((typeof Array.from == "function") && Array.from) || (function (proto_slice) {
      return function (listType) {

        return proto_slice.call(listType);
      };
    }(Array.prototype.slice))
  ;

  return function (list) { // implementing the Privileged [Allocable] Trait.

    this.valueOf = this.toArray = function () {
      return array_from(list);
    };
    this.toString = function () {
      return ("" + list);
    };
    this.size = function () {
      return list.length;
    };
  };

}).call(this);



var Queue = (function () {

  var
    global = this,
    Allocable = global.Allocable
  ;

  return function () { // implementing the [Queue] Constructor.
    var list = [];

    this.enqueue = function (type) {

      list.push(type);
      return type;
    };
    this.dequeue = function () {

      return list.shift();
    };

    Allocable.call(this, list); // applying the Privileged [Allocable] Trait.
  };

}).call(null);



var q = new Queue;

console.log("q.size()", q.size());        // 0

q.enqueue("the");
q.enqueue("quick");
q.enqueue("brown");
q.enqueue("fox");

console.log("q.size()", q.size());        // 4
console.log("q.toArray()", q.toArray());  // ["the", "quick", "brown", "fox"]

q.dequeue();
q.dequeue();

console.log("q.toArray()", q.toArray());  // ["brown", "fox"]
console.log("q.size()", q.size());        // 2

q.dequeue();
q.dequeue();
q.dequeue();

console.log("q.size()", q.size());        // 0





var Observable_SignalsAndSlots = (function () {

  var
    global = this,
    Array = global.Array,

    isFunction = function (type) {
      return (
        (typeof type == "function")
        && (typeof type.call == "function")
        && (typeof type.apply == "function")
      );
    },
    isString = (function (regXCLassName, expose_implementation) {
      return function (type) {

        return regXCLassName.test(expose_implementation.call(type));
      };
    }((/^\[object\s+String\]$/), global.Object.prototype.toString)),

    array_from = ((typeof Array.from == "function") && Array.from) || (function (proto_slice) {
      return function (listType) {

        return proto_slice.call(listType);
      };
    }(Array.prototype.slice))
  ;

  var
    Event = function (target, type) {

      this.target = target;
      this.type = type;
    },

    EventListener = function (target, type, handler) {

      var defaultEvent = new Event(target, type);             // creation of new state.

      this.handleEvent = function (evt) {
        if (evt && (typeof evt == "object")) {

          evt.target = defaultEvent.target;
          evt.type = defaultEvent.type;

        } else {

          evt = {
            target: defaultEvent.target,
            type: defaultEvent.type
          };
        }
        handler(evt);
      };
      this.getType = function () {
        return type;
      };
      this.getHandler = function () {
        return handler;
      };
    },

    EventTargetMixin = function () {

      var eventMap = {};

      this.addEventListener = function (type, handler) {      // will trigger creation of new state.
        var reference;
        if (type && isString(type) && isFunction(handler)) {
          var
            event = eventMap[type],
            listener = new EventListener(this, type, handler) // creation of new state.
          ;
          if (event) {
            var
              handlers = event.handlers,
              listeners = event.listeners,
              idx = handlers.indexOf(handler)
              ;
            if (idx == -1) {
              handlers.push(listener.getHandler());
              listeners.push(listener);

              reference = listener;
            } else {
              reference = listeners[idx];
            }
          } else {
            event = eventMap[type] = {};
            event.handlers = [listener.getHandler()];
            event.listeners = [listener];

            reference = listener;
          }
        }
        return reference;
      };

      this.dispatchEvent = function (evt) {
        var
          successfully = false,
          type = ((evt && (typeof evt == "object") && isString(evt.type) && evt.type) || (isString(evt) && evt)),
          event = (type && eventMap[type])
        ;
        if (event) {
          var
            listeners = (event.listeners && array_from(event.listeners)),
            len = ((listeners && listeners.length) || 0),
            idx = -1
          ;
          if (len >= 1) {
            while (++idx < len) {

              listeners[idx].handleEvent(evt);
            }
            successfully = true;
          }
        }
        return successfully;
      };
    }
  ;

  return EventTargetMixin; // [EventTargetMixin] will be exposed to the outside as [Observable_SignalsAndSlots].

}).call(null);



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

  Queue = function () { // implementing the [Queue] Constructor.
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
    Observable.call(queue);       // applying the [Observable_SignalsAndSlots] Mixin.
    Allocable.call(queue, list);  // applying the Privileged [Allocable] Trait.
  };

  return Queue;

}).call(null);


var q = new Queue;

q.addEventListener("enqueue", function (evt) {console.log("enqueue", evt);});
q.addEventListener("dequeue", function (evt) {console.log("dequeue", evt);});
q.addEventListener("empty", function (evt) {console.log("empty", evt);});

q.enqueue("the");   // "enqueue" Object {type: "enqueue", item: "the", target: Queue}
q.enqueue("quick"); // "enqueue" Object {type: "enqueue", item: "quick", target: Queue}
q.enqueue("brown"); // "enqueue" Object {type: "enqueue", item: "brown", target: Queue}
q.enqueue("fox");   // "enqueue" Object {type: "enqueue", item: "fox", target: Queue}

q.dequeue();        // "dequeue" Object {type: "dequeue", item: "the", target: Queue}
q.dequeue();        // "dequeue" Object {type: "dequeue", item: "quick", target: Queue}
q.dequeue();        // "dequeue" Object {type: "dequeue", item: "brown", target: Queue}
q.dequeue();        // "dequeue" Object {type: "dequeue", item: "fox", target: Queue}
                    // "empty"   Object {target: Queue, type: "empty"}
q.dequeue();        // "dequeue" Object {type: "dequeue", item: undefined, target: Queue}
                    // "empty"   Object {target: Queue, type: "empty"}











