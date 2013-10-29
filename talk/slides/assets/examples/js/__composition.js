

var Enumerable_first_last = (function () {

  var
    Trait,

    first = function () {
      return this[0];
    },
    last = function () {
      return this[this.length - 1];
    }
  ;
  Trait = function () {

    this.first = first;
    this.last = last;
  };

  return Trait;

}());



var Enumerable_first_last_item_listWrapper = (function () {

  var
    global = this,

    Trait,

    parse_float = global.parseFloat,
    math_floor  = global.Math.floor
  ;
  Trait = function (list) {

    this.first = function () {
      return list[0];
    };
    this.last = function () {
      return list[list.length - 1];
    };
    this.item = function (idx) {
      return list[math_floor(parse_float(idx, 10))];
    };
  };

  return Trait;

}).call(null);



var Enumerable_first_last_item_listGetterShorthands = (function () {

  var
    global = this,

    Trait,

    parse_float = global.parseFloat,
    math_floor  = global.Math.floor,

    first = function () {
      return (this()[0]);
    },
    last = function () {
      var list;
      return ((list = this())[list.length - 1]);
    },
    item = function (idx) {
      return (this()[math_floor(parse_float(idx, 10))]);
    }
  ;
  Trait = function () {

    this.first = first;
    this.last = last;
    this.item = item;
  };

  return Trait;

}).call(null);



var Allocable = (function () {

  var
    global = this,

    Enumerable_listWrapper = global.Enumerable_first_last_item_listWrapper,

    Trait,

    Array = global.Array,

    array_from = ((typeof Array.from == "function") && Array.from) || (function (proto_slice) {
      return function (listType) {

        return proto_slice.call(listType);
      };
    }(Array.prototype.slice))
  ;

  Trait = function (list) {
    var
      allocable = this
    ;
    allocable.valueOf = allocable.toArray = function () {
      return array_from(list);
    };
    allocable.toString = function () {
      return ("" + list);
    };
    allocable.size = function () {
      return list.length;
    };
    Enumerable_listWrapper.call(allocable, list);
  };

  return Trait;

}).call(this);



var Allocable_all = (function () {

  var
    global = this,

    Enumerable_listGetterShorthands = global.Enumerable_first_last_item_listGetterShorthands,

    Trait,

    Array = global.Array,

    array_from = ((typeof Array.from == "function") && Array.from) || (function (proto_slice) {
      return function (listType) {

        return proto_slice.call(listType);
      };
    }(Array.prototype.slice))
  ;

  Trait = function (list) {
    var
      allocable = this
    ;
    allocable.all = function () {
      return array_from(list);
    };
    allocable.all.size = function () {
      return list.length;
    };
    Enumerable_listGetterShorthands.call(allocable.all);
  };

  return Trait;

}).call(null);



