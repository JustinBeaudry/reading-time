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
    
Initialize the plugin targeting the class, ID or element that contains the text in which you want to estimate the reading time of. 

```js
$('article').readingTime();
```
	
####Options

<ol>
  <li>
  readingTimeTarget: "id / class / element"
  <br />A string that defines the ID, class or element that will store the estimated reading time (default: 'eta').
  </li>

  <li>wordCountTarget: "id / class / element"
  <br />A string that defines the ID, class or element that will store the total word count (default: '').
  </li>

  <li>remotePath: "path"
  <br />A string that indicates the path to the remote file (default: null).
  </li>

  <li>remoteTarget: "id / class / element"
  <br />A string that defines the ID, class or element in the remote file that contains the text in which you want to estimate the reading time of (default: null).
  </li>

  <li>wordsPerMinute: integer
  <br />An integer that defines the words per minute at which to calculate the estimated reading time (default: 270).
  </li>

  <li>round: boolean
  <br />A boolean value that indicates whether or not the estimated reading time should be rounded to the closest minute (default: true).
  </li>

  <li>lang: "en / fr / de / es / nl / sk / cz"
  <br />A two letter string that indicates the language to be used (default: "en").
  </li>

  <li>lessThanAMinuteString: string
  <br />A string that changes the default "Less than a minute" copy (default: '').
  </li>

  <li>prependTimeString: string
  <br />A string that is prepended before the estimated reading time (default: '').
  </li>

  <li>prependWordString: string
  <br />A string that is prepended before the total word count (default: '').
  </li>
</ol>

#####Example:

```js
(function() {
	var $article = $('article');
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
