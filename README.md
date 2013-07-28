javascript-code-reuse-patterns
==============================


Low level abstraction, module based, code reuse patterns intended for reflecting the basics before starting with
more complex meta programming approaches.


Every now and again it happened and still does that JavaScript programming individuals each on their own discover
this languages capability for - what then mostly gets referred to as - "functional or function based mixins".
Most of them understand in this very moment the impact of theirs discovery in means of working with a different
design approach for theirs future project architectures and code bases (modularisation, code recycling, creating
types, generating type/object systems). But how does it come?

JavaScript is a delegation language. This languages core features are all about `Object` and `Function` and
`closures` as much as about `call` and `apply` ... and yes about `prototype` too. Do value the last mentioned
but don't adore it blindly. Delegation in JavaScript already happens implicitly when the prototype chain is
walked in order to e.g. find a method that might be related to but is not directly owned by an object. Once the
method was found it gets called within this objects context. Thus inheritance in JavaScript is covered by a
delegation automatism that is bound to the `prototype` slot of constructor functions.

But almost from its beginning JavaScript has been capable of delegating a function or a method directly to
an object that has need of it via `call` or `apply`. Thus introducing an object composition pattern based on
functional TRAIT/MIXIN modules. This knowledge then repeatedly drives articles/discussions -
[also the most recent one](http://webreflection.blogspot.de/2013/04/flight-mixins-are-awesome.html)
that [right now already has aggregated into a project](https://github.com/WebReflection/object-mixin).

But before using such smart approaches it might be helpful to have a look into function based code reuse patterns
that do rely only on JavaScript's module pattern and therefore can be considered to be still free of any kind of
meta programming.


Go for the slideshow or get a closer look at the sources.

- [2013-05-16: slides prepared for the berlin.js talk that unfortunately couldn't be held.]http://petsel.github.io/javascript-code-reuse-patterns/berlin.js/2013-05-16/slides)

- [Type Composition](./tree/master/source/components/composition).
- [Type Factories](tree/master/source/types/creation/Factories).
