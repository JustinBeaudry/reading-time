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

	window.readingTime = function(element, options, callback) {

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
		// NodeList
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
		domTarget = {
			time: $element(settings.readingTimeTarget),
			count: $element(settings.wordCountTarget),
			remote: settings.remoteTarget ? $element(settings.remoteTarget) : null
		};

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

			var output = {
				totalWords: null,
				wordsPerSecond: null,
				readingTime: null,
				minutes: null,
				seconds: null,
				totalSeconds: null
			};

			if (typeof text === 'string' && text !== '') {

				output.totalWords = text.trim().split(/\s+/g).length;
				output.wordsPerSecond = settings.wordsPerMinute / 60;
				output.time.seconds = output.totalWords / output.wordsPerSecond;

				if (settings.round === true) {
					output.time.minues = Math.round(output.totalSeconds / 60);
				} else {
					output.time.minutes = Math.floor(output.totalSeconds / 60);
				}

				output.time.seconds = Math.round(output.totalSeconds - output.minutes * 60);

				if (settings.round === true) {

					if (output.time.minutes > 0) {
						domTarget.time.textContent = settings.prependTimeString + output.minutes + ' ' + minShortForm;
					} else {
						domTarget.time.textContent = settings.prependTimeString + lessThanAMinute;
					}
				} else {
					output.readingTime = output.minutes + ':' + output.seconds;
					domTarget.time.textContent = settings.prependTimeString + output.readingTime;
				}

				if (settings.wordCountTarget !== '' && settings.wordCountTarget !== undefined) {
					domTarget.count.textContent = settings.prependWordString + output.totalWords;
				}

				if (typeof callback === 'function') {
					callback({
						totalWords: output.totalWords,
						readingTime: output.minutes > 0 ? lessThanAMinute : ' ' + output.minutes + ' ' + minShortForm
					});
				}
			} else {
				console.error('[readingTime] The target element is empty.');
			}
		}

		Array.prototype.forEach.call(el, function($el) {
			var request;
			if (domTarget.remote !== null) {
				request = new XMLHttpRequest();
				request.open('GET', settings.remotePath, true);
				request.onload = function() {
					var div;
					if (request.status >= 200 && request.status < 400) {
						div = document.createElement('div');
						div.innerHTML = request.responseText;
						setTime(domTarget.remote.textContent);
					}
				};
				request.onerror = function() {
					console.error('[readingTime] There was an error connecting to', settings.remotePath);
				};
				request.send();
			} else {
				setTime($el.textContent);
			}
		});
	};

	function $element(element, returnNodeList) {
		if (element instanceof Node || element instanceof NodeList) {
			return element;
		} else {
			if (returnNodeList) {
				return document.querySelectorAll(element);
			} else {
				// return Node
				return document.querySelector(element);
			}
		}
	}
})(this);
