

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


var obj = {};
Observable_SignalsAndSlots.call(obj);

obj.addEventListener("foo", function (evt) {console.log("onfoo", evt);});
obj.addEventListener("bar", function (evt) {console.log("onbar", evt);});

obj.dispatchEvent("bar"); // "onbar" Object {target: Object, type: "bar"} // true
obj.dispatchEvent("foo"); // "onfoo" Object {target: Object, type: "foo"} // true
obj.dispatchEvent("baz"); // false
