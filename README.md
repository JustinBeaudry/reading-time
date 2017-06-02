Reading Time
============

Inspired by [Medium](http://medium.com), Reading Time is a simple, javascript snippet used to display an estimated time to read some text.

Rewrite of https://github.com/michael-lynch/reading-time (removes jquery and DOM manipulation, usable in Nodejs as well)

##Usage##

```js

var $element = document.querySelector('.eta');
var text = 'Some text here';
var options = {}; // see available options below

var timing = readingTime(text, options);

//
// readingTime returns an object with:
//
//  readingTime (the estimated time it will take to read the article)
//  wordCount   (count of all words)
//

$element.text = timing.readingTime;

```

##Options##

* wordsPerMinute:  WPM as part of the calculation (defaults: 270)
* round:  round up
* lang:  en/fr/de/es/nl/sk/cz