var Observable_SignalsAndSlots = (function () {

  var
    global      = this,

    Array       = global.Array,
    math_random = global.Math.random,

    isFunction  = function (type) {
      return (
        (typeof type == "function")
        && (typeof type.call == "function")
        && (typeof type.apply == "function")
      );
    },
    isString    = (function (regXCLassName, expose_implementation) {
      return function (type) {

        return regXCLassName.test(expose_implementation.call(type));
      };
    }((/^\[object\s+String\]$/), global.Object.prototype.toString)),

    array_from  = ((typeof Array.from == "function") && Array.from) || (function (proto_slice) {
      return function (listType) {

        return proto_slice.call(listType);
      };
    }(Array.prototype.slice)),

    createId = (
      /*  [https://github.com/broofa/node-uuid] - Robert Kieffer  */
      (global.uuid && isFunction(global.uuid.v4) && global.uuid.v4)

      /*  [https://gist.github.com/jed/982883]  - Jed Schmidt     */
      || function b(a){return a?(a^math_random()*16>>a/4).toString(16):([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,b)}
    )
  ;

  var
    Event = function (target, type) {
      var
        event = this
      ;
      event.constructor = Event;

      event.target    = target;
      event.type      = type;
      event.uuid      = createId();
    },

    EventListener = function (target, type, handler) {
      var
        defaultEvent = new Event(target, type),
        listener = this
      ;
      listener.constructor = EventListener;

      listener.handleEvent = function (evt) {
        if (evt && (typeof evt == "object")) {

          evt.target    = defaultEvent.target;
          evt.type      = defaultEvent.type;
          evt.uuid      = defaultEvent.uuid;

        } else {

          evt = {
            target      : defaultEvent.target,
            type        : defaultEvent.type,
            uuid        : defaultEvent.uuid
          };
        }
        handler(evt);
      };
      listener.getType = function () {
        return type;
      };
      listener.getHandler = function () {
        return handler;
      };
    },

    EventTargetMixin = function (config) {

      config = (((typeof config == "object") && config) || {});
      var
        observable/*target*/ = this,

        eventMap = {},
                                                            //      - alternative wording taken from the wild ...
        addEventListenerAlias     = "addEventListener",     //  e.g. "on" ............ "bind" ...... "addObserver"
        removeEventListenerAlias  = "removeEventListener",  //  e.g. "off" ........... "unbind" .... "removeObserver"
        hasEventListenerAlias     = "hasEventListener",     //  e.g. "hasListener" ... "isBound" ... "hasObserver"
        dispatchEventAlias        = "dispatchEvent",        //  e.g. "trigger" ....... "emit" ...... "emitEvent"

        removeEventListener = function (type, handler) {
          var
            event = eventMap[type],
            successfully = false
          ;
          if (event) {
            var
              handlers = event.handlers,
              listeners = event.listeners,
              idx = handlers.indexOf(handler)
            ;
            if (idx >= 0) {
              handlers.splice(idx, 1);
              listeners.splice(idx, 1);
              successfully = true;
            }
          }
          return successfully;
        },
        hasEventListener = function (type, handler) {
          return ((eventMap[type] || false) && (eventMap[type].handlers.indexOf(handler) >= 0));
        }
      ;
      addEventListenerAlias = isString(config[addEventListenerAlias]) ? config[addEventListenerAlias] : addEventListenerAlias;
      removeEventListenerAlias = isString(config[removeEventListenerAlias]) ? config[removeEventListenerAlias] : removeEventListenerAlias;
      hasEventListenerAlias = isString(config[hasEventListenerAlias]) ? config[hasEventListenerAlias] : hasEventListenerAlias;
      dispatchEventAlias = isString(config[dispatchEventAlias]) ? config[dispatchEventAlias] : dispatchEventAlias;

      observable[addEventListenerAlias] = function (type, handler) {
        var reference;
        if (type && isString(type) && isFunction(handler)) {
          var
            event = eventMap[type],
            listener = new EventListener(this, type, handler)
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

      observable[removeEventListenerAlias] = function (typeOrListener, handler) {
        return ((

          isString(typeOrListener)
          && isFunction(handler)
          && removeEventListener(typeOrListener, handler)

        ) || (

          (typeOrListener instanceof EventListener)
          && removeEventListener(typeOrListener.getType(), typeOrListener.getHandler())

        ) || false);
      };

      observable[hasEventListenerAlias] = function (typeOrListener, handler) {
        return ((

          isString(typeOrListener)
          && isFunction(handler)
          && hasEventListener(typeOrListener, handler)

        ) || (

          (typeOrListener instanceof EventListener)
          && hasEventListener(typeOrListener.getType(), typeOrListener.getHandler())

        ) || false);
      };

      observable[dispatchEventAlias] = function (evt) {
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

      if ("" in observable) {
        delete observable[""];
      }
    }
  ;

  return EventTargetMixin;

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



var
  queue   = QueueFactory_Allocable_isQueue.create(),

  logger  = function (evt) {
    console.log(evt);
  }
;
queue.addEventListener("enqueue", logger);
queue.addEventListener("dequeue", logger);
queue.addEventListener("empty", logger);

console.log("before enqueue twice", queue);

console.log("queue.size()", queue.size());
console.log("queue.first()", queue.first());
console.log("queue.last()", queue.last());
console.log("queue.item(0)", queue.item(0));
console.log("queue.toArray()", queue.toArray());
console.log("queue.toString()", queue.toString());

queue.enqueue("Hallo");
queue.enqueue("world");

console.log("after enqueue twice", queue);

console.log("queue.size()", queue.size());
console.log("queue.first()", queue.first());
console.log("queue.last()", queue.last());
console.log("queue.item(1)", queue.item(1));
console.log("queue.toArray()", queue.toArray());
console.log("queue.toString()", queue.toString());

queue.dequeue();
queue.dequeue();

console.log("after shifting twice", queue);

console.log("queue.size()", queue.size());
console.log("queue.toArray()", queue.toArray());
