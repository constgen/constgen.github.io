Core.register('searchResults', function (sandbox) {
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
	}(document.querySelector('.searchResults'))) //Node element
})
