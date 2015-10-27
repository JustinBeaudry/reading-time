#Reading Time

Inspired by [Medium](http://medium.com), Reading Time is a simple, javascript snippet used to display an estimated time to read some text.

Fork of https://github.com/michael-lynch/reading-time, rewritten to remove jquery

##Instructions

Create an element with the class of 'eta' where the estimated reading time will display.

```html
<article>
	<div class="eta"></div>
</article>
```
	
Optionally you can also create an element with whatever class or ID you want to display the total word count.

<em>The word count will only be displayed if you set the wordCountTarget parameter when initiating the plugin (see below).</em>

```html
<article>
	<div class="eta"></div>
	<div class="word-count"></div>
</article>
```

####Options

* readingTimeTarget:  element to store the estimated reading time
* wordCountTarget:  element to store the total word count
* remotePath:  path to remote file
* remoteTarget:  target element
* wordsPerMinute:  WPM as part of the calculation (defaults: 270)
* round:  round up
* lang:  en/fr/de/es/nl/sk/cz

#####Example:

```js
(function() {
	window.addEventListener('DOMContentLoaded', function() {
		window.readingTime('article', {
      readingTimeTarget: '.reading-time',
      wordCountTarget: '.word-count',
      wordsPerMinute: 275,
      round: false,
      lang: 'fr'
		});
	});
});
```
