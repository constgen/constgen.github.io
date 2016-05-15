Core.register('contact', function (sandbox) {
	return (function (root) {
		if (!root) return
		var module = {
			init: function () {
				$("#contact-form .bottom .button").click(function() {
                    sandbox.action('trackEvent', {
                        category: 'Contact Submit Form',
                        action: 'submit',
                    })
                });

			},

			listen: {
				'app-load': function () {
					sandbox.action('trackEvent', {
                        category: 'Contact Page Open',
                        action: 'page-loaded',
                    })

				}
			}

		}
		return module
	}(document.querySelector('#contact'))) //Node element
})
