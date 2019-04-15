Core.register('successMessage', function (sandbox) {
	'use strict';
	var root, module;
	// root HTML element
	if (!(root = sandbox.root = document.querySelector && document.querySelector('.successMessage'))) return;

	// return module object
	return module = {
		//switchable styles
		css: '',

		init: function () {
		    //show module
		    //root.style.display = ''
		    module.show = function () {
		        root.style.display = 'block'    
		    }
		    module.hide = function () {
		        root.style.display = 'none'
		    }
		    //sandbox.action('navigate', { url: '{baseUrl}' })

		    $('#to-root').click(function () {
		        sandbox.action('navigate', { url: '{baseUrl}' })
		        return false;
		    })

		},

		destroy: function () {
			//hide module
			root.style.display = 'none'
		},

		listen: {
			'message-show': function (detail) {
				module.show()
			},
			'message-hide': function (detail) {
			    module.hide()
			}
		}
	}
})

