Core.register('submenu', function (sandbox) {
	'use strict';
	var root, module;
	// root HTML element
	if (!(root = sandbox.root = document.querySelector && document.querySelector('.submenu'))) return;

	// return module object
	return module = {
		//switchable styles
		css: '',

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

