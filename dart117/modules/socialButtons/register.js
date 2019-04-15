Core.register('socialButtons', function (sandbox) {
	return (function (root) {
		if (!root) return
		var module = {
			init: function () {
				
			},

			listen: {
				'app-load': function () {

				}
			}

		}
		return module
	}(document.querySelector('.socialButtons'))) //Node element
})
