/*!

Name: Reading Time
Author: Justin Beaudry (rewrite of Michael Lynch's original, removed jQuery)
Author URL: http://justinbeaudry.com
Date Created: August 14, 2013
Date Updated: October 27, 2015
Licensed under the MIT license

*/

(function(window) {

	var document = window.document;

	window.readingTime = function(element, options) {

		var defaults = {
			readingTimeTarget: '.eta',
			wordCountTarget: null,
			wordsPerMinute: 270,
			round: true,
			lang: 'en',
			lessThanAMinuteString: '',
			prependTimeString: '',
			prependWordString: '',
			remotePath: null,
			remoteTarget: null
		},
		el = $element(element, true),
		settings = (function() {
			var extended = {}, prop;
			for (prop in defaults) {
				if (Object.prototype.hasOwnProperty.call(defaults, prop)) {
					extended[prop] = defaults[prop];
				}
			}
			for (prop in options) {
				if (Object.prototype.hasOwnProperty.call(options, prop)) {
					extended[prop] = options[prop];
				}
			}
			return extended;
		})(),
		readingTimeTarget = $element(settings.readingTimeTarget),
		wordCountTarget = $element(settings.wordCountTarget);

		if (!el.length) {
			console.error(el, 'is empty.');
		}

		var lessThanAMinute, minShortForm;
		// Italian
		if (settings.lang === 'it') {

			lessThanAMinute = settings.lessThanAMinuteString || "Meno di un minuto";
			minShortForm = 'min';

		// French
		} else if (settings.lang === 'fr') {

			lessThanAMinute = settings.lessThanAMinuteString || "Moins d'une minute";
			minShortForm = 'min';

		// German
		} else if (settings.lang == 'de') {

			lessThanAMinute = settings.lessThanAMinuteString || "Weniger als eine Minute";
			minShortForm = 'min';

		// Spanish
		} else if (settings.lang == 'es') {

			lessThanAMinute = settings.lessThanAMinuteString || "Menos de un minuto";
			minShortForm = 'min';

		// Dutch
		} else if (settings.lang == 'nl') {

			lessThanAMinute = settings.lessThanAMinuteString || "Minder dan een minuut";
			minShortForm = 'min';

		// Slovak
		} else if (settings.lang == 'sk') {

			lessThanAMinute = settings.lessThanAMinuteString || "Menej než minútu";
			minShortForm = 'min';

		// Czech
		} else if (settings.lang == 'cz') {

			lessThanAMinute = settings.lessThanAMinuteString || "Méně než minutu";
			minShortForm = 'min';

		// Hungarian
		} else if (settings.lang == 'hu') {

			lessThanAMinute = settings.lessThanAMinuteString || "Kevesebb mint egy perc";
			minShortForm = 'perc';

		// English
		} else {

			lessThanAMinute = settings.lessThanAMinuteString || 'Less than a minute';
			minShortForm = 'min';
		}
        
		function setTime(text) {

			var totalWords, wordsPerSecond, totalReadingTimeSeconds,
				readingTimeMinutes, readingTimeSeconds, readingTime;


			if (typeof text === 'string' && text !== '') {

				totalWords = text.trim().split(/\s+/g).length;
				wordsPerSecond = settings.wordsPerMinute / 60;
				totalReadingTimeSeconds = totalWords / wordsPerSecond;

				if (settings.round === true) {
					readingTimeMinutes = Math.round(totalReadingTimeSeconds / 60);
				} else {
					readingTimeMinutes = Math.floor(totalReadingTimeSeconds / 60);
				}

				readingTimeSeconds = Math.round(totalReadingTimeSeconds - readingTimeMinutes * 60);

				if (settings.round === true) {

					if (readingTimeMinutes > 0) {
						readingTimeTarget.textContent = settings.prependTimeString + readingTimeMinutes + ' ' + minShortForm;
					} else {
						readingTimeTarget.textContent = settings.prependTimeString + lessThanAMinute;
					}
				} else {
					readingTime = readingTimeMinutes + ':' + readingTimeSeconds;
					readingTimeTarget.textContent = settings.prependTimeString + readingTime;
				}

				if (settings.wordCountTarget !== '' && settings.wordCountTarget !== undefined) {
					wordCountTarget.textContent = settings.prependWordString + totalWords;
				}

			} else {
				console.error('The element is empty.');
			}
		}

		Array.prototype.forEach.call(el, function($el) {
			var request;
			if (settings.remotePath !== null && settings.remoteTarget !== null) {
				request = new XMLHttpRequest();
				request.open('GET', settings.remotePath, true);
				request.onload = function() {
					var div;
					if (request.status >= 200 && request.status < 400) {
						div = document.createElement('div');
						div.innerHTML = request.responseText;
						setTime(document.querySelector(settings.remoteTarget).textContent);
					}
				};
				request.onerror = function() {
					console.error('There was an error connecting to', settings.remotePath);
				};
				request.send();
			} else {
				setTime($el.textContent);
			}
		});
	};

	function $element(element, list) {
		if (typeof element === 'object') {
			return element;
		} else {
			if (list) {
				return document.querySelectorAll(element);
			} else {
				return document.querySelector(element);
			}
		}
	}
})(this);
