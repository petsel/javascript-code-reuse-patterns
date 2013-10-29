/*


Mircea F. Lungu




Hallo Mr Lungu,


since the SCG at University Bern is acknowledged to be main researcher
and contributor to the concept of Trait based composition and similar
approaches I will not hesitate asking for some advice of yours in
order to clarify from a more scientific point of view how Roles, Traits
and Mixins could be adopted to JavaScript - a delegation language
with function objects as first class citizens and function scope.

I will try to stay clear and brief with my descriptions; my questions
will be straight forward.

One goal is to provide other JavaScript developers with comprehensive
but easy to read information about function based object composition
that introduce "Role", "Trait" and "Mixin" as term and as concept.

I'm aware of "Trait" being a moving target; research still is going
on and came up last with "Talent"s. But I need to draw a line.

I'd also like to establish a generally accepted set of terms that
accentuates the importance of state. The usage of function based
Trait and Mixin patterns in JavaScript should be encouraged since
it can be achieved free of meta programming without any libraries.


                - - -     - - -     - - -

If this direct request was not too impolite and if it sounds interesting
enough and worth a try I will provide the base of an discussion (approx.
3 pages of A4) within the next mail.


best regards - Peter Seliger


                - - -     - - -     - - -


Was it correct boiling down the definition of an SCG Trait to ...

* is a container for at least one stateless implemented method or
  for a collection of stateless implemented methods.

* or could be seen as an incomplete class without state
  (properties/members/fields) but with behavior (methods).

... the just given two points?


If one refers to similar concepts, is it sufficient enough just
naming/listing ...

* Self in a historic approach acknowledges stateful traits.

* Roles in Perl 6 as well as in the Perl 5 based "Moose" framework
  are allowed to be stateful too.

* Ruby has Mixins.

... the above three candidates?


JavaScripts is a delegation language. Its core features are [Object],
[Function] and closures as much as its ability for explicit delegation
of functions via [call] and [apply] and its implemented delegation
automatism that is bound to the [prototype] slot of constructor
functions.
This is a slender but very powerful base one can build/implement on
a very broad range of programming paradigms, approaches and patterns.


If it comes to Traits and Mixins in JavaScript I would like to stress
the importance of state in order to distinguish differently implemented
variations of only one basic delegation pattern. The differences do
effect e.g. on how implemented behavior gets shared and memory will be
allocated.

Given is the implementation of the [Enumerable_first] Trait as example
of the purest and smallest possible Trait pattern in JavaScript ...

var Enumerable_first = (function () {

  var
    Trait,

    first = function () {
      return this[0];
    }
  ;

  Trait = function () {

    this.first = first;
  };

  return Trait;

}());

... that can be shortened to ...

var Enumerable_first = (function () {

  var first = function () {
    return this[0];
  };

  return function () {
    this.first = first;
  };

}());

... this Trait then can be applied to an object that might have need
for the implemented enumerable [first] behavior via [call] or [apply] ...

var
  arr  = ["foo", "bar"],
  coll = {"length": 2, "0": "baz", "1": "biz"}
;
console.log("arr.first", arr.first);    // undefined
console.log("coll.first", coll.first);  // undefined

Enumerable_first.call(arr);
Enumerable_first.call(coll);

console.log("arr.first()", arr.first());    // "foo"
console.log("coll.first()", coll.first());  // "baz"

... and as it can be seen this pattern does not introduce state. The
behavior just works within the context of the very object the Trait
was applied to.


At this point I will come up with the first two definitions.  "Role"
will be referred to as a meta term that describes the main delegation
pattern whereas "Trait"s and "Mixin"s will be seen as implementations
of the overall "Role" concept.

Question:
  Is this a correct attempt for establishing an widely accepted usage
  of those terms?


Definition of "Role" within the JavaScript context:
>
> Any function object that is a container for at least one public
> behavior or acts as collection of more than one public behavior
> and is intended to neither being invoked by the call operator »()«
> nor with the »new« operator but always should be applied to objects
> by invoking one of the [Function]s call methods - either [call] or
> [apply] - is considered to be a Role.
>


Definition of "Trait" within the JavaScript context:
>
> A purely stateless implementation of a Role should be called Trait.
>


From writing a lot of JavaScript code in practice 3 other "Role"
variations have been shaped out if it comes to "state". Since the
presented approach relies on function objects and theirs delegation,
additional arguments can be passed to it as well - thus enabling
injection of additional state. But state does not need to be passed
from the outside; it also can be generated within the function bodies
of "Role" implementations.

Only from differentiating on how state does becomes part of an
implementation and on how state gets processed one could come up
with additional descriptions for "Privileged Trait", "Mixin" and
"Privileged Mixin".

( 'found even a 5th one that got baptized "Silent Trait". )

Question:
  Does it make sense to distinguish "Role" variations based on state?

Counter...
  Since this approach relies on JavaScript's functional core features
  - [Function], [call] and [apply] - one has to take into account this
  languages ability for preserving scope (closures) and for delegating
  context (passing around target objects).
...Questions:
  What was the goal of describing the classical "SCG Trait" of being
  stateless. Why do later SCG related papers mention "stateful traits".
  What else then - besides rules of where and how to resolve naming
  conflicts - makes the Trait concept different from the Mixin concept.


I will go forward providing the 3 above mentioned "Role" variants that
get accompanied each by an example.


Definition of "Privileged Trait" within the JavaScript context:
>
> An implementation of a Role that relies on additionally injected
> state but does only read and never does mutate it should be called
> Privileged Trait.
>

var Allocable = (function () {

  var
    global = this,
    Array  = global.Array,

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
    global    = this,
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


Definition of "Mixin" within the JavaScript context:
>
> An implementation of a Role that does create mutable state
> on its own in order to solve its task(s) but does never rely
> on additionally injected state should be called Mixin.
>

var Observable_SignalsAndSlots = (function () {

  var
    global = this,
    Array  = global.Array,

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
          evt.type   = defaultEvent.type;

        } else {

          evt = {
            target : defaultEvent.target,
            type   : defaultEvent.type
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

obj.dispatchEvent("baz"); // false
obj.dispatchEvent("bar"); // "onbar" Object {target: Object, type: "bar"} // true
obj.dispatchEvent("foo"); // "onfoo" Object {target: Object, type: "foo"} // true


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


Definition of "Privileged Mixin" within the JavaScript context:
>
> An implementation of a Role that relies either on mutation of
> additionally injected state only or on both, creation of mutable
> state and additionally injected state, regardless if the latter
> then gets mutated or not, should be called Privileged Mixin.
>

One example was another possible [Observable_SignalsAndSlots] solution
one could pass an additional configuration object to which describes
how an observables API has to be customized ("trigger" instead of
"dispatchEvent" and "on" instead of "addEventListener").


Question:
  Are the given definitions and theirs examples obvious and
  differentiated enough?
  Do they match the goal of gaining a better understanding of
  this whole matter?
  Is it in some way compatible to the findings of the SCG
  regarding Traits?

  Was the whole effort of little use because You don't own the
  privilege of interpretation and I'm free of coming up with
  whatever I want since I'm an interested laymen in this field.

  If it all is utterly nonsense what was the right approach of
  adapting theory and terms of Trait based composition to the
  special nature of JavaScript?


I would be glad if someone could take the time in order to work her/
himself through the pile of work I just generated with my questions
and dropped on you.
In the last years I was able from time to time discussing this matter
with some colleagues but no one found it important enough to clarify
if the adoption of Trait based composition to JavaScript was correctly
done. Because of this no one was really willing to dig into some of the
SCG papers. But from literally not getting any useful feedback because
of not having any profound discussions on this matter it is difficult
to establish a generally accepted set of terms even though the latter
should be the base of such discussions.

I really would appreciate if you were able and willing to shed light
on this whole topic - if not, let me know as well - I certainly will
understand and except it.


best regards - Peter Seliger


*/
