/*
Name: Reading Time
Author: Justin Beaudry (rewrite of Michael Lynch's original, removed jQuery)
Author URL: http://justinbeaudry.com
Date Created: August 14, 2013
Date Updated: June 2, 2017
Licensed under the MIT license
*/

(function(window) {

	window.readingTime = function readingTime(text, options) {

		var defaults = {
			readingTimeTarget: '.eta',
			wordCountTarget: null,
			// average adult reads 250 WPM
			wordsPerMinute: 250,
			round: true,
			lang: 'en',
			lessThanAMinuteString: '',
			prependTimeString: '',
			prependWordString: ''
		},
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
		})(), lessThanAMinute, minShortForm;

		// Language Text Options

		// Italian
		if (settings.lang === 'it') {

			lessThanAMinute = settings.lessThanAMinuteString || "Meno di un minuto";
			minShortForm = 'min';

		// French
		} else if (settings.lang === 'fr') {

			lessThanAMinute = settings.lessThanAMinuteString || "Moins d'une minute";
			minShortForm = 'min';

		// German
		} else if (settings.lang === 'de') {

			lessThanAMinute = settings.lessThanAMinuteString || "Weniger als eine Minute";
			minShortForm = 'min';

		// Spanish
		} else if (settings.lang === 'es') {

			lessThanAMinute = settings.lessThanAMinuteString || "Menos de un minuto";
			minShortForm = 'min';

		// Dutch
		} else if (settings.lang === 'nl') {

			lessThanAMinute = settings.lessThanAMinuteString || "Minder dan een minuut";
			minShortForm = 'min';

		// Slovak
		} else if (settings.lang === 'sk') {

			lessThanAMinute = settings.lessThanAMinuteString || "Menej než minútu";
			minShortForm = 'min';

		// Czech
		} else if (settings.lang === 'cz') {

			lessThanAMinute = settings.lessThanAMinuteString || "Méně než minutu";
			minShortForm = 'min';

		// Hungarian
		} else if (settings.lang === 'hu') {

			lessThanAMinute = settings.lessThanAMinuteString || "Kevesebb mint egy perc";
			minShortForm = 'perc';

		// English
		} else {

			lessThanAMinute = settings.lessThanAMinuteString || 'Less than a minute';
			minShortForm = 'min';
		}
        
		function setTime(text) {

			var totalWords, wordsPerSecond, totalReadingTimeSeconds,
				readingTimeMinutes, readingTimeSeconds, readingTime, results = {};

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
						results.readingTime = settings.prependTimeString + readingTimeMinutes + ' ' + minShortForm;
					} else {
					  results.readingTime = settings.prependTimeString + lessThanAMinute;
					}
				} else {
					readingTime = readingTimeMinutes + ':' + readingTimeSeconds;
					results.readingtime = settings.prependTimeString + readingTime;
				}

				// JS will coerce values into null here, so we use 'double' equals on purpose
				if (settings.wordCountTarget != null && settings.wordCountTarget !== '') {
					results.wordCount = settings.prependWordString + totalWords;
				}

				return results;
		}

		return setTime(text);
	};
})(this);
