(kind of historical documentation)


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
an object that has need of it via `call` or `apply` - example:

```
var cat = {
  sound     : "meow",
  makeSound : function () {
    console.log(this.sound);
  }
};
var dog = {
  sound     : "woof"
};

cat.makeSound();          // "meow"
cat.makeSound.call(dog);  // "woof"
```

But instead of wildly "borrowing" such methods again and again the next step towards code improvement should
be ***collecting them*** and ***providing them***, when needed.

```
var Talkative = function () {
  makeSound: function () {
    console.log(this.sound);
  }
};
var cat = {
  sound: "meow",
};
var dog = {
 sound: "woof"
};
Talkative.call(cat);
Talkative.apply(dog);

cat.makeSound(); // "meow"
dog.makeSound(); // "woof"
```

`Talkative` is a reusable module of code. Ruby supports including such modules and calls them Mixins. Perl 6 has
its own approach called Roles.


As has been pointed out already in the resources listed right at the bottom ...

*Peter Seliger Sun, 14 Apr 2013*
> ... this languages capability for "functional or function based mixins" might deserve a closer look before running
> into what I would call a meta programming temptation trap.
>
> We already have everything we need in order to create modular collections of behavior and also in order to provide
> and apply them to objects.
>
> "Mixin" might be a Ruby influenced term and does not completely cover what can be achieved by functions/closures
> [call] and [apply]. I'd rather tend to use Perl 6 "Roles" as a generic term.
>
> The smallest thinkable Role was a function body that implements a single method in a stateless way. Thus being
> a "Trait" if one follows the findings of the "Software Composition Group" at Bern University [http://scg.unibe.ch/research/traits].
> Any implementation that gets injected mutable state or does create mutable state on its own in oder to solve its
> task(s) then, from my point of view, should be referred to as "Mixin".
>

*Andrea Giammarchi Sun, 14 Apr 2013*

> > It seems that Mixins Are Awesome and this can take most advantages from being a function and not only an object:
> > http://webreflection.blogspot.ie/2013/04/flight-mixins-are-awesome.html
> >
> > AFAIK, all interfaces described in W3C such EventTarget and others could be also covered by this proposal
> > ... so ... what do you think ?
>

*Peter Seliger Sun, 14 Apr 2013*

> ... , you are right, but all it needs in my opinion are a module pattern, a module library of your choice,
> a naming convention for your Trait/Mixin-module Implementation (adjectives/adverbes, no nouns, first uppercase letter?)
> and again [call] or [apply].
>
> For your given example of W3C interfaces, [EventTarget] should be implemented and internally referred to as
> [EventTargetMixin], but the module should expose [EventTargetMixin] as [Observable].
>
> - example gist for Observable [https://gist.github.com/petsel/5385218].
> - example gist for a Trait [https://gist.github.com/petsel/5385163].
>
> There is another point that makes pure straightforward functional Trait/Mixin composition unique in JavaScript -
> passing additional data at apply time. ...
> ...
>
> With meta programming approaches this advantage, one gets for free now, might get lost or if implemented less understandable.
>
> I discarded every single approach I made within the last 5 years for Trait/Mixin libraries, that tried to be smarter
> than what the languages core already provides except the last one that just sticks to a module library.
> ...


Resources (increasingly sorted by date):


German only:

* [\[EventDispatcher\]-eigene events ohne DOM-2 event-flow handhaben](http://forum.de.selfhtml.org/archiv/2007/6/t153512/#m999139) - June 4, 2007
* [delegation / schnittstellen-vererbung](http://forum.de.selfhtml.org/archiv/2007/8/t158030/#m1028181) - August 14, 2007
* [klassenlose vollwertige und flexible oo auf funktionaler basis](http://forum.de.selfhtml.org/archiv/2007/12/t163291/#m1064532) - December 12, 2007
* [Multiparadigmensprachen, Klassifizierung von Sprachen der OOP](http://forum.de.selfhtml.org/archiv/2008/6/t172416/#m1130998) - June 13, 2008
* [beispielhafte Zusammenfassung von JavaScript als Sprache der OO.](http://forum.de.selfhtml.org/archiv/2008/6/t172416/#m1132251) - June 17, 2008
* [Vererbung durch Delegation über Interfaces](http://forum.de.selfhtml.org/archiv/2008/7/t174282/#m1145309) - July 23, 2008
* [weiteres beispiel zum besseren verstaendnis einer namensfindung](http://forum.de.selfhtml.org/archiv/2008/8/t175651/#m1155168) - August 20, 2008
* [Objektfunctionen - Vererbung durch Delegation](http://forum.de.selfhtml.org/archiv/2008/8/t176279/#m1159535) - September 1, 2008
* [Mixin: Verhalten durch Delegation über implementierte Interfaces](http://forum.de.selfhtml.org/archiv/2008/9/t176473/#m1161116) - September 4, 2008
* [\[HTMLElement\]e mit zusätzlichem Verhalten ausstatten](http://forum.de.selfhtml.org/archiv/2009/1/t182429/#m1207797) - January 1, 2009
* [Google Drive/Docs :: Die-natuerliche-Veranlagung-des-JavaScript-Sprachkerns-fuer-Traits_2009-10-21](https://drive.google.com/?tab=mo&authuser=0#folders/0B15K4-2iDlFDS1pCNjhXc1lqTkE) - October 21, 2009


English:

* [Injecting Traits into Javascript Objects](http://web.archive.org/web/20110211115908/http://blogs.yellowfish.biz/2009/injecting-traits-into-javascript-objects#comment-91) - October 10, 2009
* [Injecting Traits into Javascript Objects](http://www.diary.ru/~asfalanaft/p176856114.htm) - October 10, 2009
* [\[EventDispatcher\] singleton - a core-API based Signals and Slots implementation](http://web.archive.org/web/20100810083804/http://www.refactory.org/s/eventdispatcher_singleton_a_core_api_based_signals_and_slots_implementation/view/latest) - November 24, 2009

* [A fresh look at JavaScript Mixins](http://javascriptweblog.wordpress.com/2011/05/31/a-fresh-look-at-javascript-mixins/) - May 31, 2011 by Angus Croll
* [Flight Mixins Are Awesome!](http://webreflection.blogspot.de/2013/04/flight-mixins-are-awesome.html) - April 14, 2013 by Andrea Giammarchi
* [Object.mixin() reacher proposal](http://www.mail-archive.com/es-discuss@mozilla.org/msg22661.html) - April 14, 2013 by Andrea Giammarchi
* [Re: Object.mixin() reacher proposal](http://www.mail-archive.com/es-discuss@mozilla.org/msg22677.html) - April 14, 2013 by Peter Seliger
