/**
 *  see also / derived from:
 *  [https://github.com/petsel/composable/blob/master/src/components/Observable/Observable.SignalsAndSlots.js]
 *  [https://github.com/petsel/composable/blob/master/src/composites/Queue/QueueFactory.js]
 */
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
