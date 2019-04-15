Core.register('services-bar', function (sandbox) {
	var root, module;
	// root HTML element
	if (!(root = document.querySelector('.services-bar'))) return;
	// module
	var module = {
		init: function () {

		},

		destroy: function () {

		},

		listen: {
			'app-load': function () {

			}
		}

	}
	// return module object
	return module;
})

