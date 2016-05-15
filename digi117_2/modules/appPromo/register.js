Core.register('appPromo', function (sandbox) {
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
	}(document.querySelector('#appPromo'))) //Node element
})
