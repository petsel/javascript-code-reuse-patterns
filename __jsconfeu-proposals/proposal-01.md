

PUBLIC PART - TOPIC

###»Review of Function based Trait and Mixin Patterns as Implementations of Roles«



PUBLIC PART - SUMMARY

This talk might start by stressing what this languages
core features are about, pointing out that JavaScript
is a delegation language that achieves inheritance by
a delegation automatism that is bound to the `prototype`
slot of constructor functions but has been capable
almost from its beginning of delegating a function or
a method directly to an object via `call` or `apply`.

Thus introducing an object composition pattern based
on functional Trait / Mixin modules.

But since this composition pattern should be known ever
since Angus Croll's article »A fresh look at JavaScript
Mixins« (May 31, 2011) it might be helpful to revise it
in order to clarify concepts, terms and descriptions.

There will be examples that back the classifications
I came up with in order to make more understandable
what developers talk about if they refer to »Function
based Object and Type Composition«.

- short description of the meta term `Role`.
- introducing the term `Trait` as »Traits: Composable
  Units of Behavior«  by referring to the »Software
  Composition Group« (SCG) at Bern University.
- distinguish `Trait` from `Privileged Trait` looking
  on how additionally injected state will be handled.
- move forward to `Mixin` and `Privileged Mixin` looking
  on how either additionally created mutable state or
  injected state or both states will be handled.
- pointing to the many variations / combinations of
  Trait and Mixin based Type / Object Composition and
  the need for resolving composition conflicts.



PRIVATE PART - ADDITIONAL NOTES

This talk could bee seen as opening of the as well submitted
talk proposal »Method Modification -  Code Reuse Patterns
Part II«  and therefore also could feature the sub-headline
»Function based Object and Type Composition - Code Reuse Patterns Part I«

This proposal refers to an [already existing github project](https://github.com/petsel/javascript-code-reuse-patterns)
A slideshow based talk can be found there that hasn't been
given yet in the public. Therefore it's carfully reworked
content will be the base for the talk I just have submitted
to.
