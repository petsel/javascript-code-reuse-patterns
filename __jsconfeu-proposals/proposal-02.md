

PUBLIC PART - TOPIC

###»Basic Method Modifiers and Real Aspect Oriented Programming using a JavaScript AO System«



PUBLIC PART - SUMMARY

This talk might start by pointing out that the need for
basic method modifiers like `before`, `after` and `around`
arises with the use of Trait / Mixin composition patterns.

It definitely will show JavaScript's ability to adopt to
and integrate the complete Aspect Oriented approach with
real `Joinpoint`s, `Pointcut`s, `Advice`s and `Aspect`s
providing module based code reuse at least at Advice level.

It needs to clarify the role of those 4 terms especially
from what makes real AOP in JavaScript distinct from
already existing approaches that mainly just provide
wrap helpers vor advice like method modification.

Due to JavaScripts dynamic nature an AO system is able
of altering the whole system's control flow at any time
from any level thus allowing switching the system on and
off, confirming / denying each aspect on its own or even
hot plugging / unplugging any of this systems components
regardless if the system is running or not.

There will be a demonstration of the just promised features.



PRIVATE PART - ADDITIONAL NOTES

This talk could bee seen as continuation of the as well
submitted talk proposal »Function based Object and Type
Composition - Code Reuse Patterns Part I« and therefore
also could feature the sub-headline »Method Modification
- Code Reuse Patterns Part II«.

Besides that there is in fact already a still unreleased
AO library that proofs this. But I'm still looking for
another use case - client side or backend - besides that
far too much stressed logging example ... thinking of a
cross cutting concern that enables JavaScript systems of
auto analysing and controlling / steering theirs performance.
A real use case would be welcome and could be implemented
by making use of this AO library.

Otherwise it will be difficult to convince people about
the usefulness of real AO systems in JavaScript.
