Core.register('searchResult', function (sandbox) {
	return (function (root) {
		if (!root) return
		var module = {
			init: function () {
				
			},

			listen: {
				'search-result': function () {

				}
			}

		}
		return module
	}(document.querySelector('.searchResult'))) //Node element
})
