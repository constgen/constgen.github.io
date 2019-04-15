Core.register('gameDetails', function (sandbox) {
	'use strict';
	var root, module;
	// root HTML element
	if (!(root = sandbox.root = document.querySelector && document.querySelector('.gameDetails'))) return;

	// return module object
	return module = {
		//switchable styles
		css: 'display: block',

		init: function () {
			//show module
		    root.style.display = ''

		},

		destroy: function () {
			//hide module
			root.style.display = 'none'
		},

		listen: {
			'app-load': function (detail) {
				if (!detail) return;
			}
		}
	}
})

