
// Navigation extension
Core.extend(function (Core) {
	var location = window.location;

	var Navigation = {}

	Navigation.navigate = function (options) {
		//options can be object or url string
		if (typeof options === 'object') {
			if (!options.url) {
				return
			}
		} else if (typeof options === 'string') {
			options = { url: options }
		} else {
			return
		}

		options.url = options.url.replace(/\/+$/, '')//remove last dash
		location.href = Core.template(options.url)
	}

	return {

		Navigation: Navigation,

		
		actions: {
			'navigate': [
				Navigation.navigate
			],
			'navigate-forward': [
				function () { window.history.forward() }
			],
			'navigate-back': [
				function () { window.history.back() }
			],
			'navigate-home': [
				function () { Navigation.navigate('{baseUrl}') }
			]
		}

	
	}

})