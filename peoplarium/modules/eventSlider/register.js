Core.register('eventSlider', function (sandbox) {
	'use strict';
	var root, module;
	// root HTML element
	if (!(root = sandbox.root = document.querySelector && document.querySelector('.eventSlider'))) return;

	var jqToolsReady = sandbox.load('{baseURL}/plugins/jquery.tools.min.js', 'defer')

	// return module object
	return module = {
		//switchable styles
		css: '',

		init: function () {
			//show module
		    root.style.display = ''

            
		    $(".eventSlider-navi").tabs(".eventSlider-pane > .eventSlider-item", {
		        effect: 'fade'
		    });

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

